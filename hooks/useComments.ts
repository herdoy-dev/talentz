import ApiResponse from "@/schemas/ApiRespose";
import Comment from "@/schemas/Comment";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useComments = (jobId: string) => {
  return useQuery<ApiResponse<Comment[]>, Error>({
    queryKey: ["comments", jobId],
    queryFn: () =>
      apiClient
        .get<ApiResponse<Comment[]>>("/comments", {
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
