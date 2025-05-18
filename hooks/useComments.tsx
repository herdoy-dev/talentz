import { GetCommentsResponse } from "@/schemas/comment";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useComments = (jobId: string) => {
  return useQuery<GetCommentsResponse, Error>({
    queryKey: ["comments", jobId],
    queryFn: () =>
      apiClient
        .get<GetCommentsResponse>("/comments", {
          params: {
            jobId,
          },
        })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useComments;
