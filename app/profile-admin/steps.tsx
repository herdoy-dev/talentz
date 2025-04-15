"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Step {
  id: number;
  label: string;
  url: string;
}

interface Props {
  steps: Step[];
}

export default function Steps({ steps }: Props) {
  const currentPath = usePathname();
  return (
    <div className="flex flex-col">
      {steps.map((step) => (
        <div
          key={step.id}
          className={cn(
            "flex items-start gap-2 pb-12",
            steps.length !== step.id && "border-l-2 border-gray-300"
          )}
        >
          <div
            className={cn(
              "-ml-[10px] w-5 h-5 bg-primary/50 flex items-center justify-center rounded-full text-white text-xs font-semibold",
              step.url === currentPath && "bg-primary"
            )}
          >
            {step.id}
          </div>
          <div className="flex-1 -mt-1">
            <Link href={step.url} className="text-primary">
              {step.label}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
