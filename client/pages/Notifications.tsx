import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Bell } from "lucide-react";

export default function Notifications() {
  return (
    <PlaceholderPage
      title="Notifications"
      description="Stay updated with real-time alerts for milestones reached, approval requests, and potential project delays."
      icon={<Bell size={48} />}
    />
  );
}
