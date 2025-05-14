import { GetServicesResponse } from "@/schemas/service";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useServices = () => {
  return useQuery<GetServicesResponse, Error>({
    queryKey: ["services"],
    queryFn: () =>
      apiClient
        .get<GetServicesResponse>("/services/my")
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useServices;
