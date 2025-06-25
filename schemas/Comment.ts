export default interface Comment {
  _id: string;
  message: string;
  job: {
    _id: string;
    title: string;
  };
  reqFund: number;
  reqTime: Date;
  status: "pending" | "approve" | "cancel";
  reqType: "comment" | "request_fund" | "request_time";
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}
