import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnalyticsChart from "@/components/charts/AnalyticsChart";

interface WorkforceAnalyticsChartProps {
  productivityData: { month: string; productivity: number }[];
  laborData: { team: string; workload: number }[];
}

export default function WorkforceAnalyticsChart({ productivityData, laborData }: WorkforceAnalyticsChartProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Engineer Productivity Graph</CardTitle>
        </CardHeader>
        <CardContent>
          <AnalyticsChart data={productivityData} xKey="month" yKey="productivity" mode="line" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Labor Workload Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <AnalyticsChart data={laborData} xKey="team" yKey="workload" mode="bar" color="hsl(var(--primary))" />
        </CardContent>
      </Card>
    </div>
  );
}
