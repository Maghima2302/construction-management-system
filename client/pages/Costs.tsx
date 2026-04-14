import { PlaceholderPage } from "@/components/PlaceholderPage";
import { DollarSign } from "lucide-react";

export default function Costs() {
  return (
    <PlaceholderPage
      title="Budget & Costs"
      description="Estimated vs. actual cost, payment schedule, and detailed cost breakdown to ensure your project stays financially on track."
      icon={<DollarSign size={48} />}
    />
  );
}

