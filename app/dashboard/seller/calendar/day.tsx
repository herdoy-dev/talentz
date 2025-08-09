"use client";

import { CalendarEvent } from "./page";

function DayView({ date, events }: { date: Date; events: CalendarEvent[] }) {
  const dayEvents = events.filter(
    (event) => event.date.toDateString() === date.toDateString()
  );

  const parseHour = (time: string) => {
    const match = time.match(/^(\d+)(AM|PM)$/i);
    if (!match) return -1;
    let hour = parseInt(match[1], 10);
    if (match[2].toUpperCase() === "PM" && hour !== 12) hour += 12;
    if (match[2].toUpperCase() === "AM" && hour === 12) hour = 0;
    return hour;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="divide-y">
        {Array.from({ length: 24 }).map((_, hour) => {
          const timeLabel = `${hour % 12 === 0 ? 12 : hour % 12}${
            hour < 12 ? "AM" : "PM"
          }`;
          const hourEvents = dayEvents.filter(
            (event) => parseHour(event.time) === hour
          );

          return (
            <div key={hour} className="flex min-h-16">
              <div className="w-20 p-2 text-right border-r">
                <span className="text-sm text-gray-500">{timeLabel}</span>
              </div>
              <div className="flex-1">
                {hourEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-[#F7FCE0] h-full p-2 border-s-4 border-primary"
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-600">
                      {event.time} - {event.attendees.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DayView;
