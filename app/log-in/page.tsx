import Image from "next/image";
import LoginForm from "./login-form";

export default function Login() {
  return (
    <div className="grid w-full !max-h-[calc(100dvh-65px)] grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center flex-col w-full md:px-6">
        <h2 className="text-primary">Welcome back!</h2>
        <LoginForm />
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
