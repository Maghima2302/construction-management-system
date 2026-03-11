import ModulePageShell from "@/components/common/ModulePageShell";

export default function MaterialComparePage() {
  return (
    <ModulePageShell
      title="Material Comparison"
      description="Side-by-side comparison of shortlisted materials with AI reasoning."
      sections={[
        "Comparison cards",
        "Performance matrix",
        "Cost vs durability insights",
        "Approval recommendation",
      ]}
    />
  );
}
