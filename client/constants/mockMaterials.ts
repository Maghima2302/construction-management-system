export interface MaterialRecord {
  id: string;
  name: string;
  category: string;
  unitCost: number;
  durability: number;
  sustainability: number;
  availability: "High" | "Medium" | "Low";
  aiExplanation: string;
  cheaperAlternative?: string;
  strongerAlternative?: string;
  ecoAlternative?: string;
}

export const MOCK_MATERIALS: MaterialRecord[] = [
  {
    id: "MAT-301",
    name: "Reinforced Concrete M40",
    category: "Structural",
    unitCost: 7800,
    durability: 92,
    sustainability: 68,
    availability: "High",
    aiExplanation: "Best balance of compressive strength and local availability for high-rise cores.",
    cheaperAlternative: "M35 blended concrete",
    strongerAlternative: "M50 high-performance concrete",
    ecoAlternative: "Low-clinker green concrete",
  },
  {
    id: "MAT-302",
    name: "Structural Steel Fe500",
    category: "Structural",
    unitCost: 9200,
    durability: 95,
    sustainability: 72,
    availability: "Medium",
    aiExplanation: "Recommended for long-span beams requiring high tensile strength and modular speed.",
    cheaperAlternative: "Fe415 with design adjustments",
    strongerAlternative: "Fe550 alloy steel",
    ecoAlternative: "Recycled-content structural steel",
  },
  {
    id: "MAT-303",
    name: "Fly Ash Bricks",
    category: "Masonry",
    unitCost: 6,
    durability: 81,
    sustainability: 94,
    availability: "High",
    aiExplanation: "Low embodied carbon and uniform dimensions improve masonry cycle time.",
    cheaperAlternative: "Hollow concrete blocks",
    strongerAlternative: "AAC premium blocks",
    ecoAlternative: "Stabilized soil blocks",
  },
  {
    id: "MAT-304",
    name: "Eco-Friendly Cement PPC",
    category: "Binding",
    unitCost: 390,
    durability: 84,
    sustainability: 91,
    availability: "High",
    aiExplanation: "Lower clinker ratio improves carbon profile while maintaining target strength in composite mixes.",
    cheaperAlternative: "Standard PPC bulk contract",
    strongerAlternative: "Composite cement PSC",
    ecoAlternative: "Geopolymer binder",
  },
];

export const MATERIAL_USAGE_SERIES = [
  { name: "Concrete", usage: 42 },
  { name: "Steel", usage: 28 },
  { name: "Bricks", usage: 18 },
  { name: "Cement", usage: 12 },
];
