import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "py-2 px-5 outline-none focus:outline-none cursor-pointer rounded-4xl text-[16px]",
  {
    variants: {
      variant: {
        default: "bg-secondary text-white border-none disabled:bg-secondary/50",
        accent: "bg-red-500 text-white border-none disabled:bg-red-500/50",
        outline: "bg-transparent text-primary border-2 border-primary",
        secondary:
          "bg-secondary text-white border-none disabled:bg-secondary/50",
        primary: "bg-primary text-white border-none disabled:bg-primary/50",
        ghost:
          "hover:bg-gray hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-2 has-[>svg]:px-3",
        sm: "!py-1 px-3 has-[>svg]:px-2.5",
        lg: "px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
