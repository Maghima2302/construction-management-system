import { PlaceholderPage } from "@/components/PlaceholderPage";
import { HardHat } from "lucide-react";


export default function Projects() {
  return (
    <PlaceholderPage
      title="My Projects"
      description="List of all projects (ongoing, completed, pending) with status badges. Track every detail of your construction journey from inception to completion."
      icon={<HardHat size={48} />}
    />
  );
}

