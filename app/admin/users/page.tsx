import Pagination from "@/components/pagination";
import { UsersResponse } from "@/schemas/user";
import apiClient from "@/services/api-client";
import UserTable from "./user-table";

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
  const { data } = await apiClient.get<UsersResponse>("/users", {
    params: {
      orderBy,
      page,
    },
  });
  return (
    <div className="table">
      <UserTable data={data} />
      <Pagination
        currentPage={data.pagination.currentPage}
        pageCount={data.pagination.pageCount}
      />
    </div>
  );
}
