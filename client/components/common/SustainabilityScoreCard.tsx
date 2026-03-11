import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SustainabilityScoreCardProps {
  sustainabilityScore: number;
  carbonEmissionEstimateTons: number;
  greenMaterialPercentage: number;
}

export default function SustainabilityScoreCard({
  sustainabilityScore,
  carbonEmissionEstimateTons,
  greenMaterialPercentage,
}: SustainabilityScoreCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sustainability Index</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Sustainability Score: <span className="font-semibold text-foreground">{sustainabilityScore}</span></p>
        <p>Carbon Emission Estimate: <span className="font-semibold text-foreground">{carbonEmissionEstimateTons} tons</span></p>
        <p>Green Material Percentage: <span className="font-semibold text-foreground">{greenMaterialPercentage}%</span></p>
      </CardContent>
    </Card>
  );
}
