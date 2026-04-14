import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  FileText,
  DollarSign,
  Activity,
  Sparkles,
  Target,
  Flag,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMyProjectDetail } from "@/hooks/useMyProjectDetail";
import { useMilestones } from "@/hooks/useMilestones";

const milestoneStatusStyles: Record<string, string> = {
  COMPLETED: "bg-green-50 text-green-700 border-green-200",
  IN_PROGRESS: "bg-blue-50 text-blue-700 border-blue-200",
  DELAYED: "bg-red-50 text-red-700 border-red-200",
  PENDING: "bg-gray-50 text-gray-700 border-gray-200",
};

function formatDate(value: string) {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString();
}

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const { data: project, isLoading, error } = useMyProjectDetail(id);
  const {
    milestones,
    isLoading: milestonesLoading,
    error: milestonesError,
  } = useMilestones(id, undefined, activeTab === "milestones");

  if (isLoading) {
    return <div className="p-6 md:p-8 text-center text-muted-foreground">Loading project details...</div>;
  }

  if (error || !project) {
    return (
      <div className="p-6 md:p-8 text-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <p className="text-muted-foreground mt-2">{error || "The requested project does not exist."}</p>
        <Button asChild className="mt-6">
          <Link to="/projects"><ArrowLeft size={16} className="mr-2" />Back to Projects</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Button variant="ghost" size="sm" asChild className="px-2">
              <Link to="/projects"><ArrowLeft size={16} /></Link>
            </Button>
            <span>Project Details</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <p className="text-muted-foreground mt-1">{project.location}</p>
          </div>
        </div>
        <Button asChild className="gap-2" variant="outline">
          <Link to="/projects/milestones">
            <Flag size={16} /> All Milestones
          </Link>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Status</p><p className="text-2xl font-bold mt-1">{project.status}</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Progress</p><p className="text-2xl font-bold mt-1 text-emerald-600">{project.progressPercentage}%</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Priority</p><p className="text-2xl font-bold mt-1 text-amber-600">{project.priority}</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Budget</p><p className="text-2xl font-bold mt-1">₹{(project.budget / 100000).toFixed(1)}L</p></CardContent></Card>
          </div>

          <Card>
            <CardContent className="p-4 grid gap-4 md:grid-cols-4 text-sm">
              <div className="flex items-center gap-2"><Building2 size={16} className="text-muted-foreground" /><span>{project.location}</span></div>
              <div className="flex items-center gap-2"><MapPin size={16} className="text-muted-foreground" /><span>{project.description}</span></div>
              <div className="flex items-center gap-2"><Calendar size={16} className="text-muted-foreground" /><span>{project.startDate} → {project.endDate}</span></div>
              <div className="flex items-center gap-2"><DollarSign size={16} className="text-muted-foreground" /><span>Updated {project.updatedAt ? new Date(project.updatedAt).toLocaleString() : "-"}</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2"><FileText size={14} /> Project Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>This detail view is powered by the new client project detail API.</p>
              <p className="flex items-center gap-2"><Activity size={14} /> Created at: {project.createdAt ? new Date(project.createdAt).toLocaleString() : "-"}</p>
              <p className="flex items-center gap-2"><Sparkles size={14} /> Last updated: {project.updatedAt ? new Date(project.updatedAt).toLocaleString() : "-"}</p>
              <Button className="bg-[hsl(25,99%,55%)] text-white hover:bg-[hsl(25,99%,48%)] gap-2 w-fit">
                <Target size={14} /> Ask Aura
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          {milestonesLoading && (
            <Card>
              <CardContent className="p-6 text-sm text-muted-foreground">Loading milestones...</CardContent>
            </Card>
          )}

          {milestonesError && (
            <Card className="border-destructive bg-destructive/10">
              <CardContent className="p-6 text-sm text-destructive">
                Failed to load milestones.
              </CardContent>
            </Card>
          )}

          {!milestonesLoading && !milestonesError && milestones.length === 0 && (
            <Card>
              <CardContent className="p-6 text-sm text-muted-foreground">No milestones found for this project.</CardContent>
            </Card>
          )}

          {!milestonesLoading && !milestonesError && milestones.length > 0 && (
            <div className="space-y-3">
              {milestones.map((milestone, index) => (
                <Card key={milestone.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Milestone {index + 1}</p>
                        <h3 className="text-base font-semibold mt-1">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{milestone.description || "No description"}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Due: {formatDate(milestone.dueDate)}
                        </p>
                      </div>
                      <Badge className={milestoneStatusStyles[milestone.status] ?? milestoneStatusStyles.PENDING}>
                        {milestone.status === "COMPLETED" && <CheckCircle2 size={12} className="mr-1" />}
                        {milestone.status === "IN_PROGRESS" && <Clock size={12} className="mr-1" />}
                        {milestone.status === "DELAYED" && <AlertTriangle size={12} className="mr-1" />}
                        {milestone.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}