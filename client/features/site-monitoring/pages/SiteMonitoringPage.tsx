import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnalyticsChart from "@/components/charts/AnalyticsChart";
import Timeline from "@/components/common/Timeline";
import { DAILY_SITE_ACTIVITY, EQUIPMENT_USAGE_SERIES, SITE_MONITORING_STATS, SITE_PHASE_TIMELINE } from "@/constants/mockSiteMonitoring";
import SiteStatsGrid from "@/features/site-monitoring/components/SiteStatsGrid";

export default function SiteMonitoringPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Smart Site Monitoring Dashboard</h1>
        <p className="text-sm text-muted-foreground">Construction progress, daily activities, and equipment usage tracking.</p>
      </div>

      <SiteStatsGrid
        activeMachinery={SITE_MONITORING_STATS.activeMachinery}
        laborAttendance={SITE_MONITORING_STATS.laborAttendance}
        phase={SITE_MONITORING_STATS.currentConstructionPhase}
        dailyProgressPercent={SITE_MONITORING_STATS.dailyProgressPercent}
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Daily Site Activity</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {DAILY_SITE_ACTIVITY.map((item) => (
              <div key={`${item.time}-${item.activity}`} className="rounded-md border border-border p-2 text-sm">
                <p className="font-medium">{item.time}</p>
                <p className="text-muted-foreground">{item.activity}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Phase Completion Timeline</CardTitle></CardHeader>
          <CardContent>
            <Timeline
              items={SITE_PHASE_TIMELINE.map((phase) => ({
                title: `${phase.phase} (${phase.completion}%)`,
                date: "Current cycle",
                status: phase.completion === 100 ? "Completed" : phase.completion > 45 ? "In Progress" : "Pending",
              }))}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Equipment Usage Tracking</CardTitle></CardHeader>
          <CardContent>
            <AnalyticsChart data={EQUIPMENT_USAGE_SERIES} xKey="equipment" yKey="usage" mode="bar" color="hsl(var(--primary))" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
