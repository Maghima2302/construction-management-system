import AIChatPanel from "@/components/common/AIChatPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import KnowledgeCards from "@/features/construction-knowledge/components/KnowledgeCards";

const KNOWLEDGE_CHAT = [
  { role: "user" as const, text: "What is the minimum stair width for commercial buildings in this project class?" },
  { role: "ai" as const, text: "For the selected occupancy type, recommended minimum clear stair width is 1.5m; verify local NBC adaptation for final compliance." },
  { role: "user" as const, text: "Explain fire rating requirement for core walls." },
  { role: "ai" as const, text: "Core walls typically require a 2-hour fire rating in high-rise applications. Cross-check authority having jurisdiction before issue-for-construction." },
];

const KNOWLEDGE_CARDS = [
  "Code Lookup: NBC structural design load combinations",
  "Regulation Guide: Fire egress and refuge area compliance",
  "Best Practice: Concrete curing quality checklist",
  "AI Brief: Common causes of schedule slippage in slab cycles",
];

export default function ConstructionKnowledgePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Construction Knowledge AI</h1>
        <p className="text-sm text-muted-foreground">AI assistant for code lookup, regulation clarification, and construction best-practice guidance.</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AIChatPanel messages={KNOWLEDGE_CHAT} />
        </div>
        <Card>
          <CardHeader><CardTitle>Searchable Knowledge Cards</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <KnowledgeCards cards={KNOWLEDGE_CARDS} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
