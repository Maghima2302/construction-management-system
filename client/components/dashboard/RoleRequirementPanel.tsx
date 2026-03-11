import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/types/auth";

const REQUIREMENTS_BY_ROLE: Record<UserRole, string[]> = {
  SUPER_ADMIN: [
    "Monitor platform-wide active/completed projects",
    "Track billing and organization performance",
    "Oversee AI recommendation adoption metrics",
    "Manage role access and governance",
  ],
  PROJECT_MANAGER: [
    "Track milestones, delays, and budget variance",
    "Assign teams to projects and monitor throughput",
    "Review AI requirement completion scores",
    "Approve material and cost recommendations",
  ],
  ARCHITECT: [
    "Review requirement interviews and design intent",
    "Validate material suitability and alternatives",
    "Coordinate blueprint and compliance decisions",
    "Submit design approvals with rationale",
  ],
  ENGINEER: [
    "Review AI reasoning and technical feasibility",
    "Approve or override civil engineering decisions",
    "Track execution logs and site technical blockers",
    "Validate cost estimation assumptions",
  ],
  CLIENT: [
    "Track project progress and completion confidence",
    "Monitor payment and budget summaries",
    "Review milestone approvals and updates",
    "View scope-level material/cost highlights",
  ],
};

interface RoleRequirementPanelProps {
  role: UserRole;
}

export default function RoleRequirementPanel({ role }: RoleRequirementPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {REQUIREMENTS_BY_ROLE[role].map((item) => (
            <li key={item} className="rounded-md border border-border p-2">
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
