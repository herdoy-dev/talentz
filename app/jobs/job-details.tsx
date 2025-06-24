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
import useMyApplication from "@/hooks/useApplication";
import { formatDate } from "@/lib/utils";
import Job from "@/schemas/Job";
import { Avatar, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import JobAction from "./job-action";

interface JobDetailsProps {
  job: Job;
  title: string;
}

export function JobDetails({ job, title }: JobDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useMyApplication(job._id as string);
  const application = data?.data;
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <h3 className="cursor-pointer">{title}</h3>
      </SheetTrigger>
      <SheetContent className="min-w-[800px]">
        <SheetHeader>
          <SheetTitle>
            <JobAction
              job={job}
              handleOpen={() => setIsOpen(false)}
              isApplied={data && application?.author ? true : false}
            />
          </SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-10 overflow-y-auto">
          <h2 className="mb-2">{job.title}</h2>
          <p>{job.description}</p>

          {application && (
            <div className="my-6">
              <h3 className="mb-3">My Application</h3>
              <div className="space-y-6">
                <div key={application.author._id}>
                  <div className="flex-1 p-3 pt-0 border rounded-2xl">
                    <Flex
                      align="center"
                      justify="between"
                      className="border-b py-2"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={application.author.image}
                          fallback="User"
                          radius="full"
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            objectFit: "cover",
                          }}
                        />
                        <span>
                          {`${application.author.firstName} ${application.author.lastName}`}
                        </span>
                        <Text className="text-gray-500" size="small">
                          {formatDate(application.createdAt)}
                        </Text>
                      </div>

                      <Button size="sm" className="rounded">
                        <BiEdit />
                      </Button>
                    </Flex>
                    <div className="relative">
                      <div className="pb-5 pt-2">
                        <p>{application.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
