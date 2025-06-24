import Pagination from "@/components/pagination";
import ApiResponse from "@/schemas/ApiRespose";
import { Contact } from "@/schemas/Contact";
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
  const { data } = await apiClient.get<ApiResponse<Contact[]>>("/contacts", {
    params: {
      orderBy,
      page,
    },
  });
  return (
    <div className="table">
      <MessageTable data={data.data} count={data.count} />
      <Pagination currentPage={data.currentPage} pageCount={data.pageCount} />
    </div>
  );
}
