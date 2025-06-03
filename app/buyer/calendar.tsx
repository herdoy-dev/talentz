"use client";
import { useState } from "react";
import Calendar from "react-calendar";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function BuyerCalendar() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        className="!w-full h-full rounded-3xl !border-gray-400"
      />
    </div>
  );
}

export default BuyerCalendar;
