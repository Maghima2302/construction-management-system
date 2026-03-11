import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface TrendPoint {
  name: string;
  value: number;
}

export interface ActivityItem {
  title: string;
  timestamp: string;
  status: "success" | "warning" | "info";
}

export interface TimelineRow {
  project: string;
  milestone: string;
  dueDate: string;
  status: "On Track" | "At Risk" | "Delayed";
}

interface DashboardWidgetsProps {
  trendData: TrendPoint[];
  budgetData: TrendPoint[];
  activities: ActivityItem[];
  timeline: TimelineRow[];
}

const STATUS_VARIANT: Record<TimelineRow["status"], "default" | "destructive" | "secondary"> = {
  "On Track": "default",
  "At Risk": "secondary",
  Delayed: "destructive",
};

export default function DashboardWidgets({ trendData, budgetData, activities, timeline }: DashboardWidgetsProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Project Timeline Status</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--accent))" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Panel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activities.map((activity) => (
            <div key={`${activity.title}-${activity.timestamp}`} className="rounded-md border border-border p-3">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Budget Status</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Milestones Timeline View</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Milestone</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeline.map((row) => (
                <TableRow key={`${row.project}-${row.milestone}`}>
                  <TableCell className="font-medium">{row.project}</TableCell>
                  <TableCell>{row.milestone}</TableCell>
                  <TableCell>{row.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[row.status]}>{row.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
