import Category from "./Category";
import User from "./User";

export default interface Job {
  _id: string;
  author: User;
  title: string;
  category: Category;
  type: "fixed" | "hourly";
  jobSize: "large" | "medium" | "small";
  description: string;
  createdAt: Date;
}
