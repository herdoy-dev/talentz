import { GetApplicationResponse } from "@/schemas/application";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useApplications = (jobId: string) => {
  return useQuery<GetApplicationResponse, Error>({
    queryKey: ["applications", jobId],
    queryFn: () =>
      apiClient
        .get<GetApplicationResponse>("/applications", {
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
