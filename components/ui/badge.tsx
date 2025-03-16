import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  variant?: "gray" | "primary" | "secondary";
  className?: string;
  children?: ReactNode;
}

export default function Badge({ variant, className, children }: Props) {
  return (
    <div
      className={cn(
        "py-1 px-2 text-[10px] flex items-center bg-primary justify-center rounded-md text-white",
        variant === "gray" && "bg-gray",
        variant === "primary" && "bg-primary",
        variant === "secondary" && "bg-secondary",
        className
      )}
    >
      {children}
    </div>
  );
}
