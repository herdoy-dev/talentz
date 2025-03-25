export interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface ContactResponse {
  result: Contact[];
  count: number;
  pagination: {
    count: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
