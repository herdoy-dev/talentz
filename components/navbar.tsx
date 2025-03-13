"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import Button from "./ui/button";
import Container from "./ui/container";

const navItems = [
  { id: 1, label: "How We Work", path: "/how-we-work" },
  { id: 2, label: "Why Choose Us", path: "/why-choose-us" },
  { id: 3, label: "What Our Users Say", path: "/what-out-users-say" },
  { id: 4, label: "Contact Us", path: "/contact" },
];

const toggleLineClasses = "h-[2px] bg-white w-[26px] transition-all";
const flexClasses = "flex items-center gap-7";

const HamburgerMenu = ({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="md:hidden flex items-center justify-center flex-col gap-[5px] cursor-pointer"
    aria-label="Toggle menu"
  >
    <div
      className={cn(
        toggleLineClasses,
        isActive && "-rotate-45 translate-x-[5px] translate-y-[7px]"
      )}
    ></div>
    <div className={cn(toggleLineClasses, isActive && "opacity-0")}></div>
    <div
      className={cn(
        toggleLineClasses,
        isActive && "rotate-45 translate-x-[5px] -translate-y-[7px]"
      )}
    ></div>
  </div>
);

const NavMenu = ({ isActive }: { isActive: boolean }) => (
  <ul
    className={cn(
      flexClasses,
      "nav-menu shadow-xl md:shadow-none transition-all",
      isActive && "nav-show"
    )}
  >
    {navItems.map((item) => (
      <li key={item.id}>
        <Link
          className="text-primary md:text-white text-[13px]"
          href={item.path}
        >
          {item.label}
        </Link>
      </li>
    ))}
    <div className="flex flex-col gap-6 items-center justify-center w-full md:hidden">
      <Link className="w-full" href="/signup">
        <Button className="py-[8px] px-8 text-[13px] w-full">Sign Up</Button>
      </Link>
      <Link
        href="/login"
        className="text-[13px] text-primary font-semibold w-full text-center"
      >
        Log In
      </Link>
    </div>
  </ul>
);

export default function Navbar() {
  const [isActive, setActive] = useState(false);
  const toggleMenu = useCallback(() => setActive((prev) => !prev), []);

  return (
    <div className="h-[65px] flex items-center justify-center bg-primary relative">
      <Container>
        <nav className="flex items-center justify-between">
          <div className={flexClasses}>
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                width={120}
                height={40}
                priority
              />
            </Link>
            <NavMenu isActive={isActive} />
          </div>
          <div className={flexClasses}>
            <div className={cn(flexClasses, "hidden md:flex")}>
              <Link href="/login" className="text-white text-[13px]">
                Log In
              </Link>
              <Link href="/signup">
                <Button className="py-[8px] px-8 text-[13px]">Sign Up</Button>
              </Link>
            </div>
            <HamburgerMenu isActive={isActive} onClick={toggleMenu} />
          </div>
        </nav>
      </Container>
    </div>
  );
}
