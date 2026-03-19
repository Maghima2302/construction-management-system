// Mock Notifications — AI-CMS v3 Full Specification

export type NotificationSeverity = "Critical" | "Warning" | "Info";
export type NotificationCategory = "safety" | "cost" | "schedule" | "ai" | "approval" | "blueprint" | "risk" | "compliance";

export interface NotificationItem {
    id: string;
    type: NotificationCategory;
    severity: NotificationSeverity;
    title: string;
    project?: string;
    projectId?: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    actionLabel: string;
    actionRoute: string;
    targetRoles: string[];
}

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
    {
        id: "NTF-001",
        type: "safety",
        severity: "Critical",
        title: "PPE Violation Detected",
        project: "Skyline Corporate Tower",
        projectId: "PRJ-1001",
        message: "Worker without helmet detected on Camera 4B, Zone 3 Floor 22. Safety Officer alerted.",
        timestamp: "2026-03-20T10:42:00",
        isRead: false,
        actionLabel: "Assign to Safety Officer",
        actionRoute: "/site-monitoring",
        targetRoles: ["SUPER_ADMIN", "PROJECT_MANAGER", "ENGINEER"],
    },
    {
        id: "NTF-002",
        type: "cost",
        severity: "Warning",
        title: "Budget Over-run Alert",
        project: "GreenField Residences Phase II",
        projectId: "PRJ-1002",
        message: "Structural Steel line item is 8.1% over budget — ₹12.4L overrun detected this week.",
        timestamp: "2026-03-20T09:15:00",
        isRead: false,
        actionLabel: "Review Cost Estimation",
        actionRoute: "/cost-estimation",
        targetRoles: ["SUPER_ADMIN", "PROJECT_MANAGER"],
    },
    {
        id: "NTF-003",
        type: "schedule",
        severity: "Warning",
        title: "Milestone Due in 4 Days",
        project: "GreenField Residences Phase II",
        projectId: "PRJ-1002",
        message: "Block B Slab pour due Apr 24 — currently at 41% readiness. Risk of delay is High.",
        timestamp: "2026-03-19T14:00:00",
        isRead: false,
        actionLabel: "View Schedule",
        actionRoute: "/planning-assistant",
        targetRoles: ["SUPER_ADMIN", "PROJECT_MANAGER", "ENGINEER"],
    },
    {
        id: "NTF-004",
        type: "ai",
        severity: "Info",
        title: "AI Weekly Report Generated",
        message: "Portfolio weekly summary ready — 6 active projects, 3 critical risk items, 2 cost alerts.",
        timestamp: "2026-03-20T08:00:00",
        isRead: false,
        actionLabel: "Download PDF",
        actionRoute: "/dashboard",
        targetRoles: ["SUPER_ADMIN", "PROJECT_MANAGER"],
    },
    {
        id: "NTF-005",
        type: "approval",
        severity: "Info",
        title: "Change Order Awaiting Approval",
        project: "EcoBuild Industrial Plant",
        projectId: "PRJ-1004",
        message: "CO-040: Solar array addition — ₹82L — Client approval required within 48 hours.",
        timestamp: "2026-03-19T11:30:00",
        isRead: false,
        actionLabel: "Review Change Order",
        actionRoute: "/projects/PRJ-1004",
        targetRoles: ["CLIENT", "PROJECT_MANAGER", "SUPER_ADMIN"],
    },
    {
        id: "NTF-006",
        type: "blueprint",
        severity: "Info",
        title: "Blueprint Analysis Complete",
        project: "Skyline Corporate Tower",
        projectId: "PRJ-1001",
        message: "Floor Plan v3.1 analysis complete — 14 clashes detected, overall design score 83/100.",
        timestamp: "2026-03-18T16:45:00",
        isRead: true,
        actionLabel: "View Analysis",
        actionRoute: "/blueprint-analyzer",
        targetRoles: ["ARCHITECT", "PROJECT_MANAGER", "SUPER_ADMIN"],
    },
    {
        id: "NTF-007",
        type: "risk",
        severity: "Warning",
        title: "Risk Score Escalated to Critical",
        project: "GreenField Residences Phase II",
        projectId: "PRJ-1002",
        message: "Project risk score crossed 65 Critical threshold — now at 67. Immediate mitigation required.",
        timestamp: "2026-03-18T10:00:00",
        isRead: true,
        actionLabel: "View Risk Report",
        actionRoute: "/risk-intelligence",
        targetRoles: ["SUPER_ADMIN", "PROJECT_MANAGER"],
    },
    {
        id: "NTF-008",
        type: "compliance",
        severity: "Warning",
        title: "Certificate Expiry in 14 Days",
        message: "Labour welfare fund payment certificate expires Apr 03, 2026. Renewal required to avoid site shutdown.",
        timestamp: "2026-03-20T07:00:00",
        isRead: false,
        actionLabel: "View Documents",
        actionRoute: "/decision-logs",
        targetRoles: ["SUPER_ADMIN", "PROJECT_MANAGER"],
    },
];
