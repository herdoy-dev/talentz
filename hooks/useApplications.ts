import { GetCommentsResponse } from "@/schemas/comment";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useApplications = (jobId: string) => {
  return useQuery<GetCommentsResponse, Error>({
    queryKey: ["applications", jobId],
    queryFn: () =>
      apiClient
        .get<GetCommentsResponse>("/applications", {
          params: {
            jobId,
          },
        })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useApplications;
