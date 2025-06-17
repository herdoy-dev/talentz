import { Application } from "@/schemas/application";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useMyApplication = (jobId: string) => {
  return useQuery<Application, Error>({
    queryKey: ["myjobapplication", jobId],
    queryFn: () =>
      apiClient
        .get<Application>("/applications/my", {
          params: {
            jobId,
          },
        })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useMyApplication;
