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
        src={chat.seller.image}
        fallback={chat.seller.firstName}
        radius="full"
        size="4"
      />
      <div>
        <p className="font-semibold">
          {" "}
          {chat.seller.firstName + " " + chat.seller.lastName}{" "}
        </p>
        <p className="!text-[12px] text-gray-400">Lorem ipsum dolor...</p>
      </div>
    </Flex>
  );
}
