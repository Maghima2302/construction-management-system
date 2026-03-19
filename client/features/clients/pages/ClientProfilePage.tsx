import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  BarChart3,
  IndianRupee,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_CLIENTS, ClientRecord } from "@/constants/mockClients";
import { MOCK_PROJECTS } from "@/constants/mockProjects";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<ClientRecord["status"], string> = {
  Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  VIP: "bg-amber-100 text-amber-700 border-amber-200",
  "In Planning": "bg-blue-100 text-blue-700 border-blue-200",
  Completed: "bg-slate-100 text-slate-600 border-slate-200",
};

const TABS = ["Overview", "Projects", "Requirements", "Communication"];

export default function ClientProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");

  const client = MOCK_CLIENTS.find((item) => item.id === id) || MOCK_CLIENTS[0];
  const clientProjects = MOCK_PROJECTS.filter((project) => project.client === client.name);

  const communications = [
    { type: "Meeting", subject: "Project kickoff review", date: "Mar 18, 2026", by: "Rahul Khanna", note: "Client confirmed LEED Gold target" },
    { type: "Email", subject: "Change order CO-037 approval", date: "Mar 16, 2026", by: "Client", note: "Solar addition approved" },
    { type: "Call", subject: "Budget review Q1 2026", date: "Mar 10, 2026", by: "Rahul Khanna", note: "No budget overrun concerns" },
    { type: "Report", subject: "Monthly progress report March 2026", date: "Mar 01, 2026", by: "Aura AI", note: "AI auto-generated and sent" },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/clients" className="hover:text-foreground flex items-center gap-1 transition-colors">
          <ArrowLeft size={14} /> Clients
        </Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">{client.name}</span>
      </div>

      {/* Profile header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[hsl(213,65%,18%)] to-[hsl(213,65%,35%)] flex items-center justify-center text-white text-lg font-bold shrink-0">
            {client.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-semibold">{client.name}</h1>
              <Badge className={cn("text-[10px] border", STATUS_STYLES[client.status])}>{client.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{client.industry} · {client.city}</p>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Mail size={11} /> {client.email}</span>
              <span className="flex items-center gap-1"><Phone size={11} /> {client.phone}</span>
              <span className="flex items-center gap-1"><Calendar size={11} /> Client since {new Date(client.joinedDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button size="sm" variant="outline" className="gap-2"><Mail size={14} /> Email</Button>
            <Button size="sm" className="bg-[hsl(25,99%,55%)] text-white hover:bg-[hsl(25,99%,48%)] gap-2"><Phone size={14} /> Call</Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-slate-100">
          <div className="text-center p-3 bg-[hsl(213,65%,18%)] text-white rounded-xl">
            <p className="text-xl font-bold">{client.activeProjects}</p>
            <p className="text-xs text-white/70">Active Projects</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <p className="text-xl font-bold">{client.totalValueCr > 0 ? `₹${client.totalValueCr}Cr` : "—"}</p>
            <p className="text-xs text-muted-foreground">Portfolio Value</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <p className={cn("text-xl font-bold", client.aiScore >= 90 ? "text-emerald-600" : "text-amber-600")}>
              {client.aiScore > 0 ? `${client.aiScore}%` : "—"}
            </p>
            <p className="text-xs text-muted-foreground">AI Req. Score</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
              activeTab === tab ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === "Overview" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Building2 size={14} /> Company Info</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Contact Person</span><span className="font-medium">{client.contact}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Industry</span><span className="font-medium">{client.industry}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">City</span><span className="font-medium">{client.city}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Client Since</span><span className="font-medium">{new Date(client.joinedDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge className={cn("text-[10px] border", STATUS_STYLES[client.status])}>{client.status}</Badge></div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[hsl(213,65%,18%)] to-[hsl(213,65%,30%)] text-white border-0">
            <CardHeader><CardTitle className="text-sm text-white/90 flex items-center gap-2"><Sparkles size={14} /> Aura AI Client Insight</CardTitle></CardHeader>
            <CardContent className="text-sm text-white/80 space-y-2">
              <p>AI Requirement Capture Score: <strong className="text-white">{client.aiScore > 0 ? `${client.aiScore}%` : "Interview pending"}</strong></p>
              <p>Portfolio Value: <strong className="text-white">{client.totalValueCr > 0 ? `₹${client.totalValueCr}Cr` : "Not yet contracted"}</strong></p>
              <p>Active Projects: <strong className="text-white">{client.activeProjects}</strong></p>
              {client.requirements.length > 0 && (
                <>
                  <p className="mt-3 text-white/70 text-xs font-medium">Top Requirements:</p>
                  {client.requirements.map((r) => (
                    <p key={r} className="text-xs text-white/80">• {r}</p>
                  ))}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab: Projects */}
      {activeTab === "Projects" && (
        <div className="space-y-3">
          {clientProjects.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <Building2 size={40} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm font-medium">No linked projects yet</p>
            </div>
          ) : (
            clientProjects.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`} className="block group">
                <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-[hsl(25,99%,55%)]/40 hover:shadow-sm transition-all">
                  <div className="flex-1">
                    <p className="font-medium text-sm group-hover:text-[hsl(25,99%,55%)] transition-colors">{project.name}</p>
                    <p className="text-xs text-muted-foreground">{project.type} · {project.location}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={cn("text-[10px] border",
                      project.status === "Active" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                        project.status === "Delayed" ? "bg-red-100 text-red-700 border-red-200" :
                          "bg-blue-100 text-blue-700 border-blue-200"
                    )}>{project.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-0.5">{project.completion}% complete</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      {/* Tab: Requirements */}
      {activeTab === "Requirements" && (
        <Card>
          <CardHeader><CardTitle className="text-sm">Client Requirements</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {client.requirements.map((req, i) => (
                <div key={req} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="h-6 w-6 rounded-full bg-[hsl(213,65%,18%)] text-white text-xs flex items-center justify-center shrink-0">{i + 1}</div>
                  <p className="text-sm">{req}</p>
                </div>
              ))}
            </div>
            <Button size="sm" className="mt-4 gap-2 bg-[hsl(25,99%,55%)] text-white hover:bg-[hsl(25,99%,48%)]">
              <Sparkles size={14} /> Re-interview with Aura
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tab: Communication */}
      {activeTab === "Communication" && (
        <div className="space-y-3">
          {communications.map((comm, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl">
              <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0",
                comm.type === "Meeting" ? "bg-blue-100 text-blue-700" :
                  comm.type === "Email" ? "bg-violet-100 text-violet-700" :
                    comm.type === "Call" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              )}>{comm.type[0]}</div>
              <div className="flex-1">
                <p className="text-sm font-medium">{comm.subject}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{comm.by} · {comm.date}</p>
                <p className="text-xs text-muted-foreground mt-1">{comm.note}</p>
              </div>
              <Badge variant="outline" className="text-[10px] shrink-0">{comm.type}</Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
