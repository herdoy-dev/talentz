import getSession from "@/actions/get-session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function Profile() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  switch (session.role) {
    case "admin":
      redirect("/profile/admin");
    case "client":
      redirect("/profile/buyer");
    case "freelancer":
      redirect("/profile/seller");
    default:
      return <div>Unauthorized access</div>;
  }
}

export default Profile;
