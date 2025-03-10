"use client";

import { buttonVariants } from "@/components/ui/button";
import { Avatar, Container, Flex } from "@radix-ui/themes";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const { status, data } = useSession();

  return (
    <>
      <nav className="bg-primary h-[70px] p-3 mb-4 fixed top-0 w-full z-50 flex items-center justify-center">
        <Container size="4">
          <div className="flex items-center justify-between">
            {/* Logo & Desktop Links */}
            <div className="flex gap-6 text-white text-[13px]">
              <Link href="/">
                <Image src="/logo.png" width={133} height={29} alt="logo" />
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="#how-we-work" prefetch={false}>
                  How We Work
                </Link>
                <Link href="#why-choose-us" prefetch={false}>
                  Why Choose Us
                </Link>
                <Link href="#testimonials" prefetch={false}>
                  What Our Users Say
                </Link>
                <Link href="#contact" prefetch={false}>
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Desktop Auth Buttons */}
            {status === "unauthenticated" && (
              <>
                {" "}
                <div className="hidden md:flex space-x-4">
                  <Link
                    href="/login"
                    className={`${buttonVariants({
                      variant: "link",
                    })} text-white`}
                  >
                    Log In
                  </Link>
                  <Link href="/signup" className={`${buttonVariants()} px-8`}>
                    Sign Up
                  </Link>
                </div>{" "}
              </>
            )}

            {status === "authenticated" && (
              <Flex align="center" gap="3">
                <Avatar
                  size="3"
                  radius="full"
                  src={data.user.image}
                  fallback={data.user.name}
                />
                <div
                  className="text-gray-200 cursor-pointer"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Log Out
                </div>
              </Flex>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </Container>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col text-white text-[13px] gap-7 pt-8">
            <Link
              href="#how-we-work"
              prefetch={false}
              onClick={() => setIsOpen(false)}
            >
              How We Work
            </Link>
            <Link
              href="#why-choose-us"
              prefetch={false}
              onClick={() => setIsOpen(false)}
            >
              Why Choose Us
            </Link>
            <Link
              href="#testimonials"
              prefetch={false}
              onClick={() => setIsOpen(false)}
            >
              What Our Users Say
            </Link>
            <Link
              href="#contact"
              prefetch={false}
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              href="/signup"
              className={buttonVariants()}
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className={`${buttonVariants({ variant: "link" })} text-white`}
              onClick={() => setIsOpen(false)}
            >
              Log In
            </Link>
          </div>
        )}
      </nav>

      {/* Keeps Layout Consistent Without Extra Empty Div */}
      <div className="h-[70px]"></div>
    </>
  );
};

export default Navbar;
