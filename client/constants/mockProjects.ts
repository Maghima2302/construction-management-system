// Mock Projects Data — AI-CMS v3 Full Specification
// 8 projects matching the v3 spec with milestones, financials, and risk data

export interface ProjectMilestone {
  name: string;
  dueDate: string;
  status: "Completed" | "In Progress" | "Pending" | "Delayed";
  completion: number;
  owner?: string;
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
  healthScore: number;
  budgetPlanned: number;
  budgetActual: number;
  resourceUtilization: number;
  aiRequirementScore: number;
  status: "Active" | "Delayed" | "Completed" | "On Hold";
  startDate: string;
  endDate: string;
  assignedTeam: string[];
  milestones: ProjectMilestone[];
  description?: string;
  city?: string;
  state?: string;
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
    healthScore: 81,
    budgetPlanned: 18500000,
    budgetActual: 17240000,
    resourceUtilization: 84,
    aiRequirementScore: 91,
    status: "Active",
    startDate: "2025-06-15",
    endDate: "2026-12-20",
    description: "28-floor grade-A commercial office tower with smart building integration, LEED Gold target, and facade cladding system.",
    assignedTeam: ["PM: Rahul Khanna", "Arch: Neha Kapoor", "Eng: Vikram Sethi"],
    milestones: [
      { name: "Foundation & Piling", dueDate: "2025-09-10", status: "Completed", completion: 100, owner: "Vikram Sethi" },
      { name: "Core RCC Structure", dueDate: "2026-02-22", status: "Completed", completion: 100, owner: "Vikram Sethi" },
      { name: "Facade Installation", dueDate: "2026-07-18", status: "In Progress", completion: 63, owner: "Ritesh Nair" },
      { name: "MEP & Finishing", dueDate: "2026-11-30", status: "Pending", completion: 14, owner: "Aditi Menon" },
      { name: "Final Inspection & Handover", dueDate: "2026-12-20", status: "Pending", completion: 0, owner: "Rahul Khanna" },
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
    riskScore: 67,
    healthScore: 54,
    budgetPlanned: 9400000,
    budgetActual: 10020000,
    resourceUtilization: 78,
    aiRequirementScore: 86,
    status: "Delayed",
    startDate: "2025-09-05",
    endDate: "2026-11-10",
    description: "Residential township Phase II — Block A to D, 320 units, green spaces, community amenities. Currently delayed on Block B slab.",
    assignedTeam: ["PM: Aditya Sharma", "Arch: Neha Kapoor", "Eng: Farhan Ali"],
    milestones: [
      { name: "Site Preparation & Levelling", dueDate: "2025-10-15", status: "Completed", completion: 100, owner: "Farhan Ali" },
      { name: "Block A Foundation", dueDate: "2025-12-20", status: "Completed", completion: 100, owner: "Farhan Ali" },
      { name: "Block B Slab Pour", dueDate: "2026-04-24", status: "In Progress", completion: 41, owner: "Farhan Ali" },
      { name: "Block C & D Structure", dueDate: "2026-07-30", status: "Pending", completion: 0, owner: "Farhan Ali" },
      { name: "Finishing & Handover", dueDate: "2026-11-10", status: "Pending", completion: 0, owner: "Aditya Sharma" },
    ],
  },
  {
    id: "PRJ-1003",
    name: "Riverside Metro Depot",
    client: "City Transit Authority",
    location: "Chennai",
    type: "Infrastructure",
    completion: 81,
    delayRisk: 8,
    riskScore: 21,
    healthScore: 88,
    budgetPlanned: 42000000,
    budgetActual: 38900000,
    resourceUtilization: 91,
    aiRequirementScore: 94,
    status: "Active",
    startDate: "2024-11-01",
    endDate: "2026-08-30",
    description: "Metro rail depot with 2000+ vehicle capacity, seismic design, government compliance. On track for handover.",
    assignedTeam: ["PM: Sunita Reddy", "Eng: Ritesh Nair"],
    milestones: [
      { name: "Civil Works — Platforms", dueDate: "2025-08-30", status: "Completed", completion: 100, owner: "Ritesh Nair" },
      { name: "Tracks & Electrical", dueDate: "2026-01-15", status: "Completed", completion: 100, owner: "Pradeep Kumar" },
      { name: "Control Systems", dueDate: "2026-05-30", status: "In Progress", completion: 74, owner: "Ritesh Nair" },
      { name: "Commissioning & Testing", dueDate: "2026-08-30", status: "Pending", completion: 0, owner: "Sunita Reddy" },
    ],
  },
  {
    id: "PRJ-1004",
    name: "EcoBuild Industrial Plant",
    client: "GreenMfg Corp",
    location: "Hyderabad",
    type: "Industrial",
    completion: 57,
    delayRisk: 41,
    riskScore: 54,
    healthScore: 62,
    budgetPlanned: 31000000,
    budgetActual: 29400000,
    resourceUtilization: 73,
    aiRequirementScore: 88,
    status: "Active",
    startDate: "2025-04-12",
    endDate: "2027-01-15",
    description: "Zero-carbon industrial manufacturing facility with rooftop solar, EV charging, and LEED Gold target.",
    assignedTeam: ["PM: Rahul Khanna", "Eng: Aditi Menon"],
    milestones: [
      { name: "Foundation & Ground Slab", dueDate: "2025-10-01", status: "Completed", completion: 100, owner: "Aditi Menon" },
      { name: "Steel Structural Frame", dueDate: "2026-02-28", status: "Completed", completion: 100, owner: "Aditi Menon" },
      { name: "MEP Installations", dueDate: "2026-08-30", status: "In Progress", completion: 38, owner: "Pradeep Kumar" },
      { name: "Solar & EV Infrastructure", dueDate: "2026-11-30", status: "Pending", completion: 0, owner: "GreenBind Tech" },
      { name: "Commissioning", dueDate: "2027-01-15", status: "Pending", completion: 0, owner: "Rahul Khanna" },
    ],
  },
  {
    id: "PRJ-1005",
    name: "Coastal Luxury Villas — Sea Breeze",
    client: "PremiumHomes Ltd",
    location: "Goa",
    type: "Luxury Residential",
    completion: 29,
    delayRisk: 15,
    riskScore: 28,
    healthScore: 79,
    budgetPlanned: 7800000,
    budgetActual: 5100000,
    resourceUtilization: 69,
    aiRequirementScore: 82,
    status: "Active",
    startDate: "2026-01-20",
    endDate: "2027-06-30",
    description: "12 sea-view luxury villas with Italian marble finishes, smart home automation, and corrosion-resistant coastal construction.",
    assignedTeam: ["PM: Kiran Desai", "Arch: Neha Kapoor"],
    milestones: [
      { name: "Survey & Foundation Works", dueDate: "2026-04-30", status: "In Progress", completion: 72, owner: "Kiran Desai" },
      { name: "Structural Shell", dueDate: "2026-09-30", status: "Pending", completion: 0, owner: "Kiran Desai" },
      { name: "Facades & Openings", dueDate: "2027-02-28", status: "Pending", completion: 0, owner: "Neha Kapoor" },
      { name: "Interior & Handover", dueDate: "2027-06-30", status: "Pending", completion: 0, owner: "Kiran Desai" },
    ],
  },
  {
    id: "PRJ-1006",
    name: "SmartCity Data Centre — Phase 1",
    client: "TechNexus Infrastructure",
    location: "Mumbai",
    type: "Technology Facility",
    completion: 14,
    delayRisk: 11,
    riskScore: 19,
    healthScore: 84,
    budgetPlanned: 55000000,
    budgetActual: 8200000,
    resourceUtilization: 62,
    aiRequirementScore: 97,
    status: "Active",
    startDate: "2026-02-10",
    endDate: "2027-09-30",
    description: "Tier 4 data centre with 99.999% uptime design, green cooling systems, redundant power feeds, and seismic isolation.",
    assignedTeam: ["PM: Rahul Khanna", "Eng: Vikram Sethi"],
    milestones: [
      { name: "Civil Works & Shell", dueDate: "2026-09-30", status: "In Progress", completion: 14, owner: "Vikram Sethi" },
      { name: "MEP & Power Infrastructure", dueDate: "2027-04-30", status: "Pending", completion: 0, owner: "Pradeep Kumar" },
      { name: "IT & Cooling Systems", dueDate: "2027-08-31", status: "Pending", completion: 0, owner: "TechNexus" },
      { name: "Commissioning", dueDate: "2027-09-30", status: "Pending", completion: 0, owner: "Rahul Khanna" },
    ],
  },
  {
    id: "PRJ-1007",
    name: "Heritage Hospital Expansion",
    client: "Apollo Health Group",
    location: "Delhi",
    type: "Healthcare",
    completion: 92,
    delayRisk: 4,
    riskScore: 12,
    healthScore: 96,
    budgetPlanned: 22000000,
    budgetActual: 21400000,
    resourceUtilization: 95,
    aiRequirementScore: 99,
    status: "Active",
    startDate: "2024-08-01",
    endDate: "2026-05-31",
    description: "300-bed NABH-compliant hospital expansion with infection control design, dedicated ICU wing, and helipad.",
    assignedTeam: ["PM: Sunita Reddy", "Arch: Manish Bose", "Eng: Pradeep Kumar"],
    milestones: [
      { name: "Foundation & Structure", dueDate: "2025-04-30", status: "Completed", completion: 100, owner: "Pradeep Kumar" },
      { name: "Medical Gas & MEP", dueDate: "2025-11-30", status: "Completed", completion: 100, owner: "Pradeep Kumar" },
      { name: "Interior Finishing & Equipment", dueDate: "2026-04-30", status: "In Progress", completion: 88, owner: "Manish Bose" },
      { name: "Inspection & Handover", dueDate: "2026-05-31", status: "Pending", completion: 0, owner: "Sunita Reddy" },
    ],
  },
  {
    id: "PRJ-1008",
    name: "Lakeview School Campus",
    client: "EduFirst Foundation",
    location: "Coimbatore",
    type: "Educational",
    completion: 100,
    delayRisk: 0,
    riskScore: 0,
    healthScore: 100,
    budgetPlanned: 5200000,
    budgetActual: 4980000,
    resourceUtilization: 100,
    aiRequirementScore: 95,
    status: "Completed",
    startDate: "2024-03-01",
    endDate: "2025-12-31",
    description: "3000-student capacity school campus with child-safe design, natural lighting, sports facilities, and 3 academic blocks.",
    assignedTeam: ["PM: Aditya Sharma", "Arch: Neha Kapoor"],
    milestones: [
      { name: "Foundation & Structure", dueDate: "2024-08-31", status: "Completed", completion: 100, owner: "Aditya Sharma" },
      { name: "Roofing & Envelope", dueDate: "2024-11-30", status: "Completed", completion: 100, owner: "Aditya Sharma" },
      { name: "Interior & Finishing", dueDate: "2025-10-31", status: "Completed", completion: 100, owner: "Neha Kapoor" },
      { name: "Landscaping & Handover", dueDate: "2025-12-31", status: "Completed", completion: 100, owner: "Aditya Sharma" },
    ],
  },
];

export const PROJECT_PROGRESS_SERIES = [
  { month: "Sep 25", progress: 18, planned: 22 },
  { month: "Oct 25", progress: 31, planned: 35 },
  { month: "Nov 25", progress: 44, planned: 47 },
  { month: "Dec 25", progress: 54, planned: 57 },
  { month: "Jan 26", progress: 62, planned: 64 },
  { month: "Feb 26", progress: 68, planned: 72 },
];
