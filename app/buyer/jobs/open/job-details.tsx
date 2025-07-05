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
import Text from "@/components/ui/text";
import useApplications from "@/hooks/useApplications";
import useMe from "@/hooks/useMe";
import { Chat } from "@/schemas/Chat";
import FILE_ICONS from "@/schemas/FileIcons";
import Job from "@/schemas/Job";
import apiClient from "@/services/api-client";
import { useChatStore } from "@/store";
import { Avatar, Flex } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FiDownload, FiFilePlus } from "react-icons/fi";
import { Hire } from "../../hire";

interface Props {
  job: Job;
  title: string;
}

export function JobDetails({ job, title }: Props) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const { data } = useApplications(job._id);
  const setCurrentChat = useChatStore((s) => s.setCurrentChat);
  const { data: user } = useMe();

  const getFileIcon = (url: string) => {
    const extension = url.split(".").pop()?.toLowerCase() || "";
    return FILE_ICONS[extension] || <FiFilePlus className="text-gray-500" />;
  };

  const getFileNameFromUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      return pathname.substring(pathname.lastIndexOf("/") + 1);
    } catch {
      return url.substring(url.lastIndexOf("/") + 1);
    }
  };

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
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-10 overflow-y-scroll">
          <h2 className="mb-2"> {job.title} </h2>
          <p>{job.description}</p>

          {data && data.count >= 1 && (
            <div className="space-y-6 border p-6 mt-6 rounded-3xl">
              <h3>Applications</h3>
              <div className="space-y-6">
                {data?.data.map((application) => (
                  <div key={application._id}>
                    <div className="flex-1 p-3 border rounded-2xl">
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
                            className="!w-8 !h-8 !rounded-full"
                          />
                          <span>
                            {application.author.firstName +
                              " " +
                              application.author.lastName}
                          </span>
                        </div>
                        <Text className="text-gray-500" size="small">
                          12 Jan 2025
                        </Text>
                      </Flex>
                      <div className="relative pb-10">
                        <div className="pb-5 pt-2">
                          <p>{application.message}</p>
                        </div>

                        {/* File attachments */}
                        {application.attachments &&
                          application.attachments.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-3">
                              {application.attachments.map((file) => {
                                const fileName = getFileNameFromUrl(file);
                                const isImage =
                                  /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);

                                return (
                                  <div
                                    key={file}
                                    className="relative group border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow w-40"
                                  >
                                    {isImage ? (
                                      <div className="relative w-full aspect-square">
                                        <Image
                                          src={file}
                                          fill
                                          className="object-cover"
                                          alt={fileName}
                                          sizes="160px"
                                        />
                                      </div>
                                    ) : (
                                      <div className="w-full aspect-square flex flex-col items-center justify-center p-4">
                                        <div className="text-3xl mb-2">
                                          {getFileIcon(fileName)}
                                        </div>
                                        <p className="text-xs text-center text-gray-600 truncate w-full">
                                          {fileName}
                                        </p>
                                      </div>
                                    )}

                                    {/* Download button overlay */}
                                    <a
                                      href={file}
                                      download={fileName}
                                      className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                                    >
                                      <div className="bg-white p-2 rounded-full shadow-lg">
                                        <FiDownload className="text-gray-700" />
                                      </div>
                                    </a>

                                    {/* File name at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                      <p className="text-xs text-white truncate">
                                        {fileName}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        <div className="absolute bottom-0 right-0 flex items-center gap-3">
                          <Button
                            variant="outline"
                            className="cursor-pointer"
                            onClick={async () => {
                              try {
                                const { data } = await apiClient.post<Chat>(
                                  "/chats",
                                  {
                                    seller: application.author._id,
                                  }
                                );
                                setCurrentChat(data);
                                queryClient.invalidateQueries({
                                  queryKey: ["chats"],
                                });
                                router.push("/buyer/messages");
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            Message
                          </Button>
                          <Hire sellerId={application.author._id} />
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
