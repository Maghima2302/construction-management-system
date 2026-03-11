import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_RISK_PROJECTS } from "@/constants/mockRisk";

export default function RiskProjectDetailsPage() {
  const { id } = useParams();
  const project = MOCK_RISK_PROJECTS.find((item) => item.id === id) || MOCK_RISK_PROJECTS[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{project.projectName}</h1>
        <p className="text-sm text-muted-foreground">Risk intelligence detail and predictive indicators</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader><CardTitle className="text-base">Risk Score</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{project.riskScore}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">Safety Status</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{project.safetyStatus}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">Structural Risk</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{project.structuralRiskLevel}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">Weather Impact</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{project.weatherImpactScore}</CardContent></Card>
      </div>
    </div>
  );
}
