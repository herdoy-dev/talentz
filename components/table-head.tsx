import Column from "@/schemas/column";
import { FaSortDown, FaSortUp } from "react-icons/fa";

interface Props<T> {
  columns: Column<T>[];
  onClick: (collumn: keyof T) => void;
  currentOrder: "asc" | "desc";
  orderBy: string;
}

const TableHead = <T extends { _id?: string | number }>({
  columns,
  onClick,
  orderBy,
  currentOrder,
}: Props<T>) => {
  const getSortIcon = (column: keyof T) => {
    if (orderBy === column) {
      return currentOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return null;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th onClick={() => onClick(column.path)} key={column._id}>
            <div className="flex items-center gap-1 cursor-pointer">
              {column.label}
              {getSortIcon(column.path)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
