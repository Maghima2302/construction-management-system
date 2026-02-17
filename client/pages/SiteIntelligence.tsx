import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Camera } from "lucide-react";

export default function SiteIntelligence() {
  return (
    <PlaceholderPage
      title="Site Intelligence"
      description="Upload site images, detect defects using AI vision, track safety issues, and monitor site progress with automated insights and safety alerts."
      icon={<Camera size={48} />}
    />
  );
}
