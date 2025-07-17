import DashboardLayout from "@/components/dashboard-layout";
import { PropsWithChildren } from "react";
import { FaGear, FaMoneyCheckDollar } from "react-icons/fa6";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";

const items = [
  { id: 1, label: "Dashboard", path: "/seller", icon: <RiDashboardLine /> },
  {
    id: 2,
    label: "Job Management",
    path: "/seller/jobs",
    icon: <IoBriefcaseOutline />,
  },
  {
    id: 4,
    label: "Messages",
    path: "/seller/messages",
    icon: <MdOutlineMessage />,
  },
  {
    id: 6,
    label: "Earnings",
    path: "/seller/earnings",
    icon: <FaMoneyCheckDollar />,
  },
  {
    id: 7,
    label: "Settings",
    path: "/seller/settings",
    icon: <FaGear />,
  },
];

export default function BuyerLayout({ children }: PropsWithChildren) {
  return <DashboardLayout navItems={items}>{children}</DashboardLayout>;
}
