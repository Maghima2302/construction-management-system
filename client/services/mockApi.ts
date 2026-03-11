import { DASHBOARD_DATA_BY_ROLE } from "@/constants/mockDashboard";
import { MOCK_PROJECTS } from "@/constants/mockProjects";
import { MOCK_CLIENTS } from "@/constants/mockClients";
import { MOCK_MATERIALS } from "@/constants/mockMaterials";
import { COST_BREAKDOWN, ESTIMATION_SUMMARY, ALTERNATIVE_MATERIAL_SUGGESTIONS } from "@/constants/mockCostEstimation";
import { MOCK_RISK_PROJECTS, RISK_TREND_SERIES, RISK_HEATMAP, SAFETY_ALERTS } from "@/constants/mockRisk";
import { MOCK_PLANNING_TASKS, LABOR_WORKLOAD_SERIES, RESOURCE_OPTIMIZATION_NOTES } from "@/constants/mockPlanning";
import { SUSTAINABILITY_METRICS, CARBON_EMISSION_SERIES, MATERIAL_SUSTAINABILITY_RATINGS, ECO_RECOMMENDATIONS } from "@/constants/mockSustainability";
import { BLUEPRINT_ANALYSIS_RESULT, BLUEPRINT_AI_INSIGHTS } from "@/constants/mockBlueprintAnalysis";
import { SITE_MONITORING_STATS, DAILY_SITE_ACTIVITY, SITE_PHASE_TIMELINE, EQUIPMENT_USAGE_SERIES } from "@/constants/mockSiteMonitoring";
import { MOCK_SUPPLIERS, SUPPLIER_PRICE_COMPARISON } from "@/constants/mockSuppliers";
import { MOCK_WORKFORCE, PRODUCTIVITY_SERIES, LABOR_DISTRIBUTION_SERIES } from "@/constants/mockWorkforce";
import { UserRole } from "@/types/auth";

const withDelay = async <T>(payload: T, delay = 250): Promise<T> => {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return payload;
};

export const mockApi = {
  getDashboardByRole: (role: UserRole) => withDelay(DASHBOARD_DATA_BY_ROLE[role]),
  getProjects: () => withDelay(MOCK_PROJECTS),
  getProjectById: (id: string) => withDelay(MOCK_PROJECTS.find((item) => item.id === id) || null),
  getClients: () => withDelay(MOCK_CLIENTS),
  getClientById: (id: string) => withDelay(MOCK_CLIENTS.find((item) => item.id === id) || null),
  getMaterials: () => withDelay(MOCK_MATERIALS),
  getCostEstimation: () =>
    withDelay({
      summary: ESTIMATION_SUMMARY,
      breakdown: COST_BREAKDOWN,
      alternatives: ALTERNATIVE_MATERIAL_SUGGESTIONS,
    }),
  getRiskIntelligence: () =>
    withDelay({
      projects: MOCK_RISK_PROJECTS,
      trend: RISK_TREND_SERIES,
      heatmap: RISK_HEATMAP,
      alerts: SAFETY_ALERTS,
    }),
  getPlanningAssistant: () =>
    withDelay({
      tasks: MOCK_PLANNING_TASKS,
      laborWorkload: LABOR_WORKLOAD_SERIES,
      optimization: RESOURCE_OPTIMIZATION_NOTES,
    }),
  getSustainability: () =>
    withDelay({
      metrics: SUSTAINABILITY_METRICS,
      emissions: CARBON_EMISSION_SERIES,
      materials: MATERIAL_SUSTAINABILITY_RATINGS,
      recommendations: ECO_RECOMMENDATIONS,
    }),
  getBlueprintAnalysis: () =>
    withDelay({
      result: BLUEPRINT_ANALYSIS_RESULT,
      insights: BLUEPRINT_AI_INSIGHTS,
    }),
  getSiteMonitoring: () =>
    withDelay({
      stats: SITE_MONITORING_STATS,
      activity: DAILY_SITE_ACTIVITY,
      phases: SITE_PHASE_TIMELINE,
      equipment: EQUIPMENT_USAGE_SERIES,
    }),
  getSuppliers: () => withDelay({ list: MOCK_SUPPLIERS, priceComparison: SUPPLIER_PRICE_COMPARISON }),
  getWorkforce: () =>
    withDelay({
      people: MOCK_WORKFORCE,
      productivity: PRODUCTIVITY_SERIES,
      laborDistribution: LABOR_DISTRIBUTION_SERIES,
    }),
};
