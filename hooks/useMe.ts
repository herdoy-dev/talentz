import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  skills?: [string];
  languages?: [string];
  image?: string;
  phone?: string; // Optional field
  location?: string; // Optional field
  title?: string; // Optional field
  about?: string; // Optional field
}

const useMe = () => {
  return useQuery<User, Error>({
    queryKey: ["me"],
    queryFn: () => apiClient.get<User>("/me").then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useMe;
