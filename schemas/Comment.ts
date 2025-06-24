export default interface Comment {
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
