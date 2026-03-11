import ModulePageShell from "@/components/common/ModulePageShell";

export default function CostEstimationReportsPage() {
  return (
    <ModulePageShell
      title="Cost Estimation Reports"
      description="Export-ready reports for budget forecasting and variance analysis."
      sections={[
        "Budget forecast reports",
        "Variance by milestone",
        "Material alternative savings",
        "Export center",
      ]}
    />
  );
}
