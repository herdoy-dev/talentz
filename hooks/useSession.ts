import getSession from "@/actions/get-session";
import Session from "@/schemas/session";
import { useEffect, useState } from "react";

const useSession = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const abortcontroller = new AbortController();
    const fetchSession = async () => {
      try {
        setLoading(true);
        const data = await getSession();
        setSession(data);
      } catch (error) {
        setError("Invalid Session");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
    return () => abortcontroller.abort();
  }, []);

  return { session, loading, error };
};

export default useSession;
