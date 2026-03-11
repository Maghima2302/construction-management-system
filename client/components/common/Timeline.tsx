import { Badge } from "@/components/ui/badge";

interface TimelineItem {
  title: string;
  date: string;
  status: "Completed" | "In Progress" | "Delayed" | "Pending";
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={`${item.title}-${item.date}`} className="rounded-md border border-border p-3">
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm">{item.title}</p>
            <Badge variant={item.status === "Delayed" ? "destructive" : "secondary"}>{item.status}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
        </div>
      ))}
    </div>
  );
}
