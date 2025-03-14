import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "secondary",
  className,
  onClick,
  disabled = false,
  ...rest
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
          "opacity-50 cursor-not-allowed": disabled,
        },
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
