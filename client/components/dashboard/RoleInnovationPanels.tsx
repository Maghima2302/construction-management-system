import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/types/auth";

interface RoleInnovationPanelsProps {
  role: UserRole;
}

export default function RoleInnovationPanels({ role }: RoleInnovationPanelsProps) {
  if (role === "ARCHITECT") {
    return (
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Blueprint Insight Panel</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Design optimization suggestion: reduce west façade glazing by 12%.</p>
            <p>Lighting optimization: increase daylight autonomy to 68%.</p>
            <p>Ventilation analysis: shaft routing update improves airflow by 9%.</p>
            <p>Sustainability score: 87 / 100.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Smart Material Optimizer</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Cheaper alternative: hybrid ceramic panel (-10.8% cost).</p>
            <p>Stronger alternative: high-performance concrete (+7% load resilience).</p>
            <p>Eco alternative: low-clinker binder (-18% embodied carbon).</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (role === "ENGINEER") {
    return (
      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Structural Risk Prediction</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Structural risk score: 47 / 100</p>
            <p>Load capacity prediction: 91% confidence</p>
            <p>Foundation risk analysis: medium risk at Sector C</p>
            <p>Safety warning: settlement trend above baseline</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Construction Timeline AI Predictor</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Delay probability: 34%</p>
            <p>Optimization: +14 workers for slab cycle to recover 5 days</p>
            <p>Labor requirement next 2 weeks: 128 avg/day</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Site Progress Tracker</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Phase completion: Structure 78%</p>
            <p>Milestone tracking: 2 on track, 1 delayed</p>
            <p>Next critical checkpoint: Load test Apr 22</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (role === "PROJECT_MANAGER") {
    return (
      <Card>
        <CardHeader><CardTitle>Construction Timeline AI Predictor</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Project delay probability: 27%</p>
          <p>Schedule optimization: resequence MEP and facade overlap for 6-day gain</p>
          <p>Labor requirement forecast: +9% for next milestone sprint</p>
        </CardContent>
      </Card>
    );
  }

  return null;
}
