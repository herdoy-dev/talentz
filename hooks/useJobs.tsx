import { JobResponse } from "@/schemas/job";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useJobs = () => {
  return useQuery<JobResponse, Error>({
    queryKey: ["jobs"],
    queryFn: () => apiClient.get<JobResponse>("/jobs").then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useJobs;
