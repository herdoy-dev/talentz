export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "client" | "freelancer" | "admin";
  createdAt: string;
}

export interface UsersResponse {
  result: User[];
  count: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
}
