import Pagination from "@/components/pagination";
import ApiResponse from "@/schemas/ApiRespose";
import Transaction from "@/schemas/Transaction";
import apiClient from "@/services/api-client";
import SalseTable from "./salse-table";

interface Props {
  searchParams: Promise<{
    orderBy: string;
    page: string;
    status: string;
  }>;
}

export default async function Salse({ searchParams }: Props) {
  const params = await searchParams;
  const setPage = parseInt(params.page);
  const orderBy = params.orderBy ? params.orderBy : null;
  const page = setPage ? setPage : null;
  const status = params.status ? params.status : null;
  const { data } = await apiClient.get<ApiResponse<Transaction[]>>(
    "/transactions",
    {
      params: {
        orderBy,
        page,
        status,
      },
    }
  );
  return (
    <div className="table">
      <SalseTable data={data.data} count={data.count} />
      <Pagination currentPage={data.currentPage} pageCount={data.pageCount} />
    </div>
  );
}
