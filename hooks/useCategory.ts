import { Category } from "@/schemas/category";
import Education from "@/schemas/education";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useCategorys = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categorys"],
    queryFn: () =>
      apiClient.get<Category[]>("/categorys").then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useCategorys;
