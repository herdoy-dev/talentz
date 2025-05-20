"use client";
import { cn } from "@/lib/utils";
import { Chat } from "@/schemas/chat";
import { useChatStore } from "@/store";
import { Avatar, Flex } from "@radix-ui/themes";

interface Props {
  chat: Chat;
}

export default function ChatDetails({ chat }: Props) {
  const currentChat = useChatStore((s) => s.currentChat);
  const setCurrent = useChatStore((s) => s.setCurrentChat);
  return (
    <Flex
      onClick={() => setCurrent(chat)}
      align="center"
      p="2"
      className={cn(
        "border cursor-pointer rounded-xl",
        chat._id === currentChat?._id && "bg-primary-light"
      )}
      gap="2"
    >
      <Avatar
        src={chat.buyer.image}
        fallback={chat.buyer.firstName}
        radius="full"
        size="4"
      />
      <div>
        <p className="font-semibold">
          {chat.buyer.firstName + " " + chat.buyer.lastName}
        </p>
        <p className="!text-[12px] text-gray-400">
          {chat.lastMessage ? chat.lastMessage.slice(0, 50) + "..." : ""}
        </p>
      </div>
    </Flex>
  );
}
