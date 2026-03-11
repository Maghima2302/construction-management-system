import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CreateProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Create Project</h1>
        <p className="text-sm text-muted-foreground">Initiate a new construction project with AI-assisted baseline planning.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Initialization Form</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <input className="rounded-md border border-input px-3 py-2" placeholder="Project Name" />
          <input className="rounded-md border border-input px-3 py-2" placeholder="Client Company" />
          <input className="rounded-md border border-input px-3 py-2" placeholder="Project Location" />
          <input className="rounded-md border border-input px-3 py-2" placeholder="Estimated Budget" />
          <textarea className="md:col-span-2 rounded-md border border-input px-3 py-2" placeholder="AI Requirement Summary" rows={4} />
          <div className="md:col-span-2">
            <Button>Create Draft Project</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
