"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

export default function BuyerSidebar() {
  const currentPath = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="px-4 bg-primary-dark h-[65px] flex items-start justify-center">
        <Image src="/logo.svg" alt="logo" width={120} height={50} priority />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link
                      key={item.id}
                      href={item.path}
                      className={cn(
                        "group flex items-center px-2 gap-2 py-8 text-sm font-medium text-primary-dark hover:bg-[#AAEBCA4D] hover:text-gray-900",
                        currentPath === item.path && "bg-[#AAEBCA4D]"
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
