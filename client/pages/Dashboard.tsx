import { Layout } from "@/components/Layout";
import { KPICard } from "@/components/KPICard";
import { ProjectCard } from "@/components/ProjectCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { BarChart3, Building2, AlertCircle, TrendingUp } from "lucide-react";
import { useState } from "react";

// Mock data
const kpiData = [
  {
    title: "Active Projects",
    value: 24,
    unit: "ongoing",
    icon: <Building2 size={24} />,
    trend: { value: 15, isPositive: true },
  },
  {
    title: "Ongoing Sites",
    value: 18,
    unit: "active",
    icon: <TrendingUp size={24} />,
    trend: { value: 8, isPositive: true },
  },
  {
    title: "Pending Approvals",
    value: 7,
    unit: "items",
    icon: <AlertCircle size={24} />,
    trend: { value: 12, isPositive: false },
  },
  {
    title: "Revenue Overview",
    value: "$2.4M",
    unit: "this quarter",
    icon: <BarChart3 size={24} />,
    trend: { value: 22, isPositive: true },
  },
];

const projectsData = [
  {
    id: "1",
    name: "Downtown Mixed-Use Development",
    location: "Downtown District",
    status: "in-progress" as const,
    progress: 65,
    team: 12,
    budget: "$4.2M",
    dueDate: "Mar 2024",
  },
  {
    id: "2",
    name: "Riverside Office Complex",
    location: "Riverside",
    status: "planning" as const,
    progress: 20,
    team: 8,
    budget: "$3.1M",
    dueDate: "Jun 2024",
  },
  {
    id: "3",
    name: "Airport Terminal Expansion",
    location: "Airport Zone",
    status: "in-progress" as const,
    progress: 45,
    team: 15,
    budget: "$8.5M",
    dueDate: "Sep 2024",
  },
];

const activitiesData = [
  {
    id: "1",
    title: "Design Approval Completed",
    description: "Downtown Mixed-Use Development received final design approval from city planning",
    timestamp: "2 hours ago",
    type: "approval" as const,
    icon: <BarChart3 size={16} />,
  },
  {
    id: "2",
    title: "Budget Alert",
    description: "Riverside Office Complex has exceeded budget allocation by 12%",
    timestamp: "5 hours ago",
    type: "warning" as const,
    icon: <AlertCircle size={16} />,
  },
  {
    id: "3",
    title: "Team Member Added",
    description: "Sarah Chen joined the Airport Terminal Expansion project team",
    timestamp: "1 day ago",
    type: "update" as const,
    icon: <Building2 size={16} />,
  },
  {
    id: "4",
    title: "Document Uploaded",
    description: "Safety compliance report uploaded for Downtown Mixed-Use Development",
    timestamp: "2 days ago",
    type: "info" as const,
    icon: <BarChart3 size={16} />,
  },
];

const upcomingDeadlines = [
  {
    title: "Foundation Inspection",
    project: "Downtown Mixed-Use Development",
    date: "Feb 28, 2024",
    priority: "high" as const,
  },
  {
    title: "Budget Review Meeting",
    project: "Riverside Office Complex",
    date: "Mar 5, 2024",
    priority: "medium" as const,
  },
  {
    title: "Site Safety Assessment",
    project: "Airport Terminal Expansion",
    date: "Mar 10, 2024",
    priority: "high" as const,
  },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your project overview.</p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid-dashboard mb-8">
          {kpiData.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              unit={kpi.unit}
              icon={kpi.icon}
              trend={kpi.trend}
            />
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Projects Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-1">Active Projects</h2>
              <p className="text-sm text-muted-foreground">Your most important projects at a glance</p>
            </div>

            <div className="grid-projects">
              {projectsData.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="glass-card p-6 rounded-xl h-fit">
            <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Deadlines</h3>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="pb-4 last:pb-0 border-b border-border last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm">{deadline.title}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        deadline.priority === "high"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                      }`}
                    >
                      {deadline.priority === "high" ? "Urgent" : "Standard"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{deadline.project}</p>
                  <p className="text-xs font-semibold text-accent">{deadline.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>
          <ActivityFeed activities={activitiesData} />
        </div>

        {/* AI Insight Card */}
        <div className="mt-8 glass-card p-6 rounded-xl bg-gradient-to-br from-accent/5 to-orange-500/5 border border-accent/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center text-accent flex-shrink-0">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">AI Insight: Schedule Optimization</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Based on historical data and current resource allocation, the Downtown Mixed-Use Development project can be accelerated by 2 weeks by optimizing the construction sequence. This would save approximately $180K in overhead costs.
              </p>
              <button className="text-sm font-medium text-accent hover:text-orange-600 transition-colors">
                View Recommendation →
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
