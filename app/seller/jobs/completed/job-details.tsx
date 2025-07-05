"use client";
import { queryClient } from "@/app/query-client-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import useComments from "@/hooks/useComments";
import { Chat } from "@/schemas/Chat";
import Job from "@/schemas/Job";
import apiClient from "@/services/api-client";
import { useChatStore } from "@/store";
import { Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";
import Comment from "../comment";

interface Props {
  job: Job;
  title: string;
}

export function JobDetails({ job, title }: Props) {
  const [isOpen, setOpen] = useState(false);
  const { data, isLoading } = useComments(job._id);
  const setCurrentChat = useChatStore((s) => s.setCurrentChat);
  const router = useRouter();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="w-[200px] hover:bg-gray-50 transition-colors cursor-pointer group">
          <SheetTitle asChild>
            <h3 className="font-medium text-gray-800 group-hover:text-primary transition-colors">
              {title}
            </h3>
          </SheetTitle>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl lg:max-w-3xl pb-28 p-0">
        <SheetHeader className="mb-0 sticky top-0 bg-white z-10 border-b px-6 py-4">
          <Flex justify="between" align="center" className="px-1">
            <Button
              onClick={() => setOpen(false)}
              variant="ghost"
              className="gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
            >
              <FaAngleLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to jobs</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="px-6 border-gray-300 hover:bg-gray-50 cursor-pointer gap-2"
              onClick={async () => {
                try {
                  const { data } = await apiClient.post<Chat>("/chats", {
                    buyer: job.author._id,
                  });
                  setCurrentChat(data);
                  queryClient.invalidateQueries({
                    queryKey: ["chats"],
                  });
                  router.push("/seller/messages");
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <LuMessagesSquare className="h-4 w-4" />
              <span>Message</span>
            </Button>
          </Flex>
        </SheetHeader>

        <div className="h-full flex flex-col">
          {/* Job Header */}
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Posted by {job.author.firstName + " " + job.author.lastName}
            </p>
          </div>

          {/* Comments Section */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : data?.data.length ? (
              data.data.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <IoSend className="h-12 w-12 mb-2 opacity-50" />
                <p className="text-sm">No comments yet</p>
                <p className="text-xs mt-1">Be the first to comment</p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
