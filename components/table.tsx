import Column from "@/schemas/column";
import TableBody from "./table-body";
import TableHead from "./table-head";

interface Props<T> {
  columns: Column<T>[];
  onClick: (collumn: keyof T) => void;
  currentOrder: "asc" | "desc";
  orderBy: string;
  data: T[];
}

const Table = <T extends { _id?: string | number }>({
  columns,
  data,
  currentOrder,
  orderBy,
  onClick,
}: Props<T>) => {
  return (
    <table className="w-full table">
      <TableHead
        columns={columns}
        onClick={onClick}
        currentOrder={currentOrder}
        orderBy={orderBy}
      />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
