import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GanttChart from "@/components/charts/GanttChart";
import AnalyticsChart from "@/components/charts/AnalyticsChart";
import { LABOR_WORKLOAD_SERIES, MOCK_PLANNING_TASKS, RESOURCE_OPTIMIZATION_NOTES } from "@/constants/mockPlanning";
import LaborSuggestionPanel from "@/features/planning-assistant/components/LaborSuggestionPanel";

export default function PlanningAssistantPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">AI Construction Planning Assistant</h1>
          <p className="text-sm text-muted-foreground">AI-generated schedules, labor planning, and resource optimization insights.</p>
        </div>
        <Link to="/planning-assistant/schedule" className="text-sm text-accent hover:underline">Open schedule planner →</Link>
      </div>

      <GanttChart tasks={MOCK_PLANNING_TASKS} title="AI Generated Project Schedule" />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Labor Workload Graph</CardTitle></CardHeader>
          <CardContent>
            <AnalyticsChart data={LABOR_WORKLOAD_SERIES} xKey="week" yKey="labor" mode="bar" color="hsl(var(--primary))" />
          </CardContent>
        </Card>
        <LaborSuggestionPanel notes={RESOURCE_OPTIMIZATION_NOTES} />
      </div>
    </div>
  );
}
