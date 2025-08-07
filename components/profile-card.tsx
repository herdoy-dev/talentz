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
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { VscVerified } from "react-icons/vsc";
import Text from "./ui/text";

export function ProfileCard() {
  const { data: user } = useMe();
  if (!user) return null;

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
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/verify/identity">
            <DropdownMenuItem>
              <VscVerified />
              Identity Verification
            </DropdownMenuItem>
          </Link>
          <Link href="/profile">
            <DropdownMenuItem>
              <FaRegUserCircle />
              Profile
            </DropdownMenuItem>
          </Link>

          <Link href="/dashboard">
            <DropdownMenuItem>
              <GrAppsRounded />
              Dashboard
            </DropdownMenuItem>
          </Link>

          {user.data.role === "freelancer" && (
            <Link href="/dashboard/seller/earnings">
              <DropdownMenuItem>
                <MdOutlineAccountBalanceWallet />
                Wallet
              </DropdownMenuItem>
            </Link>
          )}
          <Link href="/dashboard/settings">
            <DropdownMenuItem>
              <BsShieldLock />
              Password
            </DropdownMenuItem>
          </Link>
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
