"use client";
import { ProfileCard } from "@/components/profile-card";
import { useSidebar } from "@/components/ui/sidebar";
import { MenuIcon } from "lucide-react";
import { FaRegHeart } from "react-icons/fa6";
import { FiBell } from "react-icons/fi";

export default function DashboardNav() {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="w-full h-[65px] flex items-center justify-between bg-primary-dark px-4">
      <div onClick={toggleSidebar}>
        <MenuIcon className="text-white" />
      </div>
      <div className="flex items-center gap-6 text-white">
        <FiBell className="cursor-pointer text-xl" />
        <FaRegHeart className="cursor-pointer text-xl" />
        <ProfileCard />
      </div>
    </div>
  );
}
