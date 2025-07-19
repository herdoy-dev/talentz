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
      className="border-none w-full"
      captionLayout="dropdown"
    />
  );
}
