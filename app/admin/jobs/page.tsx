import Pagination from "@/components/pagination";
import { JobResponse } from "@/schemas/job";
import apiClient from "@/services/api-client";
import JobTable from "./job-table";

interface Props {
  searchParams: Promise<{
    orderBy: string;
    page: string;
  }>;
}

export default async function Jobs({ searchParams }: Props) {
  const params = await searchParams;
  const setPage = parseInt(params.page);
  const orderBy = params.orderBy ? params.orderBy : null;
  const page = setPage ? setPage : null;
  const { data } = await apiClient.get<JobResponse>("/jobs", {
    params: {
      orderBy,
      page,
    },
  });
  return (
    <div className="table">
      <JobTable data={data} />
      <Pagination currentPage={data.currentPage} pageCount={data.pageCount} />
    </div>
  );
}
