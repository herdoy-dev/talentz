import getSession from "@/actions/get-session";
import Session from "@/schemas/session";
import { useEffect, useState } from "react";

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const data = await getSession();
      setSession(data);
    };
    fetchSession();
  }, []);

  return { session };
};

export default useSession;
