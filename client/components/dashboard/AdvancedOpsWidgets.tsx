import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_RISK_PROJECTS } from "@/constants/mockRisk";
import { SUSTAINABILITY_METRICS } from "@/constants/mockSustainability";
import { PRODUCTIVITY_SERIES } from "@/constants/mockWorkforce";
import { BLUEPRINT_ANALYSIS_RESULT } from "@/constants/mockBlueprintAnalysis";
import { SITE_MONITORING_STATS } from "@/constants/mockSiteMonitoring";
import { useAuthStore } from "@/store/authStore";

export default function AdvancedOpsWidgets() {
  const role = useAuthStore((state) => state.user?.role || "CLIENT");
  const avgRisk = Math.round(MOCK_RISK_PROJECTS.reduce((sum, item) => sum + item.riskScore, 0) / MOCK_RISK_PROJECTS.length);
  const latestProductivity = PRODUCTIVITY_SERIES[PRODUCTIVITY_SERIES.length - 1]?.productivity || 0;

  const widgetItems = [
    { label: "Risk Prediction Score", value: `${avgRisk}` },
    { label: "Sustainability Score", value: `${SUSTAINABILITY_METRICS.sustainabilityScore}/100` },
    { label: "Workforce Productivity", value: `${latestProductivity}%` },
    { label: "AI Blueprint Insights", value: `${BLUEPRINT_ANALYSIS_RESULT.structuralStrengthScore}% structural fit` },
    { label: "Site Progress Tracker", value: `${SITE_MONITORING_STATS.dailyProgressPercent}% daily progress` },
  ];

  const filtered = role === "CLIENT"
    ? widgetItems.filter((item) => ["Risk Prediction Score", "Sustainability Score", "Site Progress Tracker"].includes(item.label))
    : widgetItems;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Intelligence Widgets</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {filtered.map((item) => (
          <div key={item.label} className="rounded-md border border-border p-3">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-sm font-semibold mt-1">{item.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
