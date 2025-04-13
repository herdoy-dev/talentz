import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";
import Text from "./text";

type InputProps = {
  label?: string;
  error?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  error,
  className,
  ...rest
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={label} className="block mb-1 text-sm font-medium">
          {label}
        </label>
      )}
      <input
        className={cn(
          "p-2 rounded-md border border-primary focus:outline-none w-full",
          className
        )}
        id={label}
        placeholder={label}
        {...rest}
      />
      {error && <Text className="text-red-500"> {error} </Text>}
    </div>
  );
}
