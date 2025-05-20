"use client";
import ChatDetails from "./chat";
import useMe from "@/hooks/useMe";
import useChats from "@/hooks/useChats";
import { Flex } from "@radix-ui/themes";

export default function Chats() {
  const { data: user } = useMe();
  const { data } = useChats("buyer", user?._id as string);
  if (!data)
    return (
      <Flex align="center" justify="center" className="bg-gray-200">
        <p className="!text-3xl text-center text-gray-400">
          There are no conversion available!
        </p>
      </Flex>
    );
  return (
    <div className="border-r overflow-auto p-4 space-y-3">
      {data.result.map((chat) => (
        <ChatDetails key={chat._id} chat={chat} />
      ))}
    </div>
  );
}
