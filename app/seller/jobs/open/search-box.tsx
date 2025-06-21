"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.key === "Enter") {
      const isExist = params.get("search");
      if (isExist && !searchText) {
        params.delete("search");
      } else {
        params.set("search", searchText);
      }
      const query = params.toString();
      return router.push("?" + query);
    }
  };

  return (
    <div className="w-full flex items-center justify-between border border-gray-400 px-4 rounded-4xl">
      <input
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="py-3 border-none focus:outline-none flex-1 w-full"
        type="text"
        placeholder="Search for..."
      />
      <IoSearchSharp className="text-xl mr-1 text-primary" />
    </div>
  );
}
