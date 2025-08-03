"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useMe from "@/hooks/useMe";
import { Avatar } from "@radix-ui/themes";
import Cookies from "js-cookie";
import Link from "next/link";
import { BiSolidChevronDown } from "react-icons/bi";
import { BsShieldLock } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { GrAppsRounded } from "react-icons/gr";
import {
  IoMdHelpCircleOutline,
  IoMdNotificationsOutline,
  IoMdRemoveCircleOutline,
} from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineAccountBalanceWallet, MdOutlineStars } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import Text from "./ui/text";

export function ProfileCard() {
  const { data: user } = useMe();
  if (!user) return null;
  const setProfileUrl = (role: string) => {
    if (role === "admin") return "/profile-admin";
    else if (role === "client") return "/profile-buyer";
    return "/profile-seller";
  };

  const setSettingUrl = (role: string) => {
    if (role === "admin") return "/admin/settings";
    else if (role === "client") return "/buyer/settings";
    return "/seller/settings";
  };

  const setDashboardUrl = (role: string) => {
    if (role === "admin") return "/admin";
    else if (role === "client") return "/buyer";
    return "/seller";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-1 bg-[#ffffff83] p-1 pr-2 rounded-2xl cursor-pointer">
          <Avatar
            src={user.data.image}
            fallback="me"
            className="!w-6 !h-6"
            radius="full"
          />
          {user.data.role === "freelancer" && user.data.walletBalance > 0 && (
            <h5 className="font-semibold text-primary-dark">
              ${user.data.walletBalance}
            </h5>
          )}
          <BiSolidChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-65 bg-white border-none overflow-hidden">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2 mb">
            <Avatar
              src={user.data.image ? user.data.image : "/me.jpg"}
              fallback="me"
              className="!w-10 !h-10"
            />
            <div>
              <Text>
                {user.data.firstName} {user.data.lastName}
              </Text>
              <Text variant="gray" size="small">
                {user.data.email}
              </Text>
            </div>
          </div>
          <hr className="text-gray-300 mt-2" />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={setProfileUrl(user.data.role)}>
            <DropdownMenuItem>
              <FaRegUserCircle />
              Profile
            </DropdownMenuItem>
          </Link>

          <Link href={setDashboardUrl(user.data.role)}>
            <DropdownMenuItem>
              <GrAppsRounded />
              Dashboard
            </DropdownMenuItem>
          </Link>

          {user.data.role === "freelancer" && (
            <Link href="/profile-seller/portfolios">
              <DropdownMenuItem>
                <TiDocumentText />
                My Portfolios
              </DropdownMenuItem>
            </Link>
          )}
          {user.data.role === "freelancer" && (
            <Link href="/seller/earnings">
              <DropdownMenuItem>
                <MdOutlineAccountBalanceWallet />
                Wallet
              </DropdownMenuItem>
            </Link>
          )}
          <Link href={setSettingUrl(user.data.role)}>
            <DropdownMenuItem>
              <BsShieldLock />
              Password
            </DropdownMenuItem>
          </Link>
          <hr className="text-gray-300" />
          <DropdownMenuItem className="py-4">
            <MdOutlineStars />
            Royalty Program
          </DropdownMenuItem>
          <hr className="text-gray-300" />
          <Link href={setSettingUrl(user.data.role)}>
            <DropdownMenuItem>
              <IoMdNotificationsOutline />
              Notification Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <IoMdHelpCircleOutline />
            Help
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IoMdRemoveCircleOutline />
            Deactivate Account
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <hr className="text-gray-300" />
        <DropdownMenuItem
          onClick={async () => {
            try {
              Cookies.remove("token");
              window.location.href = "/";
            } catch (error) {
              console.log(error);
            }
          }}
          className="flex items-center justify-center py-4 hover:bg-gray-200"
        >
          Log out
          <IoExitOutline />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
