export type KnowledgeCategory = "construction-design" | "privacy-policy";

export interface KnowledgeItem {
  id: string;
  category: KnowledgeCategory;
  title: string;
  question: string;
  answer: string;
  tags: string[];
}

export const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: "design-stair-width",
    category: "construction-design",
    title: "Stair Width Guidance",
    question: "What stair width should I keep for residential buildings?",
    answer:
      "For low to mid-rise residential projects, keep clear stair width aligned with your local building code and fire norms. In most practical cases, 1.2m clear width is treated as a safe baseline for design development, then finalized by local authority requirements.",
    tags: ["stairs", "egress", "code"],
  },
  {
    id: "design-column-grid",
    category: "construction-design",
    title: "Column Grid Planning",
    question: "How do I choose a column grid for a 3-story building?",
    answer:
      "Start with architectural room planning, parking constraints, and MEP routes. For typical RC residential buildings, use a regular grid where possible to reduce beam complexity, rebar congestion, and shuttering waste. Validate spans with structural analysis before freezing the grid.",
    tags: ["structure", "grid", "rcc"],
  },
  {
    id: "design-waterproofing",
    category: "construction-design",
    title: "Waterproofing Basics",
    question: "What are common waterproofing checkpoints?",
    answer:
      "Focus on wet areas, terrace slab slope, expansion joints, and external wall crack treatment. A typical checklist includes substrate preparation, membrane continuity, overlap quality, ponding test, and handover documentation with warranty terms.",
    tags: ["quality", "waterproofing", "checklist"],
  },
  {
    id: "privacy-data-collection",
    category: "privacy-policy",
    title: "Data Collection Scope",
    question: "What project data does the platform collect?",
    answer:
      "This demo policy states the platform may collect account details, project metadata, uploaded files, and interaction logs required to provide product functionality. Sensitive information handling should be governed by role-based access and contractual data processing terms.",
    tags: ["privacy", "data", "compliance"],
  },
  {
    id: "privacy-data-retention",
    category: "privacy-policy",
    title: "Data Retention",
    question: "How long is construction project data retained?",
    answer:
      "Dummy policy guidance: retain active project records for operational needs and statutory obligations, then archive or delete based on client agreement and legal requirements. Retention periods must be explicitly documented in your production policy.",
    tags: ["retention", "policy", "legal"],
  },
  {
    id: "privacy-third-party",
    category: "privacy-policy",
    title: "Third-Party Sharing",
    question: "Can project data be shared with third parties?",
    answer:
      "Only under approved business purposes such as hosting, analytics, or legal compliance, and only with safeguards like least-privilege access, encryption, and contractual controls. Users should be informed through clear policy disclosures.",
    tags: ["third-party", "security", "privacy"],
  },
];

export const KNOWLEDGE_QUICK_PROMPTS = [
  "Explain typical stair width guidance for a residential project",
  "How should I plan column spacing for cost efficiency?",
  "What should our privacy policy say about data retention?",
  "How do we describe third-party data sharing in policy?",
];
