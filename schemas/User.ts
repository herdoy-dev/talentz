export default interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  skills?: [string];
  walletBalance: number;
  languages?: [string];
  role: "freelancer" | "client" | "admin";
  image: string;
  phone?: string;
  location?: string;
  title?: string;
  about?: string;
  createdAt: Date;
}
