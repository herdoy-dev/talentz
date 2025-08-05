import getSession from "@/actions/get-session";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { FaGear } from "react-icons/fa6";
import { IoBriefcaseOutline } from "react-icons/io5";
import { LuSearchCode } from "react-icons/lu";
import { MdOutlineMessage } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import DashboardLayout from "../_components/dashboard-layout";

const items = [
  {
    id: 1,
    label: "Dashboard",
    path: "/dashboard/buyer",
    icon: <RiDashboardLine />,
  },
  {
    id: 2,
    label: "Job Management",
    path: "/dashboard/buyer/jobs",
    icon: <IoBriefcaseOutline />,
  },
  {
    id: 3,
    label: "Talents",
    path: "/dashboard/buyer/talents",
    icon: <LuSearchCode />,
  },
  {
    id: 4,
    label: "Messages",
    path: "/dashboard/buyer/messages",
    icon: <MdOutlineMessage />,
  },
  {
    id: 6,
    label: "Settings",
    path: "/dashboard/buyer/settings",
    icon: <FaGear />,
  },
];

export const dynamic = "force-dynamic";

export default async function BuyerLayout({ children }: PropsWithChildren) {
  const session = await getSession();
  if (session && session.role !== "client") return redirect("/");
  return <DashboardLayout navItems={items}>{children}</DashboardLayout>;
}
