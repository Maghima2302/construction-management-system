import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface KPIItem {
  label: string;
  value: string;
  delta: string;
}

interface KPIGridProps {
  items: KPIItem[];
}

export default function KPIGrid({ items }: KPIGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{item.value}</p>
            <p className="text-xs text-accent mt-1">{item.delta}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
