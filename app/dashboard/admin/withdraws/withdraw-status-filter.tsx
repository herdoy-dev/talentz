"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface StatusOption {
  label: string;
  value: string;
}

const STATUS_OPTIONS: StatusOption[] = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Failed", value: "FAILED" },
];

const DEFAULT_PLACEHOLDER = "Filter by status";

export const WithdrawStatusFilter: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentStatus = searchParams.get("status") || "";

  const handleStatusChange = (selectedValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedValue) {
      params.set("status", selectedValue);
    } else {
      params.delete("status");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="min-w-[180px]">
      <Select value={currentStatus} onValueChange={handleStatusChange}>
        <SelectTrigger aria-label="Filter jobs by status">
          <SelectValue placeholder={DEFAULT_PLACEHOLDER} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Job Status</SelectLabel>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="capitalize"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default WithdrawStatusFilter;
