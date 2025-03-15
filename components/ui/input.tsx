import { InputHTMLAttributes } from "react";
import Text from "./text";

type InputProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, error, ...rest }: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={label} className="block mb-1 text-sm font-medium">
          {label}
        </label>
      )}
      <input
        className="p-2 rounded-md border-[1.5px] border-primary focus:outline-none w-full"
        id={label}
        placeholder={label}
        {...rest}
      />
      {error && <Text className="text-red-500"> {error} </Text>}
    </div>
  );
}
