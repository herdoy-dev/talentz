export default interface Application {
  _id: string;
  message: string;
  jobId: string;
  buyer: string;
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
