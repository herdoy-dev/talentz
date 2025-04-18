import DeleteTableItem from "@/components/delete-table-item";
import TableHead from "@/components/table-head";
import { formatDate } from "@/lib/utils";
import { JobResponse } from "@/schemas/job";
import JobDetails from "./job";

interface Props {
  data: JobResponse;
}

const columns = [
  { _id: 1, value: "title", label: "Title" },
  { _id: 3, value: "category.name", label: "Category" },
  { _id: 4, value: "createdAt", label: "Date" },
  { _id: 5, value: "", label: "Action" },
];

export default function JobTable({ data }: Props) {
  return (
    <div>
      <table className="table">
        <TableHead columns={columns} />
        <tbody>
          {data.result.map((job) => (
            <tr key={job._id}>
              <td> {job.title} </td>
              <td> {job.category.name} </td>
              <td> {formatDate(job.createdAt)} </td>
              <td className="space-x-1">
                <JobDetails job={job} />
                <DeleteTableItem count={data.count} id={job._id} path="/jobs" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
