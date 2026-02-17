import { PlaceholderPage } from "@/components/PlaceholderPage";
import { DollarSign } from "lucide-react";

export default function Costs() {
  return (
    <PlaceholderPage
      title="Cost & Contract Manager"
      description="Track budgets, manage contracts, monitor change orders, and get AI-powered cost insights to keep your projects within budget and on track."
      icon={<DollarSign size={48} />}
    />
  );
}
