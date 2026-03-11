import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/common/DataTable";
import { MOCK_CLIENTS } from "@/constants/mockClients";

export default function ClientsPage() {
  const rows = MOCK_CLIENTS.map((client) => ({
    client: client.name,
    company: client.company,
    projects: `${client.activeProjects} active / ${client.completedProjects} done`,
    budget: `$${(client.totalBudget / 1000000).toFixed(1)}M`,
    status: client.status,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Client Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Client directory, requirement history and project association insights.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-base">Total Clients</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">{MOCK_CLIENTS.length}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Portfolio Budget</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">
            ${(MOCK_CLIENTS.reduce((sum, client) => sum + client.totalBudget, 0) / 1000000).toFixed(1)}M
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Avg Requirement Maturity</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">
            {Math.round(MOCK_CLIENTS.reduce((sum, client) => sum + client.requirementMaturity, 0) / MOCK_CLIENTS.length)}%
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable
            columns={[
              { key: "client", label: "Client Name" },
              { key: "company", label: "Company" },
              { key: "projects", label: "Project Count" },
              { key: "budget", label: "Budget" },
              { key: "status", label: "Project Status" },
            ]}
            rows={rows}
          />
          <div className="flex flex-wrap gap-2">
            {MOCK_CLIENTS.map((client) => (
              <Link key={client.id} to={`/clients/${client.id}`} className="text-sm text-accent hover:underline">
                View {client.company} profile →
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
