import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SiteStatsGridProps {
  activeMachinery: number;
  laborAttendance: number;
  phase: string;
  dailyProgressPercent: number;
}

export default function SiteStatsGrid({ activeMachinery, laborAttendance, phase, dailyProgressPercent }: SiteStatsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card><CardHeader><CardTitle className="text-base">Active Machinery</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{activeMachinery}</CardContent></Card>
      <Card><CardHeader><CardTitle className="text-base">Labor Attendance</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{laborAttendance}</CardContent></Card>
      <Card><CardHeader><CardTitle className="text-base">Construction Phase</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{phase}</CardContent></Card>
      <Card><CardHeader><CardTitle className="text-base">Daily Progress</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{dailyProgressPercent}%</CardContent></Card>
    </div>
  );
}
