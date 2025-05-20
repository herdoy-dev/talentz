"use client";
import { useState } from "react";
import Chat from "./chat";

export default function Chats() {
  const [current, setCurrent] = useState(3);
  return (
    <div className="border-r overflow-auto p-4 space-y-3">
      {Array.from({ length: 40 }).map((_, i) => (
        <Chat key={i} current={current} setCurrent={() => setCurrent(i)} />
      ))}
    </div>
  );
}
