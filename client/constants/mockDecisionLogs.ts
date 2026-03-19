// Mock Decision Logs — AI-CMS v3 Full Specification

export interface DecisionLog {
    id: string;
    date: string;
    project: string;
    projectId: string;
    decision: string;
    madeBy: string;
    madeByRole: string;
    category: "Structural" | "Procurement" | "Sustainability" | "Material" | "Schedule" | "Safety" | "Financial";
    impact: string;
    aiSummary: string;
    status: "Implemented" | "In Progress" | "Approved" | "Pending" | "Rejected";
    documents: string[];
}

export const MOCK_DECISION_LOGS: DecisionLog[] = [
    {
        id: "DL-038",
        date: "2026-03-14",
        project: "Skyline Corporate Tower",
        projectId: "PRJ-1001",
        decision: "Approved additional piling at Grid E5 after revised soil report",
        madeBy: "Vikram Sethi",
        madeByRole: "Engineer",
        category: "Structural",
        impact: "Cost +₹8.4L, Schedule +3 days",
        aiSummary: "Soil bearing capacity 20% below design assumption at Grid E5. Additional 6 bored piles eliminate foundation risk entirely. Cost justified versus structural risk of non-compliance.",
        status: "Implemented",
        documents: ["Soil Report Rev2", "Structural Note 41", "PM Approval"],
    },
    {
        id: "DL-039",
        date: "2026-03-15",
        project: "GreenField Residences Phase II",
        projectId: "PRJ-1002",
        decision: "Switched Block B concrete supplier from ConcreteMix to BuildCore Materials",
        madeBy: "Aditya Sharma",
        madeByRole: "PM",
        category: "Procurement",
        impact: "Cost -₹1.2L, Lead time -2 days",
        aiSummary: "ConcreteMix delivery reliability score dropped to 72% after batch plant equipment failure. BuildCore at 91% reliability over last 6 months. No quality compromise — both BIS certified.",
        status: "Implemented",
        documents: ["Supplier Comparison Mar26", "PM Decision Log", "Client Advisory"],
    },
    {
        id: "DL-040",
        date: "2026-03-16",
        project: "EcoBuild Industrial Plant",
        projectId: "PRJ-1004",
        decision: "Added 120kWp rooftop solar array to approved specification",
        madeBy: "Rahul Khanna",
        madeByRole: "PM",
        category: "Sustainability",
        impact: "Cost +₹82L, LEED +6 points, CO₂ -180 tCO₂e/year",
        aiSummary: "Solar addition enables LEED Gold certification (from projected Silver). ROI 5.8 years, NPV positive at 10-year horizon. Aligns with client GreenMfg zero-carbon mandate for FY2030.",
        status: "In Progress",
        documents: ["Energy Model v2", "Client Approval CO-037", "LEED Credit Calculation"],
    },
    {
        id: "DL-041",
        date: "2026-03-18",
        project: "Skyline Corporate Tower",
        projectId: "PRJ-1001",
        decision: "Upgraded concrete grade from M40 to M53 for floors 22–28",
        madeBy: "Vikram Sethi",
        madeByRole: "Engineer",
        category: "Material",
        impact: "Cost +₹4.2L, Risk score -12 pts",
        aiSummary: "Wind tunnel study shows 18% higher lateral loads on upper floors than original design assumption. M53 high-performance concrete eliminates structural risk with minimal cost premium of 0.24% on total budget.",
        status: "Approved",
        documents: ["Wind Study Report", "Structural Calculation Note 67", "Material Change Order"],
    },
    {
        id: "DL-042",
        date: "2026-03-19",
        project: "GreenField Residences Phase II",
        projectId: "PRJ-1002",
        decision: "Delayed Block B concrete pour from Mar 20 to Mar 24 due to weather forecast",
        madeBy: "Aditya Sharma",
        madeByRole: "PM",
        category: "Schedule",
        impact: "Schedule +4 days (within available float)",
        aiSummary: "IMD 14-day forecast shows 82% rain probability for Pune Mar 20–23. Postponing pour prevents cold-joint risk and quality non-conformance. Net schedule impact manageable within 8-day float on this task.",
        status: "Implemented",
        documents: ["IMD Weather Advisory", "PM Decision Log #42", "Engineer Concurrence Email"],
    },
    {
        id: "DL-043",
        date: "2026-03-20",
        project: "Skyline Corporate Tower",
        projectId: "PRJ-1001",
        decision: "Approved curtain wall glazing upgrade from UPVC to aluminium curtain wall CW60 system",
        madeBy: "Neha Kapoor",
        madeByRole: "Architect",
        category: "Material",
        impact: "Cost +₹38L, Sustainability +4 pts, Aesthetic score +12",
        aiSummary: "Aluminium CW60 improves U-value from 1.8 to 1.2 W/m²K, reducing cooling load by 14%. LEED Energy & Atmosphere credit improved. Premium justified by energy lifecycle savings of ₹6.2L/year.",
        status: "Pending",
        documents: ["Glazing Specification v2", "Energy Model Comparison", "Cost Impact Assessment"],
    },
];
