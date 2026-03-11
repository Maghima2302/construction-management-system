import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/common/DataTable";

const DECISION_LOG_ROWS = [
  {
    decisionId: "DL-901",
    aiDecision: "Switch to fly ash bricks for Tower-2 walls",
    engineerApproval: "Approved",
    architectOverride: "No",
    revision: "Rev-3",
  },
  {
    decisionId: "DL-902",
    aiDecision: "Increase reinforcement at transfer slab",
    engineerApproval: "Pending",
    architectOverride: "No",
    revision: "Rev-2",
  },
  {
    decisionId: "DL-903",
    aiDecision: "Ventilation duct layout optimization",
    engineerApproval: "Approved",
    architectOverride: "Yes",
    revision: "Rev-5",
  },
];

export default function DecisionLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Decision Logs</h1>
        <p className="text-sm text-muted-foreground">AI reasoning logs with engineering approvals, overrides and revision history.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Decision Workflow Register</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: "decisionId", label: "Decision ID" },
              { key: "aiDecision", label: "AI Decision Explanation" },
              { key: "engineerApproval", label: "Engineer Approval" },
              { key: "architectOverride", label: "Architect Override" },
              { key: "revision", label: "Design Revision" },
            ]}
            rows={DECISION_LOG_ROWS}
          />
        </CardContent>
      </Card>
    </div>
  );
}
