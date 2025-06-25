"use client";
import { queryClient } from "@/app/query-client-provider";
import Badge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Text from "@/components/ui/text";
import useMe from "@/hooks/useMe";
import { formatDate } from "@/lib/utils";
import CommentSchema from "@/schemas/Comment";
import apiClient from "@/services/api-client";
import { Avatar, Flex } from "@radix-ui/themes";
import { useState } from "react";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

interface Props {
  comment: CommentSchema;
}

export default function Comment({ comment }: Props) {
  const [isApproving, setApproving] = useState(false);
  const [isDeclining, setDeclining] = useState(false);
  const { data } = useMe();
  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="p-4">
        {/* Comment Header */}
        <Flex align="center" justify="between" className="pb-3 border-b">
          <Flex align="center" gap="3">
            <Avatar
              src={comment.author.image}
              fallback="U"
              radius="full"
              className="!w-8 !h-8 !mr-2 !rounded-full"
            />
            <Text className="font-medium">
              {comment.author.firstName} {comment.author.lastName}
            </Text>
          </Flex>
          <Text className="text-gray-500 text-sm">
            {formatDate(comment.createdAt)}
          </Text>
        </Flex>

        {/* Comment Content */}
        <div className="py-4">
          {comment.reqType === "request_fund" && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <Flex align="center" justify="between">
                <Text className="font-medium">Fund Increase Request</Text>
                <Badge className="bg-blue-100 text-blue-800 text-lg font-semibold">
                  ${comment.reqFund}
                </Badge>
              </Flex>
            </div>
          )}

          {comment.reqType === "request_time" && (
            <div className="mb-4 p-3 bg-purple-50 rounded-lg">
              <Flex direction="column" gap="1">
                <Text className="font-medium">Time Extension Request</Text>
                <Badge className="bg-purple-100 text-purple-800 text-lg font-semibold mt-1">
                  {formatDate(comment.reqTime)}
                </Badge>
              </Flex>
            </div>
          )}

          <Text className="text-gray-700">
            {comment.message || "No additional message provided"}
          </Text>
        </div>

        {/* Action Buttons */}
        {comment.reqType !== "comment" &&
          comment.status === "pending" &&
          comment.author._id !== data?.data._id && (
            <Flex justify="end" gap="3" className="pt-2 border-t !gap-3">
              <Button
                disabled={isDeclining}
                onClick={async () => {
                  setDeclining(true);
                  try {
                    await apiClient.put(`/comments/${comment._id}`, {
                      status: "cancel",
                    });
                    toast.success("Approved");
                    queryClient.invalidateQueries({
                      queryKey: ["comments"],
                    });
                    setDeclining(false);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                variant="outline"
                className="text-gray-700"
              >
                {isDeclining ? <BeatLoader /> : "Decline"}
              </Button>
              <Button
                disabled={isApproving}
                onClick={async () => {
                  setApproving(true);
                  try {
                    await apiClient.put(`/jobs/${comment.job._id}`, {
                      deliveryDate: comment.reqTime,
                    });
                    await apiClient.put(`/comments/${comment._id}`, {
                      status: "approve",
                    });
                    toast.success("Approved");
                    queryClient.invalidateQueries({
                      queryKey: ["comments"],
                    });
                    queryClient.invalidateQueries({
                      queryKey: ["my_jobs"],
                    });
                    setApproving(false);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {isApproving ? <BeatLoader /> : "Approve"}
              </Button>
            </Flex>
          )}

        {comment.status === "approve" && (
          <Flex justify="end" gap="3" className="pt-2 border-t !gap-3">
            <Button disabled variant="light" className="text-gray-700">
              Approved
            </Button>
          </Flex>
        )}
        {comment.status === "cancel" && (
          <Flex justify="end" gap="3" className="pt-2 border-t !gap-3">
            <Button
              disabled
              variant="destructive"
              className="bg-destructive/20 text-gray-600"
            >
              Declined
            </Button>
          </Flex>
        )}
      </div>
    </div>
  );
}
