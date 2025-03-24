export default interface Session {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  role: "client" | "freelancer" | "admin";
}
