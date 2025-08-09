"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import DayView from "./day";
import MonthView from "./month";
import WeekView from "./week";
import { Button } from "@/components/ui/button";

export interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  time: string;
  attendees: string[];
  duration: number;
}

type ViewMode = "day" | "week" | "month";

export default function CalendarPage() {
  const [view, setView] = useState<ViewMode>("month");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const events: CalendarEvent[] = [
    {
      id: 1,
      title: "Project Meeting",
      date: new Date(2024, 3, 13),
      time: "7AM",
      attendees: ["Duff", "Tomca"],
      duration: 60,
    },
    {
      id: 2,
      title: "Team Sync",
      date: new Date(2024, 3, 13),
      time: "1PM",
      attendees: ["Duff", "Tomca", "Darron"],
      duration: 30,
    },
    {
      id: 3,
      title: "Client Discussion",
      date: new Date(), // today
      time: "1AM",
      attendees: ["You", "Client"],
      duration: 45,
    },
    {
      id: 4,
      title: "Client Discussion",
      date: new Date(), // today
      time: "6AM",
      attendees: ["You", "Client"],
      duration: 45,
    },
    {
      id: 5,
      title: "Client Discussion",
      date: new Date(), // today
      time: "11AM",
      attendees: ["You", "Client"],
      duration: 45,
    },
  ];

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setDate(newDate.getDate() + (direction === "prev" ? -1 : 1));
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + (direction === "prev" ? -7 : 7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "prev" ? -1 : 1));
    }
    setCurrentDate(newDate);
  };

  const formatDateHeader = () => {
    if (view === "day") {
      return currentDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } else if (view === "week") {
      const start = new Date(currentDate);
      start.setDate(start.getDate() - start.getDay());
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    }
    return currentDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <h1 className="text-2xl mb-3 font-bold">Calendar</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateDate("prev")}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-medium">{formatDateHeader()}</span>
            <button
              onClick={() => navigateDate("next")}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {(["day", "week", "month"] as ViewMode[]).map((mode) => (
            <Button
              key={mode}
              onClick={() => setView(mode)}
              variant="outline"
              size="sm"
              className={`px-4 py-2 ${
                view === mode ? "bg-primary text-white md:px-5" : "bg-white"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Views */}
      {view === "day" && <DayView date={currentDate} events={events} />}
      {view === "week" && <WeekView date={currentDate} events={events} />}
      {view === "month" && <MonthView date={currentDate} events={events} />}
    </div>
  );
}
