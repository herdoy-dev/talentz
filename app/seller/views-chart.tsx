"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

// Define the data type
type ChartData = {
  month: string;
  views: number;
};

// Sample data for 12 months of post views
const data: ChartData[] = [
  { month: "Jan", views: 4000 },
  { month: "Feb", views: 3000 },
  { month: "Mar", views: 5000 },
  { month: "Apr", views: 2780 },
  { month: "May", views: 3890 },
  { month: "Jun", views: 6000 },
  { month: "Jul", views: 8000 },
  { month: "Aug", views: 4890 },
  { month: "Sep", views: 7500 },
  { month: "Oct", views: 9200 },
  { month: "Nov", views: 11000 },
  { month: "Dec", views: 12500 },
];

// Custom tooltip with proper types
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 border rounded-lg shadow-sm">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-primary">
          Views:{" "}
          <span className="font-semibold">
            {Number(payload[0].value).toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export function ViewsChart() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Monthly Post Views</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#6b7280" }}
                tickMargin={10}
              />
              <YAxis
                tick={{ fill: "#6b7280" }}
                tickFormatter={(value: number) => value.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={() => (
                  <span className="text-primary">Post Views</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#1A9395"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: "#1A9395", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
