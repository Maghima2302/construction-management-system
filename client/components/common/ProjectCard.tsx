import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectRecord } from "@/constants/mockProjects";

interface ProjectCardProps {
  project: ProjectRecord;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{project.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p className="text-muted-foreground">{project.client} • {project.location}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Completion: {project.completion}%</Badge>
          <Badge variant={project.status === "Delayed" ? "destructive" : "secondary"}>{project.status}</Badge>
          <Badge variant="secondary">Risk: {project.riskScore}</Badge>
        </div>
        <p className="text-xs text-muted-foreground">Budget: ${(project.budgetActual / 1000000).toFixed(2)}M / ${(project.budgetPlanned / 1000000).toFixed(2)}M</p>
      </CardContent>
    </Card>
  );
}
