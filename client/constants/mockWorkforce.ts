export interface WorkforceRecord {
  employeeName: string;
  role: string;
  projectAssigned: string;
  performanceScore: number;
}

export const MOCK_WORKFORCE: WorkforceRecord[] = [
  { employeeName: "Vikram Sethi", role: "Civil Engineer", projectAssigned: "Skyline Corporate Tower", performanceScore: 89 },
  { employeeName: "Neha Kapoor", role: "Architect", projectAssigned: "GreenField Residences", performanceScore: 92 },
  { employeeName: "Ritesh Nair", role: "Civil Engineer", projectAssigned: "Metro Depot", performanceScore: 86 },
  { employeeName: "Aditi Menon", role: "Site Supervisor", projectAssigned: "EcoBuild Plant", performanceScore: 84 },
  { employeeName: "Karan Mehta", role: "Project Manager", projectAssigned: "Skyline Corporate Tower", performanceScore: 88 },
];

export const PRODUCTIVITY_SERIES = [
  { month: "Jan", productivity: 72 },
  { month: "Feb", productivity: 75 },
  { month: "Mar", productivity: 79 },
  { month: "Apr", productivity: 81 },
  { month: "May", productivity: 84 },
  { month: "Jun", productivity: 87 },
];

export const LABOR_DISTRIBUTION_SERIES = [
  { team: "Structural", workload: 34 },
  { team: "MEP", workload: 23 },
  { team: "Finishing", workload: 19 },
  { team: "QA/QC", workload: 12 },
  { team: "Safety", workload: 12 },
];
