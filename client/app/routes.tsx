import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import ModuleGuard from "@/routes/ModuleGuard";
import RoleDashboardRedirect from "@/routes/RoleDashboardRedirect";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import UnauthorizedPage from "@/features/auth/pages/UnauthorizedPage";
import RoleDashboardPage from "@/features/dashboard/pages/RoleDashboardPage";
import ClientsPage from "@/features/clients/pages/ClientsPage";
import ClientProfilePage from "@/features/clients/pages/ClientProfilePage";
import ProjectsPage from "@/features/projects/pages/ProjectsPage";
import ProjectDetailsPage from "@/features/projects/pages/ProjectDetailsPage";
import CreateProjectPage from "@/features/projects/pages/CreateProjectPage";
import AIInterviewPage from "@/features/ai-interview/pages/AIInterviewPage";
import AIInterviewHistoryPage from "@/features/ai-interview/pages/AIInterviewHistoryPage";
import MaterialsPage from "@/features/materials/pages/MaterialsPage";
import MaterialRecommendationsPage from "@/features/material-recommendations/pages/MaterialRecommendationsPage";
import MaterialComparePage from "@/features/material-recommendations/pages/MaterialComparePage";
import CostEstimationPage from "@/features/cost-estimation/pages/CostEstimationPage";
import CostEstimationReportsPage from "@/features/cost-estimation/pages/CostEstimationReportsPage";
import DecisionLogsPage from "@/features/decision-logs/pages/DecisionLogsPage";
import RiskIntelligencePage from "@/features/risk-intelligence/pages/RiskIntelligencePage";
import RiskProjectDetailsPage from "@/features/risk-intelligence/pages/RiskProjectDetailsPage";
import PlanningAssistantPage from "@/features/planning-assistant/pages/PlanningAssistantPage";
import PlanningSchedulePage from "@/features/planning-assistant/pages/PlanningSchedulePage";
import SustainabilityPage from "@/features/sustainability/pages/SustainabilityPage";
import SustainabilityReportPage from "@/features/sustainability/pages/SustainabilityReportPage";
import BlueprintAnalyzerPage from "@/features/blueprint-analyzer/pages/BlueprintAnalyzerPage";
import SiteMonitoringPage from "@/features/site-monitoring/pages/SiteMonitoringPage";
import SuppliersPage from "@/features/suppliers/pages/SuppliersPage";
import SupplierDetailsPage from "@/features/suppliers/pages/SupplierDetailsPage";
import WorkforcePage from "@/features/workforce/pages/WorkforcePage";
import ConstructionKnowledgePage from "@/features/construction-knowledge/pages/ConstructionKnowledgePage";
import NotFound from "@/pages/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<RoleDashboardRedirect />} />

          <Route path="/dashboard/super-admin" element={<RoleDashboardPage />} />
          <Route path="/dashboard/project-manager" element={<RoleDashboardPage />} />
          <Route path="/dashboard/architect" element={<RoleDashboardPage />} />
          <Route path="/dashboard/engineer" element={<RoleDashboardPage />} />
          <Route path="/dashboard/client" element={<RoleDashboardPage />} />

          <Route
            path="/clients"
            element={
              <ModuleGuard moduleKey="clients">
                <ClientsPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/projects"
            element={
              <ModuleGuard moduleKey="projects">
                <ProjectsPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ModuleGuard moduleKey="projects">
                <ProjectDetailsPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/projects/create"
            element={
              <ModuleGuard moduleKey="projects">
                <CreateProjectPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/clients/:id"
            element={
              <ModuleGuard moduleKey="clients">
                <ClientProfilePage />
              </ModuleGuard>
            }
          />
          <Route
            path="/client/:id"
            element={
              <ModuleGuard moduleKey="clients">
                <ClientProfilePage />
              </ModuleGuard>
            }
          />
          <Route
            path="/ai-interview"
            element={
              <ModuleGuard moduleKey="ai-interview">
                <AIInterviewPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/ai-interview/history"
            element={
              <ModuleGuard moduleKey="ai-interview">
                <AIInterviewHistoryPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/materials"
            element={
              <ModuleGuard moduleKey="materials">
                <MaterialsPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/material-recommendations"
            element={
              <ModuleGuard moduleKey="materials">
                <MaterialRecommendationsPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/material-recommendations/compare"
            element={
              <ModuleGuard moduleKey="materials">
                <MaterialComparePage />
              </ModuleGuard>
            }
          />
          <Route
            path="/cost-estimation"
            element={
              <ModuleGuard moduleKey="cost-estimation">
                <CostEstimationPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/cost-estimation/reports"
            element={
              <ModuleGuard moduleKey="cost-estimation">
                <CostEstimationReportsPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/decision-logs"
            element={
              <ModuleGuard moduleKey="decision-logs">
                <DecisionLogsPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/risk-intelligence"
            element={
              <ModuleGuard moduleKey="risk-intelligence">
                <RiskIntelligencePage />
              </ModuleGuard>
            }
          />
          <Route
            path="/risk-intelligence/project/:id"
            element={
              <ModuleGuard moduleKey="risk-intelligence">
                <RiskProjectDetailsPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/planning-assistant"
            element={
              <ModuleGuard moduleKey="planning-assistant">
                <PlanningAssistantPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/planning-assistant/schedule"
            element={
              <ModuleGuard moduleKey="planning-assistant">
                <PlanningSchedulePage />
              </ModuleGuard>
            }
          />
          <Route
            path="/sustainability"
            element={
              <ModuleGuard moduleKey="sustainability">
                <SustainabilityPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/sustainability/report"
            element={
              <ModuleGuard moduleKey="sustainability">
                <SustainabilityReportPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/blueprint-analyzer"
            element={
              <ModuleGuard moduleKey="blueprint-analyzer">
                <BlueprintAnalyzerPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/site-monitoring"
            element={
              <ModuleGuard moduleKey="site-monitoring">
                <SiteMonitoringPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/suppliers"
            element={
              <ModuleGuard moduleKey="suppliers">
                <SuppliersPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/suppliers/:id"
            element={
              <ModuleGuard moduleKey="suppliers">
                <SupplierDetailsPage />
              </ModuleGuard>
            }
          />
          <Route
            path="/workforce"
            element={
              <ModuleGuard moduleKey="workforce">
                <WorkforcePage />
              </ModuleGuard>
            }
          />
          <Route
            path="/construction-knowledge"
            element={
              <ModuleGuard moduleKey="construction-knowledge">
                <ConstructionKnowledgePage />
              </ModuleGuard>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
