import Pagination from "@/components/pagination";
import ApiResponse from "@/schemas/ApiRespose";
import JobSchema from "@/schemas/Job";
import apiClient from "@/services/api-client";
import JobTable from "./job-table";

interface Props {
  searchParams: Promise<{
    orderBy: string;
    page: string;
    status: string;
  }>;
}

export default async function Jobs({ searchParams }: Props) {
  const params = await searchParams;
  const setPage = parseInt(params.page);
  const orderBy = params.orderBy ? params.orderBy : null;
  const page = setPage ? setPage : null;
  const status = params.status ? params.status : null;
  const { data } = await apiClient.get<ApiResponse<JobSchema[]>>("/jobs", {
    params: {
      orderBy,
      page,
      status,
    },
  });
  return (
    <div className="table">
      <JobTable data={data.data} count={data.count} />
      <Pagination currentPage={data.currentPage} pageCount={data.pageCount} />
    </div>
  );
}
