import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RiskScoreCardProps {
  title: string;
  score: number;
  subtitle?: string;
}

export default function RiskScoreCard({ title, score, subtitle }: RiskScoreCardProps) {
  const severity = score >= 65 ? "High" : score >= 40 ? "Medium" : "Low";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{score}</p>
        <p className="text-xs text-muted-foreground mt-1">Risk Level: {severity}</p>
        {subtitle ? <p className="text-xs text-muted-foreground mt-2">{subtitle}</p> : null}
      </CardContent>
    </Card>
  );
}
