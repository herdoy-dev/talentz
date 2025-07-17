"use client";
import { AppAreaChart } from "@/components/app-area-chart";
import { AppBarChart } from "@/components/app-bar-chart";
import { AppLineChart } from "@/components/app-line-chart";
import { Calendar } from "@/components/calender";
import CardList from "@/components/card-list";
import TodoList from "./todo-list";

export default function DashboardPage() {
  return (
    <>
      <h2>Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
        <div className="p-4 border shadow rounded-3xl bg-primary/5">
          <AppBarChart />
        </div>
        <div className="p-4 border shadow rounded-3xl bg-primary/5">
          <CardList title="Customers" />
        </div>
        <div className="p-4 border shadow rounded-3xl bg-primary/5">
          <Calendar />
        </div>
        <div className="p-4 border shadow rounded-3xl bg-primary/5">
          <AppAreaChart />
        </div>
        <div className="p-4 border shadow rounded-3xl bg-primary/5">
          <AppLineChart />
        </div>
        <div className="p-4 border shadow rounded-3xl bg-primary/5">
          <TodoList />
        </div>
      </div>
    </>
  );
}
