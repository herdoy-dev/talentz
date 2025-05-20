"use client";
import { useChatStore } from "@/store";
import { Avatar, Flex } from "@radix-ui/themes";

export default function ChatActions() {
  const currentChat = useChatStore((s) => s.currentChat);
  if (!currentChat) return <div />;
  return (
    <Flex align="center" justify="between" className="border-b shadow px-8">
      <Flex align="center" gap="2">
        <Avatar
          src={currentChat.buyer.image}
          fallback={currentChat.buyer.firstName}
          radius="full"
          size="4"
        />
        <p className="font-semibold">
          {currentChat.buyer.firstName + " " + currentChat.buyer.lastName}
        </p>
      </Flex>
    </Flex>
  );
}
