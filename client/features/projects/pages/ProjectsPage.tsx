import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Plus,
  LayoutGrid,
  List,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Building2,
  MapPin,
  Users,
  IndianRupee,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_PROJECTS, ProjectRecord } from "@/constants/mockProjects";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

// ─── Status helpers ───────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ProjectRecord["status"], { color: string; icon: React.FC<{ className?: string }> }> = {
  Active: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  Delayed: { color: "bg-red-100 text-red-700 border-red-200", icon: AlertTriangle },
  Completed: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: CheckCircle2 },
  "On Hold": { color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
};

const HEALTH_COLOR = (score: number) => {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-600";
};

const RISK_COLOR = (score: number) => {
  if (score <= 30) return "bg-emerald-500";
  if (score <= 55) return "bg-amber-500";
  return "bg-red-500";
};

// ─── Project Card Component ────────────────────────────────────────────────────

function ProjectCardFull({ project }: { project: ProjectRecord }) {
  const StatusIcon = STATUS_CONFIG[project.status].icon;
  const budgetVariance = ((project.budgetActual - project.budgetPlanned) / project.budgetPlanned) * 100;

  return (
    <Link to={`/projects/${project.id}`} className="group block">
      <Card className="h-full hover:shadow-lg hover:border-[hsl(25,99%,55%)]/30 transition-all duration-200 group-hover:-translate-y-0.5">
        <CardContent className="p-0">
          {/* Top color strip */}
          <div
            className={cn(
              "h-1.5 rounded-t-xl",
              project.status === "Active" ? "bg-gradient-to-r from-[hsl(213,65%,18%)] to-[hsl(25,99%,55%)]" :
                project.status === "Delayed" ? "bg-gradient-to-r from-red-500 to-red-400" :
                  project.status === "Completed" ? "bg-gradient-to-r from-emerald-500 to-teal-400" :
                    "bg-gradient-to-r from-amber-500 to-amber-400"
            )}
          />

          <div className="p-5 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-2 group-hover:text-[hsl(25,99%,55%)] transition-colors">
                  {project.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <Building2 size={11} className="text-muted-foreground shrink-0" />
                  <p className="text-xs text-muted-foreground truncate">{project.client}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <MapPin size={11} className="text-muted-foreground shrink-0" />
                  <p className="text-xs text-muted-foreground">{project.location} · {project.type}</p>
                </div>
              </div>
              <Badge className={cn("shrink-0 text-[10px] px-2 py-0.5 border", STATUS_CONFIG[project.status].color)}>
                <StatusIcon className="h-2.5 w-2.5 mr-1" />
                {project.status}
              </Badge>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-foreground">Completion</span>
                <span className="text-xs font-bold text-foreground">{project.completion}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    project.completion >= 80 ? "bg-emerald-500" :
                      project.completion >= 50 ? "bg-[hsl(25,99%,55%)]" : "bg-[hsl(213,65%,40%)]"
                  )}
                  style={{ width: `${project.completion}%` }}
                />
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-[10px] text-muted-foreground">Health</p>
                <p className={cn("text-sm font-bold", HEALTH_COLOR(project.healthScore))}>{project.healthScore}</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-[10px] text-muted-foreground">Risk</p>
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  <div className={cn("h-2 w-2 rounded-full", RISK_COLOR(project.riskScore))} />
                  <span className="text-sm font-bold">{project.riskScore}</span>
                </div>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-[10px] text-muted-foreground">Resources</p>
                <p className="text-sm font-bold">{project.resourceUtilization}%</p>
              </div>
            </div>

            {/* Budget */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <div className="flex items-center gap-1">
                <IndianRupee size={11} className="text-muted-foreground" />
                <span className="text-xs font-medium">
                  ₹{(project.budgetActual / 100000).toFixed(1)}L spent
                </span>
              </div>
              <div className={cn(
                "flex items-center gap-0.5 text-[11px] font-medium",
                budgetVariance > 0 ? "text-red-600" : "text-emerald-600"
              )}>
                {budgetVariance > 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {Math.abs(budgetVariance).toFixed(1)}% {budgetVariance > 0 ? "over" : "under"}
              </div>
            </div>

            {/* Team */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Users size={11} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{project.assignedTeam.length} team members</span>
              </div>
              <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-[hsl(25,99%,55%)] transition-colors" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// ─── List Row Component ───────────────────────────────────────────────────────

function ProjectListRow({ project }: { project: ProjectRecord }) {
  const StatusIcon = STATUS_CONFIG[project.status].icon;
  const budgetVariance = ((project.budgetActual - project.budgetPlanned) / project.budgetPlanned) * 100;

  return (
    <Link to={`/projects/${project.id}`} className="group block">
      <div className="flex items-center gap-4 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-[hsl(25,99%,55%)]/40 hover:shadow-sm transition-all">
        {/* Status dot */}
        <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
          project.status === "Active" ? "bg-emerald-50" :
            project.status === "Delayed" ? "bg-red-50" :
              project.status === "Completed" ? "bg-blue-50" : "bg-amber-50"
        )}>
          <StatusIcon className={cn("h-4 w-4",
            project.status === "Active" ? "text-emerald-600" :
              project.status === "Delayed" ? "text-red-600" :
                project.status === "Completed" ? "text-blue-600" : "text-amber-600"
          )} />
        </div>

        {/* Name */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm group-hover:text-[hsl(25,99%,55%)] transition-colors truncate">{project.name}</p>
          <p className="text-xs text-muted-foreground">{project.client} · {project.location}</p>
        </div>

        {/* Type */}
        <div className="hidden md:block w-32 shrink-0">
          <p className="text-xs text-muted-foreground truncate">{project.type}</p>
        </div>

        {/* Progress */}
        <div className="w-28 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
              <div className="h-full bg-[hsl(25,99%,55%)] rounded-full" style={{ width: `${project.completion}%` }} />
            </div>
            <span className="text-xs font-medium w-8 text-right">{project.completion}%</span>
          </div>
        </div>

        {/* Risk */}
        <div className="hidden lg:flex items-center gap-1.5 w-20 shrink-0">
          <div className={cn("h-2 w-2 rounded-full", RISK_COLOR(project.riskScore))} />
          <span className="text-xs font-medium">{project.riskScore}</span>
        </div>

        {/* Budget variance */}
        <div className={cn(
          "hidden xl:flex items-center gap-0.5 text-xs font-medium w-20 shrink-0",
          budgetVariance > 0 ? "text-red-600" : "text-emerald-600"
        )}>
          {budgetVariance > 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {Math.abs(budgetVariance).toFixed(1)}%
        </div>

        {/* Status badge */}
        <Badge className={cn("text-[10px] shrink-0", STATUS_CONFIG[project.status].color)}>
          {project.status}
        </Badge>
      </div>
    </Link>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const STATUS_FILTERS = ["All", "Active", "Delayed", "Completed", "On Hold"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

export default function ProjectsPage() {
  const { user, hasModuleAccess } = useAuthStore();
  const [view, setView] = useState<"card" | "list">("card");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const canCreate = user?.role === "SUPER_ADMIN" || user?.role === "PROJECT_MANAGER";

  const filtered = MOCK_PROJECTS.filter((p) => {
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const counts = {
    active: MOCK_PROJECTS.filter((p) => p.status === "Active").length,
    delayed: MOCK_PROJECTS.filter((p) => p.status === "Delayed").length,
    completed: MOCK_PROJECTS.filter((p) => p.status === "Completed").length,
    avgHealth: Math.round(MOCK_PROJECTS.reduce((s, p) => s + p.healthScore, 0) / MOCK_PROJECTS.length),
    budgetUsed: Math.round((MOCK_PROJECTS.reduce((s, p) => s + p.budgetActual, 0) / MOCK_PROJECTS.reduce((s, p) => s + p.budgetPlanned, 0)) * 100),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Project Portfolio</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all active, delayed, and completed projects with AI-powered health tracking.
          </p>
        </div>
        {canCreate && (
          <Button asChild className="bg-[hsl(25,99%,55%)] hover:bg-[hsl(25,99%,48%)] text-white gap-2 shrink-0">
            <Link to="/projects/create">
              <Plus size={16} />
              Create Project
            </Link>
          </Button>
        )}
      </div>

      {/* Summary KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: "Active Projects", value: counts.active, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Delayed Projects", value: counts.delayed, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
          { label: "Completed", value: counts.completed, icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Avg Health Score", value: counts.avgHealth, icon: BarChart3, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Budget Utilized", value: `${counts.budgetUsed}%`, icon: IndianRupee, color: "text-[hsl(25,99%,55%)]", bg: "bg-orange-50" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="border border-slate-200">
            <CardContent className="p-3 flex items-center gap-3">
              <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", bg)}>
                <Icon className={cn("h-4 w-4", color)} />
              </div>
              <div>
                <p className={cn("text-lg font-bold", color)}>{value}</p>
                <p className="text-[11px] text-muted-foreground leading-tight">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
          <input
            type="text"
            placeholder="Search by project name, client, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(25,99%,55%)]/30 focus:border-[hsl(25,99%,55%)]"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                statusFilter === f
                  ? "bg-[hsl(213,65%,18%)] text-white shadow-sm"
                  : "text-muted-foreground hover:bg-slate-50"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
          <button
            onClick={() => setView("card")}
            className={cn("p-2 rounded-lg transition-all", view === "card" ? "bg-[hsl(213,65%,18%)] text-white" : "text-muted-foreground hover:bg-slate-50")}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setView("list")}
            className={cn("p-2 rounded-lg transition-all", view === "list" ? "bg-[hsl(213,65%,18%)] text-white" : "text-muted-foreground hover:bg-slate-50")}
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground">
        Showing <strong>{filtered.length}</strong> of {MOCK_PROJECTS.length} projects
      </p>

      {/* Projects grid / list */}
      {view === "card" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCardFull key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {/* List header */}
          <div className="flex items-center gap-4 px-4 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
            <div className="w-8 shrink-0" />
            <div className="flex-1">Project</div>
            <div className="hidden md:block w-32">Type</div>
            <div className="w-28">Progress</div>
            <div className="hidden lg:block w-20">Risk</div>
            <div className="hidden xl:block w-20">Budget</div>
            <div className="w-20">Status</div>
          </div>
          {filtered.map((project) => (
            <ProjectListRow key={project.id} project={project} />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Building2 size={48} className="mx-auto mb-4 opacity-30" />
          <p className="font-medium">No projects found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
