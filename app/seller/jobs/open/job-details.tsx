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
import { formatDate } from "@/lib/utils";
import { Application } from "@/schemas/application";
import { Job } from "@/schemas/job";
import { Avatar, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaAngleLeft } from "react-icons/fa6";
import { CreateApplication } from "./create-application";

interface JobDetailsProps {
  job: Job;
  title: string;
}

export function JobDetails({ job, title }: JobDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: applicationsData } = useApplications(job._id);
  const { data: user } = useMe();

  const getMyApplication = (): Application[] | false => {
    if (!applicationsData || !user) return false;
    const myApplications = applicationsData.result.filter(
      (application) => application.author._id === user._id
    );
    return myApplications.length > 0 ? myApplications : false;
  };

  const myApplications = getMyApplication();

  if (!user) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <h3 className="cursor-pointer">{title}</h3>
      </SheetTrigger>
      <SheetContent className="min-w-[800px]">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center justify-between">
              <Button
                onClick={() => setIsOpen(false)}
                variant="link"
                className="no-underline cursor-pointer"
              >
                <FaAngleLeft /> Back
              </Button>
              <div>
                {myApplications ? (
                  <Button variant="light">Applied</Button>
                ) : (
                  <CreateApplication jobId={job._id} />
                )}
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-10 overflow-y-auto">
          <h2 className="mb-2">{job.title}</h2>
          <p>{job.description}</p>

          {myApplications && (
            <div className="my-6">
              <h3 className="mb-3">My Application</h3>
              <div className="space-y-6">
                {myApplications.map((application) => (
                  <div key={application._id}>
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
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
