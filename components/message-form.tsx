"use client";
import { queryClient } from "@/app/query-client-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useMe from "@/hooks/useMe";
import apiClient from "@/services/api-client";
import { useChatStore } from "@/store";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import { BsPaperclip } from "react-icons/bs";
import { LuSendHorizontal } from "react-icons/lu";

export default function MessageForm() {
  const [message, setMessage] = useState("");
  const currentChat = useChatStore((s) => s.currentChat);
  const { data: user } = useMe();
  if (!currentChat || !user) return <div />;
  return (
    <Flex align="center" className="border-t px-3">
      <Flex align="center" className="w-full h-full">
        <Flex align="center">
          <Button variant="ghost" size="sm" className="cursor-pointer">
            <BsPaperclip />
          </Button>
        </Flex>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className="flex-1 rounded-none "
        />
        <Button
          onClick={async () => {
            try {
              await apiClient.post("/messages", {
                chatId: currentChat._id,
                message,
                sender: user.data._id,
              });
              setMessage("");
              queryClient.invalidateQueries({
                queryKey: ["chats"],
              });
              queryClient.invalidateQueries({
                queryKey: ["messages"],
              });
            } catch (error) {
              console.log(error);
            }
          }}
          className="rounded-none cursor-pointer"
        >
          <LuSendHorizontal />
        </Button>
      </Flex>
    </Flex>
  );
}
