export interface PlanningTask {
  taskName: string;
  durationDays: number;
  assignedEngineer: string;
  completionStatus: "Completed" | "In Progress" | "Pending";
  start: string;
  end: string;
}

export const MOCK_PLANNING_TASKS: PlanningTask[] = [
  { taskName: "Excavation & Footing", durationDays: 14, assignedEngineer: "Vikram Sethi", completionStatus: "Completed", start: "2026-03-01", end: "2026-03-14" },
  { taskName: "Raft Foundation", durationDays: 18, assignedEngineer: "Ritesh Nair", completionStatus: "In Progress", start: "2026-03-15", end: "2026-04-01" },
  { taskName: "Core Columns Level 1-6", durationDays: 24, assignedEngineer: "Farhan Ali", completionStatus: "Pending", start: "2026-04-02", end: "2026-04-26" },
  { taskName: "Slab Casting Cycle A", durationDays: 20, assignedEngineer: "Nidhi Rao", completionStatus: "Pending", start: "2026-04-27", end: "2026-05-16" },
];

export const LABOR_WORKLOAD_SERIES = [
  { week: "W1", labor: 84 },
  { week: "W2", labor: 90 },
  { week: "W3", labor: 96 },
  { week: "W4", labor: 88 },
  { week: "W5", labor: 104 },
  { week: "W6", labor: 98 },
];

export const RESOURCE_OPTIMIZATION_NOTES = [
  "Reassign 6 steel fixers from Depot to Skyline for 4-day acceleration.",
  "Shift concrete pump usage to off-peak hours to reduce idle overlap by 12%.",
  "Use staggered labor shifts for slab cycle to improve productivity by 8%.",
];
