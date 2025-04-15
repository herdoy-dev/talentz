import Image from "next/image";
import LoginForm from "./login-form";
import Link from "next/link";

export default function Login() {
  return (
    <div className="grid w-full !max-h-[calc(100dvh-65px)] grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center flex-col w-full md:px-6">
        <h2 className="text-primary">Welcome back!</h2>
        <LoginForm />
        <div className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary underline">
            Sign Up here
          </Link>
        </div>
      </div>
      <div className="hidden md:block">
        <Image
          src="/login_page_illustration.png"
          width={600}
          height={900}
          className="w-full !max-h-[calc(100dvh-65px)] object-cover"
          alt="Illustration"
        />
      </div>
    </div>
  );
}
