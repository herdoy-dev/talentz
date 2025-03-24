import getToken from "@/actions/get-token";
import { useEffect, useState } from "react";

const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const abortcontroller = new AbortController();
    const fetchToken = async () => {
      try {
        const data = await getToken();
        setToken(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchToken();
    return () => abortcontroller.abort();
  }, []);

  return { token };
};

export default useToken;
