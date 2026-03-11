import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LaborSuggestionPanelProps {
  notes: string[];
}

export default function LaborSuggestionPanel({ notes }: LaborSuggestionPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Labor Allocation Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {notes.map((note) => (
          <div key={note} className="rounded-md border border-border p-2 text-sm text-muted-foreground">{note}</div>
        ))}
      </CardContent>
    </Card>
  );
}
