"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", income: 4000 },
  { name: "Feb", income: 3000 },
  { name: "Mar", income: 5000 },
  { name: "Apr", income: 2780 },
  { name: "May", income: 3890 },
  { name: "Jun", income: 6000 },
  { name: "Jul", income: 1000 },
  { name: "Aug", income: 2000 },
  { name: "Sec", income: 4000 },
  { name: "Oct", income: 7000 },
  { name: "Nov", income: 8000 },
  { name: "Dec", income: 12000 },
];

const COLORS = [
  "#AAEBCA",
  "#AAEBCA",
  "#AAEBCA",
  "#AAEBCA",
  "#AAEBCA",
  "#AAEBCA",
  "#AAEBCA",
  "#AAEBCA",
  "#AAEBCA",
  "#AAEBCA",
  "#AAEBCA",
  "#AAEBCA",
];

export function MonthlyIncomeChart() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">
          Monthly Income (Last 6 Months)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
              <YAxis
                tick={{ fill: "#6b7280" }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "0.5rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  border: "none",
                }}
                formatter={(value) => [`$${value}`, "Income"]}
              />
              <Bar dataKey="income">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
