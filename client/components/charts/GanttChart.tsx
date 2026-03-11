import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type GanttTask = {
  taskName: string;
  durationDays: number;
  completionStatus: "Completed" | "In Progress" | "Pending";
};

interface GanttChartProps {
  tasks: GanttTask[];
  title?: string;
}

export default function GanttChart({ tasks, title = "AI Generated Schedule" }: GanttChartProps) {
  const maxDuration = Math.max(...tasks.map((task) => task.durationDays), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task) => {
          const widthPercent = (task.durationDays / maxDuration) * 100;
          const statusColor = task.completionStatus === "Completed"
            ? "bg-emerald-500"
            : task.completionStatus === "In Progress"
              ? "bg-amber-500"
              : "bg-slate-500";

          return (
            <div key={task.taskName}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>{task.taskName}</span>
                <span className="text-muted-foreground">{task.durationDays}d</span>
              </div>
              <div className="h-3 w-full rounded-full bg-muted">
                <div className={`h-3 rounded-full ${statusColor}`} style={{ width: `${widthPercent}%` }} />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
