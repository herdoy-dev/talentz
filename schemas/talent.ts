export interface Talent {
  _id: string;
  firstName: string;
  lastName: string;
  title: string;
  skills: string[];
  location: string;
  languages: string[];
  about: string;
  image: string;
  role: string;
  createdAt: Date;
}

export interface TalentsResponse {
  result: Talent[];
  count: number;
  pagination: {
    currentPage: number;
    pageCount: number;
    pageSize: number;
  };
}
