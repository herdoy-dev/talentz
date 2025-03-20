import { Contact } from "@/schemas/contact";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useContacts = () =>
  useQuery<Contact[], Error>({
    queryKey: ["contacts"],
    queryFn: () =>
      axios
        .get<Contact[]>(`${process.env.DATABASE_URL}/contacts`)
        .then((res) => res.data),
  });

export default useContacts;
