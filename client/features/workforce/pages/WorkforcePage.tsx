import WorkforceAnalyticsChart from "@/components/charts/WorkforceAnalyticsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LABOR_DISTRIBUTION_SERIES, MOCK_WORKFORCE, PRODUCTIVITY_SERIES } from "@/constants/mockWorkforce";
import WorkforceTable from "@/features/workforce/components/WorkforceTable";

export default function WorkforcePage() {
  const rows = MOCK_WORKFORCE.map((item) => ({
    employee: item.employeeName,
    role: item.role,
    project: item.projectAssigned,
    performance: `${item.performanceScore}/100`,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Workforce Analytics</h1>
        <p className="text-sm text-muted-foreground">Engineer productivity, labor efficiency, and team allocation insights.</p>
      </div>

      <WorkforceAnalyticsChart productivityData={PRODUCTIVITY_SERIES} laborData={LABOR_DISTRIBUTION_SERIES} />

      <Card>
        <CardHeader><CardTitle>Team Allocation Overview</CardTitle></CardHeader>
        <CardContent>
          <WorkforceTable rows={rows} />
        </CardContent>
      </Card>
    </div>
  );
}
