import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Plus,
  LayoutGrid,
  List,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Building2,
  MapPin,
  IndianRupee,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { ListMyProjectsParams, MyProject, ProjectStatus } from "@/services/clientProjectService";
import { useMyProjects } from "@/hooks/useMyProjects";

const STATUS_FILTERS: Array<"All" | ProjectStatus> = [
  "All",
  "DRAFT",
  "APPROVED",
  "PLANNING",
  "EXECUTION",
  "ON_HOLD",
  "COMPLETED",
  "CANCELLED",
];

const STATUS_CONFIG: Record<ProjectStatus, { color: string; icon: React.FC<{ className?: string }> }> = {
  DRAFT: { color: "bg-slate-100 text-slate-700 border-slate-200", icon: Clock },
  APPROVED: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: CheckCircle2 },
  PLANNING: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  EXECUTION: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  ON_HOLD: { color: "bg-orange-100 text-orange-700 border-orange-200", icon: AlertTriangle },
  COMPLETED: { color: "bg-teal-100 text-teal-700 border-teal-200", icon: CheckCircle2 },
  CANCELLED: { color: "bg-red-100 text-red-700 border-red-200", icon: AlertTriangle },
};

function ProjectCard({ project }: { project: MyProject }) {
  const StatusIcon = STATUS_CONFIG[project.status].icon;

  return (
    <Link to={`/projects/${project.id}`} className="group block">
      <Card className="h-full hover:shadow-lg hover:border-[hsl(25,99%,55%)]/30 transition-all duration-200 group-hover:-translate-y-0.5">
        <CardContent className="p-0">
          <div className={cn("h-1.5 rounded-t-xl", project.status === "EXECUTION" ? "bg-gradient-to-r from-[hsl(213,65%,18%)] to-[hsl(25,99%,55%)]" : "bg-gradient-to-r from-slate-400 to-slate-300")} />
          <div className="p-5 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-2 group-hover:text-[hsl(25,99%,55%)] transition-colors">
                  {project.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <Building2 size={11} className="text-muted-foreground shrink-0" />
                  <p className="text-xs text-muted-foreground truncate">{project.location}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <MapPin size={11} className="text-muted-foreground shrink-0" />
                  <p className="text-xs text-muted-foreground">{project.priority} priority</p>
                </div>
              </div>
              <Badge className={cn("shrink-0 text-[10px] px-2 py-0.5 border", STATUS_CONFIG[project.status].color)}>
                <StatusIcon className="h-2.5 w-2.5 mr-1" />
                {project.status}
              </Badge>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-foreground">Progress</span>
                <span className="text-xs font-bold text-foreground">{project.progressPercentage}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all bg-[hsl(25,99%,55%)]" style={{ width: `${project.progressPercentage}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-[10px] text-muted-foreground">Budget</p>
                <p className="text-sm font-bold">₹{(project.budget / 100000).toFixed(1)}L</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-[10px] text-muted-foreground">Start</p>
                <p className="text-sm font-bold">{project.startDate ? new Date(project.startDate).toLocaleDateString() : "-"}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <div className="flex items-center gap-1">
                <IndianRupee size={11} className="text-muted-foreground" />
                <span className="text-xs font-medium">{project.priority} priority</span>
              </div>
              <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-[hsl(25,99%,55%)] transition-colors" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function ProjectRow({ project }: { project: MyProject }) {
  const StatusIcon = STATUS_CONFIG[project.status].icon;

  return (
    <Link to={`/projects/${project.id}`} className="group block">
      <div className="flex items-center gap-4 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-[hsl(25,99%,55%)]/40 hover:shadow-sm transition-all">
        <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 bg-slate-50">
          <StatusIcon className={cn("h-4 w-4", project.status === "EXECUTION" || project.status === "COMPLETED" ? "text-emerald-600" : "text-slate-500")} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm group-hover:text-[hsl(25,99%,55%)] transition-colors truncate">{project.name}</p>
          <p className="text-xs text-muted-foreground">{project.location}</p>
        </div>

        <div className="hidden md:block w-32 shrink-0">
          <p className="text-xs text-muted-foreground truncate">{project.priority}</p>
        </div>

        <div className="w-28 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
              <div className="h-full bg-[hsl(25,99%,55%)] rounded-full" style={{ width: `${project.progressPercentage}%` }} />
            </div>
            <span className="text-xs font-medium w-8 text-right">{project.progressPercentage}%</span>
          </div>
        </div>

        <Badge className={cn("text-[10px] shrink-0", STATUS_CONFIG[project.status].color)}>{project.status}</Badge>
      </div>
    </Link>
  );
}

export default function ProjectsPage() {
  const { user } = useAuthStore();
  const [view, setView] = useState<"card" | "list">("card");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ProjectStatus>("All");

  const canCreate = user?.role === "SUPER_ADMIN" || user?.role === "PROJECT_MANAGER";

  const params = useMemo<ListMyProjectsParams>(
    () => ({
      page: 1,
      page_size: 100,
      search: search.trim() || undefined,
      status: statusFilter === "All" ? undefined : statusFilter,
    }),
    [search, statusFilter],
  );

  const { data: projects, meta, isLoading, error } = useMyProjects(params);

  const counts = useMemo(
    () => ({
      execution: projects.filter((project) => project.status === "EXECUTION").length,
      onHold: projects.filter((project) => project.status === "ON_HOLD").length,
      completed: projects.filter((project) => project.status === "COMPLETED").length,
      avgProgress: projects.length ? Math.round(projects.reduce((sum, project) => sum + project.progressPercentage, 0) / projects.length) : 0,
    }),
    [projects],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
          <p className="text-muted-foreground mt-1">Projects assigned to your account are loaded from the client API.</p>
        </div>

        {canCreate && (
          <Button asChild className="bg-[hsl(25,99%,55%)] text-white hover:bg-[hsl(25,99%,48%)] shadow-lg shadow-orange-500/20">
            <Link to="/projects/create" className="inline-flex items-center gap-2">
              <Plus size={16} /> New Project
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Execution</p><p className="text-2xl font-bold mt-1">{counts.execution}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">On Hold</p><p className="text-2xl font-bold mt-1 text-amber-600">{counts.onHold}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Completed</p><p className="text-2xl font-bold mt-1 text-emerald-600">{counts.completed}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Avg Progress</p><p className="text-2xl font-bold mt-1">{counts.avgProgress}%</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Project Portfolio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects or locations..."
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {STATUS_FILTERS.map((status) => (
                <Button key={status} variant={statusFilter === status ? "default" : "outline"} size="sm" onClick={() => setStatusFilter(status)}>
                  {status}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant={view === "card" ? "default" : "outline"} size="icon" onClick={() => setView("card")}>
                <LayoutGrid size={16} />
              </Button>
              <Button variant={view === "list" ? "default" : "outline"} size="icon" onClick={() => setView("list")}>
                <List size={16} />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter size={14} />
            {isLoading ? "Loading projects..." : `Showing ${projects.length} of ${meta.total} projects`}
          </div>

          {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="h-56 animate-pulse bg-slate-50" />
              ))}
            </div>
          ) : view === "card" ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((project) => <ProjectRow key={project.id} project={project} />)}
            </div>
          )}

          {!isLoading && projects.length === 0 && !error && (
            <div className="text-center py-16 text-muted-foreground">
              <BarChart3 size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No projects match your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}