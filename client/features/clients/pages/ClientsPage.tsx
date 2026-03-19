import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Building2,
  MapPin,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Users,
  IndianRupee,
  Filter,
  CheckCircle2,
  Clock,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_CLIENTS, ClientRecord } from "@/constants/mockClients";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

// ─── Status Config ───────────────────────────────────────────────────────────

const STATUS_STYLES: Record<ClientRecord["status"], string> = {
  Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  VIP: "bg-amber-100 text-amber-700 border-amber-200",
  "In Planning": "bg-blue-100 text-blue-700 border-blue-200",
  Completed: "bg-slate-100 text-slate-600 border-slate-200",
};

const STATUS_ICONS: Record<ClientRecord["status"], typeof CheckCircle2> = {
  Active: CheckCircle2,
  VIP: Award,
  "In Planning": Clock,
  Completed: CheckCircle2,
};

const AI_SCORE_COLOR = (score: number) => {
  if (score >= 90) return "text-emerald-600";
  if (score >= 75) return "text-amber-600";
  if (score === 0) return "text-slate-400";
  return "text-red-600";
};

const INDUSTRY_COLORS: Record<string, string> = {
  "Real Estate": "bg-blue-500",
  Residential: "bg-emerald-500",
  "Government / Infrastructure": "bg-slate-500",
  Industrial: "bg-orange-500",
  "Luxury Residential": "bg-amber-500",
  Technology: "bg-violet-500",
  Healthcare: "bg-red-500",
  Education: "bg-teal-500",
  Hospitality: "bg-pink-500",
  Retail: "bg-cyan-500",
};

// ─── Client Card ─────────────────────────────────────────────────────────────

function ClientCard({ client }: { client: ClientRecord }) {
  const StatusIcon = STATUS_ICONS[client.status];
  const industryColor = INDUSTRY_COLORS[client.industry] || "bg-slate-500";

  return (
    <Link to={`/clients/${client.id}`} className="group block">
      <Card className="h-full hover:shadow-lg hover:border-[hsl(25,99%,55%)]/30 transition-all duration-200 group-hover:-translate-y-0.5">
        <CardContent className="p-0">
          {/* Color strip */}
          <div className={cn("h-1.5 rounded-t-xl", industryColor)} />

          <div className="p-5 space-y-4">
            {/* Header */}
            <div className="flex items-start gap-3">
              <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0", industryColor)}>
                {client.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm leading-tight group-hover:text-[hsl(25,99%,55%)] transition-colors line-clamp-1">
                  {client.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">{client.contact}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={10} className="text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{client.city}</p>
                </div>
              </div>
              <Badge className={cn("shrink-0 text-[10px] px-2 border", STATUS_STYLES[client.status])}>
                <StatusIcon size={10} className="mr-1" />
                {client.status}
              </Badge>
            </div>

            {/* Industry */}
            <div className="flex items-center gap-2">
              <Building2 size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{client.industry}</span>
            </div>

            {/* Requirements */}
            <div className="flex flex-wrap gap-1">
              {client.requirements.slice(0, 2).map((req) => (
                <span key={req} className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                  {req}
                </span>
              ))}
              {client.requirements.length > 2 && (
                <span className="text-[10px] bg-slate-50 border border-slate-200 text-muted-foreground px-2 py-0.5 rounded-full">
                  +{client.requirements.length - 2} more
                </span>
              )}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100">
              <div className="text-center">
                <p className="text-sm font-bold text-foreground">{client.activeProjects}</p>
                <p className="text-[10px] text-muted-foreground">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold">
                  {client.totalValueCr > 0 ? `₹${client.totalValueCr}Cr` : "—"}
                </p>
                <p className="text-[10px] text-muted-foreground">Value</p>
              </div>
              <div className="text-center">
                <p className={cn("text-sm font-bold", AI_SCORE_COLOR(client.aiScore))}>
                  {client.aiScore > 0 ? `${client.aiScore}%` : "—"}
                </p>
                <p className="text-[10px] text-muted-foreground">AI Score</p>
              </div>
            </div>

            {/* Contact row */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <a href={`mailto:${client.email}`} onClick={(e) => e.preventDefault()} className="flex items-center gap-1 hover:text-foreground transition-colors">
                <Mail size={10} /> {client.email}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const FILTERS = ["All", "Active", "VIP", "In Planning", "Completed"] as const;
type Filter = (typeof FILTERS)[number];

export default function ClientsPage() {
  const { user } = useAuthStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const canCreate = user?.role === "SUPER_ADMIN" || user?.role === "PROJECT_MANAGER";

  const filtered = MOCK_CLIENTS.filter((c) => {
    const matchesFilter = filter === "All" || c.status === filter;
    const matchesSearch =
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.contact.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalValue = MOCK_CLIENTS.reduce((s, c) => s + c.totalValueCr, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Client Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage client profiles, project portfolios, requirements, and communication history.
          </p>
        </div>
        {canCreate && (
          <Button className="bg-[hsl(25,99%,55%)] hover:bg-[hsl(25,99%,48%)] text-white gap-2 shrink-0" size="sm">
            <Plus size={16} /> Add Client
          </Button>
        )}
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Clients", value: MOCK_CLIENTS.length, icon: Users, color: "text-[hsl(213,65%,40%)]", bg: "bg-[hsl(213,65%,18%)]/10" },
          { label: "Active", value: MOCK_CLIENTS.filter(c => c.status === "Active" || c.status === "VIP").length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "In Planning", value: MOCK_CLIENTS.filter(c => c.status === "In Planning").length, icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Portfolio Value", value: `₹${totalValue.toFixed(0)}Cr`, icon: IndianRupee, color: "text-[hsl(25,99%,55%)]", bg: "bg-orange-50" },
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

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
          <input
            type="text"
            placeholder="Search by name, company, city or industry..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(25,99%,55%)]/30 focus:border-[hsl(25,99%,55%)]"
          />
        </div>
        <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                filter === f ? "bg-[hsl(213,65%,18%)] text-white" : "text-muted-foreground hover:bg-slate-50"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Showing <strong>{filtered.length}</strong> of {MOCK_CLIENTS.length} clients
      </p>

      {/* Client grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Building2 size={48} className="mx-auto mb-4 opacity-30" />
          <p className="font-medium">No clients found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
