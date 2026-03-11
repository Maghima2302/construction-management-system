import { UserRole } from "@/types/auth";
import { ActivityItem, TimelineRow, TrendPoint } from "@/components/dashboard/DashboardWidgets";
import { KPIItem } from "@/components/dashboard/KPIGrid";

interface DashboardData {
  title: string;
  subtitle: string;
  kpis: KPIItem[];
  trendData: TrendPoint[];
  budgetData: TrendPoint[];
  activities: ActivityItem[];
  timeline: TimelineRow[];
  notifications: string[];
  riskAlerts: string[];
  upcomingMilestones: string[];
}

const progressSeries: TrendPoint[] = [
  { name: "Jan", value: 61 },
  { name: "Feb", value: 66 },
  { name: "Mar", value: 69 },
  { name: "Apr", value: 73 },
  { name: "May", value: 77 },
  { name: "Jun", value: 82 },
];

const budgetSeries: TrendPoint[] = [
  { name: "P1", value: 86 },
  { name: "P2", value: 91 },
  { name: "P3", value: 79 },
  { name: "P4", value: 88 },
  { name: "P5", value: 83 },
];

const commonActivities: ActivityItem[] = [
  { title: "AI requirement package finalized for Skyline Corporate Tower", timestamp: "12 min ago", status: "success" },
  { title: "Material optimizer suggested 9.2% saving alternative", timestamp: "31 min ago", status: "info" },
  { title: "Delay predictor raised caution for GreenField Phase II", timestamp: "48 min ago", status: "warning" },
  { title: "Engineer approval required on structural override", timestamp: "1 hr ago", status: "info" },
];

const commonTimeline: TimelineRow[] = [
  { project: "Skyline Corporate Tower", milestone: "Facade Completion", dueDate: "Apr 20", status: "On Track" },
  { project: "GreenField Phase II", milestone: "Block B Slab", dueDate: "Apr 24", status: "At Risk" },
  { project: "EcoBuild Plant", milestone: "MEP Handover", dueDate: "Apr 30", status: "Delayed" },
];

