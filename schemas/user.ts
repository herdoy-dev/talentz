export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  walletBalance: number;
  email: string;
  role: string;
  createdAt: Date;
}

export interface UsersResponse {
  result: User[];
  count: number;
  pagination: {
    currentPage: number;
    pageCount: number;
    pageSize: number;
  };
}
