import { JobResponse } from "@/schemas/job";
import apiClient from "@/services/api-client";
import useJobStore from "@/store/jobs";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useJobs = () => {
  const query = useJobStore();
  return useQuery<JobResponse, Error>({
    queryKey: ["jobs", query],
    queryFn: () =>
      apiClient
        .get<JobResponse>("/jobs", {
          params: {
            orderBy: query.orderBy,
            search: query.searchText,
            sortOrder: query.orderDirection,
            currentPage: query.page,
          },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  });
};

export default useJobs;
