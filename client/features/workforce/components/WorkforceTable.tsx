import DataTable from "@/components/common/DataTable";

interface WorkforceTableProps {
  rows: { employee: string; role: string; project: string; performance: string }[];
}

export default function WorkforceTable({ rows }: WorkforceTableProps) {
  return (
    <DataTable
      columns={[
        { key: "employee", label: "Employee Name" },
        { key: "role", label: "Role" },
        { key: "project", label: "Project Assigned" },
        { key: "performance", label: "Performance Score" },
      ]}
      rows={rows}
    />
  );
}
