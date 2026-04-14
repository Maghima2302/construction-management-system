import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Calendar } from "lucide-react";

export default function Scheduling() {
  return (
    <PlaceholderPage
      title="Project Timeline"
      description="Gantt-style milestone view and task progress by phase. Visualize every step of your project's development and stay ahead of schedule."
      icon={<Calendar size={48} />}
    />
  );
}

