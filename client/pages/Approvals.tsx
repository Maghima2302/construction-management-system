import { PlaceholderPage } from "@/components/PlaceholderPage";
import { CheckCircle2 } from "lucide-react";

export default function Approvals() {
  return (
    <PlaceholderPage
      title="Approvals"
      description="Track and manage pending design approvals, change requests, and your approval history in one centralized location."
      icon={<CheckCircle2 size={48} />}
    />
  );
}
