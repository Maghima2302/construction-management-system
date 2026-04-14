import { PlaceholderPage } from "@/components/PlaceholderPage";
import { MessageSquare } from "lucide-react";

export default function Messages() {
  return (
    <PlaceholderPage
      title="Messages"
      description="Direct communication portal with your architects, engineers, and project managers. Keep all project discussions organized."
      icon={<MessageSquare size={48} />}
    />
  );
}
