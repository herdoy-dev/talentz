import Image from "next/image";
import SignupForm from "../signup-form";

export default function SignupClient() {
  return (
    <div className="grid w-full !max-h-[calc(100dvh-65px)] grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center flex-col w-full md:px-6">
        <div className="w-full mb-8">
          <h2 className="text-primary">Sign Up</h2>
          <p>Enter the details below to create an account for you</p>
        </div>
        <SignupForm role="client" />
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
