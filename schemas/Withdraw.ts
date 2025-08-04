import { PaymentMethod } from "./PaymentMethod";

export default interface Withdraw {
  _id: string;
  amount: number;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  paymentMethod: PaymentMethod;
  status: "PENDING" | "COMPLETED" | "FAILED";
  createdAt: Date;
}
