import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Search,
  Plus,
  Download,
  Filter,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  XCircle,
  CalendarDays,
  User,
  Tag,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_DECISION_LOGS, DecisionLog } from "@/constants/mockDecisionLogs";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

// ─── Config ────────────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<DecisionLog["category"], string> = {
  Structural: "bg-blue-100 text-blue-700 border-blue-200",
  Procurement: "bg-violet-100 text-violet-700 border-violet-200",
  Sustainability: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Material: "bg-orange-100 text-orange-700 border-orange-200",
  Schedule: "bg-amber-100 text-amber-700 border-amber-200",
  Safety: "bg-red-100 text-red-700 border-red-200",
  Financial: "bg-teal-100 text-teal-700 border-teal-200",
};

const STATUS_CONFIG: Record<DecisionLog["status"], { color: string; icon: LucideIcon }> = {
  Implemented: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  Approved: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: CheckCircle2 },
  "In Progress": { color: "bg-amber-100 text-amber-700 border-amber-200", icon: Loader2 },
  Pending: { color: "bg-slate-100 text-slate-600 border-slate-200", icon: Clock },
  Rejected: { color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
};

// ─── Decision Log Card ────────────────────────────────────────────────────────

function DecisionCard({ log }: { log: DecisionLog }) {
  const [expanded, setExpanded] = useState(false);
  const StatusIcon = STATUS_CONFIG[log.status].icon;

  return (
    <Card className="hover:shadow-md transition-all duration-200 hover:border-[hsl(25,99%,55%)]/30">
      <CardContent className="p-0">
        {/* Header strip */}
        <div className={cn("h-1 rounded-t-xl", CATEGORY_COLORS[log.category].replace("100", "400").replace("700", "500").replace("200", "300").split(" ")[0])} />

        <div className="p-5">
          {/* Top row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs font-bold text-muted-foreground">{log.id}</span>
                <Badge className={cn("text-[10px] border", CATEGORY_COLORS[log.category])}>{log.category}</Badge>
                <Badge className={cn("text-[10px] border", STATUS_CONFIG[log.status].color)}>
                  <StatusIcon size={10} />{" "}{log.status}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold text-foreground leading-snug">{log.decision}</h3>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <CalendarDays size={11} />
              {new Date(log.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1">
              <User size={11} />
              {log.madeBy} <span className="text-[10px] text-muted-foreground/70">({log.madeByRole})</span>
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp size={11} />
              <span className="font-medium text-foreground">{log.impact}</span>
            </span>
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full">{log.project}</span>
          </div>

          {/* AI Summary (always visible) */}
          <div className="bg-gradient-to-r from-[hsl(213,65%,18%)]/5 to-[hsl(25,99%,55%)]/5 border border-[hsl(213,65%,18%)]/10 rounded-xl px-4 py-3">
            <div className="flex items-start gap-2">
              <Sparkles size={14} className="text-[hsl(25,99%,55%)] mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] font-medium text-[hsl(213,65%,18%)] mb-1">Aura AI Summary</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{log.aiSummary}</p>
              </div>
            </div>
          </div>

          {/* Expand / collapse for documents */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? "Hide" : "Show"} {log.documents.length} document{log.documents.length !== 1 ? "s" : ""}
          </button>

          {expanded && (
            <div className="flex flex-wrap gap-2 mt-2">
              {log.documents.map((doc) => (
                <span key={doc} className="flex items-center gap-1.5 text-[11px] bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg">
                  <FileText size={10} /> {doc}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Structural", "Procurement", "Sustainability", "Material", "Schedule", "Safety", "Financial"] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

export default function DecisionLogsPage() {
  const { user } = useAuthStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [showModal, setShowModal] = useState(false);

  const canCreate = user?.role !== "CLIENT";

  const filtered = MOCK_DECISION_LOGS.filter((log) => {
    const matchesCategory = categoryFilter === "All" || log.category === categoryFilter;
    const matchesSearch =
      search === "" ||
      log.decision.toLowerCase().includes(search.toLowerCase()) ||
      log.project.toLowerCase().includes(search.toLowerCase()) ||
      log.madeBy.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = {
    total: MOCK_DECISION_LOGS.length,
    implemented: MOCK_DECISION_LOGS.filter((d) => d.status === "Implemented").length,
    pending: MOCK_DECISION_LOGS.filter((d) => d.status === "Pending" || d.status === "In Progress").length,
    categories: [...new Set(MOCK_DECISION_LOGS.map((d) => d.category))].length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Decision Logs & Audit Trail</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track all project decisions with AI-generated summaries, impact analysis, and supporting documents.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button size="sm" variant="outline" className="gap-2">
            <Download size={14} /> Export
          </Button>
          {canCreate && (
            <Button
              size="sm"
              className="bg-[hsl(25,99%,55%)] hover:bg-[hsl(25,99%,48%)] text-white gap-2"
              onClick={() => setShowModal(true)}
            >
              <Plus size={14} /> Log Decision
            </Button>
          )}
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Decisions", value: stats.total, icon: FileText, color: "text-[hsl(213,65%,40%)]", bg: "bg-[hsl(213,65%,18%)]/10" },
          { label: "Implemented", value: stats.implemented, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "In Progress", value: stats.pending, icon: Loader2, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Categories", value: stats.categories, icon: Tag, color: "text-violet-600", bg: "bg-violet-50" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardContent className="p-3 flex items-center gap-3">
              <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", bg)}>
                <Icon className={cn("h-4 w-4", color)} />
              </div>
              <div>
                <p className={cn("text-lg font-bold", color)}>{value}</p>
                <p className="text-[11px] text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
          <input
            type="text"
            placeholder="Search decisions, projects, or decision-makers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(25,99%,55%)]/30 focus:border-[hsl(25,99%,55%)]"
          />
        </div>
        <div className="flex flex-wrap gap-1 bg-white border border-slate-200 rounded-xl p-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                "px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all",
                categoryFilter === cat
                  ? "bg-[hsl(213,65%,18%)] text-white"
                  : "text-muted-foreground hover:bg-slate-50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Showing <strong>{filtered.length}</strong> of {MOCK_DECISION_LOGS.length} decisions
      </p>

      {/* Decision cards */}
      <div className="space-y-4">
        {filtered.map((log) => (
          <DecisionCard key={log.id} log={log} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <FileText size={48} className="mx-auto mb-4 opacity-30" />
          <p className="font-medium">No decisions found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      )}

      {/* Log Decision Modal (simple) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <Card className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Plus size={16} className="text-[hsl(25,99%,55%)]" />
                Log New Decision
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                <option>Select Project</option>
                <option>Skyline Corporate Tower</option>
                <option>GreenField Residences Phase II</option>
                <option>EcoBuild Industrial Plant</option>
              </select>
              <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                <option>Category</option>
                <option>Structural</option>
                <option>Procurement</option>
                <option>Sustainability</option>
                <option>Material</option>
                <option>Schedule</option>
              </select>
              <textarea
                placeholder="Describe the decision made..."
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-[hsl(25,99%,55%)]/30"
              />
              <input
                type="text"
                placeholder="Business impact (e.g. Cost +₹4.2L, Risk -12 pts)"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(25,99%,55%)]/30"
              />
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button size="sm" className="flex-1 bg-[hsl(25,99%,55%)] text-white hover:bg-[hsl(25,99%,48%)]" onClick={() => setShowModal(false)}>
                  Save Decision
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
