import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

export default function Button({
  children,
  variant = "secondary",
  className,
}: ButtonProps) {
  return (
    <button
      className={cn(
        "py-2 px-5 outline-none focus:outline-none cursor-pointer rounded-4xl text-[16px]",
        {
          "bg-primary text-white border-none": variant === "primary",
          "bg-secondary text-white border-none": variant === "secondary",
          "bg-transparent text-primary border-2 border-primary":
            variant === "outline",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
