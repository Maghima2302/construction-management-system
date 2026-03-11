import AIChatPanel from "@/components/common/AIChatPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const INTERVIEW_MESSAGES = [
  { role: "ai" as const, text: "What type of building are you planning?" },
  { role: "user" as const, text: "A mixed-use commercial tower with retail and office floors." },
  { role: "ai" as const, text: "How many floors and what is your target built-up area?" },
  { role: "user" as const, text: "24 floors and around 420,000 sq ft." },
  { role: "ai" as const, text: "What is your budget range and sustainability target?" },
  { role: "user" as const, text: "Budget is around $22M, aiming for IGBC Gold rating." },
];

export default function AIInterviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">AI Requirement Interview</h1>
        <p className="text-sm text-muted-foreground">Interactive AI questionnaire to extract complete construction requirements.</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AIChatPanel messages={INTERVIEW_MESSAGES} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Interview Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-md border border-border p-2">
              <p className="font-medium">Requirement completeness score</p>
              <p className="text-muted-foreground">91%</p>
            </div>
            <div className="rounded-md border border-border p-2">
              <p className="font-medium">Confidence level</p>
              <p className="text-muted-foreground">88%</p>
            </div>
            <div className="rounded-md border border-border p-2">
              <p className="font-medium">Extracted requirements</p>
              <ul className="text-xs text-muted-foreground mt-1 list-disc pl-4">
                <li>24-floor mixed-use structure</li>
                <li>Budget cap around $22M</li>
                <li>IGBC Gold sustainability objective</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
