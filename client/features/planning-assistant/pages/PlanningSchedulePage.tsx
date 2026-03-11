import DataTable from "@/components/common/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_PLANNING_TASKS } from "@/constants/mockPlanning";

export default function PlanningSchedulePage() {
  const rows = MOCK_PLANNING_TASKS.map((task) => ({
    task: task.taskName,
    duration: `${task.durationDays} days`,
    engineer: task.assignedEngineer,
    status: task.completionStatus,
    schedule: `${task.start} → ${task.end}`,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline Planner</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={[
            { key: "task", label: "Task Name" },
            { key: "duration", label: "Duration" },
            { key: "engineer", label: "Assigned Engineer" },
            { key: "status", label: "Completion Status" },
            { key: "schedule", label: "Schedule" },
          ]}
          rows={rows}
        />
      </CardContent>
    </Card>
  );
}
