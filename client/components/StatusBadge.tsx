import { cn } from "@/lib/utils";

type Status = "planning" | "in-progress" | "completed" | "delayed" | "on-hold" | "active" | "inactive";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<Status, { color: string; label: string }> = {
  "planning": { color: "badge-info", label: "Planning" },
  "in-progress": { color: "badge-warning", label: "In Progress" },
  "completed": { color: "badge-success", label: "Completed" },
  "delayed": { color: "badge-danger", label: "Delayed" },
  "on-hold": { color: "badge-info", label: "On Hold" },
  "active": { color: "badge-success", label: "Active" },
  "inactive": { color: "badge-info", label: "Inactive" },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        config.color,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
      {config.label}
    </span>
  );
};
