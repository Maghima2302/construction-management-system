import { PlaceholderPage } from "@/components/PlaceholderPage";
import { BarChart3 } from "lucide-react";

export default function Reports() {
  return (
    <PlaceholderPage
      title="Reports"
      description="Downloadable progress reports, resource utilization, and schedule summaries to keep all stakeholders informed."
      icon={<BarChart3 size={48} />}
    />
  );
}

