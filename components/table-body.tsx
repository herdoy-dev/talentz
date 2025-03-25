import Column from "@/schemas/column";
import _ from "lodash";
import { ReactNode } from "react";

interface Props<T> {
  columns: Column<T>[];
  data: T[];
}

const TableBody = <T extends { _id?: string | number }>({
  columns,
  data,
}: Props<T>) => {
  const renderCell = (item: T, column: Column<T>) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path) as ReactNode;
  };

  return (
    <tbody>
      {data.map((item, rowIndex) => (
        <tr key={item._id ?? rowIndex}>
          {columns.map((column) => (
            <td key={column._id}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
