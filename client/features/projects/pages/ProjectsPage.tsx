import { Link } from "react-router-dom";
import ProjectCard from "@/components/common/ProjectCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_PROJECTS } from "@/constants/mockProjects";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Project Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Project overview, milestones, budget tracking and risk prediction.</p>
        </div>
        <Link to="/projects/create" className="text-sm text-accent hover:underline">+ Create project</Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Active Projects</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">{MOCK_PROJECTS.filter((p) => p.status === "Active").length}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Completed Projects</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">{MOCK_PROJECTS.filter((p) => p.status === "Completed").length}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Delayed Projects</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">{MOCK_PROJECTS.filter((p) => p.status === "Delayed").length}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Average Risk Score</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">
            {Math.round(MOCK_PROJECTS.reduce((sum, p) => sum + p.riskScore, 0) / MOCK_PROJECTS.length)}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {MOCK_PROJECTS.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`}>
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
    </div>
  );
}
