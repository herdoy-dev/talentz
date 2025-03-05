"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Container } from "@radix-ui/themes";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <nav className="bg-primary p-3 mb-4 fixed top-0 w-full z-50">
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
            <div className="hidden md:flex space-x-4">
              <Link
                href="/login"
                className={`${buttonVariants({ variant: "link" })} text-white`}
              >
                Log In
              </Link>
              <Link href="/signup" className={`${buttonVariants()} px-8`}>
                Sign Up
              </Link>
            </div>

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
