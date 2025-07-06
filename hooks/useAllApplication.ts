import ApiResponse from "@/schemas/ApiRespose";
import Application from "@/schemas/Application";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useAllApplications = () => {
  return useQuery<ApiResponse<Application[]>, Error>({
    queryKey: ["all_applications"],
    queryFn: () =>
      apiClient
        .get<ApiResponse<Application[]>>("/applications/all")
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useAllApplications;
