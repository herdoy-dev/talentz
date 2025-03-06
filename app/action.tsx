import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Action() {
  return (
    <div className="h-[350px] bg-[url('/caction.png')] bg-cover bg-no-repeat rounded-4xl overflow-hidden my-12 p-4 md:p-8">
      <div className="w-full h-full flex items-center justify-center flex-col">
        <h1 className="!text-[#E2F397] text-2xl md:text-3xl lg:text-4xl text-center mb-4">
          Ready to Start Your Journey?
        </h1>
        <div className="flex items-center justify-center flex-col gap-6 md:gap-8">
          <p className="!text-white text-center text-sm md:text-base lg:text-lg max-w-[700px]">
            Whether you&apos;re looking to hire the best talent or showcase your
            skills to the world, we&apos;re here for you. Sign up today and take
            the first step towards achieving your goals!
          </p>
          <div className="flex flex-col md:flex-row gap-4 w-full max-w-[300px] md:max-w-[400px]">
            <Link
              className={`${buttonVariants()} w-full md:w-auto text-center`}
              href="/"
            >
              Join as a Freelancer
            </Link>
            <Link
              className={`${buttonVariants()} w-full md:w-auto text-center`}
              href="/"
            >
              Hire a Freelancer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
