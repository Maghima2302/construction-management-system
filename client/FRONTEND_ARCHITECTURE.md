# AI Driven Construction Management System - Frontend Architecture

## 1) Complete Folder Structure

```text
client/
├── app/
│   └── routes.tsx
├── assets/
│   └── login-hero.svg
├── components/
│   ├── ui/
│   ├── charts/
│   │   └── AnalyticsChart.tsx
│   ├── common/
│   │   ├── ActivityFeedPanel.tsx
│   │   ├── AIChatPanel.tsx
│   │   ├── DataTable.tsx
│   │   ├── MaterialCard.tsx
│   │   ├── NotificationPanel.tsx
│   │   ├── ProjectCard.tsx
│   │   └── Timeline.tsx
│   └── dashboard/
│       ├── DashboardWidgets.tsx
│       ├── KPIGrid.tsx
│       ├── RoleInnovationPanels.tsx
│       └── RoleRequirementPanel.tsx
├── constants/
│   ├── mockAuth.ts
│   ├── mockClients.ts
│   ├── mockCostEstimation.ts
│   ├── mockDashboard.ts
│   ├── mockMaterials.ts
│   ├── mockProjects.ts
│   ├── mockRisk.ts
│   ├── mockPlanning.ts
│   ├── mockSustainability.ts
│   ├── mockBlueprintAnalysis.ts
│   ├── mockSiteMonitoring.ts
│   ├── mockSuppliers.ts
│   ├── mockWorkforce.ts
│   └── rbac.ts
├── features/
│   ├── auth/pages/
│   ├── dashboard/pages/
│   ├── clients/pages/
│   ├── projects/pages/
│   ├── ai-interview/pages/
│   ├── materials/pages/
│   ├── material-recommendations/pages/
│   ├── cost-estimation/pages/
│   ├── decision-logs/pages/
│   ├── risk-intelligence/{pages,components}/
│   ├── planning-assistant/{pages,components}/
│   ├── sustainability/{pages,components}/
│   ├── blueprint-analyzer/{pages,components}/
│   ├── site-monitoring/{pages,components}/
│   ├── suppliers/{pages,components}/
│   ├── workforce/{pages,components}/
│   └── construction-knowledge/{pages,components}/
├── layouts/
├── routes/
├── services/
│   ├── api.ts
│   └── mockApi.ts
├── store/
├── types/
├── hooks/
├── utils/
└── App.tsx
```

## 2) Page List by Module

### Auth
- `/login`
- `/unauthorized`

### Dashboard
- `/dashboard`
- `/dashboard/super-admin`
- `/dashboard/project-manager`
- `/dashboard/architect`
- `/dashboard/engineer`
- `/dashboard/client`

### Client Management
- `/clients`
- `/clients/:id`
- `/client/:id` (alias)

### Project Management
- `/projects`
- `/projects/:id`
- `/projects/create`

### AI Requirement Interview
- `/ai-interview`
- `/ai-interview/history`

### Material Recommendation (AI RAG)
- `/materials`
- `/material-recommendations` (compat route)
- `/material-recommendations/compare`

### Cost Estimation
- `/cost-estimation`
- `/cost-estimation/reports`

### Decision Logs
- `/decision-logs`

### Construction Risk Intelligence
- `/risk-intelligence`
- `/risk-intelligence/project/:id`

### AI Construction Planning Assistant
- `/planning-assistant`
- `/planning-assistant/schedule`

### Construction Sustainability Analyzer
- `/sustainability`
- `/sustainability/report`

### AI Blueprint Analyzer
- `/blueprint-analyzer`

### Smart Site Monitoring Dashboard
- `/site-monitoring`

### Supplier Intelligence
- `/suppliers`
- `/suppliers/:id`

### Workforce Analytics
- `/workforce`

### Construction Knowledge AI
- `/construction-knowledge`

## 3) Role-Based Dashboards

Roles:
- Super Admin
- Project Manager
- Architect
- Civil Engineer
- Client

Each role has:
- Dedicated dashboard route and KPI set
- Module-level RBAC permissions
- Role-focused notifications, risk alerts, and milestones

## 4) Dummy Data Sources

- `mockProjects.ts`: project portfolio, milestones, risk, budget, timeline charts
- `mockClients.ts`: client directory, requirement history, AI insights
- `mockMaterials.ts`: AI material cards with optimizer alternatives
- `mockCostEstimation.ts`: estimation summary, cost pie chart, alternatives
- `mockDashboard.ts`: role-wise KPIs and dashboard widgets
- `mockRisk.ts`: risk heatmap, risk trend, safety alerts, project risk scores
- `mockPlanning.ts`: AI schedule tasks, labor workload, resource optimization notes
- `mockSustainability.ts`: carbon emissions, sustainability metrics, eco recommendations
- `mockBlueprintAnalysis.ts`: blueprint scores and AI design insights
- `mockSiteMonitoring.ts`: site stats, timeline, equipment usage, daily activity
- `mockSuppliers.ts`: supplier ratings, delivery times, price comparison
- `mockWorkforce.ts`: productivity and labor distribution analytics

## 5) Reusable Components

- KPI card grid: `KPIGrid`
- Data table: `DataTable`
- Analytics charts: `AnalyticsChart` + `DashboardWidgets`
- Timeline view: `Timeline`
- Material card: `MaterialCard`
- Project card: `ProjectCard`
- AI chat panel: `AIChatPanel`
- Notification panel: `NotificationPanel`
- Activity feed: `ActivityFeedPanel`
- Risk score card: `RiskScoreCard`
- Gantt chart: `GanttChart`
- Blueprint analysis panel: `BlueprintAnalysisPanel`
- Supplier card: `SupplierCard`
- Workforce analytics chart: `WorkforceAnalyticsChart`
- Sustainability score card: `SustainabilityScoreCard`

## 6) Innovative Role Features

### Architect
- Blueprint Insight Panel
- Lighting/ventilation suggestions
- Sustainability scoring
- Smart material optimizer

### Civil Engineer
- Structural Risk Prediction Dashboard
- Load capacity and foundation risk analysis
- Construction Timeline AI Predictor
- Site Progress Tracker

## 7) Mock API Structure

`services/mockApi.ts`:
- `getDashboardByRole(role)`
- `getProjects()` / `getProjectById(id)`
- `getClients()` / `getClientById(id)`
- `getMaterials()`
- `getCostEstimation()`
- `getRiskIntelligence()`
- `getPlanningAssistant()`
- `getSustainability()`
- `getBlueprintAnalysis()`
- `getSiteMonitoring()`
- `getSuppliers()`
- `getWorkforce()`

## 8) Demo Credentials (Frontend Only)

- Super Admin: `superadmin@cms.com` / `SuperAdmin@123`
- Project Manager: `pm@cms.com` / `ProjectManager@123`
- Architect: `architect@cms.com` / `Architect@123`
- Civil Engineer: `engineer@cms.com` / `Engineer@123`
- Client: `client@cms.com` / `Client@123`
