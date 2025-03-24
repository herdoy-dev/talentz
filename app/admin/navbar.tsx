import Avatar from "@/components/ui/avatar";
import Container from "@/components/ui/container";
import Image from "next/image";
import Link from "next/link";
import { BiSolidChevronDown } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa6";
import { FiBell } from "react-icons/fi";

export default function AdminNavbar() {
  return (
    <div className="w-full bg-primary">
      <Container className="h-[65px] flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={120} height={40} priority />
        </Link>
        <div className="flex items-center gap-6 text-white">
          <FiBell className="cursor-pointer text-xl" />
          <FaRegHeart className="cursor-pointer text-xl" />
          <div className="flex items-center gap-1 bg-[#FFFFFF4D] p-1 pr-2 rounded-2xl cursor-pointer">
            <Avatar src="/me.jpg" alt="me" className="!w-6 !h-6" />
            <BiSolidChevronDown />
          </div>
        </div>
      </Container>
    </div>
  );
}
