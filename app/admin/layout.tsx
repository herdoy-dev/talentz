import DashboardLayout from "@/components/dashboard-layout";
import { Component } from "lucide-react";
import { PropsWithChildren } from "react";
import { BsChatRightDotsFill } from "react-icons/bs";
import { FaGear, FaMoneyBillTransfer } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { HiUsers } from "react-icons/hi";
import { IoBriefcase } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

const items = [
  { id: 1, label: "Dashboard", path: "/admin", icon: <MdDashboard /> },
  { id: 2, label: "Salse", path: "/admin/salse", icon: <GoGraph /> },
  {
    id: 10,
    label: "Withdraws",
    path: "/admin/withdraws",
    icon: <FaMoneyBillTransfer />,
  },
  { id: 3, label: "Users", path: "/admin/users", icon: <HiUsers /> },
  { id: 4, label: "Jobs", path: "/admin/jobs", icon: <IoBriefcase /> },
  {
    id: 6,
    label: "Categorys",
    path: "/admin/categorys",
    icon: <Component />,
  },
  {
    id: 5,
    label: "Messages",
    path: "/admin/messages",
    icon: <BsChatRightDotsFill />,
  },
  {
    id: 7,
    label: "Settings",
    path: "/admin/settings",
    icon: <FaGear />,
  },
];

export default function AdminLayout({ children }: PropsWithChildren) {
  return <DashboardLayout navItems={items}>{children}</DashboardLayout>;
}
