"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";

type SearchOption = {
  id: string;
  option: string;
  value: string;
};

const searchOptions: SearchOption[] = [
  { id: "1", option: "Jobs", value: "job" },
  { id: "2", option: "Talents", value: "talent" },
];

export default function SearchBox() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("job");

  const handleSearch = () => {
    if (!searchText.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    const route = searchType === "job" ? "/jobs" : "/talents";
    router.push(`${route}?search=${encodeURIComponent(searchText)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };

  return (
    <div className="w-full flex items-center justify-between border border-gray-300 px-4 rounded-full hover:border-gray-400 transition-colors duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
      <div className="flex items-center flex-1">
        <IoSearchSharp className="text-xl mr-2 text-gray-500" />
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="py-3 border-none focus:outline-none flex-1 w-full text-gray-700 placeholder-gray-400"
          type="text"
          placeholder="Search for jobs or talents..."
          aria-label="Search input"
        />
      </div>

      <div className="h-5 w-px bg-gray-300 mx-2" />

      <select
        value={searchType}
        onChange={handleOptionChange}
        className="border-none focus:outline-none px-2 py-1 text-gray-700 bg-transparent cursor-pointer"
        aria-label="Search type selector"
      >
        {searchOptions.map((option) => (
          <option key={option.id} value={option.value}>
            {option.option}
          </option>
        ))}
      </select>
    </div>
  );
}
