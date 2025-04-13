import { ProfileCard } from "@/components/profile-card";
import Container from "@/components/ui/container";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa6";
import { FiBell } from "react-icons/fi";

export default function SellerNavbar() {
  return (
    <div className="w-full bg-primary">
      <Container className="h-[65px] flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={120} height={40} priority />
        </Link>
        <div className="flex items-center gap-6 text-white">
          <FiBell className="cursor-pointer text-xl" />
          <FaRegHeart className="cursor-pointer text-xl" />
          <ProfileCard />
        </div>
      </Container>
    </div>
  );
}
