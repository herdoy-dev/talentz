import { FaSearch } from "react-icons/fa";

export default function SearchBox() {
  return (
    <div className="flex items-center rounded-4xl border border-primary justify-between pr-2 md:min-w-[400px]">
      <input
        type="text"
        className="flex-1 outline-none border-none focus:outline-none px-2 py-2"
        placeholder="Search"
      />
      <FaSearch />
    </div>
  );
}
