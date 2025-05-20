"use client";
import { queryClient } from "@/app/query-client-provider";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store";
import { Avatar, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";

export default function ChatActions() {
  const currentChat = useChatStore((s) => s.currentChat);
  const [rotating, setRotating] = useState(false);
  if (!currentChat) return <div />;

  const handleRefresh = async () => {
    try {
      setRotating(true);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["chats"] }),
        queryClient.invalidateQueries({ queryKey: ["messages"] }),
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => setRotating(false), 1000); // stop animation after 1s
    }
  };

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
      <Flex align="center" gap="3">
        <Button size="sm" className="px-8">
          Hire
        </Button>
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={handleRefresh}
        >
          <MdOutlineRefresh className={rotating ? "animate-spin-slow" : ""} />
        </Button>
      </Flex>
    </Flex>
  );
}
