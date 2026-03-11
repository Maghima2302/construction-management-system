import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NotificationPanelProps {
  items: string[];
}

export default function NotificationPanel({ items }: NotificationPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <div key={item} className="rounded-md border border-border p-2 text-sm text-muted-foreground">
            {item}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
