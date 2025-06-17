"use client";
import { cn } from "@/lib/utils";
import { Component } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsChatRightDotsFill } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { HiUsers } from "react-icons/hi";
import { IoBriefcase } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

const items = [
  { id: 1, label: "Dashboard", path: "/admin", icon: <MdDashboard /> },
  { id: 2, label: "Salse", path: "/admin/salse", icon: <GoGraph /> },
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
];

export default function AdminSidebar() {
  const currentPath = usePathname();
  return (
    <aside className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          {/* Sidebar content */}
          <nav className="flex-1 space-y-1">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className={cn(
                  "group flex items-center px-2 gap-2 py-4 text-sm font-medium text-primary-dark hover:bg-[#AAEBCA4D] hover:text-gray-900",
                  currentPath === item.path && "bg-[#AAEBCA4D]"
                )}
              >
                <div className="text-xl text-primary-dark">{item.icon}</div>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
