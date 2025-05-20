import { getMessagesResponse } from "@/schemas/message";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useMessages = (chatId: string) => {
  return useQuery<getMessagesResponse, Error>({
    queryKey: ["messages", chatId],
    queryFn: () =>
      apiClient
        .get<getMessagesResponse>("/messages", {
          params: {
            chatId,
          },
        })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useMessages;
