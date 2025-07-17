import DashboardLayout from "@/components/dashboard-layout";
import { PropsWithChildren } from "react";
import { FaGear } from "react-icons/fa6";
import { IoBriefcaseOutline } from "react-icons/io5";
import { LuSearchCode } from "react-icons/lu";
import { MdOutlineMessage } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";

const items = [
  { id: 1, label: "Dashboard", path: "/buyer", icon: <RiDashboardLine /> },
  {
    id: 2,
    label: "Job Management",
    path: "/buyer/jobs",
    icon: <IoBriefcaseOutline />,
  },
  {
    id: 3,
    label: "Talents",
    path: "/buyer/talents",
    icon: <LuSearchCode />,
  },
  {
    id: 4,
    label: "Messages",
    path: "/buyer/messages",
    icon: <MdOutlineMessage />,
  },
  {
    id: 6,
    label: "Settings",
    path: "/buyer/settings",
    icon: <FaGear />,
  },
];

export default function BuyerLayout({ children }: PropsWithChildren) {
  return <DashboardLayout navItems={items}>{children}</DashboardLayout>;
}
