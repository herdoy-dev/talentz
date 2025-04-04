import { UsersResponse } from "@/schemas/user";
import apiClient from "@/services/api-client";
import useContactStore from "@/store/contacts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const query = useContactStore();
  return useQuery<UsersResponse, Error>({
    queryKey: ["users", query],
    queryFn: () =>
      apiClient
        .get<UsersResponse>("/users", {
          params: {
            orderBy: query.orderBy,
            search: query.searchText,
            sortOrder: query.orderDirection,
            currentPage: query.page,
          },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  });
};

export default useUsers;
