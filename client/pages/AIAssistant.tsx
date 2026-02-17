import { PlaceholderPage } from "@/components/PlaceholderPage";
import { MessageSquare } from "lucide-react";

export default function AIAssistant() {
  return (
    <PlaceholderPage
      title="AI Assistant"
      description="Chat with our AI assistant to get project recommendations, schedule optimizations, risk assessments, and instant answers to your construction and architecture questions."
      icon={<MessageSquare size={48} />}
    />
  );
}
