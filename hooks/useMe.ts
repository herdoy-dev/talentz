import ApiResponse from "@/schemas/ApiRespose";
import User from "@/schemas/User";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useMe = () => {
  return useQuery<ApiResponse<User>, Error>({
    queryKey: ["me"],
    queryFn: () =>
      apiClient.get<ApiResponse<User>>("/auth/me").then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useMe;
