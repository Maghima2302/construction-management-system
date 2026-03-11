import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnalyticsChart from "@/components/charts/AnalyticsChart";
import SustainabilityScoreCard from "@/components/common/SustainabilityScoreCard";
import { CARBON_EMISSION_SERIES, ECO_RECOMMENDATIONS, MATERIAL_SUSTAINABILITY_RATINGS, SUSTAINABILITY_METRICS } from "@/constants/mockSustainability";
import CarbonInsightsPanel from "@/features/sustainability/components/CarbonInsightsPanel";

export default function SustainabilityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Construction Sustainability Analyzer</h1>
        <p className="text-sm text-muted-foreground">Carbon footprint estimation, energy scoring, and eco-material optimization.</p>
      </div>

      <SustainabilityScoreCard
        sustainabilityScore={SUSTAINABILITY_METRICS.sustainabilityScore}
        carbonEmissionEstimateTons={SUSTAINABILITY_METRICS.carbonEmissionEstimateTons}
        greenMaterialPercentage={SUSTAINABILITY_METRICS.greenMaterialPercentage}
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Carbon Emission Graph</CardTitle></CardHeader>
          <CardContent>
            <AnalyticsChart data={CARBON_EMISSION_SERIES} xKey="month" yKey="emission" mode="line" />
          </CardContent>
        </Card>
        <CarbonInsightsPanel notes={ECO_RECOMMENDATIONS} />
      </div>

      <Card>
        <CardHeader><CardTitle>Material Sustainability Ratings</CardTitle></CardHeader>
        <CardContent>
          <AnalyticsChart data={MATERIAL_SUSTAINABILITY_RATINGS} xKey="material" yKey="rating" mode="bar" color="hsl(var(--primary))" />
        </CardContent>
      </Card>
    </div>
  );
}
