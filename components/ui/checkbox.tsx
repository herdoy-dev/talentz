import { cn } from "@/lib/utils";
import React from "react";

type CheckboxProps = {
  label?: string;
  className?: string;
  labelClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Checkbox({
  label,
  className,
  labelClassName,
  ...rest
}: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        className={cn(
          "w-5 h-5 border-2 border-primary rounded appearance-none checked:bg-primary checked:border-primary focus:outline-none",
          className
        )}
        {...rest}
      />
      {label && (
        <label htmlFor={rest.id} className={cn("text-[13px]", labelClassName)}>
          {label}
        </label>
      )}
    </div>
  );
}
