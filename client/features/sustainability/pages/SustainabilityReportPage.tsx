import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SUSTAINABILITY_METRICS } from "@/constants/mockSustainability";

export default function SustainabilityReportPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sustainability Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Project Sustainability Score: {SUSTAINABILITY_METRICS.sustainabilityScore}/100</p>
        <p>Carbon Emission Estimate: {SUSTAINABILITY_METRICS.carbonEmissionEstimateTons} tons CO₂e</p>
        <p>Green Material Percentage: {SUSTAINABILITY_METRICS.greenMaterialPercentage}%</p>
        <p>Energy Efficiency Score: {SUSTAINABILITY_METRICS.energyEfficiencyScore}/100</p>
      </CardContent>
    </Card>
  );
}
