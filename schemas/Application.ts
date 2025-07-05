export default interface Application {
  _id: string;
  message: string;
  jobId: string;
  buyer: string;
  attachments: string[];
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
