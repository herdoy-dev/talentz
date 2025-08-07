"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function VerificationSubmitted() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100dvh-70px)] p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-50 mb-6">
          <CheckCircle
            className="h-10 w-10 text-green-500"
            aria-hidden="true"
          />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Verification Submitted Successfully
        </h3>

        <p className="text-gray-600 mb-8 !text-sm">
          Your identity verification request has been submitted successfully.
          Our team will review your documents shortly.
        </p>

        <div className="space-y-4">
          <Link
            href="/profile"
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full py-6 text-base font-medium"
            )}
          >
            Complete Your Profile
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Need help?{" "}
          <Link
            href="/contact"
            className="text-primary hover:underline font-medium"
          >
            Contact support
          </Link>
        </p>
      </div>
    </main>
  );
}
