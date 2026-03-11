import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BlueprintAnalysisPanelProps {
  structuralStrengthScore: number;
  ventilationScore: number;
  energyEfficiencyScore: number;
  insights: string[];
}

export default function BlueprintAnalysisPanel({
  structuralStrengthScore,
  ventilationScore,
  energyEfficiencyScore,
  insights,
}: BlueprintAnalysisPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Blueprint Analysis Panel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="grid gap-2 md:grid-cols-3">
          <div className="rounded-md border border-border p-2">Structural Strength: {structuralStrengthScore}</div>
          <div className="rounded-md border border-border p-2">Ventilation: {ventilationScore}</div>
          <div className="rounded-md border border-border p-2">Energy Efficiency: {energyEfficiencyScore}</div>
        </div>
        {insights.map((insight) => (
          <div key={insight} className="rounded-md border border-border p-2 text-muted-foreground">
            {insight}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
