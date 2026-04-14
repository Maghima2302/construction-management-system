import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Profile, password, and notification preferences. Customize your experience on the ConstructAI platform."
      icon={<Settings size={48} />}
    />
  );
}

