import { PlaceholderPage } from "@/components/PlaceholderPage";
import { BarChart3 } from "lucide-react";

export default function Reports() {
  return (
    <PlaceholderPage
      title="Reports"
      description="Generate comprehensive project reports including progress summaries, financial analytics, team performance metrics, and customizable dashboards for stakeholder communication."
      icon={<BarChart3 size={48} />}
    />
  );
}
