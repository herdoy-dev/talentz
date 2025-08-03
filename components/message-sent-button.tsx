"use client";
import { queryClient } from "@/app/query-client-provider";
import { Chat } from "@/schemas/Chat";
import apiClient from "@/services/api-client";
import { useChatStore } from "@/store";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface Props {
  seller: string;
}

export default function MessageSentButton({ seller }: Props) {
  const setCurrentChat = useChatStore((s) => s.setCurrentChat);
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      onClick={async () => {
        try {
          const { data } = await apiClient.post<Chat>("/chats", {
            seller,
          });
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
  );
}
