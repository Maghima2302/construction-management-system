import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnalyticsChart from "@/components/charts/AnalyticsChart";

interface SupplierComparisonPanelProps {
  data: { name: string; price: number }[];
}

export default function SupplierComparisonPanel({ data }: SupplierComparisonPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <AnalyticsChart data={data} xKey="name" yKey="price" mode="bar" color="hsl(var(--primary))" />
      </CardContent>
    </Card>
  );
}
