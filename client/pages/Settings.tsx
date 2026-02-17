import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Manage your account preferences, team members, permissions, integrations, notifications, and system configurations for your organization."
      icon={<Settings size={48} />}
    />
  );
}
