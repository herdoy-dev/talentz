import ApiResponse from "@/schemas/ApiRespose";
import Service from "@/schemas/Service";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useServices = () => {
  return useQuery<ApiResponse<Service[]>, Error>({
    queryKey: ["services"],
    queryFn: () =>
      apiClient
        .get<ApiResponse<Service[]>>("/services/my")
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useServices;
