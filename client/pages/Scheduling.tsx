import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Calendar } from "lucide-react";

export default function Scheduling() {
  return (
    <PlaceholderPage
      title="Scheduling & Resource Planner"
      description="Plan, schedule, and optimize your project timelines with Gantt-style visualizations, resource allocation tools, and AI-powered recommendations for schedule optimization."
      icon={<Calendar size={48} />}
    />
  );
}
