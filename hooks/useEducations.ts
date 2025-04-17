import Education from "@/schemas/education";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useEducations = () => {
  return useQuery<Education[], Error>({
    queryKey: ["educations"],
    queryFn: () =>
      apiClient.get<Education[]>("/educations").then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useEducations;
