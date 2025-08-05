"use client";
import { queryClient } from "@/app/query-client-provider";
import { Button } from "@/components/ui/button";
import useSession from "@/hooks/useSession";
import { Chat } from "@/schemas/Chat";
import apiClient from "@/services/api-client";
import { useChatStore } from "@/store";
import { useRouter } from "next/navigation";

interface Props {
  seller: string;
}

export default function MessageSentButton({ seller }: Props) {
  const setCurrentChat = useChatStore((s) => s.setCurrentChat);
  const router = useRouter();
  const { session } = useSession();

  if (!session) return null;

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
          router.push("/dashboard/buyer/messages");
        } catch (error) {
          console.log(error);
        }
      }}
    >
      Message
    </Button>
  );
}
