import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_CLIENTS, MOCK_CLIENT_REQUIREMENT_HISTORY } from "@/constants/mockClients";
import { MOCK_PROJECTS } from "@/constants/mockProjects";

export default function ClientProfilePage() {
  const { id } = useParams();
  const client = MOCK_CLIENTS.find((item) => item.id === id) || MOCK_CLIENTS[0];
  const clientProjects = MOCK_PROJECTS.filter((project) => project.client === client.company);
  const requirementHistory = MOCK_CLIENT_REQUIREMENT_HISTORY[client.id] || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{client.company}</h1>
        <p className="text-sm text-muted-foreground">{client.name} • {client.industry}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-base">Project History</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {clientProjects.length === 0 ? (
              <p className="text-muted-foreground">No linked projects in current view.</p>
            ) : (
              clientProjects.map((project) => (
                <div key={project.id} className="rounded-md border border-border p-2">
                  <p className="font-medium">{project.name}</p>
                  <p className="text-xs text-muted-foreground">Status: {project.status} • Completion: {project.completion}%</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Requirement History</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {requirementHistory.map((entry) => (
              <div key={`${entry.date}-${entry.topic}`} className="rounded-md border border-border p-2">
                <p className="font-medium">{entry.topic}</p>
                <p className="text-xs text-muted-foreground">{entry.date} • Confidence {entry.confidence}%</p>
                <p className="text-xs text-muted-foreground mt-1">{entry.note}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">AI Generated Insight</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{client.aiInsight}</p>
            <p className="text-xs mt-3">Requirement maturity: {client.requirementMaturity}%</p>
            <p className="text-xs">Total budget: ${(client.totalBudget / 1000000).toFixed(1)}M</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
