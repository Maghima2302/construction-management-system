import KPIGrid from "@/components/dashboard/KPIGrid";
import DashboardWidgets from "@/components/dashboard/DashboardWidgets";
import RoleRequirementPanel from "@/components/dashboard/RoleRequirementPanel";
import NotificationPanel from "@/components/common/NotificationPanel";
import ActivityFeedPanel from "@/components/common/ActivityFeedPanel";
import RoleInnovationPanels from "@/components/dashboard/RoleInnovationPanels";
import AdvancedOpsWidgets from "@/components/dashboard/AdvancedOpsWidgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DASHBOARD_DATA_BY_ROLE } from "@/constants/mockDashboard";
import { useAuthStore } from "@/store/authStore";

export default function RoleDashboardPage() {
  const userRole = useAuthStore((state) => state.user?.role || "CLIENT");
  const dashboardData = DASHBOARD_DATA_BY_ROLE[userRole];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{dashboardData.title}</h1>
        <p className="text-muted-foreground text-sm mt-1">{dashboardData.subtitle}</p>
      </div>
      <KPIGrid items={dashboardData.kpis} />
      <DashboardWidgets
        trendData={dashboardData.trendData}
        budgetData={dashboardData.budgetData}
        activities={dashboardData.activities}
        timeline={dashboardData.timeline}
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <NotificationPanel items={dashboardData.notifications} />
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Risk Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {dashboardData.riskAlerts.map((alert) => (
              <div key={alert} className="rounded-md border border-border p-2 text-sm text-muted-foreground">{alert}</div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming Milestones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {dashboardData.upcomingMilestones.map((milestone) => (
              <div key={milestone} className="rounded-md border border-border p-2 text-sm text-muted-foreground">{milestone}</div>
            ))}
          </CardContent>
        </Card>
      </div>

      <ActivityFeedPanel items={dashboardData.activities.map((item) => ({ title: item.title, timestamp: item.timestamp }))} />

      <AdvancedOpsWidgets />

      <RoleInnovationPanels role={userRole} />

      <RoleRequirementPanel role={userRole} />
    </div>
  );
}
