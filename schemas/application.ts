export interface Application {
  _id: string;
  message: string;
  jobId: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  files?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GetApplicationResponse {
  result: Application[];
  count: number;
}
