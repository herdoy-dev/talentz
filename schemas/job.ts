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
  createdAt: string;
}

export interface JobResponse {
  result: Job[];
  count: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
}
