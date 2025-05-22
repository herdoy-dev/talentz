"use client";
import useMessages from "@/hooks/useMessages";
import { formatDate } from "@/lib/utils";
import { useChatStore } from "@/store";
import { Avatar, Flex } from "@radix-ui/themes";
import { useEffect, useRef } from "react";

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
          Please Select An Conversion.
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
      {messages.result.map((message) => (
        <Flex className="w-full" gap="2" key={message._id}>
          <Avatar
            src={message.sender.image}
            fallback={message.sender.firstName}
            radius="full"
            size="2"
          />
          <div>
            <Flex align="center" gap="2">
              <p className="text-sm font-[500] text-gray-600">
                {message.sender.firstName + " " + message.sender.lastName}
              </p>
              <p className="!text-[14px] text-gray-500">
                {formatDate(message.createdAt)}
              </p>
            </Flex>
            <p className="text-sm text-gray-600 mt-3">{message.message}</p>
          </div>
        </Flex>
      ))}
      <div ref={messagesEndRef}></div>
    </Flex>
  );
}
