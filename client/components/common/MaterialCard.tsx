import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MaterialRecord } from "@/constants/mockMaterials";

interface MaterialCardProps {
  material: MaterialRecord;
}

export default function MaterialCard({ material }: MaterialCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{material.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Cost: ${material.unitCost}</Badge>
          <Badge variant="secondary">Durability: {material.durability}/100</Badge>
          <Badge variant="secondary">Sustainability: {material.sustainability}/100</Badge>
        </div>
        <p className="text-muted-foreground">{material.aiExplanation}</p>
        <div className="rounded-md border border-border p-2 text-xs text-muted-foreground">
          <p>Cheaper: {material.cheaperAlternative}</p>
          <p>Stronger: {material.strongerAlternative}</p>
          <p>Eco: {material.ecoAlternative}</p>
        </div>
      </CardContent>
    </Card>
  );
}
