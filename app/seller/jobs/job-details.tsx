"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TableCell } from "@/components/ui/table";
import Text from "@/components/ui/text";
import useComments from "@/hooks/useComments";
import Job from "@/schemas/Job";
import { Avatar, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { CreateComment } from "./create-comment";

interface Props {
  job: Job;
  title: string;
}

export function JobDetails({ job, title }: Props) {
  const [isOpen, setOpen] = useState(false);
  const { data } = useComments(job._id);
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TableCell className="w-[200px]">{title}</TableCell>
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
              <Button
                size="sm"
                variant="outline"
                className="px-8 cursor-pointer"
              >
                Message
              </Button>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-10 overflow-y-scroll">
          <h2 className="mb-2"> {job.title} </h2>
          <div className="w-[300px] flex items-center justify-between h-8 rounded-full overflow-hidden border shadow-primary p-[2px]">
            <div className="flex-1 flex items-center justify-center h-full bg-primary rounded-full text-white">
              Activity
            </div>
            <div className="flex-1 flex items-center justify-center h-full rounded-full">
              Dispute
            </div>
          </div>
          <div className="space-y-6 mt-8">
            <CreateComment jobId={job._id} />
            {data?.data.map((comment) => (
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
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aperiam, odio ex. Quidem, eligendi velit eum vel officia
                        reprehenderit consequuntur nesciunt cupiditate excepturi
                        incidunt numquam asperiores suscipit deserunt quia,
                        harum explicabo?
                      </p>
                    </div>
                    <div className="absolute bottom-0 right-0 flex items-center gap-3">
                      <Button variant="light">Decline</Button>
                      <Button>Approve</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
