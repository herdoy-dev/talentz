"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortBy() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <select
      defaultValue="1"
      className="px-3 py-2.5 border border-gray/40 rounded-4xl outline-none focus:outline-none"
      onChange={(e) => {
        const params = new URLSearchParams(searchParams.toString());
        const isExist = params.get("orderBy");
        if (isExist && e.currentTarget.value === "1") {
          params.delete("orderBy");
        } else {
          params.set("orderBy", e.currentTarget.value);
        }
        const query = params.toString();
        router.push("?" + query);
      }}
    >
      <option value="1">Sort By</option>
      <option value="title">Title</option>
      <option value="createdAt">Date</option>
    </select>
  );
}
