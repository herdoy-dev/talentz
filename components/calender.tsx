"use client";

import * as React from "react";

import { Calendar as ThemedCalendar } from "@/components/ui/calendar";

export function Calendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <ThemedCalendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="!rounded-3xl border shadow-sm w-full"
      captionLayout="dropdown"
    />
  );
}
