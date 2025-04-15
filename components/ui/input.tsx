import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "p-2 rounded-md border border-primary focus:outline-none w-full",
        className
      )}
      {...props}
    />
  );
}

export { Input };
