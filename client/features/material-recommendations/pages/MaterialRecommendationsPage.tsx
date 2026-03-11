import MaterialCard from "@/components/common/MaterialCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnalyticsChart from "@/components/charts/AnalyticsChart";
import { MATERIAL_USAGE_SERIES, MOCK_MATERIALS } from "@/constants/mockMaterials";

export default function MaterialRecommendationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Material Recommendation (AI RAG)</h1>
        <p className="text-sm text-muted-foreground">AI recommended materials with cost, durability, sustainability and explainability.</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Material Usage Analytics</CardTitle></CardHeader>
          <CardContent>
            <AnalyticsChart data={MATERIAL_USAGE_SERIES} xKey="name" yKey="usage" mode="bar" color="hsl(var(--primary))" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Smart Material Optimizer</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Cheaper materials identified: 3</p>
            <p>Stronger alternatives identified: 2</p>
            <p>Eco-friendly swaps identified: 4</p>
            <p className="text-xs">Estimated savings potential: 8.9% project-wide.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {MOCK_MATERIALS.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>
    </div>
  );
}
