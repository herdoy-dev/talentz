export interface Comment {
  _id: string;
  message: string;
  jobId: string;
  author: {
    firstName: string;
    lastName: string;
    image: string;
  };
  files?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GetCommentsResponse {
  result: Comment[];
  count: number;
}
