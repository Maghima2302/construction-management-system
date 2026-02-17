import { FolderOpen, MapPin, Users } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

type Status = "planning" | "in-progress" | "completed" | "delayed";

interface ProjectCardProps {
  id: string;
  name: string;
  location: string;
  status: Status;
  progress: number;
  team: number;
  budget: string;
  dueDate: string;
  className?: string;
}

export const ProjectCard = ({
  id,
  name,
  location,
  status,
  progress,
  team,
  budget,
  dueDate,
  className,
}: ProjectCardProps) => {
  return (
    <div
      className={cn(
        "glass-card p-6 rounded-xl hover:shadow-elevated transition-smooth cursor-pointer hover:border-accent/50",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
            <FolderOpen size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg line-clamp-2">{name}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPin size={14} />
              {location}
            </div>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-4">
        <StatusBadge status={status} />
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">Progress</span>
          <span className="text-xs font-semibold text-foreground">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-orange-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer Info */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Team</p>
          <div className="flex items-center gap-1">
            <Users size={14} className="text-muted-foreground" />
            <span className="text-sm font-semibold">{team}</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Budget</p>
          <p className="text-sm font-semibold">{budget}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Due Date</p>
          <p className="text-sm font-semibold">{dueDate}</p>
        </div>
      </div>
    </div>
  );
};