export const DASHBOARD_DATA_BY_ROLE: Record<UserRole, DashboardData> = {
  SUPER_ADMIN: {
    title: "Super Admin Control Center",
    subtitle: "Portfolio intelligence across organizations, billing, and AI adoption",
    kpis: [
      { label: "Active Projects", value: "142", delta: "+8 this month" },
      { label: "Completed Projects", value: "61", delta: "+5 this quarter" },
      { label: "Delayed Projects", value: "17", delta: "-2 vs last month" },
      { label: "Total Budget", value: "$248M", delta: "91% utilized" },
      { label: "Resource Utilization", value: "84%", delta: "+3.1% efficiency" },
      { label: "AI Requirement Score", value: "92%", delta: "+2.4% quality" },
    ],
    trendData: progressSeries,
    budgetData: budgetSeries,
    activities: commonActivities,
    timeline: commonTimeline,
    notifications: [
      "3 organizations crossed AI recommendation usage threshold.",
      "2 critical risk alerts escalated for executive review.",
    ],
    riskAlerts: [
      "GreenField project delay probability exceeds 42%.",
      "Budget overrun trend detected in 2 infrastructure programs.",
    ],
    upcomingMilestones: [
      "Portfolio review board - Apr 18",
      "Quarterly compliance closure - Apr 21",
    ],
  },
  PROJECT_MANAGER: {
    title: "Project Manager Dashboard",
    subtitle: "Execution clarity for delivery, budget, and schedule commitments",
    kpis: [
      { label: "Active Projects", value: "24", delta: "+3 this sprint" },
      { label: "Completed Projects", value: "11", delta: "+1 this month" },
      { label: "Delayed Projects", value: "4", delta: "needs mitigation" },
      { label: "Total Budget", value: "$67.4M", delta: "88% utilized" },
      { label: "Resource Utilization", value: "82%", delta: "+2.1%" },
      { label: "AI Requirement Score", value: "90%", delta: "+4.0% this week" },
    ],
    trendData: progressSeries,
    budgetData: budgetSeries,
    activities: commonActivities,
    timeline: commonTimeline,
    notifications: [
      "Labor optimization opportunity identified for Skyline project.",
      "1 vendor response pending for steel procurement package.",
    ],
    riskAlerts: ["GreenField Block B schedule risk elevated to medium-high."],
    upcomingMilestones: ["Skyline facade sign-off - Apr 20", "GreenField safety audit - Apr 23"],
  },
  ARCHITECT: {
    title: "Architect Design Intelligence",
    subtitle: "Blueprint quality, design optimization, and sustainability insight",
    kpis: [
      { label: "Active Projects", value: "13", delta: "design stream active" },
      { label: "Completed Projects", value: "8", delta: "handover ready" },
      { label: "Delayed Projects", value: "2", delta: "linked to revisions" },
      { label: "Total Budget", value: "$39.8M", delta: "design scope controlled" },
      { label: "Resource Utilization", value: "79%", delta: "studio bandwidth stable" },
      { label: "AI Requirement Score", value: "88%", delta: "+2.5%" },
    ],
    trendData: progressSeries,
    budgetData: budgetSeries,
    activities: commonActivities,
    timeline: commonTimeline,
    notifications: [
      "Blueprint Insight Panel flagged daylight optimization opportunity.",
      "Ventilation score for GreenField increased after shaft revision.",
    ],
    riskAlerts: ["Facade redesign may impact MEP schedule by 6 days."],
    upcomingMilestones: ["Design freeze checkpoint - Apr 19", "Sustainability audit - Apr 25"],
  },
  ENGINEER: {
    title: "Civil Engineer Execution Hub",
    subtitle: "Structural safety, construction risk and site progress control",
    kpis: [
      { label: "Active Projects", value: "16", delta: "field monitored" },
      { label: "Completed Projects", value: "9", delta: "+2 this quarter" },
      { label: "Delayed Projects", value: "5", delta: "2 critical" },
      { label: "Total Budget", value: "$44.3M", delta: "89% utilization" },
      { label: "Resource Utilization", value: "86%", delta: "+3.8%" },
      { label: "AI Requirement Score", value: "87%", delta: "quality improving" },
    ],
    trendData: progressSeries,
    budgetData: budgetSeries,
    activities: commonActivities,
    timeline: commonTimeline,
    notifications: [
      "Structural risk score increased for GreenField Block A columns.",
      "Timeline AI predictor suggests labor increase for week 17.",
    ],
    riskAlerts: [
      "Foundation settlement warning at Sector C excavation pit.",
      "Weather impact probability: 34% next 10 days.",
    ],
    upcomingMilestones: ["Load test window - Apr 22", "Concrete quality audit - Apr 26"],
  },
  CLIENT: {
    title: "Client Progress Dashboard",
    subtitle: "Transparent project visibility with budget and milestone confidence",
    kpis: [
      { label: "Active Projects", value: "3", delta: "in execution" },
      { label: "Completed Projects", value: "1", delta: "last quarter" },
      { label: "Delayed Projects", value: "1", delta: "mitigation active" },
      { label: "Total Budget", value: "$14.8M", delta: "93% aligned" },
      { label: "Resource Utilization", value: "80%", delta: "stable" },
      { label: "AI Requirement Score", value: "89%", delta: "high confidence" },
    ],
    trendData: progressSeries,
    budgetData: budgetSeries,
    activities: commonActivities,
    timeline: commonTimeline,
    notifications: ["Milestone payment trigger expected in 5 days."],
    riskAlerts: ["Tower-2 handover forecast moved by 4 days."],
    upcomingMilestones: ["Client walkthrough - Apr 27", "Phase handover draft - Apr 30"],
  },
};
