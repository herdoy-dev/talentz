"use client";
import { CalendarEvent } from "./page";

function WeekView({ date, events }: { date: Date; events: CalendarEvent[] }) {
  const startDate = new Date(date);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  const days = Array.from({ length: 7 }).map((_, i) => {
    const day = new Date(startDate);
    day.setDate(day.getDate() + i);
    return day;
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-7 border-b">
        {days.map((day) => (
          <div key={day.toISOString()} className="p-2 text-center">
            <div className="text-sm text-gray-500">
              {day.toLocaleDateString("en-US", { weekday: "short" })}
            </div>
            <div
              className={`mx-auto w-8 h-8 flex items-center justify-center rounded-full ${
                day.toDateString() === new Date().toDateString()
                  ? "bg-primary text-white"
                  : ""
              }`}
            >
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Week Body */}
      <div className="grid grid-cols-7 divide-x">
        {days.map((day) => {
          const dayEvents = events.filter(
            (event) => event.date.toDateString() === day.toDateString()
          );
          return (
            <div key={day.toISOString()} className="min-h-96 p-2">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-2 mb-2 bg-[#F7FCE0] rounded border border-blue-100 text-sm"
                >
                  <div className="font-medium">{event.time}</div>
                  <div>{event.title}</div>
                  <div className="text-xs text-gray-500">
                    {event.attendees.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeekView;
