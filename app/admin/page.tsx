"use client";
import { Calendar } from "@/components/calender";
import CardList from "@/components/card-list";
import TodoList from "./todo-list";

export default function DashboardPage() {
  return (
    <>
      <h2>Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
        <div className="p-4 border shadow rounded-3xl">
          {/* <AppBarChart /> */}
        </div>
        <div className="p-4 border shadow rounded-3xl">
          <CardList title="Customers" />
        </div>
        <div className="p-4 border shadow rounded-3xl">
          <Calendar />
        </div>
        <div className="p-4 border shadow rounded-3xl">
          <TodoList />
        </div>
      </div>
    </>
  );
}
