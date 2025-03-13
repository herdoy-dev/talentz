import { IoSearchSharp } from "react-icons/io5";

export default function SearchBoxPandingPage() {
  return (
    <div className="flex items-center justify-between border px-4 rounded-4xl">
      <IoSearchSharp className="text-xl mr-1 text-primary" />
      <input
        className="py-2 border-none focus:outline-none flex-1"
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
