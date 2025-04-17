import Portfolio from "@/schemas/portfolio";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const usePortfolios = () => {
  return useQuery<Portfolio[], Error>({
    queryKey: ["portfolios"],
    queryFn: () =>
      apiClient.get<Portfolio[]>("/portfolios").then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default usePortfolios;
