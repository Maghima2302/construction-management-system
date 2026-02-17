import { PlaceholderPage } from "@/components/PlaceholderPage";
import { FolderOpen } from "lucide-react";

export default function Projects() {
  return (
    <PlaceholderPage
      title="Project Management"
      description="View, manage, and track all your construction and architecture projects in one centralized location with detailed progress tracking, resource allocation, and timeline management."
      icon={<FolderOpen size={48} />}
    />
  );
}
