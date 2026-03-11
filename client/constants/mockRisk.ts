export interface RiskProject {
  id: string;
  projectName: string;
  riskScore: number;
  safetyStatus: "Stable" | "Watch" | "Critical";
  structuralRiskLevel: "Low" | "Medium" | "High";
  weatherImpactScore: number;
}

export const MOCK_RISK_PROJECTS: RiskProject[] = [
  { id: "PRJ-1001", projectName: "Skyline Corporate Tower", riskScore: 38, safetyStatus: "Watch", structuralRiskLevel: "Medium", weatherImpactScore: 44 },
  { id: "PRJ-1002", projectName: "GreenField Residences Phase II", riskScore: 67, safetyStatus: "Critical", structuralRiskLevel: "High", weatherImpactScore: 62 },
  { id: "PRJ-1003", projectName: "Riverside Metro Depot", riskScore: 21, safetyStatus: "Stable", structuralRiskLevel: "Low", weatherImpactScore: 28 },
  { id: "PRJ-1004", projectName: "EcoBuild Industrial Plant", riskScore: 54, safetyStatus: "Watch", structuralRiskLevel: "Medium", weatherImpactScore: 57 },
];

export const RISK_TREND_SERIES = [
  { month: "Jan", risk: 52 },
  { month: "Feb", risk: 49 },
  { month: "Mar", risk: 46 },
  { month: "Apr", risk: 51 },
  { month: "May", risk: 47 },
  { month: "Jun", risk: 43 },
];

export const RISK_HEATMAP = [
  { zone: "Foundation", score: 71 },
  { zone: "Core Structure", score: 58 },
  { zone: "Facade", score: 42 },
  { zone: "MEP", score: 36 },
  { zone: "Finishing", score: 29 },
];

export const SAFETY_ALERTS = [
  "Tower B: Formwork inspection overdue by 2 days",
  "Block C: Crane wind-speed threshold exceeded twice this week",
  "Metro Depot: Reinforcement mismatch flagged in AI QC scan",
];
