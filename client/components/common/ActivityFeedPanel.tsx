import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityFeedPanelProps {
  items: { title: string; timestamp: string }[];
}

export default function ActivityFeedPanel({ items }: ActivityFeedPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <div key={`${item.title}-${item.timestamp}`} className="rounded-md border border-border p-2">
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
