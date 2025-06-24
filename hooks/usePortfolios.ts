import ApiResponse from "@/schemas/ApiRespose";
import Portfolio from "@/schemas/Portfolio";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const usePortfolios = () => {
  return useQuery<ApiResponse<Portfolio[]>, Error>({
    queryKey: ["portfolios"],
    queryFn: () =>
      apiClient
        .get<ApiResponse<Portfolio[]>>("/portfolios")
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default usePortfolios;
