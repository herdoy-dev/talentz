import { getChatsResponse } from "@/schemas/chat";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useChats = (path: string, userId: string) => {
  return useQuery<getChatsResponse, Error>({
    queryKey: ["chats", path, userId],
    queryFn: () =>
      apiClient
        .get<getChatsResponse>(`/chats/${path}`, {
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
