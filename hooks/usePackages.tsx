import { GetPackageResponse } from "@/schemas/package";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const usePackages = (serviceId: string) => {
  return useQuery<GetPackageResponse, Error>({
    queryKey: ["packages", serviceId],
    queryFn: () =>
      apiClient
        .get<GetPackageResponse>("/packages", {
          params: {
            serviceId,
          },
        })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default usePackages;
