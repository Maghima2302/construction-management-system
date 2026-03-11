import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ALTERNATIVE_MATERIAL_SUGGESTIONS, COST_BREAKDOWN, ESTIMATION_SUMMARY } from "@/constants/mockCostEstimation";

export default function CostEstimationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Cost Estimation</h1>
        <p className="text-sm text-muted-foreground">Material, labor and equipment cost intelligence with alternative suggestions.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader><CardTitle className="text-base">Material Cost</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">${(ESTIMATION_SUMMARY.materialCost / 1000000).toFixed(2)}M</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">Labor Estimation</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">${(ESTIMATION_SUMMARY.laborCost / 1000000).toFixed(2)}M</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">Equipment Cost</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">${(ESTIMATION_SUMMARY.equipmentCost / 1000000).toFixed(2)}M</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">Total Estimation</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">${(ESTIMATION_SUMMARY.totalEstimated / 1000000).toFixed(2)}M</CardContent></Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Cost Distribution</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={COST_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} label>
                  {COST_BREAKDOWN.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Estimation Confidence</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>Expected variance: {ESTIMATION_SUMMARY.expectedVariance}%</p>
            <p className="mt-2">AI confidence: 89%</p>
            <p className="mt-2">Benchmark: Similar projects in same category are within ±6.1% variance.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Alternative Cheaper Material Suggestions</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          {ALTERNATIVE_MATERIAL_SUGGESTIONS.map((item) => (
            <div key={item.current} className="rounded-md border border-border p-3">
              <p className="font-medium">{item.current} → {item.suggested}</p>
              <p className="text-muted-foreground mt-1">Potential savings: {item.savingsPercent}%</p>
              <p className="text-xs text-muted-foreground mt-1">{item.note}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
