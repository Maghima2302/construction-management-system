import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RiskHeatmapProps {
  items: { zone: string; score: number }[];
}

export default function RiskHeatmap({ items }: RiskHeatmapProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Heatmap</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.zone} className="rounded-md border border-border p-3">
            <p className="text-sm font-medium">{item.zone}</p>
            <p className="text-xs text-muted-foreground mt-1">Risk Score: {item.score}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
