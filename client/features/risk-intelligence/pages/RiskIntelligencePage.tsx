import { Link } from "react-router-dom";
import RiskScoreCard from "@/components/common/RiskScoreCard";
import AnalyticsChart from "@/components/charts/AnalyticsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_RISK_PROJECTS, RISK_HEATMAP, RISK_TREND_SERIES, SAFETY_ALERTS } from "@/constants/mockRisk";
import RiskHeatmap from "@/features/risk-intelligence/components/RiskHeatmap";

export default function RiskIntelligencePage() {
  const highRiskProjects = MOCK_RISK_PROJECTS.filter((item) => item.riskScore >= 60);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Construction Risk Intelligence</h1>
        <p className="text-sm text-muted-foreground">AI risk prediction, structural indicators, safety trends, and weather impact analysis.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <RiskScoreCard title="AI Risk Prediction Score" score={54} subtitle="Portfolio weighted risk" />
        <RiskScoreCard title="Safety Incident Prediction" score={61} subtitle="7-day forecast model" />
        <RiskScoreCard title="Weather Impact Score" score={47} subtitle="Monsoon disruption likelihood" />
      </div>

      <RiskHeatmap items={RISK_HEATMAP} />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Risk Trend Graph</CardTitle></CardHeader>
          <CardContent>
            <AnalyticsChart data={RISK_TREND_SERIES} xKey="month" yKey="risk" mode="line" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Safety Alerts</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {SAFETY_ALERTS.map((alert) => (
              <div key={alert} className="rounded-md border border-border p-2 text-sm text-muted-foreground">{alert}</div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>High Risk Projects</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {highRiskProjects.map((project) => (
            <Link key={project.id} to={`/risk-intelligence/project/${project.id}`} className="block rounded-md border border-border p-3 hover:bg-muted/30">
              <p className="text-sm font-medium">{project.projectName}</p>
              <p className="text-xs text-muted-foreground">Risk: {project.riskScore} • Structural: {project.structuralRiskLevel} • Weather: {project.weatherImpactScore}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
