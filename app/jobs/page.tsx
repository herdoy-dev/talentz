import { JobResponse } from "@/schemas/job";
import apiClient from "@/services/api-client";
import Job from "./job";
import SearchBox from "./search-box";
import SortBy from "./sort-by";

interface Props {
  searchParams: Promise<{
    search: string;
    orderBy: string;
  }>;
}
export default async function JobsPage({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.search ? params.search : null;
  const orderBy = params.orderBy ? params.orderBy : null;
  const { data } = await apiClient.get<JobResponse>("/jobs", {
    params: {
      search,
      orderBy,
    },
  });

  return (
    <div>
      <div className="flex items-center gap-5 mt-6 md:mt-0">
        <SortBy />
        <SearchBox />
      </div>
      <div className="space-y-2 md:ps-6">
        {data?.result.map((job) => (
          <Job job={job} key={job._id} />
        ))}
      </div>
    </div>
  );
}
