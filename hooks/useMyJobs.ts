import { JobResponse } from "@/schemas/job";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useMyJobs = (
  userId: string,
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED"
) => {
  return useQuery<JobResponse, Error>({
    queryKey: ["my_jobs", userId, status],
    queryFn: () =>
      apiClient
        .get<JobResponse>("/jobs/my", {
          params: {
            userId,
            status,
          },
        })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useMyJobs;
