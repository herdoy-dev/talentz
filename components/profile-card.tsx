"use client";
import { logout } from "@/actions/logout";
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
import { BiSolidChevronDown } from "react-icons/bi";
import { BsShieldLock } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import {
  IoMdHelpCircleOutline,
  IoMdNotificationsOutline,
  IoMdRemoveCircleOutline,
} from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineAccountBalanceWallet, MdOutlineStars } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import Avatar from "./ui/avatar";
import Text from "./ui/text";

export function ProfileCard() {
  const { data: user } = useMe();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-1 bg-[#FFFFFF4D] p-1 pr-2 rounded-2xl cursor-pointer">
          <Avatar
            src={user.image ? user.image : "me.jpg"}
            alt="me"
            className="!w-6 !h-6"
          />
          <BiSolidChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-65 bg-white border-none overflow-hidden">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2 mb">
            <Avatar
              src={user.image ? user.image : "me.jpg"}
              alt="me"
              className="!w-10 !h-10"
            />
            <div>
              <Text>
                {user.firstName} {user.lastName}
              </Text>
              <Text variant="gray" size="small">
                {user.email}
              </Text>
            </div>
          </div>
          <hr className="text-gray-300 mt-2" />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <FaRegUserCircle />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TiDocumentText />
            My Portfolios
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MdOutlineAccountBalanceWallet />
            Wallet
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BsShieldLock />
            Password
          </DropdownMenuItem>
          <hr className="text-gray-300" />
          <DropdownMenuItem className="py-4">
            <MdOutlineStars />
            Royalty Program
          </DropdownMenuItem>
          <hr className="text-gray-300" />
          <DropdownMenuItem>
            <IoMdNotificationsOutline />
            Notification Settings
          </DropdownMenuItem>
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
          onClick={() => handleLogout()}
          className="flex items-center justify-center py-4 hover:bg-gray-200"
        >
          Log out
          <IoExitOutline />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
