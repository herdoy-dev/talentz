"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";

export default function SearchBox() {
  const router = useRouter();
  const [text, setText] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!text) return toast.error("Type Something.");
      router.push(`/jobs?search=${text}`);
    }
  };

  return (
    <div className="w-full flex items-center justify-between border border-gray-400 px-4 rounded-4xl">
      <IoSearchSharp className="text-xl mr-1 text-primary" />
      <input
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="py-3 border-none focus:outline-none flex-1 w-full"
        type="text"
        placeholder="Search for..."
      />
      <div className="h-[20px] w-[2px] md:w-[1.5px] bg-dark" />
      <select className="border-none focus:outline-none px-1" name="" id="">
        <option value="a">Job</option>
        <option value="a">Talent</option>
      </select>
    </div>
  );
}
