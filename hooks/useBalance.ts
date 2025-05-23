import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

interface Balance {
  _id: string;
  user: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

const useBalance = () => {
  return useQuery<Balance, Error>({
    queryKey: ["balance"],
    queryFn: () => apiClient.get<Balance>("/balances").then((res) => res.data),
    staleTime: 1 * 60 * 1000,
    retry: 1,
  });
};

export default useBalance;
