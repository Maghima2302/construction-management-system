import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type GanttTask = {
  taskName: string;
  durationDays: number;
  completionStatus: "Completed" | "In Progress" | "Pending";
};

interface GanttChartProps {
  tasks: GanttTask[];
  title?: string;
}

export default function GanttChart({ tasks, title = "Project Schedule Timeline" }: GanttChartProps) {
  const maxDuration = Math.max(...tasks.map((task) => task.durationDays), 1);
  const gridLines = Array.from({ length: Math.ceil(maxDuration / 5) + 1 }, (_, i) => i * 5);

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0 pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 py-0 relative">
        {/* Timeline Header */}
        <div className="flex border-b border-slate-100 pb-2 mb-4">
          <div className="w-1/3 text-xs font-bold text-slate-400 uppercase tracking-wider">Task Information</div>
          <div className="flex-1 relative h-6">
            {gridLines.map((day) => (
              <span 
                key={day} 
                className="absolute text-[10px] text-slate-400 font-medium -translate-x-1/2"
                style={{ left: `${(day / maxDuration) * 100}%` }}
              >
                Day {day}
              </span >
            ))}
          </div>
        </div>

        <div className="space-y-4 relative">
          {/* Vertical Grid Lines */}
          <div className="absolute inset-0 left-[33.33%] pointer-events-none">
            {gridLines.map((day) => (
              <div 
                key={day} 
                className="absolute top-0 bottom-0 border-l border-slate-100/80"
                style={{ left: `${(day / maxDuration) * 100}%` }}
              />
            ))}
          </div>

          {tasks.map((task, idx) => {
            const widthPercent = (task.durationDays / maxDuration) * 100;
            const statusColor = task.completionStatus === "Completed"
              ? "from-emerald-500 to-emerald-600 shadow-emerald-200"
              : task.completionStatus === "In Progress"
                ? "from-amber-400 to-amber-500 shadow-amber-100"
                : "from-slate-300 to-slate-400 shadow-slate-100";

            return (
              <div key={idx} className="flex items-center group">
                <div className="w-1/3 pr-4">
                  <p className="text-sm font-semibold text-slate-700 truncate">{task.taskName}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{task.durationDays} Days Duration</p>
                </div>
                <div className="flex-1 h-8 relative flex items-center">
                  <div 
                    className={cn(
                      "h-4 rounded-full bg-gradient-to-r shadow-md transition-all duration-300 group-hover:h-5",
                      statusColor
                    )} 
                    style={{ width: `${widthPercent}%` }} 
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-full" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 pt-4 border-t border-slate-50 flex items-center gap-6 justify-center">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Completed
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> In Progress
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full bg-slate-400" /> Planned
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
