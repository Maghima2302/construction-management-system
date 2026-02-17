import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
}

export const KPICard = ({
  title,
  value,
  unit,
  icon,
  trend,
  description,
  className,
}: KPICardProps) => {
  return (
    <div
      className={cn(
        "glass-card p-6 rounded-xl hover:shadow-elevated transition-smooth",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-3xl font-bold text-foreground">{value}</h3>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent flex-shrink-0">
          {icon}
        </div>
      </div>

      {/* Trend Indicator */}
      {trend && (
        <div className="flex items-center gap-2">
          {trend.isPositive ? (
            <TrendingUp size={16} className="text-emerald-600" />
          ) : (
            <TrendingDown size={16} className="text-red-600" />
          )}
          <span
            className={cn(
              "text-sm font-medium",
              trend.isPositive ? "text-emerald-600" : "text-red-600"
            )}
          >
            {trend.isPositive ? "+" : "-"}
            {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-muted-foreground">from last month</span>
        </div>
      )}
    </div>
  );
};
