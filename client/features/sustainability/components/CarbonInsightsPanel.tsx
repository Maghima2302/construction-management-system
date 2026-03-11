import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CarbonInsightsPanelProps {
  notes: string[];
}

export default function CarbonInsightsPanel({ notes }: CarbonInsightsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Eco Material Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {notes.map((note) => (
          <div key={note} className="rounded-md border border-border p-2 text-sm text-muted-foreground">{note}</div>
        ))}
      </CardContent>
    </Card>
  );
}
