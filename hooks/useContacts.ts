import { ContactResponse } from "@/schemas/contact";
import apiClient from "@/services/api-client";
import useContactStore from "@/store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useContacts = () => {
  const query = useContactStore();
  return useQuery<ContactResponse, Error>({
    queryKey: ["contacts", query],
    queryFn: () =>
      apiClient
        .get<ContactResponse>("/contacts", {
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

export default useContacts;
