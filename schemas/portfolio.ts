export default interface Portfolio {
  _id: string;
  userId: string;
  title: string;
  image: string;
  description: string;
  role: string;
  skills: [string];
}
