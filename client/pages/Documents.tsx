import { PlaceholderPage } from "@/components/PlaceholderPage";
import { FileText } from "lucide-react";

export default function Documents() {
  return (
    <PlaceholderPage
      title="Documents & BIM Hub"
      description="Centralize all project documents, BIM models, technical drawings, and specifications with version control, metadata management, and easy collaboration."
      icon={<FileText size={48} />}
    />
  );
}
