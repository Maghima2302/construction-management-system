import BlueprintAnalysisPanel from "@/components/common/BlueprintAnalysisPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BLUEPRINT_ANALYSIS_RESULT, BLUEPRINT_AI_INSIGHTS } from "@/constants/mockBlueprintAnalysis";
import BlueprintUploadMock from "@/features/blueprint-analyzer/components/BlueprintUploadMock";

export default function BlueprintAnalyzerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">AI Blueprint Analyzer</h1>
        <p className="text-sm text-muted-foreground">Architect-focused structural, ventilation, and lighting intelligence.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Blueprint Upload (Mock)</CardTitle></CardHeader>
        <CardContent>
          <BlueprintUploadMock />
        </CardContent>
      </Card>

      <BlueprintAnalysisPanel
        structuralStrengthScore={BLUEPRINT_ANALYSIS_RESULT.structuralStrengthScore}
        ventilationScore={BLUEPRINT_ANALYSIS_RESULT.ventilationScore}
        energyEfficiencyScore={BLUEPRINT_ANALYSIS_RESULT.energyEfficiencyScore}
        insights={BLUEPRINT_AI_INSIGHTS}
      />
    </div>
  );
}
