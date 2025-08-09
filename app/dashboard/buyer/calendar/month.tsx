"use client";
import { CalendarEvent } from "./page";

function MonthView({ date, events }: { date: Date; events: CalendarEvent[] }) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const days: { date: Date; isCurrentMonth: boolean }[] = [];

  // Previous month days
  const prevMonthLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        prevMonthLastDay - i
      ),
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(date.getFullYear(), date.getMonth(), i),
      isCurrentMonth: true,
    });
  }

  // Next month days
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: new Date(date.getFullYear(), date.getMonth() + 1, i),
      isCurrentMonth: false,
    });
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Weekdays Header */}
      <div className="grid grid-cols-7 border-b">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
          <div key={day} className="p-2 text-center font-medium text-sm">
            {day}
          </div>
        ))}
      </div>

      {/* Month Grid */}
      <div className="grid grid-cols-7">
        {days.map((day, idx) => {
          const dayEvents = events.filter(
            (event) =>
              event.date.toDateString() === day.date.toDateString() &&
              day.isCurrentMonth
          );
          return (
            <div
              key={idx}
              className={`min-h-32 p-1 border ${
                !day.isCurrentMonth ? "bg-gray-50" : ""
              }`}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full mx-auto mb-1 ${
                  day.date.toDateString() === new Date().toDateString()
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                {day.date.getDate()}
              </div>
              {dayEvents.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className="p-1 mb-1 bg-[#F7FCE0] rounded text-xs truncate"
                >
                  {event.time} {event.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-gray-500 text-center">
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MonthView;
