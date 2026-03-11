import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ModulePageShellProps {
  title: string;
  description: string;
  sections: string[];
}

export default function ModulePageShell({ title, description, sections }: ModulePageShellProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <Card key={section}>
            <CardHeader>
              <CardTitle className="text-base">{section}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">Sample data enabled</Badge>
              <p className="text-xs text-muted-foreground mt-3">
                Enterprise-ready scaffold for this module section.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
