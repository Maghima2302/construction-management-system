export interface ProjectMilestone {
  name: string;
  dueDate: string;
  status: "Completed" | "In Progress" | "Delayed" | "Pending";
  completion: number;
}

export interface ProjectRecord {
  id: string;
  name: string;
  client: string;
  location: string;
  type: string;
  completion: number;
  delayRisk: number;
  riskScore: number;
  budgetPlanned: number;
  budgetActual: number;
  resourceUtilization: number;
  aiRequirementScore: number;
  assignedTeam: string[];
  status: "Active" | "Completed" | "Delayed";
  startDate: string;
  endDate: string;
  milestones: ProjectMilestone[];
}

export const MOCK_PROJECTS: ProjectRecord[] = [
  {
    id: "PRJ-1001",
    name: "Skyline Corporate Tower",
    client: "Apex Infra Holdings",
    location: "Bengaluru",
    type: "Commercial High-Rise",
    completion: 68,
    delayRisk: 22,
    riskScore: 31,
    budgetPlanned: 18500000,
    budgetActual: 17240000,
    resourceUtilization: 84,
    aiRequirementScore: 91,
    status: "Active",
    startDate: "2025-06-15",
    endDate: "2026-12-20",
    assignedTeam: ["PM: Rahul Khanna", "Architect: Neha Kapoor", "Civil Engineer: Vikram Sethi"],
    milestones: [
      { name: "Foundation & Piling", dueDate: "2025-09-10", status: "Completed", completion: 100 },
      { name: "Core Structure", dueDate: "2026-02-22", status: "Completed", completion: 100 },
      { name: "Facade Installation", dueDate: "2026-07-18", status: "In Progress", completion: 63 },
      { name: "MEP & Finishing", dueDate: "2026-11-30", status: "Pending", completion: 14 },
    ],
  },
  {
    id: "PRJ-1002",
    name: "GreenField Residences Phase II",
    client: "UrbanNest Developments",
    location: "Pune",
    type: "Residential Township",
    completion: 43,
    delayRisk: 38,
    riskScore: 47,
    budgetPlanned: 9400000,
    budgetActual: 10020000,
    resourceUtilization: 78,
    aiRequirementScore: 86,
    status: "Delayed",
    startDate: "2025-09-05",
    endDate: "2026-11-10",
    assignedTeam: ["PM: Aditya Sharma", "Architect: Neha Kapoor", "Civil Engineer: Farhan Ali"],
    milestones: [
      { name: "Site Prep", dueDate: "2025-10-12", status: "Completed", completion: 100 },
      { name: "Block A Structure", dueDate: "2026-04-10", status: "Delayed", completion: 72 },
      { name: "Block B Structure", dueDate: "2026-06-25", status: "In Progress", completion: 41 },
      { name: "Landscape & Handover", dueDate: "2026-11-10", status: "Pending", completion: 0 },
    ],
  },
  {
    id: "PRJ-1003",
    name: "Riverside Metro Depot",
    client: "City Transit Authority",
    location: "Hyderabad",
    type: "Public Infrastructure",
    completion: 100,
    delayRisk: 4,
    riskScore: 12,
    budgetPlanned: 12600000,
    budgetActual: 12310000,
    resourceUtilization: 93,
    aiRequirementScore: 95,
    status: "Completed",
    startDate: "2024-01-22",
    endDate: "2025-11-30",
    assignedTeam: ["PM: Karan Mehta", "Architect: Janvi Rao", "Civil Engineer: Ritesh Nair"],
    milestones: [
      { name: "Structural Works", dueDate: "2024-09-18", status: "Completed", completion: 100 },
      { name: "Track Utilities", dueDate: "2025-03-06", status: "Completed", completion: 100 },
      { name: "Testing & Compliance", dueDate: "2025-10-14", status: "Completed", completion: 100 },
      { name: "Final Handover", dueDate: "2025-11-30", status: "Completed", completion: 100 },
    ],
  },
];

export const PROJECT_PROGRESS_SERIES = [
  { month: "Jan", progress: 54, planned: 58 },
  { month: "Feb", progress: 58, planned: 62 },
  { month: "Mar", progress: 63, planned: 66 },
  { month: "Apr", progress: 68, planned: 71 },
  { month: "May", progress: 72, planned: 76 },
  { month: "Jun", progress: 77, planned: 81 },
];

export const BUDGET_VS_ACTUAL_SERIES = [
  { name: "Skyline", budget: 18.5, actual: 17.24 },
  { name: "GreenField", budget: 9.4, actual: 10.02 },
  { name: "Depot", budget: 12.6, actual: 12.31 },
];

export const TIMELINE_COMPLETION_SERIES = [
  { name: "Foundation", value: 100 },
  { name: "Structure", value: 78 },
  { name: "MEP", value: 51 },
  { name: "Finishing", value: 32 },
];
