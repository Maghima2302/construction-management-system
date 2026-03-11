export interface ClientRecord {
  id: string;
  name: string;
  company: string;
  industry: string;
  activeProjects: number;
  completedProjects: number;
  totalBudget: number;
  status: "Healthy" | "Needs Attention" | "At Risk";
  requirementMaturity: number;
  aiInsight: string;
}

export interface ClientRequirementHistory {
  date: string;
  topic: string;
  confidence: number;
  note: string;
}

export const MOCK_CLIENTS: ClientRecord[] = [
  {
    id: "CL-201",
    name: "Nikhil Arora",
    company: "Apex Infra Holdings",
    industry: "Commercial Real Estate",
    activeProjects: 3,
    completedProjects: 5,
    totalBudget: 31200000,
    status: "Healthy",
    requirementMaturity: 92,
    aiInsight: "High on-time probability due to stable procurement cycle.",
  },
  {
    id: "CL-202",
    name: "Ira Nair",
    company: "UrbanNest Developments",
    industry: "Residential",
    activeProjects: 2,
    completedProjects: 2,
    totalBudget: 14800000,
    status: "Needs Attention",
    requirementMaturity: 84,
    aiInsight: "Design changes increased delay risk by 11% in Phase II.",
  },
  {
    id: "CL-203",
    name: "Shaan Mukherjee",
    company: "City Transit Authority",
    industry: "Public Infrastructure",
    activeProjects: 1,
    completedProjects: 4,
    totalBudget: 42800000,
    status: "Healthy",
    requirementMaturity: 95,
    aiInsight: "Budget adherence remains within 2.1% variance across portfolio.",
  },
  {
    id: "CL-204",
    name: "Mira Deshpande",
    company: "EcoBuild Partners",
    industry: "Industrial",
    activeProjects: 4,
    completedProjects: 1,
    totalBudget: 26600000,
    status: "At Risk",
    requirementMaturity: 74,
    aiInsight: "Material availability and labor volatility may affect Q3 milestones.",
  },
];

export const MOCK_CLIENT_REQUIREMENT_HISTORY: Record<string, ClientRequirementHistory[]> = {
  "CL-201": [
    { date: "2026-01-08", topic: "Facade material preference", confidence: 93, note: "Shift to low-E glass accepted." },
    { date: "2026-02-14", topic: "Parking allocation update", confidence: 89, note: "Basement layout revised for EV slots." },
  ],
  "CL-202": [
    { date: "2026-01-25", topic: "Community clubhouse redesign", confidence: 81, note: "Additional co-working floor requested." },
    { date: "2026-03-01", topic: "Budget cap alignment", confidence: 79, note: "Value engineering suggestions pending approval." },
  ],
  "CL-203": [
    { date: "2025-12-18", topic: "Safety compliance controls", confidence: 96, note: "All fire and evacuation standards captured." },
  ],
  "CL-204": [
    { date: "2026-02-20", topic: "Sustainability target", confidence: 72, note: "Carbon target under review with vendor alternatives." },
  ],
};
