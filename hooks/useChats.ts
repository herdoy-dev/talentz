import { getChatsResponse } from "@/schemas/chat";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useChats = (userId: string) => {
  return useQuery<getChatsResponse, Error>({
    queryKey: ["chats", userId],
    queryFn: () =>
      apiClient
        .get<getChatsResponse>("chats", {
          params: {
            userId,
          },
        })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useChats;
