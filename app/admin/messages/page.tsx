import Pagination from "@/components/pagination";
import { ContactResponse } from "@/schemas/contact";
import apiClient from "@/services/api-client";
import MessageTable from "./message-table";

interface Props {
  searchParams: Promise<{
    orderBy: string;
    page: string;
  }>;
}

export default async function Messages({ searchParams }: Props) {
  const params = await searchParams;
  const setPage = parseInt(params.page);
  const orderBy = params.orderBy ? params.orderBy : null;
  const page = setPage ? setPage : null;
  const { data } = await apiClient.get<ContactResponse>("/contacts", {
    params: {
      orderBy,
      page,
    },
  });
  return (
    <div className="table">
      <MessageTable data={data} />
      <Pagination
        currentPage={data.pagination.currentPage}
        pageCount={data.pagination.pageCount}
      />
    </div>
  );
}
