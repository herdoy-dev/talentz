"use client";
import useMessages from "@/hooks/useMessages";
import { formatDate } from "@/lib/utils";
import FILE_ICONS from "@/schemas/FileIcons";
import { useChatStore } from "@/store";
import { Avatar, Flex } from "@radix-ui/themes";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FiDownload, FiFilePlus } from "react-icons/fi";

// File type to icon mapping

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

export default function Messages() {
  const currentChat = useChatStore((s) => s.currentChat);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: messages } = useMessages(currentChat?._id as string);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!currentChat)
    return (
      <Flex align="center" justify="center">
        <p className="!text-2xl text-center text-gray-300">
          Please Select A Conversation.
        </p>
      </Flex>
    );

  if (!messages) return <Flex className="bg-gray-100 !overflow-y-auto p-4" />;

  return (
    <Flex
      align="start"
      direction="column"
      className="bg-gray-100 !overflow-y-auto p-4"
      gap="8"
    >
      {messages.data.map((message) => (
        <Flex className="w-full" gap="2" key={message._id}>
          <Avatar
            src={message.sender.image}
            fallback={message.sender.firstName}
            radius="full"
            size="2"
          />
          <div className="flex-1">
            <Flex align="center" gap="2">
              <p className="text-sm font-[500] text-gray-600">
                {message.sender.firstName + " " + message.sender.lastName}
              </p>
              <p className="!text-[14px] text-gray-500">
                {formatDate(message.createdAt)}
              </p>
            </Flex>
            {message.message && (
              <p className="text-sm text-gray-600 mt-3">{message.message}</p>
            )}
            <div className="flex flex-wrap gap-4 mt-3">
              {message.files.map((file) => {
                const fileName = getFileNameFromUrl(file);
                const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);

                return (
                  <div
                    key={file}
                    className="relative group border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    {isImage ? (
                      <div className="relative w-40 h-32">
                        <Image
                          src={file}
                          fill
                          className="object-cover"
                          alt={fileName}
                          sizes="160px"
                        />
                      </div>
                    ) : (
                      <div className="w-40 h-32 flex flex-col items-center justify-center p-4">
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
                      <p className="text-xs text-white truncate">{fileName}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Flex>
      ))}
      <div ref={messagesEndRef}></div>
    </Flex>
  );
}
