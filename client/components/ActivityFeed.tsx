import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "update" | "approval" | "warning" | "info";
  icon: React.ReactNode;
}

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

const typeConfig = {
  update: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  approval: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
  warning: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
  info: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
};

export const ActivityFeed = ({ activities, className }: ActivityFeedProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {activities.map((activity, index) => (
        <div key={activity.id} className="flex gap-4">
          {/* Timeline Connector */}
          <div className="flex flex-col items-center">
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", typeConfig[activity.type])}>
              {activity.icon}
            </div>
            {index < activities.length - 1 && (
              <div className="w-0.5 h-12 bg-border my-2" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pt-1">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Clock size={14} />
              {activity.timestamp}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
