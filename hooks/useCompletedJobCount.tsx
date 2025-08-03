import ApiResponse from "@/schemas/ApiRespose";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useCompletedJobCount = (userId: string) => {
  return useQuery<ApiResponse<number>, Error>({
    queryKey: ["completedjobs"],
    queryFn: () =>
      apiClient
        .get<ApiResponse<number>>("/talents/total-job-count", {
          params: {
            userId,
          },
        })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useCompletedJobCount;
