import { PlaceholderPage } from "@/components/PlaceholderPage";
import { FileText } from "lucide-react";

export default function Documents() {
  return (
    <PlaceholderPage
      title="Documents"
      description="Blueprints, contracts, drawings, reports — view, download, and track version history all in one place."
      icon={<FileText size={48} />}
    />
  );
}

