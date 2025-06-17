import DeleteTableItem from "@/components/delete-table-item";
import TableHead from "@/components/table-head";
import { Category } from "@/schemas/category";

interface Props {
  data: Category[];
}

const columns = [
  { _id: 1, value: "name", label: "Name" },
  { _id: 6, value: "", label: "Action" },
];

export default function CategoryTable({ data }: Props) {
  return (
    <div>
      <table className="table">
        <TableHead columns={columns} />
        <tbody>
          {data.map((category) => (
            <tr key={category._id}>
              <td> {category.name} </td>

              <td className="space-x-1">
                <DeleteTableItem
                  count={data.length}
                  id={category._id}
                  path="/categorys"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
