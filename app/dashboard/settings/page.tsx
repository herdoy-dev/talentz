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
      redirect("/dashboard/admin/settings");
    case "client":
      redirect("/dashboard/buyer/settings");
    case "freelancer":
      redirect("/dashboard/seller/settings");
    default:
      return <div>Unauthorized access</div>;
  }
}

export default Profile;
