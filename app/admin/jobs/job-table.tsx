import DeleteTableItem from "@/components/delete-table-item";
import TableHead from "@/components/table-head";
import { formatDate } from "@/lib/utils";
import Job from "@/schemas/Job";
import JobDetails from "./job";

interface Props {
  data: Job[];
  count: number;
}

const columns = [
  { _id: 1, value: "title", label: "Title" },
  { _id: 3, value: "category.name", label: "Category" },
  { _id: 4, value: "createdAt", label: "Date" },
  { _id: 5, value: "", label: "Action" },
];

export default function JobTable({ data, count }: Props) {
  return (
    <div>
      <table className="table">
        <TableHead columns={columns} />
        <tbody>
          {data.map((job) => (
            <tr key={job._id}>
              <td> {job.title} </td>
              <td> {job.category.name} </td>
              <td> {formatDate(job.createdAt)} </td>
              <td className="space-x-1">
                <JobDetails job={job} />
                <DeleteTableItem count={count} id={job._id} path="/jobs" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
