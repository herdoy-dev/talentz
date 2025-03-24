import axios from "axios";

const apiClient = (token?: string) =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    headers: {
      "x-auth-token": token,
    },
  });

export default apiClient;
