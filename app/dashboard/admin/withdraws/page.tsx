import Pagination from "@/components/pagination";
import ApiResponse from "@/schemas/ApiRespose";
import Withdraw from "@/schemas/Withdraw";
import apiClient from "@/services/api-client";
import WithdrawTable from "./withdraw-table";

interface Props {
  searchParams: Promise<{
    orderBy: string;
    page: string;
    status: string;
  }>;
}

export default async function Withdraws({ searchParams }: Props) {
  const params = await searchParams;
  const setPage = parseInt(params.page);
  const orderBy = params.orderBy ? params.orderBy : null;
  const page = setPage ? setPage : null;
  const status = params.status ? params.status : null;
  const { data } = await apiClient.get<ApiResponse<Withdraw[]>>("/withdraws", {
    params: {
      orderBy,
      page,
      status,
    },
  });
  return (
    <div className="table">
      <WithdrawTable data={data.data} count={data.count} />
      <Pagination currentPage={data.currentPage} pageCount={data.pageCount} />
    </div>
  );
}
