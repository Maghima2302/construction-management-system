import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Timeline from "@/components/common/Timeline";
import AnalyticsChart from "@/components/charts/AnalyticsChart";
import { MOCK_PROJECTS, PROJECT_PROGRESS_SERIES } from "@/constants/mockProjects";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const project = MOCK_PROJECTS.find((item) => item.id === id) || MOCK_PROJECTS[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{project.name}</h1>
        <p className="text-sm text-muted-foreground">{project.type} • {project.location} • {project.client}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader><CardTitle className="text-base">Completion %</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{project.completion}%</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">Delay Prediction</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{project.delayRisk}%</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">Risk Score</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{project.riskScore}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">Resource Allocation</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{project.resourceUtilization}%</CardContent></Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Project Timeline Progress</CardTitle></CardHeader>
          <CardContent>
            <AnalyticsChart data={PROJECT_PROGRESS_SERIES} xKey="month" yKey="progress" mode="line" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Assigned Team</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {project.assignedTeam.map((member) => (
              <div key={member} className="rounded-md border border-border p-2">{member}</div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Milestones</CardTitle></CardHeader>
        <CardContent>
          <Timeline
            items={project.milestones.map((item) => ({
              title: `${item.name} (${item.completion}%)`,
              date: item.dueDate,
              status: item.status,
            }))}
          />
        </CardContent>
      </Card>
    </div>
  );
}
