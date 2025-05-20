"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Text from "@/components/ui/text";
import useApplications from "@/hooks/useApplications";
import useMe from "@/hooks/useMe";
import { Job } from "@/schemas/job";
import { Avatar, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { CreateApplication } from "./create-application";

interface Props {
  job: Job;
  title: string;
}

export function JobDetails({ job, title }: Props) {
  const [isOpen, setOpen] = useState(false);
  const { data } = useApplications(job._id);
  const { data: user } = useMe();
  if (!user) return null;
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <h3>{title}</h3>
      </SheetTrigger>
      <SheetContent style={{ minWidth: "800px" }}>
        <SheetHeader>
          <SheetTitle asChild>
            <div className="flex items-center justify-between">
              <Button
                onClick={() => setOpen(false)}
                variant="link"
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <FaAngleLeft /> Back
              </Button>
              {user._id !== job.author._id && (
                <CreateApplication jobId={job._id} />
              )}
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-10 overflow-y-scroll">
          <h2 className="mb-2"> {job.title} </h2>
          <p>{job.description}</p>

          {user._id === job.author._id && data && data.count >= 1 && (
            <div className="space-y-6 border p-6 mt-6 rounded-3xl">
              <h3>Applications</h3>
              <div className="space-y-6">
                {data?.result.map((comment) => (
                  <div key={comment._id}>
                    <div className="flex-1 p-3 border rounded-2xl">
                      <Flex
                        align="center"
                        justify="between"
                        className="border-b py-2"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={comment.author.image}
                            fallback="User"
                            radius="full"
                            className="!w-8 !h-8 !rounded-full"
                          />
                          <span>
                            {comment.author.firstName +
                              " " +
                              comment.author.lastName}
                          </span>
                        </div>
                        <Text className="text-gray-500" size="small">
                          12 Jan 2025
                        </Text>
                      </Flex>
                      <div className="relative pb-10">
                        <div className="pb-5 pt-2">
                          <p>{comment.message}</p>
                        </div>
                        <div className="absolute bottom-0 right-0 flex items-center gap-3">
                          <Button variant="outline">Message</Button>
                          <Button className="px-8">Hire</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
