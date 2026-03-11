import ModulePageShell from "@/components/common/ModulePageShell";

export default function AIInterviewHistoryPage() {
  return (
    <ModulePageShell
      title="AI Interview History"
      description="View previous requirement interviews, confidence scores, and revisions."
      sections={[
        "Session timeline",
        "Captured responses",
        "Confidence trend",
        "Revision comparison",
      ]}
    />
  );
}
