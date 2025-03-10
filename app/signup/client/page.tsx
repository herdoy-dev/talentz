import { Flex, Grid } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import { SignupForm } from "../signup-form";

export default function Client() {
  return (
    <Grid
      columns={{ initial: "1", md: "2" }}
      gap="4"
      className="w-full max-w-7xl mx-auto p-4"
      align="center"
      justify="center"
    >
      {/* Signup Form Section */}
      <div className="w-full max-w-md mx-auto">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
          <p className="text-gray-600">
            Enter the details below to create an account for you
          </p>
        </div>

        <SignupForm role="CLIENT" />

        {/* Social Signup Section */}
        <div className="my-6">
          <Flex align="center" justify="between" gap="3">
            <div className="flex-1 h-px bg-gray-300" />
            <p className="text-sm text-gray-500">or Sign Up with</p>
            <div className="flex-1 h-px bg-gray-300" />
          </Flex>

          <Flex align="center" justify="between" gap="4" className="my-6">
            <button
              className="w-full flex items-center justify-center p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Sign up with Google"
            >
              <FcGoogle className="text-2xl" />
            </button>
            <button
              className="w-full flex items-center justify-center p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Sign up with Facebook"
            >
              <FaFacebook className="text-2xl text-blue-600" />
            </button>
            <button
              className="w-full flex items-center justify-center p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Sign up with Apple"
            >
              <IoLogoApple className="text-2xl text-gray-800" />
            </button>
          </Flex>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-8">
          Are you already registered?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
      {/* Illustration Section */}
      <div className="hidden md:block">
        <Image
          src="/signup_b.png"
          width={500}
          height={500}
          alt="Signup Illustration"
          className="w-full h-auto"
          priority
        />
      </div>
    </Grid>
  );
}
