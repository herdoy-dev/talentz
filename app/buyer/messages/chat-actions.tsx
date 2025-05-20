"use client";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store";
import { Avatar, Flex } from "@radix-ui/themes";

export default function ChatActions() {
  const currentChat = useChatStore((s) => s.currentChat);
  if (!currentChat) return <div />;
  return (
    <Flex align="center" justify="between" className="border-b shadow px-8">
      <Flex align="center" gap="2">
        <Avatar
          src={currentChat.seller.image}
          fallback={currentChat.seller.firstName}
          radius="full"
          size="4"
        />
        <p className="font-semibold">
          {currentChat.seller.firstName + " " + currentChat.seller.lastName}
        </p>
      </Flex>
      <Button size="sm" className="px-8">
        Hire
      </Button>
    </Flex>
  );
}
