export default interface Notification {
  _id: string;
  title: string;
  description: string;
  status: "Read" | "Unread";
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
}
