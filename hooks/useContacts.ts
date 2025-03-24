import { Contact } from "@/schemas/contact";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useContacts = (token: string) =>
  useQuery<Contact[], Error>({
    queryKey: ["contacts"],
    queryFn: () =>
      apiClient(token)
        .get<Contact[]>("/contacts")
        .then((res) => res.data),
  });

export default useContacts;
