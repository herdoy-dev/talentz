import { ReactNode } from "react";

export default interface Column<T> {
  _id: number;
  path: keyof T;
  label: string;
  content?: (contact: T) => ReactNode;
}
