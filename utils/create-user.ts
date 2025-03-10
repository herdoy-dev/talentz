import axios from "axios";

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role: "CLIENT" | "FREELANCER";
}) => {
  const response = await axios.post("/api/users", userData);
  return response.data;
};
