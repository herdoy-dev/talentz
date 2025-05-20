"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBriefcaseOutline } from "react-icons/io5";
import { LuSearchCode } from "react-icons/lu";
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
    id: 3,
    label: "Talents",
    path: "/seller/talents",
    icon: <LuSearchCode />,
  },
  {
    id: 4,
    label: "Messages",
    path: "/seller/messages",
    icon: <MdOutlineMessage />,
  },
];

export default function BuyerSidebar() {
  const currentPath = usePathname();
  return (
    <aside className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
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
