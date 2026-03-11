export interface CostBreakdownItem {
  name: string;
  value: number;
  color: string;
}

export interface AlternativeSuggestion {
  current: string;
  suggested: string;
  savingsPercent: number;
  note: string;
}

export const COST_BREAKDOWN: CostBreakdownItem[] = [
  { name: "Material", value: 46, color: "hsl(var(--primary))" },
  { name: "Labor", value: 29, color: "hsl(var(--accent))" },
  { name: "Equipment", value: 14, color: "#16a34a" },
  { name: "Compliance", value: 6, color: "#7c3aed" },
  { name: "Contingency", value: 5, color: "#dc2626" },
];

export const ESTIMATION_SUMMARY = {
  materialCost: 9850000,
  laborCost: 6210000,
  equipmentCost: 3020000,
  totalEstimated: 20580000,
  expectedVariance: 4.8,
};

export const ALTERNATIVE_MATERIAL_SUGGESTIONS: AlternativeSuggestion[] = [
  {
    current: "Premium imported facade cladding",
    suggested: "Hybrid ceramic-aluminum cladding",
    savingsPercent: 11.4,
    note: "Maintains thermal performance while reducing procurement lead time.",
  },
  {
    current: "Fe500 structural steel",
    suggested: "Fe415 with beam section optimization",
    savingsPercent: 6.7,
    note: "Suitable for low to mid-load segments with approved redesign.",
  },
  {
    current: "Conventional red bricks",
    suggested: "Fly ash bricks",
    savingsPercent: 9.2,
    note: "Improves sustainability score and reduces plaster thickness requirements.",
  },
];
