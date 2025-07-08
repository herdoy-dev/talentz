export default interface Withdraw {
  _id: string;
  amount: number;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  paymentMethod: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  createdAt: Date;
}
