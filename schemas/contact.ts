export interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  createdAt: Date;
}

export interface ContactResponse {
  result: Contact[];
  count: number;
  pagination: {
    currentPage: number;
    pageCount: number;
    pageSize: number;
  };
}
