import { Category } from "./category";
import { User } from "./user";

export interface Job {
  _id: string;
  author: User;
  title: string;
  category: Category;
  type: "fixed" | "hourly";
  jobSize: "large" | "medium" | "small";
  description: string;
  createdAt: Date;
}

export interface JobResponse {
  result: Job[];
  count: number;
  pagination: {
    currentPage: number;
    pageCount: number;
    pageSize: number;
  };
}
