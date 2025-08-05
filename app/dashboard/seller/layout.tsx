import { PropsWithChildren } from "react";
import { FaGear, FaMoneyCheckDollar } from "react-icons/fa6";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import DashboardLayout from "../_components/dashboard-layout";

const items = [
  {
    id: 1,
    label: "Dashboard",
    path: "/dashboard/seller",
    icon: <RiDashboardLine />,
  },
  {
    id: 2,
    label: "Job Management",
    path: "/dashboard/seller/jobs",
    icon: <IoBriefcaseOutline />,
  },
  {
    id: 4,
    label: "Messages",
    path: "/dashboard/seller/messages",
    icon: <MdOutlineMessage />,
  },
  {
    id: 6,
    label: "Earnings",
    path: "/dashboard/seller/earnings",
    icon: <FaMoneyCheckDollar />,
  },
  {
    id: 7,
    label: "Settings",
    path: "/dashboard/seller/settings",
    icon: <FaGear />,
  },
];

export const dynamic = "force-dynamic";

export default function BuyerLayout({ children }: PropsWithChildren) {
  return <DashboardLayout navItems={items}>{children}</DashboardLayout>;
}
