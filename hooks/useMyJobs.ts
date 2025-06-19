import { JobResponse } from "@/schemas/job";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useMyJobs = (status: "OPEN" | "IN_PROGRESS" | "COMPLETED") => {
  return useQuery<JobResponse, Error>({
    queryKey: ["my_jobs", status],
    queryFn: () =>
      apiClient
        .get<JobResponse>("/jobs/my", {
          params: {
            status,
          },
        })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useMyJobs;
