import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";

type ChartMode = "line" | "bar";

interface AnalyticsChartProps {
  data: Record<string, string | number>[];
  xKey: string;
  yKey: string;
  mode?: ChartMode;
  color?: string;
}

export default function AnalyticsChart({
  data,
  xKey,
  yKey,
  mode = "line",
  color = "hsl(var(--accent))",
}: AnalyticsChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        {mode === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Line dataKey={yKey} stroke={color} strokeWidth={3} />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={yKey} fill={color} radius={8} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
