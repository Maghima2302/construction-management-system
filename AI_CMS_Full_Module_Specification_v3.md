# AI-DRIVEN CONSTRUCTION MANAGEMENT SYSTEM
## Complete Module-by-Module Feature & UI Specification

> **Version:** 3.0 — Full Detail Edition | **Stack:** React 18 + TypeScript + Tailwind CSS + Claude API | **Date:** March 2026

---

## TABLE OF CONTENTS

| # | Module | Page(s) |
|---|--------|---------|
| 01 | [Authentication](#module-01-authentication) | Login, Unauthorized |
| 02 | [Role Dashboards](#module-02-role-based-dashboards) | Super Admin, PM, Architect, Engineer, Client |
| 03 | [Project Lifecycle Manager](#module-03-project-lifecycle-manager) | List, Detail, Create |
| 04 | [Client Management](#module-04-client-management) | Clients List, Client Profile |
| 05 | [AI Requirement Interview](#module-05-ai-requirement-interview) | Interview, History |
| 06 | [Cost Estimation Engine](#module-06-cost-estimation-engine) | Estimation, Reports |
| 07 | [Construction Risk Intelligence](#module-07-construction-risk-intelligence) | Overview, Project Risk Detail |
| 08 | [AI Planning Assistant](#module-08-ai-planning-assistant) | Planner, Schedule |
| 09 | [AI Blueprint Analyzer](#module-09-ai-blueprint-analyzer) | Analyzer Page |
| 10 | [Smart Site Monitoring](#module-10-smart-site-monitoring) | Dashboard |
| 11 | [Material Recommendation (RAG)](#module-11-material-recommendation-rag) | Materials, Compare |
| 12 | [Sustainability Analyzer](#module-12-sustainability-analyzer) | Overview, Report |
| 13 | [Supplier Intelligence](#module-13-supplier-intelligence) | List, Detail |
| 14 | [Workforce Analytics](#module-14-workforce-analytics) | Dashboard |
| 15 | [Construction Knowledge AI](#module-15-construction-knowledge-ai) | Knowledge Page |
| 16 | [Decision Logs](#module-16-decision-logs) | Logs Page |
| 17 | [Notifications Hub](#module-17-notifications-hub) | Notifications Panel |

---

## MODULE 01: AUTHENTICATION

### Pages: `/login` · `/unauthorized`

---

### 01-A: Login Page (`/login`)

#### Layout & UI
```
┌─────────────────────────────────────────────────────────┐
│  LEFT PANEL (60%)                RIGHT PANEL (40%)       │
│  ┌─────────────────────────┐    ┌─────────────────────┐  │
│  │  Hero SVG illustration  │    │  🏗️ AI-CMS Logo     │  │
│  │  Construction skyline   │    │                     │  │
│  │  + floating KPI cards   │    │  "Welcome Back"     │  │
│  │  + AI insight badge     │    │                     │  │
│  │                         │    │  [Email Input]      │  │
│  │  "Built for the future  │    │  [Password Input]   │  │
│  │   of construction"      │    │                     │  │
│  │                         │    │  [Role Selector     │  │
│  │  Stat pills:            │    │   Dropdown]         │  │
│  │  📊 142 Live Projects   │    │                     │  │
│  │  🤖 92% AI Score        │    │  [Sign In Button]   │  │
│  │  ⚡ 58% Faster Delivery │    │                     │  │
│  └─────────────────────────┘    │  ─── Demo Login ─── │  │
│                                 │  [5 role buttons]   │  │
│                                 └─────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

#### Functional Behaviour (All Roles)
- Email + password validation with real-time inline error messages
- Role dropdown auto-matches email to role (pre-fills on demo click)
- "Remember Me" checkbox persists JWT in localStorage for 7 days
- Failed login: shake animation + red border + error toast after 3 attempts → shows lockout timer
- Successful login: spinner → redirect to `/dashboard/:role` via `DASHBOARD_PATH_BY_ROLE`
- Password show/hide toggle on input field
- Keyboard: Enter submits form; Tab order: email → password → role → button

#### Demo Quick-Login Buttons
| Button Label | Email | Password | Redirects To |
|-------------|-------|----------|-------------|
| Super Admin | superadmin@cms.com | SuperAdmin@123 | /dashboard/super-admin |
| Project Manager | pm@cms.com | ProjectManager@123 | /dashboard/project-manager |
| Architect | architect@cms.com | Architect@123 | /dashboard/architect |
| Civil Engineer | engineer@cms.com | Engineer@123 | /dashboard/engineer |
| Client | client@cms.com | Client@123 | /dashboard/client |

#### Responsive Behaviour
- **Mobile:** Single column — hero panel hidden, only auth form shown; logo top-center
- **Tablet:** Hero panel 40%, form 60%
- **Desktop:** Hero 60%, form 40%

#### Mock Auth Data (`constants/mockAuth.ts`)
```typescript
export const MOCK_USERS = [
  { id: "USR-001", name: "Arjun Mehta", email: "superadmin@cms.com", role: "SUPER_ADMIN",
    avatar: "AM", department: "Executive", lastLogin: "2026-03-20 09:14" },
  { id: "USR-002", name: "Rahul Khanna", email: "pm@cms.com", role: "PROJECT_MANAGER",
    avatar: "RK", department: "Operations", lastLogin: "2026-03-20 08:52" },
  { id: "USR-003", name: "Neha Kapoor", email: "architect@cms.com", role: "ARCHITECT",
    avatar: "NK", department: "Design", lastLogin: "2026-03-19 17:30" },
  { id: "USR-004", name: "Vikram Sethi", email: "engineer@cms.com", role: "ENGINEER",
    avatar: "VS", department: "Engineering", lastLogin: "2026-03-20 07:45" },
  { id: "USR-005", name: "Priya Nair", email: "client@cms.com", role: "CLIENT",
    avatar: "PN", department: "External", lastLogin: "2026-03-18 14:20" }
]
```

---

### 01-B: Unauthorized Page (`/unauthorized`)

#### Layout & UI
- Centered card: 403 icon (lock) + "You don't have permission to view this page"
- Shows current role in a badge
- "Go to My Dashboard" button → redirects to role's default dashboard
- "Contact Admin" link → mailto
- Lists which roles CAN access the attempted module

#### Functional Behaviour
- Triggered by `ModuleGuard` when role not in `MODULE_PERMISSIONS[role]`
- Logs access attempt to audit trail (Super Admin visible)

---

## MODULE 02: ROLE-BASED DASHBOARDS

### Pages: `/dashboard/super-admin` · `/dashboard/project-manager` · `/dashboard/architect` · `/dashboard/engineer` · `/dashboard/client`

> Each dashboard is **uniquely composed** from the same building blocks (KPIGrid, DashboardWidgets, AIChatPanel) but with role-specific data, colour theming, and widget configuration.

---

### Common Dashboard Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER: Role name + greeting + date + notification bell + avatar │
├───────────────────────────────────────────────────────────┬─────┤
│ KPI GRID (4 cards desktop / 2 tablet / 1 mobile)          │ AI  │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐              │CHAT │
│ │KPI 1   │ │KPI 2   │ │KPI 3   │ │KPI 4   │              │PANEL│
│ │Value   │ │Value   │ │Value   │ │Value   │              │     │
│ │▲ delta │ │▼ delta │ │▲ delta │ │▲ delta │              │ AI  │
│ └────────┘ └────────┘ └────────┘ └────────┘              │INSI │
├──────────────────────┬────────────────────────────────────│GHTS │
│ TREND CHART (60%)    │ ACTIVITY FEED (40%)                │     │
│ Line / Bar chart     │ Timestamped events                 │     │
├──────────────────────┴────────────────────────────────────│     │
│ TIMELINE TABLE: Project | Milestone | Due | Status        │     │
├───────────────────────────────────────────────────────────┤     │
│ RISK ALERTS strip + UPCOMING MILESTONES strip             │     │
└───────────────────────────────────────────────────────────┴─────┘
```

---

### 02-A: Super Admin Dashboard

**Theme colour:** Deep Navy `#1A3C5E`

#### KPI Cards (6 shown in 3+3 grid)
| KPI | Value | Delta | Icon |
|-----|-------|-------|------|
| Active Projects | 142 | +8 this month | 🏗️ |
| Completed Projects | 61 | +5 this quarter | ✅ |
| Delayed Projects | 17 | -2 vs last month | ⚠️ |
| Total Budget | ₹248 Cr | 91% utilised | 💰 |
| Resource Utilisation | 84% | +3.1% efficiency | 👥 |
| AI Requirement Score | 92% | +2.4% quality | 🤖 |

#### Unique Widgets
- **Organisation Map:** India map with project pins coloured by health (green/amber/red)
- **AI Adoption Gauge:** % of projects using AI features (currently 78%)
- **Budget Burn Heatmap:** 12-month calendar heatmap of spend intensity
- **User Activity Log:** last 20 system actions with user, timestamp, module
- **Compliance Status Strip:** 4 indicators — OSHA, ISO 9001, local permits, insurance

#### AI Chat System Prompt
> *"You are the executive AI assistant for a construction portfolio of 142 active projects worth ₹248 Cr. Provide data-driven insights, flag anomalies, and generate board-ready summaries. Current risk hotspots: GreenField Phase II (risk score 67), EcoBuild Plant (54)."*

#### Role-Specific Actions
- `[Export Executive Report]` → PDF generation with portfolio summary
- `[Add User]` → Modal: name, email, role, project assignments
- `[Configure AI Settings]` → Model, temperature, knowledge base uploads
- `[View Audit Log]` → Full action history with filter by user/module/date

#### Mock Activity Feed
```
✅ PRJ-1001 Skyline Tower — Facade milestone approved by Rahul K.   2 min ago
🤖 AI generated cost overrun alert for GreenField Phase II          8 min ago
👤 New user Sandeep Joshi (Engineer) provisioned by Admin           15 min ago
⚠️ Risk score for EcoBuild Plant crossed threshold (54 → 58)        22 min ago
📄 Compliance doc uploaded: OSHA certification renewal              31 min ago
💬 Client Priya Nair raised change order #CO-0041                   44 min ago
🔒 Failed login attempt from unknown IP 203.45.12.88               1 hr ago
📊 Monthly AI insights report auto-generated and emailed            2 hrs ago
```

---

### 02-B: Project Manager Dashboard

**Theme colour:** Blue `#1E6FB5`

#### KPI Cards
| KPI | Value | Delta | Icon |
|-----|-------|-------|------|
| My Active Projects | 8 | 3 at risk | 📁 |
| Milestone Hit Rate | 73% | -4% vs last month | 🎯 |
| Budget Variance | -₹12L | Over by 2.1% | 💸 |
| Open Issues & RFIs | 23 | 7 overdue | 🔔 |
| Workforce Utilisation | 81% | +2% this week | 👷 |
| AI Health Score | 76/100 | ▼3 from last week | 🤖 |

#### Unique Widgets
- **Project Health Cards:** Mini cards per project with RAG status + quick-navigate
- **Weekly Schedule Burn-Down:** Planned vs actual task completion
- **Change Order Tracker:** Pending / approved / rejected counts with value
- **Weather Alert Banner:** Next 7-day forecast with impact days highlighted

#### AI Chat System Prompt
> *"You are an expert construction project manager AI. You are managing 8 active projects. Current priority alerts: GreenField Phase II is delayed with Block B at 41% completion (target was 72%). EcoBuild Plant MEP handover is 11 days overdue. Suggest daily action priorities."*

#### Role-Specific Actions
- `[Create Project]` → Wizard
- `[Generate Status Report]` → AI-drafted report for selected project
- `[Approve Change Order]` → Review CO list and approve/reject
- `[Schedule Team Meeting]` → Calendar integration + AI agenda draft

---

### 02-C: Architect Dashboard

**Theme colour:** Violet `#6C3483`

#### KPI Cards
| KPI | Value | Delta | Icon |
|-----|-------|-------|------|
| Drawings Submitted | 48 | 6 pending approval | 📐 |
| Active Design Changes | 11 | 3 critical | ✏️ |
| Blueprint AI Score | 87/100 | +4 this week | 🤖 |
| Sustainability Rating | A- | Target: A | 🌿 |
| BIM Clashes Open | 14 | Resolved: 31 | 💥 |
| Material Spec Completion | 79% | +6% this week | 📦 |

#### Unique Widgets
- **Drawing Approval Pipeline:** Kanban — Draft / Under Review / Approved / Rejected
- **Blueprint Analysis Feed:** Latest AI analysis results per uploaded drawing
- **Material Optimizer Suggestions:** AI-recommended alternatives with savings %
- **Design Change Impact Matrix:** How each DCR affects cost, schedule, and sustainability

#### AI Chat System Prompt
> *"You are an architectural AI advisor specialising in sustainable design. Currently reviewing designs for Skyline Corporate Tower (commercial high-rise, Bengaluru) and GreenField Residences (residential township, Pune). Facade analysis score is 87/100. 14 BIM clashes are unresolved. Sustainability target is LEED Gold."*

#### Role-Specific Actions
- `[Upload Blueprint]` → Triggers AI analysis
- `[Submit Drawing for Approval]` → Routes to PM review queue
- `[Run Clash Detection]` → BIM analysis on latest uploads
- `[Generate Design Report]` → PDF with AI critique + scores

---

### 02-D: Civil Engineer Dashboard

**Theme colour:** Green `#1D8A4E`

#### KPI Cards
| KPI | Value | Delta | Icon |
|-----|-------|-------|------|
| Site Progress (Avg) | 68% | +3% this week | 🏗️ |
| Open NCRs | 7 | 2 critical | 📋 |
| Equipment Utilisation | 76% | -4% (2 idle) | 🚧 |
| Safety Incident Rate | 0.8 | /100K hrs — below target | ⛑️ |
| Structural Risk Score | 42/100 | Medium — Watch | ⚠️ |
| Daily Labour Hours | 1,847 | -120 vs plan | ⏱️ |

#### Unique Widgets
- **Site Progress Zones Map:** Interactive site plan with zone % overlays
- **Equipment Status Grid:** Each equipment item with utilisation % + maintenance due
- **NCR Tracker:** Open non-conformance reports with age and severity
- **Structural Risk Predictor:** AI-scored risk by element (foundation, columns, slab, etc.)

#### AI Chat System Prompt
> *"You are a construction site engineering AI. Currently monitoring 4 active sites. Site Skyline Tower: facade at 63%, 2 NCRs open. Metro Depot: risk score 21, stable. EcoBuild Plant: MEP overdue, equipment idle rate 24%. Predict bottlenecks and suggest corrective actions."*

#### Role-Specific Actions
- `[Log NCR]` → Form with photo upload + location tag
- `[Submit Inspection Report]` → Daily QC checklist
- `[Request Equipment]` → Allocation request to PM
- `[Log Safety Incident]` → Incident severity + witness + root cause

---

### 02-E: Client Dashboard

**Theme colour:** Amber `#F08C00`

#### KPI Cards
| KPI | Value | Delta | Icon |
|-----|-------|-------|------|
| My Projects | 2 | 1 active, 1 planning | 🏠 |
| Overall Completion | 56% | +4% since last visit | 📊 |
| Budget: Approved vs Spent | ₹9.4Cr / ₹7.8Cr | 83% spent | 💰 |
| Next Milestone | Apr 24 | Block B Slab — 4 days | 📅 |
| Pending Approvals | 3 | 1 urgent | ✍️ |
| Sustainability Score | B+ | Target: A- | 🌱 |

#### Unique Widgets
- **My Project Cards:** Visual progress rings with photo evidence link
- **Approval Inbox:** Change orders and design submissions awaiting client sign-off
- **Photo Timeline:** Latest site progress photos with date and zone tags
- **AI Project Summary:** Plain-English weekly update generated by AI

#### AI Chat System Prompt
> *"You are a friendly construction project assistant for client Priya Nair. She owns GreenField Residences Phase II in Pune. The project is 43% complete, currently delayed by 18 days on Block B. Budget is on track at ₹7.8Cr of ₹9.4Cr approved. Answer questions simply and provide transparent updates."*

#### Role-Specific Actions (Read-focused, limited writes)
- `[Approve Change Order]` → Review impact + sign digitally
- `[Raise Concern]` → Message thread to PM
- `[View Progress Photos]` → Gallery with AI-tagged objects
- `[Download Progress Report]` → AI-generated PDF summary

---

## MODULE 03: PROJECT LIFECYCLE MANAGER

### Pages: `/projects` · `/projects/:id` · `/projects/create`

---

### 03-A: Projects List Page (`/projects`)

#### Layout
```
┌──────────────────────────────────────────────────────────┐
│ HEADER: "Projects" | [+ Create Project] btn (PM/Admin)    │
├──────────────────────────────────────────────────────────┤
│ FILTER BAR: Status▼  Type▼  Location▼  [Search...] 🔍    │
│ SORT: By Health | By Budget | By Date | By Risk           │
├──────────────────────────────────────────────────────────┤
│ SUMMARY STRIP: Active:8 | Delayed:3 | Completed:12       │
│                Budget Used: 84% | Avg Health: 72/100      │
├──────────────────────────────────────────────────────────┤
│ PROJECT CARDS GRID (3-col desktop / 2 tablet / 1 mobile) │
│ ┌──────────────────┐  ┌──────────────────┐  ┌─────────┐ │
│ │ 🏗️ Skyline Tower │  │ 🏘️ GreenField P2  │  │ 🚇 Metro│ │
│ │ Apex Infra       │  │ UrbanNest Dev.   │  │ City TA │ │
│ │ Bengaluru        │  │ Pune             │  │ Chennai │ │
│ │ ████████░░ 68%   │  │ █████░░░░░ 43%   │  │ ██████░│ │
│ │ 🟢 Active        │  │ 🔴 Delayed       │  │ 🟢 Act. │ │
│ │ Risk: 31 | ₹18.5Cr│  │ Risk: 67 | ₹9.4Cr│  │ Risk:21 │ │
│ │ Health: 81/100   │  │ Health: 54/100   │  │ H:88/100│ │
│ └──────────────────┘  └──────────────────┘  └─────────┘ │
├──────────────────────────────────────────────────────────┤
│ LIST VIEW TOGGLE — DataTable with sortable columns        │
│ ID | Name | Client | Status | Completion | Risk | Budget │
└──────────────────────────────────────────────────────────┘
```

#### Functional Behaviour by Role
| Feature | Super Admin | PM | Architect | Engineer | Client |
|---------|:-----------:|:--:|:---------:|:--------:|:------:|
| See all projects | ✅ | Own+assigned | Own assigned | Assigned | Own |
| Create project | ✅ | ✅ | ❌ | ❌ | ❌ |
| Delete project | ✅ | ❌ | ❌ | ❌ | ❌ |
| Export list | ✅ | ✅ | ❌ | ❌ | ❌ |
| View health scores | ✅ | ✅ | ✅ | ✅ | ✅ |

#### Mock Projects Data (Extended — 8 projects)
```typescript
export const MOCK_PROJECTS: ProjectRecord[] = [
  {
    id: "PRJ-1001", name: "Skyline Corporate Tower",
    client: "Apex Infra Holdings", location: "Bengaluru", type: "Commercial High-Rise",
    completion: 68, delayRisk: 22, riskScore: 31, healthScore: 81,
    budgetPlanned: 18500000, budgetActual: 17240000, resourceUtilization: 84,
    aiRequirementScore: 91, status: "Active",
    startDate: "2025-06-15", endDate: "2026-12-20",
    assignedTeam: ["PM: Rahul Khanna", "Arch: Neha Kapoor", "Eng: Vikram Sethi"],
    milestones: [
      { name: "Foundation & Piling", dueDate: "2025-09-10", status: "Completed", completion: 100 },
      { name: "Core Structure", dueDate: "2026-02-22", status: "Completed", completion: 100 },
      { name: "Facade Installation", dueDate: "2026-07-18", status: "In Progress", completion: 63 },
      { name: "MEP & Finishing", dueDate: "2026-11-30", status: "Pending", completion: 14 },
    ]
  },
  {
    id: "PRJ-1002", name: "GreenField Residences Phase II",
    client: "UrbanNest Developments", location: "Pune", type: "Residential Township",
    completion: 43, delayRisk: 38, riskScore: 67, healthScore: 54,
    budgetPlanned: 9400000, budgetActual: 10020000, resourceUtilization: 78,
    aiRequirementScore: 86, status: "Delayed",
    startDate: "2025-09-05", endDate: "2026-11-10",
    assignedTeam: ["PM: Aditya Sharma", "Arch: Neha Kapoor", "Eng: Farhan Ali"]
  },
  {
    id: "PRJ-1003", name: "Riverside Metro Depot",
    client: "City Transit Authority", location: "Chennai", type: "Infrastructure",
    completion: 81, delayRisk: 8, riskScore: 21, healthScore: 88,
    budgetPlanned: 42000000, budgetActual: 38900000, resourceUtilization: 91,
    aiRequirementScore: 94, status: "Active",
    startDate: "2024-11-01", endDate: "2026-08-30",
    assignedTeam: ["PM: Sunita Reddy", "Eng: Ritesh Nair"]
  },
  {
    id: "PRJ-1004", name: "EcoBuild Industrial Plant",
    client: "GreenMfg Corp", location: "Hyderabad", type: "Industrial",
    completion: 57, delayRisk: 41, riskScore: 54, healthScore: 62,
    budgetPlanned: 31000000, budgetActual: 29400000, resourceUtilization: 73,
    aiRequirementScore: 88, status: "Active",
    startDate: "2025-04-12", endDate: "2027-01-15",
    assignedTeam: ["PM: Rahul Khanna", "Eng: Aditi Menon"]
  },
  {
    id: "PRJ-1005", name: "Coastal Luxury Villas — Sea Breeze",
    client: "PremiumHomes Ltd", location: "Goa", type: "Luxury Residential",
    completion: 29, delayRisk: 15, riskScore: 28, healthScore: 79,
    budgetPlanned: 7800000, budgetActual: 5100000, resourceUtilization: 69,
    aiRequirementScore: 82, status: "Active",
    startDate: "2026-01-20", endDate: "2027-06-30",
    assignedTeam: ["PM: Kiran Desai", "Arch: Neha Kapoor"]
  },
  {
    id: "PRJ-1006", name: "SmartCity Data Centre — Phase 1",
    client: "TechNexus Infrastructure", location: "Mumbai", type: "Technology Facility",
    completion: 14, delayRisk: 11, riskScore: 19, healthScore: 84,
    budgetPlanned: 55000000, budgetActual: 8200000, resourceUtilization: 62,
    aiRequirementScore: 97, status: "Active",
    startDate: "2026-02-10", endDate: "2027-09-30",
    assignedTeam: ["PM: Rahul Khanna", "Eng: Vikram Sethi"]
  },
  {
    id: "PRJ-1007", name: "Heritage Hospital Expansion",
    client: "Apollo Health Group", location: "Delhi", type: "Healthcare",
    completion: 92, delayRisk: 4, riskScore: 12, healthScore: 96,
    budgetPlanned: 22000000, budgetActual: 21400000, resourceUtilization: 95,
    aiRequirementScore: 99, status: "Active",
    startDate: "2024-08-01", endDate: "2026-05-31",
    assignedTeam: ["PM: Sunita Reddy", "Arch: Manish Bose", "Eng: Pradeep Kumar"]
  },
  {
    id: "PRJ-1008", name: "Lakeview School Campus",
    client: "EduFirst Foundation", location: "Coimbatore", type: "Educational",
    completion: 100, delayRisk: 0, riskScore: 0, healthScore: 100,
    budgetPlanned: 5200000, budgetActual: 4980000, resourceUtilization: 100,
    aiRequirementScore: 95, status: "Completed",
    startDate: "2024-03-01", endDate: "2025-12-31",
    assignedTeam: ["PM: Aditya Sharma", "Arch: Neha Kapoor"]
  }
]
```

---

### 03-B: Project Detail Page (`/projects/:id`)

#### Layout (Tabbed interface)
```
┌─────────────────────────────────────────────────────────────┐
│ BREADCRUMB: Projects > Skyline Corporate Tower              │
│ PROJECT HEADER: Name | Client | Location | Status Badge     │
│ [Edit] [Share] [Generate Report] (role-gated)               │
├──────────┬────────────────────────────────────────┬─────────┤
│ STAT ROW │ Completion: 68% | Risk: 31 | Health: 81 │ Team    │
├──────────┴────────────────────────────────────────┴─────────┤
│ TABS: Overview | Milestones | Documents | Risk | Financials  │
├─────────────────────────────────────────────────────────────┤
│ TAB: OVERVIEW                                               │
│  ┌─────────────────────────┐  ┌──────────────────────────┐  │
│  │ Progress Timeline chart │  │ Budget Actual vs Planned │  │
│  │ (line chart 6 months)   │  │ (bar chart by phase)     │  │
│  └─────────────────────────┘  └──────────────────────────┘  │
│  Recent Activity Feed         AI Health Summary Panel        │
├─────────────────────────────────────────────────────────────┤
│ TAB: MILESTONES (Gantt-style table)                         │
│  Name | Due Date | Status | Completion | Owner | Actions    │
│  ████████████░░░░ Foundation — Completed                    │
│  ████████████████ Core Structure — Completed                │
│  ████████░░░░░░░░ Facade — In Progress (63%)               │
│  ░░░░░░░░░░░░░░░░ MEP & Finishing — Pending (14%)          │
└─────────────────────────────────────────────────────────────┘
```

#### Tab: Overview — Components
- **Progress Chart:** 6-month line chart showing planned vs actual %
- **Budget Chart:** Stacked bar per phase with over/under coloring
- **Team Card:** Avatar list of assigned members with roles + contact
- **AI Health Summary:** AI-generated 3-bullet project health narrative with regenerate button
- **Recent Activity:** Last 10 project events from activity feed

#### Tab: Milestones
- Visual Gantt bars with colour-coded status (green/blue/amber/red)
- Inline edit milestone (PM/Admin only): name, due date, owner, completion %
- `[+ Add Milestone]` button (PM/Admin only)
- Milestone dependency arrows (if applicable)
- AI delay prediction badge on at-risk milestones

#### Tab: Documents
- File upload area (drag & drop)
- Document list: Name | Type | Uploaded By | Date | Version | Actions
- Version history per document (click to expand)
- `[Download All]` as ZIP
- `[Send for Approval]` routes doc to reviewer

#### Tab: Risk
- Risk score gauge (0–100, colour-coded)
- Risk items table: Factor | Probability | Impact | Score | Owner | Mitigation
- AI risk summary paragraph
- Link to full Risk Intelligence module for this project

#### Tab: Financials (PM/Admin/Client read-only)
- Budget table: Planned | Actual | Variance | % Used per phase
- Cash flow mini-chart
- Change order list with value and status
- `[Export BoQ]` → Excel download

#### Functional Behaviour by Role
| Feature | Super Admin | PM | Architect | Engineer | Client |
|---------|:-----------:|:--:|:---------:|:--------:|:------:|
| View all tabs | ✅ | ✅ | Overview+Docs | Overview+Risk | Overview+Fin |
| Edit milestone | ✅ | ✅ | ❌ | ❌ | ❌ |
| Upload document | ✅ | ✅ | ✅ | ✅ | ❌ |
| View financials | ✅ | ✅ | ❌ | ❌ | ✅ (read) |
| Export report | ✅ | ✅ | ❌ | ❌ | ✅ |

---

### 03-C: Create Project Page (`/projects/create`) — PM & Admin Only

#### Multi-Step Wizard (4 steps)

**Step 1 — Basic Info**
- Project Name (required)
- Client (dropdown from `MOCK_CLIENTS`)
- Project Type: Commercial / Residential / Infrastructure / Industrial / Healthcare / Educational
- Location (city + state)
- Description (textarea)

**Step 2 — Timeline & Budget**
- Start Date / End Date (date pickers)
- Planned Budget (number input with currency)
- Contingency % (slider 5–20%)
- Project Phases (dynamic add/remove: Phase name + duration)

**Step 3 — Team Assignment**
- PM assignment (dropdown of PM users)
- Architect assignment (multi-select)
- Engineers (multi-select)
- Client contact (from client list)

**Step 4 — AI Pre-fill from Requirement**
- Option to link to a completed AI Interview session
- AI auto-populates sustainability goals, material preferences, special requirements
- Review & confirm screen
- `[Create Project]` → saves and redirects to new project detail page

---

## MODULE 04: CLIENT MANAGEMENT

### Pages: `/clients` · `/clients/:id`

> **Access:** Super Admin (full), Project Manager (read+write), Client (own profile only)

---

### 04-A: Clients List Page (`/clients`)

#### Layout
```
┌──────────────────────────────────────────────────────────┐
│ HEADER: "Clients" | [+ Add Client] (Admin/PM only)       │
├──────────────────────────────────────────────────────────┤
│ SEARCH: [🔍 Search by name, company, city...]            │
│ FILTERS: Industry▼  Status▼  City▼                       │
├──────────────────────────────────────────────────────────┤
│ SUMMARY: Total: 18 | Active: 11 | In Planning: 4 | VIP: 3│
├──────────────────────────────────────────────────────────┤
│ CLIENT CARDS (3-col / 2 / 1 responsive)                   │
│ ┌───────────────────┐                                     │
│ │ 🏢 Apex Infra      │  Avatar initials circle            │
│ │ Holdings           │  Industry: Real Estate             │
│ │ ──────────────     │  Projects: 2 Active                │
│ │ Contact: R. Gupta  │  Total Value: ₹31.2 Cr            │
│ │ Mumbai             │  AI Score: 94%                     │
│ │ [View Profile]     │  Status: 🟢 Active                 │
│ └───────────────────┘                                     │
└──────────────────────────────────────────────────────────┘
```

#### Mock Client Data (10 clients)
```typescript
export const MOCK_CLIENTS = [
  { id: "CLT-001", name: "Apex Infra Holdings", contact: "Rakesh Gupta",
    email: "r.gupta@apexinfra.com", phone: "+91-98200-11223",
    city: "Mumbai", industry: "Real Estate", status: "Active",
    activeProjects: 2, totalValueCr: 31.2, aiScore: 94,
    requirements: ["Sustainable design", "LEED Gold certification", "Smart building integration"],
    joinedDate: "2024-03-15" },
  { id: "CLT-002", name: "UrbanNest Developments", contact: "Meera Patel",
    email: "meera@urbannest.in", phone: "+91-97300-44556",
    city: "Pune", industry: "Residential", status: "Active",
    activeProjects: 1, totalValueCr: 9.4, aiScore: 86,
    requirements: ["Affordable housing", "Green spaces", "Community amenities"],
    joinedDate: "2025-01-10" },
  { id: "CLT-003", name: "City Transit Authority", contact: "Suresh Nambiar",
    email: "s.nambiar@cta.gov.in", phone: "+91-44-2345-6789",
    city: "Chennai", industry: "Government/Infrastructure", status: "Active",
    activeProjects: 1, totalValueCr: 42.0, aiScore: 94,
    requirements: ["Government compliance", "Seismic design", "2000+ vehicle capacity"],
    joinedDate: "2024-07-22" },
  { id: "CLT-004", name: "GreenMfg Corp", contact: "Arjun Mehrotra",
    email: "arjun@greenmfg.com", phone: "+91-40-8899-0011",
    city: "Hyderabad", industry: "Industrial", status: "Active",
    activeProjects: 1, totalValueCr: 31.0, aiScore: 88,
    requirements: ["Zero-carbon operations", "Solar integration", "EV charging infrastructure"],
    joinedDate: "2024-12-05" },
  { id: "CLT-005", name: "PremiumHomes Ltd", contact: "Kavita Shah",
    email: "kavita@premiumhomes.in", phone: "+91-98100-77889",
    city: "Goa", industry: "Luxury Residential", status: "Active",
    activeProjects: 1, totalValueCr: 7.8, aiScore: 82,
    requirements: ["Sea-view orientation", "Italian marble finishes", "Smart home automation"],
    joinedDate: "2025-10-18" },
  { id: "CLT-006", name: "TechNexus Infrastructure", contact: "Rohit Bansal",
    email: "r.bansal@technexus.com", phone: "+91-22-5566-7788",
    city: "Mumbai", industry: "Technology", status: "Active",
    activeProjects: 1, totalValueCr: 55.0, aiScore: 97,
    requirements: ["Tier 4 data centre", "99.999% uptime design", "Green cooling"],
    joinedDate: "2025-11-30" },
  { id: "CLT-007", name: "Apollo Health Group", contact: "Dr. Sana Mirza",
    email: "sana.m@apollohealth.in", phone: "+91-11-4567-8901",
    city: "Delhi", industry: "Healthcare", status: "VIP",
    activeProjects: 1, totalValueCr: 22.0, aiScore: 99,
    requirements: ["NABH compliance", "Infection control design", "300-bed expansion"],
    joinedDate: "2023-06-01" },
  { id: "CLT-008", name: "EduFirst Foundation", contact: "Renu Prakash",
    email: "renu@edufirst.org", phone: "+91-422-2345-678",
    city: "Coimbatore", industry: "Education", status: "Completed",
    activeProjects: 0, totalValueCr: 5.2, aiScore: 95,
    requirements: ["Child-safe design", "Natural lighting", "3000 student capacity"],
    joinedDate: "2023-09-12" },
  { id: "CLT-009", name: "Sunrise Hospitality Group", contact: "Vikash Choudhary",
    email: "vikash@sunrisehg.com", phone: "+91-98300-22334",
    city: "Jaipur", industry: "Hospitality", status: "In Planning",
    activeProjects: 0, totalValueCr: 0, aiScore: 0,
    requirements: ["Heritage-style architecture", "200-room 5-star hotel", "Spa and pool"],
    joinedDate: "2026-02-14" },
  { id: "CLT-010", name: "Metro Retail Chains", contact: "Priya Sharma",
    email: "priya.s@metroretail.in", phone: "+91-97200-55667",
    city: "Bengaluru", industry: "Retail", status: "In Planning",
    activeProjects: 0, totalValueCr: 0, aiScore: 0,
    requirements: ["20 store fit-outs", "Uniform brand design", "Rapid delivery timeline"],
    joinedDate: "2026-03-01" }
]
```

---

### 04-B: Client Profile Page (`/clients/:id`)

#### Layout (Tabbed)
```
┌──────────────────────────────────────────────────────────┐
│ PROFILE HEADER:                                          │
│ [Avatar] Apex Infra Holdings | Rakesh Gupta | Mumbai     │
│ Status badge | Industry | Joined: Mar 2024               │
│ [Edit Client] [New Project] [Send Message]               │
├──────────────────────────────────────────────────────────┤
│ STATS ROW: Active Projects | Total Value | AI Score      │
├──────────────────────────────────────────────────────────┤
│ TABS: Overview | Projects | Requirements | Communication │
├──────────────────────────────────────────────────────────┤
│ Overview:                                                │
│  Contact details card | Key preferences card            │
│  Project value chart (bar by project)                    │
│  AI client insight summary                              │
│                                                          │
│ Requirements:                                            │
│  Extracted requirements from AI Interview                │
│  Requirement tags (design/budget/sustainability/etc.)    │
│  Interview history list with dates                       │
│                                                          │
│ Communication:                                           │
│  Message thread view (PM ↔ Client)                       │
│  Change order history                                    │
│  Approval history                                        │
└──────────────────────────────────────────────────────────┘
```


---

## MODULE 05: AI REQUIREMENT INTERVIEW

### Pages: `/ai-interview` · `/ai-interview/history`

> **Access:** Super Admin (full), PM (write), Architect (read), Engineer (read), Client (write own)

---

### 05-A: AI Interview Page (`/ai-interview`)

#### Layout
```
┌──────────────────────────────────────────────────────────┐
│ HEADER: "AI Requirement Interview"                       │
│ [New Interview] [View History] [Import from Project]     │
├──────────────────────────────────────────────────────────┤
│ INTERVIEW SETUP PANEL                                    │
│  Project: [Select / Create New ▼]                        │
│  Client: [Select Client ▼]                               │
│  Interview Mode: Standard | Deep-Dive | Quick Capture    │
│  [Start Interview →]                                     │
├──────────────────────────────────────────────────────────┤
│ CHAT INTERFACE (active session)                          │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ 🤖 AI: "Welcome! I'll guide you through capturing    │ │
│ │       your project requirements. What type of        │ │
│ │       building are you planning?"                    │ │
│ │                                                      │ │
│ │ 👤 Client: "A 5-floor commercial office building     │ │
│ │           in Pune with underground parking"          │ │
│ │                                                      │ │
│ │ 🤖 AI: "Great! For 5 floors + basement, I'll need:  │ │
│ │       1. Expected occupancy (approx. persons)?       │ │
│ │       2. Do you need LEED/green certification?       │ │
│ │       3. What's your target completion timeline?"    │ │
│ └──────────────────────────────────────────────────────┘ │
│ [Voice 🎤] [Text input...........] [Send →]              │
├──────────────────────────────────────────────────────────┤
│ EXTRACTED REQUIREMENTS PANEL (live, right side)          │
│  ✅ Building type: Commercial Office                     │
│  ✅ Floors: 5 + basement parking                         │
│  ✅ Location: Pune                                       │
│  ⏳ Occupancy: Pending                                   │
│  ⏳ Sustainability: Pending                              │
│  Completeness: ██████░░░░ 60%                            │
│  [Generate Document] (active at 80%+)                    │
└──────────────────────────────────────────────────────────┘
```

#### AI Conversation Flow — 12-Question Standard Template
| Q# | Question | Extracted Field |
|----|----------|----------------|
| 1 | Building type & purpose | `buildingType`, `purpose` |
| 2 | Location & site conditions | `location`, `siteConstraints` |
| 3 | Total built-up area (sqft/sqm) | `builtUpArea` |
| 4 | Number of floors / basement | `floors`, `basement` |
| 5 | Expected occupancy / users | `occupancy` |
| 6 | Budget range (min-max) | `budgetMin`, `budgetMax` |
| 7 | Target start & completion dates | `startDate`, `endDate` |
| 8 | Sustainability goals (LEED/BREEAM/none) | `sustainabilityTarget` |
| 9 | Special requirements (MEP, smart systems) | `specialRequirements[]` |
| 10 | Aesthetic preferences / style | `designStyle` |
| 11 | Regulatory / compliance constraints | `complianceNeeds[]` |
| 12 | Priority: Cost vs Speed vs Quality | `priorityMatrix` |

#### Completeness Scoring Logic
- Each answered field = 8.33 points (12 fields = 100%)
- Partial answer = 4 points
- Conflicting answers (e.g., "luxury finish" + "minimal budget") → yellow warning flag
- Score ≥ 80% → `[Generate Document]` button activates

#### Generated Requirement Document Contents
```markdown
# Project Requirement Document
## Project: [Name] | Client: [Client] | Date: [Date]
### 1. Project Overview
### 2. Spatial Requirements
### 3. Budget & Timeline
### 4. Sustainability Goals
### 5. Special Requirements
### 6. Priority Matrix
### 7. AI Recommendations
### 8. Risk Flags (if any)
```

#### Functional Behaviour by Role
| Feature | Super Admin | PM | Architect | Engineer | Client |
|---------|:-----------:|:--:|:---------:|:--------:|:------:|
| Start interview | ✅ | ✅ | ❌ | ❌ | ✅ |
| View all interviews | ✅ | Own projects | Assigned | Assigned | Own |
| Generate document | ✅ | ✅ | ❌ | ❌ | ✅ |
| Edit extracted data | ✅ | ✅ | ❌ | ❌ | ❌ |
| Delete interview | ✅ | Own | ❌ | ❌ | ❌ |

---

### 05-B: Interview History Page (`/ai-interview/history`)

#### Layout
- Search bar + date range filter + project filter
- Table: ID | Project | Client | Date | Completeness% | Status | Actions
- Actions: View, Re-run, Download PDF, Delete
- Each row expandable to show extracted requirements summary
- "Most Recent" section at top showing last 5 interviews as cards

#### Mock Interview History Data
```typescript
export const MOCK_INTERVIEW_HISTORY = [
  { id: "INT-001", project: "Skyline Corporate Tower", client: "Apex Infra",
    date: "2025-06-10", completeness: 96, status: "Completed",
    extractedFields: 12, generatedDoc: true },
  { id: "INT-002", project: "GreenField Residences Phase II", client: "UrbanNest Dev",
    date: "2025-08-22", completeness: 88, status: "Completed",
    extractedFields: 11, generatedDoc: true },
  { id: "INT-003", project: "Coastal Luxury Villas", client: "PremiumHomes",
    date: "2026-01-15", completeness: 72, status: "In Progress",
    extractedFields: 9, generatedDoc: false },
  { id: "INT-004", project: "SmartCity Data Centre", client: "TechNexus",
    date: "2026-02-05", completeness: 100, status: "Completed",
    extractedFields: 12, generatedDoc: true },
  { id: "INT-005", project: "Sunrise Hotel — Jaipur", client: "Sunrise Hospitality",
    date: "2026-03-10", completeness: 45, status: "Draft",
    extractedFields: 5, generatedDoc: false }
]
```

---

## MODULE 06: COST ESTIMATION ENGINE

### Pages: `/cost-estimation` · `/cost-estimation/reports`

> **Access:** Super Admin (full), PM (write), Engineer (read), Client (read-only)

---

### 06-A: Cost Estimation Page (`/cost-estimation`)

#### Layout
```
┌──────────────────────────────────────────────────────────┐
│ HEADER: "Cost Estimation Engine"                         │
│ Project Selector: [Skyline Corporate Tower ▼]            │
├──────────────────────┬───────────────────────────────────┤
│ KPI STRIP (4 cards)  │                                   │
│ Total Budget ₹18.5Cr │ Spent ₹17.2Cr │ Variance -6.8%  │
│ Contingency ₹1.8Cr   │ EAC: ₹19.1Cr  │ CPI: 0.97       │
├──────────────────────┴───────────────────────────────────┤
│ ┌────────────────────┐  ┌─────────────────────────────┐  │
│ │ S-CURVE CHART      │  │ COST BREAKDOWN PIE CHART    │  │
│ │ Planned vs Actual  │  │ Structure 34%               │  │
│ │ vs EAC over time   │  │ MEP 18% | Facade 16%        │  │
│ │ (6 months)         │  │ Finishing 14% | Others 18%  │  │
│ └────────────────────┘  └─────────────────────────────┘  │
├──────────────────────────────────────────────────────────┤
│ BILL OF QUANTITIES TABLE                                 │
│ Item | Qty | Unit | Unit Price | Total | Variance | Notes│
│ ─────────────────────────────────────────────────────── │
│ PCC Foundation    1200 m³  ₹4,200  ₹50.4L    0%         │
│ RCC Columns       840 m³   ₹6,800  ₹57.1L   +4.2%  ⚠️   │
│ Structural Steel  180 MT   ₹85,000 ₹1.53Cr  +8.1%  🔴   │
│ Facade Cladding   4200 m²  ₹2,100  ₹88.2L  -2.3%       │
│ Electrical MEP    Lump Sum        ₹2.8Cr   +1.1%        │
├──────────────────────────────────────────────────────────┤
│ SCENARIO COMPARISON (3 columns)                          │
│ Base Spec vs Value-Eng vs Premium Upgrade                │
├──────────────────────────────────────────────────────────┤
│ AI COST ALERT PANEL                                      │
│ 🤖 "Steel prices rose 6.2% this week in Maharashtra.    │
│    Structural Steel line is now ₹12.4L over budget.     │
│    Suggest: Lock price with SteelSpan now or switch     │
│    to reinforced concrete for Column Grid B."           │
│ [Lock Price Order] [View Alternatives] [Dismiss]         │
└──────────────────────────────────────────────────────────┘
```

#### Mock Cost Estimation Data (Extended)
```typescript
export const MOCK_COST_ESTIMATION = {
  projectId: "PRJ-1001",
  budgetPlanned: 18500000,
  budgetActual: 17240000,
  contingency: 1850000,
  eac: 19100000,
  cpi: 0.97,
  spi: 0.94,
  sCurveData: [
    { month: "Jul 25", planned: 800000, actual: 750000, eac: 800000 },
    { month: "Aug 25", planned: 2100000, actual: 1980000, eac: 2050000 },
    { month: "Sep 25", planned: 4200000, actual: 4050000, eac: 4180000 },
    { month: "Oct 25", planned: 7300000, actual: 7100000, eac: 7400000 },
    { month: "Nov 25", planned: 10800000, actual: 10500000, eac: 11200000 },
    { month: "Dec 25", planned: 14200000, actual: 13900000, eac: 14800000 },
    { month: "Jan 26", planned: 17240000, actual: 17240000, eac: 18100000 },
  ],
  costBreakdown: [
    { category: "Structural Works", planned: 6300000, actual: 6560000, variance: 4.1 },
    { category: "MEP Systems", planned: 3330000, actual: 3290000, variance: -1.2 },
    { category: "Facade & Glazing", planned: 2960000, actual: 2890000, variance: -2.4 },
    { category: "Finishing Works", planned: 2590000, actual: 2480000, variance: -4.2 },
    { category: "Foundation & Piling", planned: 1480000, actual: 1480000, variance: 0 },
    { category: "Landscaping", planned: 370000, actual: 280000, variance: -24.3 },
    { category: "Project Management", planned: 925000, actual: 910000, variance: -1.6 },
    { category: "Contingency Used", planned: 0, actual: 340000, variance: null },
  ],
  boqItems: [
    { id: "BOQ-001", description: "PCC Foundation Grade M20", qty: 1200, unit: "m³",
      unitPrice: 4200, total: 5040000, variance: 0, status: "On Track" },
    { id: "BOQ-002", description: "RCC Columns Grade M40", qty: 840, unit: "m³",
      unitPrice: 6800, total: 5712000, variance: 4.2, status: "Over" },
    { id: "BOQ-003", description: "Structural Steel Fe550", qty: 180, unit: "MT",
      unitPrice: 85000, total: 15300000, variance: 8.1, status: "Critical" },
    { id: "BOQ-004", description: "Aluminium Facade Cladding", qty: 4200, unit: "m²",
      unitPrice: 2100, total: 8820000, variance: -2.3, status: "Under" },
    { id: "BOQ-005", description: "HVAC System — Central Plant", qty: 1, unit: "LS",
      unitPrice: 14000000, total: 14000000, variance: 1.1, status: "Slight Over" },
    { id: "BOQ-006", description: "Electrical: HT/LT + BMS", qty: 1, unit: "LS",
      unitPrice: 12000000, total: 12000000, variance: -0.8, status: "On Track" },
    { id: "BOQ-007", description: "Plumbing & Sanitation", qty: 1, unit: "LS",
      unitPrice: 4500000, total: 4500000, variance: 2.2, status: "Slight Over" },
    { id: "BOQ-008", description: "Internal Finishing — Office Grade A", qty: 22000, unit: "m²",
      unitPrice: 1800, total: 39600000, variance: -3.1, status: "Under" },
  ],
  scenarios: [
    { name: "Base Specification", totalCost: 18500000, qualityScore: 82, timeline: "18 months" },
    { name: "Value Engineering", totalCost: 16200000, qualityScore: 74, timeline: "17 months",
      savings: 2300000, changes: ["Standard facade cladding", "Conventional MEP", "Grade B finishing"] },
    { name: "Premium Upgrade", totalCost: 21800000, qualityScore: 94, timeline: "20 months",
      premium: 3300000, changes: ["Curtain wall facade", "BMS integrated MEP", "Grade A+ finishing", "Green roof"] }
  ]
}
```

#### AI Cost Intelligence Features
- **Price Feed Alert:** Real-time steel/cement/rebar price changes with impact calculation
- **EAC Predictor:** ML forecast of final project cost based on current burn rate
- **Scenario Builder:** User adjusts parameters (material grade, method) and sees cost impact live
- **Export BoQ:** Excel download with all line items and variance highlighting

---

### 06-B: Cost Reports Page (`/cost-estimation/reports`)

#### Layout
- Report type selector: Monthly Summary | Phase Completion | Variance Analysis | Cash Flow
- Date range picker
- Generated report viewer (PDF embed preview)
- Export buttons: PDF, Excel, CSV

#### Functional Behaviour by Role
| Feature | Super Admin | PM | Architect | Engineer | Client |
|---------|:-----------:|:--:|:---------:|:--------:|:------:|
| View cost data | ✅ | ✅ | ❌ | ✅ (basic) | ✅ (summary) |
| Edit BoQ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Approve scenarios | ✅ | ✅ | ❌ | ❌ | ✅ |
| Export reports | ✅ | ✅ | ❌ | ❌ | ✅ |
| See full BoQ | ✅ | ✅ | ❌ | ✅ | ❌ |

---

## MODULE 07: CONSTRUCTION RISK INTELLIGENCE

### Pages: `/risk-intelligence` · `/risk-intelligence/project/:id`

> **Access:** Super Admin (full), PM (write), Architect (read), Engineer (write), Client (read)

---

### 07-A: Risk Intelligence Overview (`/risk-intelligence`)

#### Layout
```
┌──────────────────────────────────────────────────────────┐
│ HEADER: "Risk Intelligence" | [Export Risk Report]        │
├──────────────────────────────────────────────────────────┤
│ KPI STRIP                                                │
│ Portfolio Risk: 44/100 🟡 | Critical Projects: 2        │
│ Open Mitigations: 18 | Safety Incidents (30d): 3         │
│ Weather Alerts: 2 | Compliance Flags: 1                  │
├──────────────────────────────────────────────────────────┤
│ ┌──────────────────────┐  ┌──────────────────────────┐   │
│ │ RISK HEATMAP         │  │ RISK TREND LINE CHART    │   │
│ │ 2×2 matrix:          │  │ Portfolio avg risk/month │   │
│ │ Probability (Y)      │  │ Jan:52 Feb:49 Mar:46     │   │
│ │ Impact (X)           │  │ Apr:51 May:47 Jun:43     │   │
│ │ Bubble = project     │  │                          │   │
│ └──────────────────────┘  └──────────────────────────┘   │
├──────────────────────────────────────────────────────────┤
│ PROJECT RISK TABLE                                       │
│ Project | Risk Score | Safety | Structural | Weather |   │
│ ─────────────────────────────────────────────────────── │
│ Skyline Tower        38  🟡 Watch    Medium  44          │
│ GreenField Phase II  67  🔴 Critical High    62          │
│ Metro Depot          21  🟢 Stable   Low     28          │
│ EcoBuild Plant       54  🟡 Watch    Medium  57          │
├──────────────────────────────────────────────────────────┤
│ SAFETY ALERTS PANEL                                      │
│ 🔴 Tower B: Formwork inspection overdue by 2 days       │
│ 🟡 Block C: Crane wind-speed exceeded twice this week   │
│ 🟡 Metro Depot: Reinforcement mismatch in AI QC scan    │
│                                                          │
│ WEATHER RISK PANEL                                       │
│ 14-day forecast overlay on critical path:               │
│ Apr 22-24: Heavy rain (Pune) — Block B concrete at risk │
│ Apr 26: High wind (Chennai) — Crane ops restricted       │
└──────────────────────────────────────────────────────────┘
```

#### Extended Mock Risk Data
```typescript
export const MOCK_RISK_PROJECTS: RiskProject[] = [
  { id: "PRJ-1001", projectName: "Skyline Corporate Tower",
    riskScore: 38, safetyStatus: "Watch", structuralRiskLevel: "Medium",
    weatherImpactScore: 44, complianceStatus: "OK", lastInspection: "2026-03-18",
    openMitigations: 4, activeAlerts: 1 },
  { id: "PRJ-1002", projectName: "GreenField Residences Phase II",
    riskScore: 67, safetyStatus: "Critical", structuralRiskLevel: "High",
    weatherImpactScore: 62, complianceStatus: "Warning", lastInspection: "2026-03-15",
    openMitigations: 9, activeAlerts: 3 },
  { id: "PRJ-1003", projectName: "Riverside Metro Depot",
    riskScore: 21, safetyStatus: "Stable", structuralRiskLevel: "Low",
    weatherImpactScore: 28, complianceStatus: "OK", lastInspection: "2026-03-19",
    openMitigations: 2, activeAlerts: 0 },
  { id: "PRJ-1004", projectName: "EcoBuild Industrial Plant",
    riskScore: 54, safetyStatus: "Watch", structuralRiskLevel: "Medium",
    weatherImpactScore: 57, complianceStatus: "OK", lastInspection: "2026-03-16",
    openMitigations: 5, activeAlerts: 2 },
  { id: "PRJ-1005", projectName: "Coastal Luxury Villas",
    riskScore: 28, safetyStatus: "Stable", structuralRiskLevel: "Low",
    weatherImpactScore: 35, complianceStatus: "OK", lastInspection: "2026-03-17",
    openMitigations: 2, activeAlerts: 1 },
  { id: "PRJ-1006", projectName: "SmartCity Data Centre",
    riskScore: 19, safetyStatus: "Stable", structuralRiskLevel: "Low",
    weatherImpactScore: 18, complianceStatus: "OK", lastInspection: "2026-03-20",
    openMitigations: 1, activeAlerts: 0 },
]

export const RISK_REGISTER: RiskItem[] = [
  { id: "RSK-001", project: "PRJ-1002", category: "Structural",
    description: "High soil bearing capacity variance in Block B zone 3",
    probability: 0.7, impact: 0.8, score: 67,
    mitigationPlan: "Additional soil testing + engineer sign-off before pour",
    owner: "Farhan Ali", status: "Open", raisedDate: "2026-02-28" },
  { id: "RSK-002", project: "PRJ-1002", category: "Schedule",
    description: "Block B concrete supply chain delay — BatchPlant shutdown",
    probability: 0.8, impact: 0.7, score: 64,
    mitigationPlan: "Identify backup concrete supplier within 48h",
    owner: "Aditya Sharma", status: "In Mitigation", raisedDate: "2026-03-10" },
  { id: "RSK-003", project: "PRJ-1001", category: "Weather",
    description: "Monsoon season impact on facade cladding schedule",
    probability: 0.5, impact: 0.4, score: 38,
    mitigationPlan: "Pre-order weather covers + schedule indoor work buffer",
    owner: "Rahul Khanna", status: "Open", raisedDate: "2026-03-05" },
  { id: "RSK-004", project: "PRJ-1004", category: "Compliance",
    description: "Industrial discharge permit pending — may delay commissioning",
    probability: 0.4, impact: 0.7, score: 54,
    mitigationPlan: "Expedite permit application; appoint compliance consultant",
    owner: "Aditi Menon", status: "Open", raisedDate: "2026-03-12" },
]
```

---

### 07-B: Risk Project Detail Page (`/risk-intelligence/project/:id`)

#### Layout
- Full risk profile for a single project
- **Risk Register Table:** All risks for this project, sortable by score
- **Mitigation Action Tracker:** Task list of mitigation steps with owners and due dates
- **AI Risk Narrative:** LLM-generated risk summary with top 3 recommended actions
- **Historical Risk Chart:** Risk score over 6 months
- **Structural Risk Detail:** Element-by-element risk breakdown (foundation, columns, slabs)
- `[Add Risk]` modal: description, category, probability, impact, owner
- `[Export Risk Report]` → PDF

#### Functional Behaviour by Role
| Feature | Super Admin | PM | Architect | Engineer | Client |
|---------|:-----------:|:--:|:---------:|:--------:|:------:|
| View risk register | ✅ | ✅ | ✅ | ✅ | Summary only |
| Add/edit risks | ✅ | ✅ | ❌ | ✅ | ❌ |
| Close/resolve risks | ✅ | ✅ | ❌ | ✅ | ❌ |
| View safety alerts | ✅ | ✅ | ❌ | ✅ | ❌ |
| Export risk report | ✅ | ✅ | ❌ | ✅ | ❌ |

---

## MODULE 08: AI PLANNING ASSISTANT

### Pages: `/planning-assistant` · `/planning-assistant/schedule`

> **Access:** Super Admin (full), PM (write), Architect (read), Engineer (write)

---

### 08-A: Planning Assistant Page (`/planning-assistant`)

#### Layout
```
┌──────────────────────────────────────────────────────────┐
│ HEADER: "AI Planning Assistant"                          │
│ Project: [Skyline Corporate Tower ▼]                     │
├──────────────────────────────────────────────────────────┤
│ KPI STRIP                                                │
│ Total Tasks: 64 | On Track: 48 | At Risk: 11 | Delayed: 5│
│ Critical Path Float: 8 days | Resource Utilisation: 81%  │
├──────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────┐  ┌────────────────────┐  │
│ │ GANTT CHART                 │  │ RESOURCE WORKLOAD  │  │
│ │ Task name | Bar | Owner     │  │ Bar chart by trade │  │
│ │ ──────────────────────────  │  │ Structural: 34%    │  │
│ │ Foundation    ████ ✅       │  │ MEP:        23%    │  │
│ │ Core Struct   ████ ✅       │  │ Finishing:  19%    │  │
│ │ Facade        ████▓░░░ 63% │  │ QA/QC:      12%    │  │
│ │ MEP Install   ░░░░░░░░ 14% │  │ Safety:     12%    │  │
│ │ Finishing     ░░░░░░░░  0% │  │                    │  │
│ └─────────────────────────────┘  └────────────────────┘  │
├──────────────────────────────────────────────────────────┤
│ TASK TABLE (with inline edit for PM/Admin/Engineer)      │
│ Task | Start | End | Duration | Owner | Deps | Status    │
├──────────────────────────────────────────────────────────┤
│ AI PLANNING SUGGESTIONS                                  │
│ 🤖 "Facade task has 8d float. Consider pulling forward   │
│    MEP rough-in to start parallel with Facade zone 3.   │
│    This saves ~6 days on critical path."                │
│ [Accept Suggestion] [Modify] [Ignore]                    │
├──────────────────────────────────────────────────────────┤
│ LOOK-AHEAD PANEL (3-week)                               │
│ Week 1: Facade Zone 2 pour | MEP 3rd floor rough-in      │
│ Week 2: Facade Zone 3 | Electrical board install          │
│ Week 3: Glazing begins | Plumbing 4th floor              │
└──────────────────────────────────────────────────────────┘
```

#### Mock Planning Data (Extended)
```typescript
export const MOCK_PLANNING_TASKS = [
  { id: "TSK-001", name: "Foundation & Piling", phase: "Structure",
    startDate: "2025-06-15", endDate: "2025-09-10", durationDays: 87,
    owner: "Vikram Sethi", team: "Structural", dependencies: [],
    status: "Completed", completion: 100, aiRisk: "Low" },
  { id: "TSK-002", name: "Core RCC Structure Floors 1-5", phase: "Structure",
    startDate: "2025-09-11", endDate: "2026-02-22", durationDays: 164,
    owner: "Vikram Sethi", team: "Structural", dependencies: ["TSK-001"],
    status: "Completed", completion: 100, aiRisk: "Low" },
  { id: "TSK-003", name: "Facade Cladding — Zone 1", phase: "Facade",
    startDate: "2026-03-01", endDate: "2026-05-15", durationDays: 75,
    owner: "Ritesh Nair", team: "Facade", dependencies: ["TSK-002"],
    status: "In Progress", completion: 63, aiRisk: "Medium" },
  { id: "TSK-004", name: "MEP Rough-in Floors 1-2", phase: "MEP",
    startDate: "2026-04-10", endDate: "2026-06-20", durationDays: 71,
    owner: "Aditi Menon", team: "MEP", dependencies: ["TSK-002"],
    status: "In Progress", completion: 28, aiRisk: "Low" },
  { id: "TSK-005", name: "Electrical HT Panel Installation", phase: "MEP",
    startDate: "2026-05-01", endDate: "2026-06-10", durationDays: 40,
    owner: "Pradeep Kumar", team: "Electrical", dependencies: ["TSK-004"],
    status: "Pending", completion: 0, aiRisk: "Low" },
  { id: "TSK-006", name: "Internal Finishing — Floors 1-3", phase: "Finishing",
    startDate: "2026-07-01", endDate: "2026-10-30", durationDays: 121,
    owner: "Suresh Rao", team: "Finishing", dependencies: ["TSK-003", "TSK-004"],
    status: "Pending", completion: 0, aiRisk: "Medium" },
  { id: "TSK-007", name: "Glazing & Window Installation", phase: "Facade",
    startDate: "2026-05-20", endDate: "2026-08-10", durationDays: 82,
    owner: "Ritesh Nair", team: "Facade", dependencies: ["TSK-003"],
    status: "Pending", completion: 0, aiRisk: "Low" },
  { id: "TSK-008", name: "Landscaping & External Works", phase: "External",
    startDate: "2026-10-01", endDate: "2026-11-30", durationDays: 60,
    owner: "Kiran Desai", team: "Civil", dependencies: ["TSK-006"],
    status: "Pending", completion: 0, aiRisk: "Low" },
]

export const LABOR_WORKLOAD_DATA = [
  { week: "Mar W3", structural: 42, mep: 18, finishing: 8, facade: 28, qaqc: 14 },
  { week: "Mar W4", structural: 38, mep: 24, finishing: 10, facade: 32, qaqc: 16 },
  { week: "Apr W1", structural: 30, mep: 28, finishing: 14, facade: 36, qaqc: 18 },
  { week: "Apr W2", structural: 22, mep: 34, finishing: 18, facade: 38, qaqc: 20 },
  { week: "Apr W3", structural: 18, mep: 38, finishing: 22, facade: 36, qaqc: 22 },
  { week: "Apr W4", structural: 14, mep: 40, finishing: 28, facade: 32, qaqc: 22 },
]
```

#### AI Planning Features
- **NLP Task Creation:** Type "Add concrete pour task for Zone 3, 5 days, assign Vikram" → auto-creates
- **Critical Path Highlighter:** Red line through critical tasks with float indicator
- **What-If Simulator:** Drag task dates → AI recalculates downstream impacts live
- **Resource Conflict Detector:** Flags when same person/team assigned to overlapping tasks
- **Look-Ahead Report:** Print-ready 3-week schedule for field distribution

---

### 08-B: Planning Schedule Page (`/planning-assistant/schedule`)

#### Layout
- Full-screen Gantt chart (horizontal scroll for mobile)
- Baseline vs current schedule overlay (toggle)
- Export: PDF / MS Project XML / Primavera CSV
- Print-optimised layout
- Filter by: Phase / Owner / Status / At-Risk Only


---

## MODULE 09: AI BLUEPRINT ANALYZER

### Page: `/blueprint-analyzer`

> **Access:** Super Admin (full), Architect (write — primary user), PM (read), Engineer (read)

---

### 09-A: Blueprint Analyzer Page

#### Layout
```
┌──────────────────────────────────────────────────────────┐
│ HEADER: "AI Blueprint Analyzer"                          │
├──────────────────────────────────────────────────────────┤
│ UPLOAD ZONE                                              │
│ ┌───────────────────────────────────────┐               │
│ │  📂 Drag & drop DWG / DXF / PDF       │               │
│ │     or click to browse                │               │
│ │  Supported: AutoCAD DWG, DXF, PDF    │               │
│ │  Max size: 100MB                      │               │
│ └───────────────────────────────────────┘               │
│  Recent uploads: Floor Plan v3.1 | Section AA | ...      │
├──────────────────────────────────────────────────────────┤
│ ANALYSIS RESULTS (after upload)                          │
│ ┌─────────────────┐ ┌─────────────────┐ ┌────────────┐  │
│ │ BLUEPRINT       │ │ AI ANALYSIS     │ │ CLASH      │  │
│ │ VIEWER          │ │ SCORES          │ │ DETECTION  │  │
│ │ (PDF embed)     │ │ Space Util: 84% │ │ 14 found   │  │
│ │ Zoom/Pan        │ │ Light Factor:B+ │ │ 8 resolved │  │
│ │ Layer toggle    │ │ Accessibility:A │ │ 6 open     │  │
│ │ Annotation mode │ │ Sustainability:A│ │ [View all] │  │
│ └─────────────────┘ └─────────────────┘ └────────────┘  │
├──────────────────────────────────────────────────────────┤
│ DETAILED ANALYSIS TABS                                   │
│ [Space Analysis] [Structural] [MEP] [Compliance] [Clashes]│
├──────────────────────────────────────────────────────────┤
│ AI DESIGN CRITIQUE                                       │
│ 🤖 "The floor plate for Floors 3-5 has a core-to-window  │
│    depth of 14.2m — exceeding the 13m CIBSE daylight    │
│    guideline. Recommend shifting core north by 1.2m.    │
│    Toilet block on Floor 2 lacks required ventilation    │
│    duct access. 3 accessibility ramp slopes exceed 1:12."│
│                                                          │
│ GENERATIVE DESIGN SUGGESTIONS                            │
│ ┌────────────────┐  ┌────────────────┐  ┌─────────────┐ │
│ │ Option A       │  │ Option B       │  │ Option C    │ │
│ │ Core shift N   │  │ Open plan L3-5 │  │ Core split  │ │
│ │ Space util:87% │  │ Space util:91% │  │ Util: 89%   │ │
│ │ Cost delta:+2% │  │ Cost delta:+4% │  │ Cost: +1%   │ │
│ └────────────────┘  └────────────────┘  └─────────────┘ │
└──────────────────────────────────────────────────────────┘
```

#### Mock Blueprint Analysis Data (Extended)
```typescript
export const MOCK_BLUEPRINT_ANALYSIS = {
  fileId: "BLU-001",
  projectId: "PRJ-1001",
  fileName: "Skyline_Tower_FloorPlan_v3.1.pdf",
  uploadDate: "2026-03-18",
  analysisStatus: "Complete",
  scores: {
    spaceUtilisation: 84,
    daylightFactor: 78,
    accessibility: 91,
    sustainability: 86,
    structuralEfficiency: 79,
    mepCoordination: 72,
    codeCompliance: 88,
    overallScore: 83
  },
  clashDetection: {
    total: 14,
    resolved: 8,
    open: 6,
    critical: 2,
    clashes: [
      { id: "CLH-001", type: "Structural vs MEP", location: "Floor 3 Grid B4",
        severity: "Critical", description: "250mm HVAC duct clashes with 400mm RCC beam",
        status: "Open", assignedTo: "Vikram Sethi" },
      { id: "CLH-002", type: "Structural vs MEP", location: "Floor 4 Grid C2",
        severity: "Critical", description: "Plumbing riser conflicts with column position",
        status: "Open", assignedTo: "Neha Kapoor" },
      { id: "CLH-003", type: "Architectural vs MEP", location: "Floor 2 Corridor B",
        severity: "Major", description: "Ceiling level conflicts with duct routing",
        status: "In Review", assignedTo: "Aditi Menon" },
      { id: "CLH-004", type: "Electrical vs Structural", location: "Basement Level 1",
        severity: "Minor", description: "Cable tray route through structural tie beam",
        status: "Resolved", assignedTo: "Pradeep Kumar" },
    ]
  },
  spaceAnalysis: {
    totalGFA: 22000,
    usableArea: 18480,
    circulationArea: 2640,
    serviceArea: 880,
    utilisationPct: 84,
    avgFloorPlate: 4400,
    coreRatio: 0.12,
    windowWallRatio: 0.62
  },
  aiCritique: [
    { category: "Daylight", severity: "Warning",
      issue: "Floors 3-5 core-to-window depth 14.2m exceeds CIBSE 13m guideline",
      recommendation: "Shift core north by 1.2m or introduce lightwells" },
    { category: "Accessibility", severity: "Critical",
      issue: "3 ramp slopes on Floor 1 exceed 1:12 gradient",
      recommendation: "Redesign ramp Sections R1, R3, R7 to 1:15 gradient" },
    { category: "Ventilation", severity: "Major",
      issue: "Floor 2 toilet block lacks dedicated ventilation duct access",
      recommendation: "Provide 200mm dia mechanical duct from shaft B" },
    { category: "Sustainability", severity: "Info",
      issue: "West facade has high SHGC contributing to cooling load",
      recommendation: "Add external horizontal shading fins @ 0.6m projection" },
  ],
  generativeOptions: [
    { id: "GEN-A", name: "Core North Shift",
      spaceUtil: 87, costDeltaPct: 2.1, sustainScore: 88,
      changes: ["Core shifted 1.2m north", "Improved east daylight", "Ramp R1 redesigned"] },
    { id: "GEN-B", name: "Open Plan Floors 3-5",
      spaceUtil: 91, costDeltaPct: 4.3, sustainScore: 84,
      changes: ["Removed internal partitions L3-5", "Flexible workspaces", "Higher HVAC load"] },
    { id: "GEN-C", name: "Split Core",
      spaceUtil: 89, costDeltaPct: 1.4, sustainScore: 90,
      changes: ["Core split into two service nodes", "Improved circulation", "Better daylight"] },
  ]
}
```

#### Functional Behaviour by Role
| Feature | Super Admin | PM | Architect | Engineer | Client |
|---------|:-----------:|:--:|:---------:|:--------:|:------:|
| Upload blueprints | ✅ | ❌ | ✅ | ❌ | ❌ |
| View analysis | ✅ | ✅ | ✅ | ✅ | ❌ |
| Add annotations | ✅ | ✅ | ✅ | ✅ | ❌ |
| Manage clashes | ✅ | ✅ | ✅ | ✅ | ❌ |
| Generative design | ✅ | ❌ | ✅ | ❌ | ❌ |
| Export report | ✅ | ✅ | ✅ | ✅ | ❌ |

---

## MODULE 10: SMART SITE MONITORING

### Page: `/site-monitoring`

> **Access:** Super Admin (full), PM (write), Engineer (write — primary), Client (read)

---

### 10-A: Site Monitoring Dashboard

#### Layout
```
┌──────────────────────────────────────────────────────────┐
│ HEADER: "Smart Site Monitoring"                          │
│ Project: [Skyline Tower ▼] | Last Updated: 2 min ago 🟢  │
├──────────────────────────────────────────────────────────┤
│ LIVE STATS GRID (6 cards)                                │
│ Site Progress: 68% | Workers On Site: 142                │
│ Equipment Active: 8/11 | Safety Alerts: 2               │
│ Temperature: 34°C | Today Hours: 1,847                   │
├──────────────────────────────────────────────────────────┤
│ ┌─────────────────────────┐  ┌──────────────────────┐    │
│ │ SITE PROGRESS MAP       │  │ EQUIPMENT STATUS     │    │
│ │ Floor plan with zone %  │  │ Tower Crane A: 🟢 92%│    │
│ │ Zone 1: 94% 🟢          │  │ Tower Crane B: 🟢 88%│    │
│ │ Zone 2: 78% 🟢          │  │ Concrete Pump: 🟡 61%│    │
│ │ Zone 3: 62% 🟡          │  │ Excavator: 🔴 Idle   │    │
│ │ Zone 4: 31% 🔴          │  │ Generator: 🟢 Active │    │
│ └─────────────────────────┘  └──────────────────────┘    │
├──────────────────────────────────────────────────────────┤
│ ┌─────────────────────────┐  ┌──────────────────────┐    │
│ │ PROGRESS TIMELINE CHART │  │ ATTENDANCE HEATMAP   │    │
│ │ Daily progress % bars   │  │ Calendar of worker   │    │
│ │ vs planned line         │  │ attendance counts    │    │
│ └─────────────────────────┘  └──────────────────────┘    │
├──────────────────────────────────────────────────────────┤
│ SAFETY ALERTS & INCIDENTS                                │
│ 🔴 LIVE: Worker without helmet detected — Camera 4B     │
│ 🟡 Yesterday: Wind speed 72km/h — Crane ops suspended   │
│ 🟢 Resolved: Formwork inspection completed — Zone 2     │
│                                                          │
│ DAILY SITE DIARY                                         │
│ AI-generated summary of today's activities...           │
│ "142 workers logged in by 08:30. Concrete pour Zone 3   │
│  Floor 4 completed (87m³). Tower Crane B idle 2h due to │
│  wind. 2 NCRs raised: Rebar spacing Floor 4 beam B7..."  │
└──────────────────────────────────────────────────────────┘
```

#### Mock Site Monitoring Data (Extended)
```typescript
export const MOCK_SITE_MONITORING = {
  projectId: "PRJ-1001",
  lastUpdated: "2026-03-20T10:15:00",
  liveStats: {
    overallProgress: 68,
    workersOnSite: 142,
    activeEquipment: 8,
    totalEquipment: 11,
    safetyAlerts: 2,
    temperature: 34,
    humidity: 62,
    windSpeed: 18,
    todayHours: 1847
  },
  zones: [
    { id: "Z1", name: "Podium Level", completion: 94, status: "On Track", workers: 24 },
    { id: "Z2", name: "Floors 1-10", completion: 78, status: "On Track", workers: 38 },
    { id: "Z3", name: "Floors 11-20", completion: 62, status: "Attention", workers: 42 },
    { id: "Z4", name: "Floors 21-28", completion: 31, status: "Behind", workers: 38 },
  ],
  equipment: [
    { id: "EQ-001", type: "Tower Crane", name: "Liebherr 280 EC-H — A",
      status: "Active", utilisation: 92, location: "Grid B-3",
      operatorName: "Ramu Krishnan", hoursToday: 6.5, nextMaintenance: "Apr 15" },
    { id: "EQ-002", type: "Tower Crane", name: "Liebherr 280 EC-H — B",
      status: "Active", utilisation: 88, location: "Grid D-5",
      operatorName: "Suresh Babu", hoursToday: 5.8, nextMaintenance: "Apr 22" },
    { id: "EQ-003", type: "Concrete Pump", name: "Putzmeister BSA 14000 HP",
      status: "Active", utilisation: 61, location: "Ground Level N",
      operatorName: "Feroz Khan", hoursToday: 4.2, nextMaintenance: "Apr 08" },
    { id: "EQ-004", type: "Excavator", name: "CAT 320 Hydraulic",
      status: "Idle", utilisation: 0, location: "Compound Area",
      operatorName: "—", hoursToday: 0, nextMaintenance: "Apr 30",
      idleReason: "No work order assigned — awaiting basement drainage task" },
    { id: "EQ-005", type: "Mobile Crane", name: "Manitowoc Grove GMK3060L",
      status: "Active", utilisation: 74, location: "South Facade",
      operatorName: "Anand Pillai", hoursToday: 5.1, nextMaintenance: "Apr 12" },
    { id: "EQ-006", type: "Generator", name: "Caterpillar 500kVA",
      status: "Standby", utilisation: 18, location: "Power Room",
      operatorName: "Auto", hoursToday: 2.1, nextMaintenance: "May 01" },
  ],
  attendanceHistory: [
    { date: "2026-03-14", planned: 160, actual: 152, absentees: 8 },
    { date: "2026-03-15", planned: 160, actual: 148, absentees: 12 },
    { date: "2026-03-17", planned: 160, actual: 158, absentees: 2 },
    { date: "2026-03-18", planned: 160, actual: 145, absentees: 15 },
    { date: "2026-03-19", planned: 160, actual: 155, absentees: 5 },
    { date: "2026-03-20", planned: 160, actual: 142, absentees: 18 },
  ],
  safetyIncidents: [
    { id: "SAF-001", date: "2026-03-20", time: "09:42", type: "PPE Violation",
      description: "Worker without helmet detected by Camera 4B, Zone 3 Floor 22",
      severity: "High", status: "Live Alert", cameraId: "CAM-4B",
      assignedTo: "Safety Officer Ravi" },
    { id: "SAF-002", date: "2026-03-19", time: "14:20", type: "Weather Stop",
      description: "Wind speed 72km/h — Crane operations suspended for 2h",
      severity: "Medium", status: "Resolved" },
    { id: "SAF-003", date: "2026-03-18", time: "11:05", type: "Near Miss",
      description: "Loose formwork plank fell from Level 18 — no injuries",
      severity: "Critical", status: "Under Investigation",
      assignedTo: "Vikram Sethi" },
  ],
  dailyDiary: {
    date: "2026-03-20",
    aiSummary: "142 workers logged in by 08:30. Concrete pour Zone 3 Floor 22 completed (87m³). Tower Crane B was idle for 2 hours (09:00-11:00) due to wind speed exceeding 65km/h threshold. 2 NCRs raised: rebar spacing non-conformance on Floor 22 Beam B7 and Floor 21 Column C3. Equipment utilisation at 76% overall. Safety alert triggered at 09:42 for PPE violation, resolved by 09:55.",
    keyActivities: [
      "Concrete pour: Zone 3, Floor 22 — 87m³ completed",
      "Rebar placement: Zone 4, Floor 23 — 68% complete",
      "Facade cladding: Zone 2, Floor 14-16 — ongoing",
      "MEP: Electrical conduit Floor 10 — completed",
    ]
  }
}
```

---

## MODULE 11: MATERIAL RECOMMENDATION (RAG)

### Pages: `/materials` · `/material-recommendations` · `/material-recommendations/compare`

> **Access:** Super Admin (full), PM (write), Architect (write — primary), Engineer (write), Client (read)

---

### 11-A: Materials Page (`/materials`)

#### Layout
```
┌──────────────────────────────────────────────────────────┐
│ HEADER: "AI Material Recommendation"                     │
├──────────────────────────────────────────────────────────┤
│ AI SEARCH BAR                                            │
│ 🔍 "Ask about materials: 'Best waterproofing membrane    │
│     for basement in coastal environment under ₹400/m²'"  │
│ [Search] [Voice 🎤]                                      │
├──────────────────────────────────────────────────────────┤
│ FILTERS: Category▼  Sustainability▼  Price Range▼ Brand▼ │
├──────────────────────────────────────────────────────────┤
│ MATERIAL CARDS GRID (3/2/1 responsive)                   │
│ ┌────────────────────┐  ┌────────────────────┐           │
│ │ M53 Grade Concrete  │  │ Thermo-Roof INS-40 │           │
│ │ 🏷️ Structural        │  │ 🏷️ Insulation       │           │
│ │ ⭐ 4.8/5            │  │ ⭐ 4.6/5            │           │
│ │ ₹4,800/m³          │  │ ₹380/m²            │           │
│ │ 🌿 Eco Score: 72%   │  │ 🌿 Eco Score: 88%  │           │
│ │ Supplier: BuildCore │  │ Supplier: InsoPro  │           │
│ │ Lead: 3 days        │  │ Lead: 5 days       │           │
│ │ [View] [Compare +]  │  │ [View] [Compare +] │           │
│ └────────────────────┘  └────────────────────┘           │
└──────────────────────────────────────────────────────────┘
```

#### Mock Material Data (Extended — 15 materials)
```typescript
export const MOCK_MATERIALS = [
  { id: "MAT-001", name: "M53 High-Performance Concrete",
    category: "Structural", subcategory: "Concrete",
    unitPrice: 4800, unit: "m³",
    supplier: "BuildCore Materials", supplierId: "SUP-401",
    leadTimeDays: 3, availability: "In Stock",
    ecoScore: 72, embodiedCarbon: 380, recycledContent: 15,
    specifications: { compressiveStrength: "53 MPa", waterCementRatio: 0.38,
      slump: "100-150mm", maxAggSize: "20mm" },
    aiRating: 4.8, useCases: ["High-rise columns", "Transfer slabs", "Foundation rafts"],
    alternatives: ["MAT-002", "MAT-003"],
    certifications: ["IS 456", "BIS certified", "NABL tested"] },

  { id: "MAT-002", name: "Geopolymer Concrete GPC-50",
    category: "Structural", subcategory: "Eco Concrete",
    unitPrice: 5200, unit: "m³",
    supplier: "GreenBind Tech", supplierId: "SUP-404",
    leadTimeDays: 6, availability: "Order Required",
    ecoScore: 94, embodiedCarbon: 125, recycledContent: 65,
    specifications: { compressiveStrength: "50 MPa", binder: "GGBS + Fly Ash",
      slump: "80-120mm", curingTime: "24h ambient" },
    aiRating: 4.4, useCases: ["Sustainable structures", "Industrial floors", "Precast"],
    alternatives: ["MAT-001"],
    certifications: ["ISO 14001", "Green Rating", "LEED eligible"] },

  { id: "MAT-003", name: "Self-Compacting Concrete SCC-45",
    category: "Structural", subcategory: "Concrete",
    unitPrice: 5600, unit: "m³",
    supplier: "BuildCore Materials", supplierId: "SUP-401",
    leadTimeDays: 4, availability: "In Stock",
    ecoScore: 68, embodiedCarbon: 360, recycledContent: 10,
    specifications: { compressiveStrength: "45 MPa", flowability: "600-750mm spread",
      passingAbility: "L-box >0.8" },
    aiRating: 4.6, useCases: ["Complex formwork", "Dense rebar zones", "Precast facades"],
    alternatives: ["MAT-001", "MAT-002"] },

  { id: "MAT-004", name: "Fe550D TMT Rebar",
    category: "Structural", subcategory: "Reinforcement",
    unitPrice: 82000, unit: "MT",
    supplier: "SteelSpan Industries", supplierId: "SUP-402",
    leadTimeDays: 5, availability: "In Stock",
    ecoScore: 58, embodiedCarbon: 1800, recycledContent: 28,
    specifications: { yieldStrength: "550 MPa", elongation: ">14.5%",
      bendTest: "Pass", UTS_YS_ratio: ">1.10" },
    aiRating: 4.7, useCases: ["All RCC structures", "Seismic zones", "High-rise"],
    alternatives: ["MAT-005"],
    certifications: ["IS 1786", "BIS certified"] },

  { id: "MAT-005", name: "Corrosion-Resistant CRMB Rebar",
    category: "Structural", subcategory: "Reinforcement",
    unitPrice: 96000, unit: "MT",
    supplier: "SteelSpan Industries", supplierId: "SUP-402",
    leadTimeDays: 8, availability: "Order Required",
    ecoScore: 61, embodiedCarbon: 1720, recycledContent: 32,
    specifications: { yieldStrength: "500 MPa", corrosionResistance: "3x standard",
      coating: "Epoxy + Chrome treatment" },
    aiRating: 4.5, useCases: ["Coastal structures", "Marine environments", "Underground"],
    alternatives: ["MAT-004"] },

  { id: "MAT-006", name: "AAC Autoclaved Aerated Concrete Blocks",
    category: "Masonry", subcategory: "Blocks",
    unitPrice: 4200, unit: "m³",
    supplier: "EcoBrick Solutions", supplierId: "SUP-403",
    leadTimeDays: 4, availability: "In Stock",
    ecoScore: 81, embodiedCarbon: 280, recycledContent: 20,
    specifications: { density: "550-650 kg/m³", compressiveStrength: "4 MPa",
      thermalConductivity: "0.14 W/mK", fireResistance: "4 hours" },
    aiRating: 4.6, useCases: ["Non-load bearing walls", "Partition walls", "Thermal zones"],
    alternatives: ["MAT-007"] },

  { id: "MAT-007", name: "Porotherm Clay Block Walling",
    category: "Masonry", subcategory: "Blocks",
    unitPrice: 5100, unit: "m³",
    supplier: "EcoBrick Solutions", supplierId: "SUP-403",
    leadTimeDays: 4, availability: "In Stock",
    ecoScore: 76, embodiedCarbon: 310, recycledContent: 0,
    specifications: { density: "860 kg/m³", compressiveStrength: "6 MPa",
      thermalConductivity: "0.19 W/mK", acousticReduction: "47 dB" },
    aiRating: 4.5, useCases: ["External walls", "Load-bearing partitions", "Thermal mass"],
    alternatives: ["MAT-006"] },

  { id: "MAT-008", name: "Aluminium Curtain Wall System CW60",
    category: "Facade", subcategory: "Curtain Wall",
    unitPrice: 3800, unit: "m²",
    supplier: "FacadePro Systems", supplierId: "SUP-405",
    leadTimeDays: 21, availability: "Pre-Order",
    ecoScore: 64, embodiedCarbon: 520, recycledContent: 40,
    specifications: { uValue: "1.2 W/m²K", SHGC: 0.35, frameDepth: "60mm",
      windLoad: "2.4 kPa", acousticRating: "38 dB Rw" },
    aiRating: 4.7, useCases: ["Commercial facades", "High-rise glazing", "Structurally glazed"],
    alternatives: ["MAT-009"] },

  { id: "MAT-009", name: "UPVC Double-Glazed Window System",
    category: "Facade", subcategory: "Windows",
    unitPrice: 2100, unit: "m²",
    supplier: "FenMark India", supplierId: "SUP-406",
    leadTimeDays: 14, availability: "In Stock",
    ecoScore: 71, embodiedCarbon: 180, recycledContent: 30,
    specifications: { uValue: "1.8 W/m²K", SHGC: 0.42, profile: "80mm system",
      glassPack: "6-16-6 Low-E", acousticRating: "34 dB" },
    aiRating: 4.4, useCases: ["Residential", "Low-rise commercial", "Cost-effective glazing"],
    alternatives: ["MAT-008"] },

  { id: "MAT-010", name: "Waterproofing Membrane — Torch-On APP",
    category: "Waterproofing", subcategory: "Sheet Membrane",
    unitPrice: 320, unit: "m²",
    supplier: "HydroShield India", supplierId: "SUP-407",
    leadTimeDays: 3, availability: "In Stock",
    ecoScore: 52, embodiedCarbon: 120, recycledContent: 0,
    specifications: { thickness: "4mm", tensileStrength: "700N/50mm",
      elongation: ">35%", tempRange: "-15°C to +120°C", laps: "100mm" },
    aiRating: 4.3, useCases: ["Flat roofs", "Basements", "Podium decks"],
    alternatives: ["MAT-011"] },

  { id: "MAT-011", name: "Liquid Applied Waterproofing — PMMA",
    category: "Waterproofing", subcategory: "Liquid Membrane",
    unitPrice: 480, unit: "m²",
    supplier: "HydroShield India", supplierId: "SUP-407",
    leadTimeDays: 2, availability: "In Stock",
    ecoScore: 67, embodiedCarbon: 95, recycledContent: 0,
    specifications: { dft: "2mm", curTime: "30 min", elongation: ">300%",
      adhesion: ">1.5 MPa", VOC: "Low" },
    aiRating: 4.6, useCases: ["Complex geometry roofs", "Balconies", "Green roofs"],
    alternatives: ["MAT-010"] },
]
```

---

### 11-B: Material Compare Page (`/material-recommendations/compare`)

#### Layout
- Select 2–4 materials to compare
- Side-by-side comparison table: all specs, price, eco score, supplier, lead time
- AI recommendation card: "For coastal high-rise, MAT-005 is preferred over MAT-004 despite 17% higher cost due to 3x corrosion resistance reducing life-cycle cost by 22%"
- Export comparison as PDF

---

## MODULE 12: SUSTAINABILITY ANALYZER

### Pages: `/sustainability` · `/sustainability/report`

> **Access:** Super Admin (full), PM (write), Architect (write), Engineer (read), Client (read)

---

### 12-A: Sustainability Overview Page

#### Layout
```
┌──────────────────────────────────────────────────────────┐
│ HEADER: "Sustainability Analyzer"                        │
│ Project: [Select ▼] | Certification Target: LEED Gold    │
├──────────────────────────────────────────────────────────┤
│ KPI STRIP                                                │
│ Overall Score: 76/100 | LEED Points: 54/80 | Grade: B+  │
│ Carbon (Scope1+2): 1,240 tCO₂e | Waste Diverted: 68%    │
├──────────────────────────────────────────────────────────┤
│ ┌──────────────────────┐  ┌──────────────────────────┐   │
│ │ CARBON EMISSIONS     │  │ LEED SCORECARD           │   │
│ │ Stacked bar by phase │  │ Category progress bars   │   │
│ │ Scope 1: 520 tCO₂e   │  │ Sustainable Sites: 18/26 │   │
│ │ Scope 2: 380 tCO₂e   │  │ Water Efficiency: 8/10   │   │
│ │ Scope 3: 340 tCO₂e   │  │ Energy & Atm: 24/35      │   │
│ │ Total: 1,240 tCO₂e   │  │ Materials: 9/14          │   │
│ │ Target: 1,100 tCO₂e  │  │ Indoor Quality: 12/15    │   │
│ │ Gap: 140 tCO₂e       │  │ Innovation: 3/6          │   │
│ └──────────────────────┘  └──────────────────────────┘   │
├──────────────────────────────────────────────────────────┤
│ ECO RECOMMENDATIONS                                      │
│ 🤖 AI suggests 8 actions to close the 26-point LEED gap │
│ ┌────────────────────────────────────────────────────┐   │
│ │ 1. Switch to GPC-50 geopolymer concrete (saves     │   │
│ │    255 tCO₂e, gains 4 LEED points) — Cost: +₹12L  │   │
│ │ 2. Add 500kWp rooftop solar (saves 180 tCO₂e,     │   │
│ │    gains 6 LEED pts) — Cost: ₹2.8Cr, ROI: 6 yrs   │   │
│ │ 3. Rainwater harvesting 50KL tank (gains 3 pts)   │   │
│ │    — Cost: ₹18L, no carbon impact                  │   │
│ └────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────┤
│ WASTE MANAGEMENT TRACKER                                 │
│ Total Waste Generated: 184 MT | Diverted: 125 MT (68%)  │
│ Recycled: 84MT | Reused on-site: 24MT | Landfill: 59MT  │
└──────────────────────────────────────────────────────────┘
```

#### Extended Mock Sustainability Data
```typescript
export const MOCK_SUSTAINABILITY = {
  projectId: "PRJ-1001",
  certificationTarget: "LEED Gold",
  overallScore: 76,
  leedPoints: { earned: 54, available: 80, target: 60 },
  carbonData: {
    scope1: 520, scope2: 380, scope3: 340, total: 1240, target: 1100,
    monthlyTrend: [
      { month: "Jan", scope1: 95, scope2: 68, scope3: 55 },
      { month: "Feb", scope1: 88, scope2: 62, scope3: 52 },
      { month: "Mar", scope1: 92, scope2: 65, scope3: 58 },
    ]
  },
  leedCategories: [
    { name: "Sustainable Sites", earned: 18, max: 26, pct: 69 },
    { name: "Water Efficiency", earned: 8, max: 10, pct: 80 },
    { name: "Energy & Atmosphere", earned: 24, max: 35, pct: 69 },
    { name: "Materials & Resources", earned: 9, max: 14, pct: 64 },
    { name: "Indoor Environmental Quality", earned: 12, max: 15, pct: 80 },
    { name: "Innovation in Design", earned: 3, max: 6, pct: 50 },
  ],
  wasteManagement: {
    totalGenerated: 184, totalDiverted: 125, divertedPct: 68,
    recycled: 84, reused: 24, landfill: 59,
    categories: [
      { type: "Concrete waste", generated: 68, recycled: 58, reused: 0, landfill: 10 },
      { type: "Steel scrap", generated: 12, recycled: 12, reused: 0, landfill: 0 },
      { type: "Formwork timber", generated: 28, recycled: 8, reused: 18, landfill: 2 },
      { type: "Packaging waste", generated: 22, recycled: 6, reused: 0, landfill: 16 },
      { type: "Excavated soil", generated: 54, recycled: 0, reused: 6, landfill: 48 },
    ]
  },
  aiRecommendations: [
    { priority: 1, action: "Switch to Geopolymer Concrete GPC-50 for Floors 20-28",
      carbonSaving: 255, leedPointsGained: 4, costImpact: 1200000, roi: "4 years" },
    { priority: 2, action: "Install 500kWp rooftop solar PV system",
      carbonSaving: 180, leedPointsGained: 6, costImpact: 2800000, roi: "6 years" },
    { priority: 3, action: "Rainwater harvesting system — 50KL capacity",
      carbonSaving: 0, leedPointsGained: 3, costImpact: 180000, roi: "3 years" },
    { priority: 4, action: "Replace 40% of parking area with permeable paving",
      carbonSaving: 12, leedPointsGained: 2, costImpact: 280000, roi: "2 years" },
  ]
}
```

---

## MODULE 13: SUPPLIER INTELLIGENCE

### Pages: `/suppliers` · `/suppliers/:id`

> **Access:** Super Admin (full), PM (write), Engineer (write), Architect (read)

---

### 13-A: Suppliers List Page

#### Extended Layout + Mock Data
```typescript
export const MOCK_SUPPLIERS_EXTENDED = [
  { id: "SUP-401", supplierName: "BuildCore Materials",
    category: "Cement & Concrete", city: "Pune",
    deliveryTimeDays: 3, reliabilityScore: 91, priceIndex: 97,
    qualityScore: 89, overallRating: 4.6, activeOrders: 3,
    totalOrderValue: 4200000, onTimeDelivery: 94,
    contactName: "Sanjay Kulkarni", phone: "+91-20-2345-6789",
    certifications: ["ISO 9001", "IS 456 compliant", "BIS certified"],
    aiRiskScore: 18, financialHealth: "Stable",
    priceHistory: [
      { month: "Oct 25", price: 94 }, { month: "Nov 25", price: 95 },
      { month: "Dec 25", price: 96 }, { month: "Jan 26", price: 97 },
      { month: "Feb 26", price: 97 }, { month: "Mar 26", price: 97 },
    ] },
  { id: "SUP-402", supplierName: "SteelSpan Industries",
    category: "Structural Steel & Rebar", city: "Mumbai",
    deliveryTimeDays: 5, reliabilityScore: 88, priceIndex: 103,
    qualityScore: 92, overallRating: 4.5, activeOrders: 2,
    totalOrderValue: 8900000, onTimeDelivery: 89,
    contactName: "Deepak Verma", phone: "+91-22-3456-7890",
    certifications: ["IS 1786", "BIS Fe550D", "ISO 14001"],
    aiRiskScore: 24, financialHealth: "Strong",
    priceHistory: [
      { month: "Oct 25", price: 97 }, { month: "Nov 25", price: 99 },
      { month: "Dec 25", price: 101 }, { month: "Jan 26", price: 103 },
      { month: "Feb 26", price: 102 }, { month: "Mar 26", price: 103 },
    ] },
  { id: "SUP-403", supplierName: "EcoBrick Solutions",
    category: "Masonry & Blocks", city: "Nashik",
    deliveryTimeDays: 4, reliabilityScore: 86, priceIndex: 94,
    qualityScore: 84, overallRating: 4.3, activeOrders: 1,
    totalOrderValue: 1100000, onTimeDelivery: 91,
    contactName: "Priyanka Bhosale", phone: "+91-253-2345-678",
    certifications: ["IS 2185", "BIS certified", "Green Label"],
    aiRiskScore: 12, financialHealth: "Stable" },
  { id: "SUP-404", supplierName: "GreenBind Tech",
    category: "Eco Binders & Geopolymer", city: "Hyderabad",
    deliveryTimeDays: 6, reliabilityScore: 84, priceIndex: 99,
    qualityScore: 88, overallRating: 4.4, activeOrders: 1,
    totalOrderValue: 680000, onTimeDelivery: 87,
    contactName: "Ramesh Rao", phone: "+91-40-2345-6789",
    certifications: ["ISO 14001", "LEED eligible", "Carbon neutral certified"],
    aiRiskScore: 16, financialHealth: "Growing" },
  { id: "SUP-405", supplierName: "FacadePro Systems",
    category: "Facade & Glazing", city: "Bengaluru",
    deliveryTimeDays: 21, reliabilityScore: 82, priceIndex: 108,
    qualityScore: 91, overallRating: 4.4, activeOrders: 1,
    totalOrderValue: 12400000, onTimeDelivery: 82,
    contactName: "Anita Krishnaswamy", phone: "+91-80-3456-7890",
    certifications: ["ISO 9001", "CE marked", "AAMA 501"],
    aiRiskScore: 31, financialHealth: "Stable" },
  { id: "SUP-406", supplierName: "HydroShield India",
    category: "Waterproofing & Sealants", city: "Chennai",
    deliveryTimeDays: 3, reliabilityScore: 90, priceIndex: 95,
    qualityScore: 87, overallRating: 4.5, activeOrders: 2,
    totalOrderValue: 780000, onTimeDelivery: 93,
    contactName: "Suresh Iyer", phone: "+91-44-2345-6789",
    certifications: ["IS 2645", "ISO 9001", "LEED MR credit"],
    aiRiskScore: 11, financialHealth: "Stable" },
]
```

#### Supplier Detail Page Features
- Full supplier profile: contact, certifications, financial health, risk score
- Order history table: Order ID | Date | Items | Value | Status | Delivery variance
- Price history chart (6-month trend)
- Performance scorecard: Quality, Delivery, Responsiveness, Price competitiveness
- AI supplier risk brief: geopolitical, logistics, financial risk assessment
- `[Create RFQ]` → auto-generate Request for Quotation
- `[Rate Supplier]` → post-delivery rating form (PM/Engineer only)

---

## MODULE 14: WORKFORCE ANALYTICS

### Page: `/workforce`

> **Access:** Super Admin (full), PM (write), Engineer (write)

---

### 14-A: Workforce Analytics Dashboard

#### Layout
```
┌──────────────────────────────────────────────────────────┐
│ HEADER: "Workforce Analytics"                            │
│ Project: [All Projects ▼] | Period: [Last 30 Days ▼]    │
├──────────────────────────────────────────────────────────┤
│ KPI STRIP                                                │
│ Total Workforce: 482 | On-Site Today: 142               │
│ Avg Productivity: 84% | Overtime Risk: 14 workers       │
│ Skill Gap Items: 7 | Absenteeism: 4.2%                  │
├──────────────────────────────────────────────────────────┤
│ ┌──────────────────────┐  ┌────────────────────────┐     │
│ │ PRODUCTIVITY TREND   │  │ LABOR DISTRIBUTION     │     │
│ │ Line chart 6 months  │  │ Donut chart by trade   │     │
│ │ Jan:72 → Jun:87      │  │ Structural: 34%        │     │
│ │ Industry avg: 78     │  │ MEP: 23% Finishing:19% │     │
│ └──────────────────────┘  └────────────────────────┘     │
├──────────────────────────────────────────────────────────┤
│ WORKFORCE TABLE                                          │
│ Name | Role | Project | Hrs/Week | Productivity | Status │
│ ─────────────────────────────────────────────────────── │
│ Vikram Sethi  Civil Eng  Skyline      48  89%  🟢 Active │
│ Neha Kapoor   Architect  GreenField   42  92%  🟢 Active │
│ Farhan Ali    Civil Eng  GreenField   56  81%  🟡 OT Risk│
│ Aditi Menon   Supervisor EcoBuild     44  84%  🟢 Active │
│ Ramu Krishnan Crane Op.  Skyline      52  78%  🟡 OT Risk│
├──────────────────────────────────────────────────────────┤
│ AI WORKFORCE INSIGHTS                                    │
│ 🤖 "14 workers have exceeded 50hrs/week for 3+ weeks.   │
│    Fatigue risk is High for: Farhan Ali (56h), Ramu K.  │
│    (52h), Suresh Rao (54h). Recommend mandatory rest    │
│    rotation. Skill gap: No certified welder available   │
│    for GreenField Phase II structural steel work."      │
└──────────────────────────────────────────────────────────┘
```

#### Extended Mock Workforce Data
```typescript
export const MOCK_WORKFORCE_EXTENDED = [
  { id: "WRK-001", name: "Vikram Sethi", role: "Civil Engineer",
    project: "Skyline Corporate Tower", hrsPerWeek: 48,
    productivity: 89, fatigueRisk: "Low", status: "Active",
    skills: ["RCC Design", "Site Supervision", "QA/QC"],
    certifications: ["BE Civil", "PMP", "Site Safety"],
    attendance: 96, overtimeHrs: 8 },
  { id: "WRK-002", name: "Neha Kapoor", role: "Architect",
    project: "GreenField Residences", hrsPerWeek: 42,
    productivity: 92, fatigueRisk: "Low", status: "Active",
    skills: ["BIM", "LEED Design", "AutoCAD", "Revit"],
    certifications: ["B.Arch", "LEED AP BD+C", "IGBC AP"],
    attendance: 98, overtimeHrs: 2 },
  { id: "WRK-003", name: "Farhan Ali", role: "Civil Engineer",
    project: "GreenField Residences", hrsPerWeek: 56,
    productivity: 81, fatigueRisk: "High", status: "OT Alert",
    skills: ["Foundation", "Formwork", "Concrete Technology"],
    certifications: ["BE Civil", "Safety Officer"],
    attendance: 94, overtimeHrs: 16 },
  { id: "WRK-004", name: "Aditi Menon", role: "Site Supervisor",
    project: "EcoBuild Plant", hrsPerWeek: 44,
    productivity: 84, fatigueRisk: "Low", status: "Active",
    skills: ["Site Coordination", "Daily Reporting", "Labour Management"],
    certifications: ["Diploma Civil", "OSHA 30hr"],
    attendance: 97, overtimeHrs: 4 },
  { id: "WRK-005", name: "Ramu Krishnan", role: "Crane Operator",
    project: "Skyline Tower", hrsPerWeek: 52,
    productivity: 78, fatigueRisk: "High", status: "OT Alert",
    skills: ["Tower Crane", "Mobile Crane", "Rigging"],
    certifications: ["Crane Operator License", "NSDC certified"],
    attendance: 91, overtimeHrs: 12 },
  { id: "WRK-006", name: "Pradeep Kumar", role: "Electrical Engineer",
    project: "Skyline Tower", hrsPerWeek: 45,
    productivity: 87, fatigueRisk: "Low", status: "Active",
    skills: ["HT/LT Systems", "BMS", "Panel Design", "SCADA"],
    certifications: ["BE Electrical", "CPWD Licensed"],
    attendance: 95, overtimeHrs: 5 },
  { id: "WRK-007", name: "Suresh Rao", role: "Finishing Supervisor",
    project: "Metro Depot", hrsPerWeek: 54,
    productivity: 82, fatigueRisk: "High", status: "OT Alert",
    skills: ["Plastering", "Tiling", "Painting", "Joinery"],
    certifications: ["ITI", "CPWD empanelled"],
    attendance: 93, overtimeHrs: 14 },
  { id: "WRK-008", name: "Kavya Srinivas", role: "QA/QC Engineer",
    project: "Hospital Expansion", hrsPerWeek: 40,
    productivity: 94, fatigueRisk: "Low", status: "Active",
    skills: ["NDT Testing", "Concrete QC", "Drawing Review"],
    certifications: ["BE Civil", "ASNT Level II", "ISO Auditor"],
    attendance: 99, overtimeHrs: 0 },
]

export const SKILL_GAPS = [
  { skill: "Certified Structural Welder", project: "GreenField Phase II",
    required: 3, available: 0, urgency: "Critical", neededBy: "Apr 15" },
  { skill: "BIM Coordinator", project: "SmartCity Data Centre",
    required: 1, available: 0, urgency: "High", neededBy: "May 01" },
  { skill: "LEED AP Consultant", project: "EcoBuild Plant",
    required: 1, available: 0, urgency: "Medium", neededBy: "Jun 01" },
  { skill: "Waterproofing Specialist", project: "Coastal Villas",
    required: 2, available: 1, urgency: "Low", neededBy: "Jul 01" },
]
```

---

## MODULE 15: CONSTRUCTION KNOWLEDGE AI

### Page: `/construction-knowledge`

> **Access:** All roles (read/write chat)

---

### 15-A: Knowledge AI Page

#### Layout
```
┌──────────────────────────────────────────────────────────┐
│ HEADER: "Construction Knowledge AI"                      │
│ [Upload Document] [Browse Topics] [Conversation History] │
├───────────────────────────────────────────────┬──────────┤
│ TOPIC CARDS (quick access)                    │ CHAT     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐        │ HISTORY  │
│ │ Building │ │ Safety   │ │ Materials│        │          │
│ │ Codes    │ │ Standards│ │ Specs    │        │ Today    │
│ │ IS/ACI   │ │ OSHA/NBC │ │ IS/BS    │        │ ─────    │
│ └──────────┘ └──────────┘ └──────────┘        │ "What is │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐        │ M25 vs   │
│ │ Concrete │ │ Structural│ │ LEED/   │        │ M30?"    │
│ │ Technology│ │ Design  │ │ BREEAM  │        │ ─────    │
│ └──────────┘ └──────────┘ └──────────┘        │ Prev     │
├───────────────────────────────────────────────│          │
│ AI CHAT PANEL                                 │ sessions │
│ ┌───────────────────────────────────────────┐ │          │
│ │ 🤖 "What is the minimum cover for rebar  │ │          │
│ │    in a coastal environment per IS 456?"  │ │          │
│ │                                           │ │          │
│ │ 👤 "The structure is 500m from sea in Goa"│ │          │
│ │                                           │ │          │
│ │ 🤖 "Per IS 456:2000 Table 16, for severe  │ │          │
│ │    exposure (tidal/coastal zone):         │ │          │
│ │    • Slabs: 45mm nominal cover            │ │          │
│ │    • Beams/Columns: 50mm nominal cover    │ │          │
│ │    • Footings: 75mm nominal cover         │ │          │
│ │    Recommend corrosion-inhibitor admixture│ │          │
│ │    and coated rebars for 500m coastal zone│ │          │
│ │    Sources: IS 456:2000 §26.4, SP 34      │ │          │
│ └───────────────────────────────────────────┘ │          │
│ [🎤] [Type your question...] [Send]           │          │
└───────────────────────────────────────────────┴──────────┘
```

#### Knowledge Base Topics
```typescript
export const KNOWLEDGE_TOPICS = [
  { id: "KT-001", name: "IS Codes Reference", icon: "📋",
    documents: ["IS 456", "IS 800", "IS 875", "IS 1893", "IS 2062"],
    description: "Indian Standards for structural, materials, and loads" },
  { id: "KT-002", name: "Safety Standards", icon: "⛑️",
    documents: ["NBC 2016", "OSHA 29 CFR", "IS 3696"],
    description: "National Building Code, OSHA regulations, scaffolding" },
  { id: "KT-003", name: "Concrete Technology", icon: "🏗️",
    documents: ["IS 10262", "ACI 318", "SP 34"],
    description: "Mix design, QC, special concretes, admixtures" },
  { id: "KT-004", name: "Green Building", icon: "🌿",
    documents: ["LEED v4", "BREEAM 2018", "IGBC Guidelines"],
    description: "Certification requirements and credit criteria" },
  { id: "KT-005", name: "Waterproofing", icon: "💧",
    documents: ["IS 2645", "BS 8102", "ASTM C836"],
    description: "Basement, roof, and facade waterproofing standards" },
  { id: "KT-006", name: "Structural Steel", icon: "🔧",
    documents: ["IS 800", "AISC 360", "BS 5950"],
    description: "Steel design, connections, fire protection" },
  { id: "KT-007", name: "Project Lessons Learned", icon: "📚",
    documents: ["PRJ-1001 Report", "PRJ-1008 Completion Report"],
    description: "Insights from completed projects in the portfolio" },
]
```

---

## MODULE 16: DECISION LOGS

### Page: `/decision-logs`

> **Access:** Super Admin (full), PM (write), Architect (write), Engineer (write), Client (read)

---

### 16-A: Decision Logs Page

#### Layout
```
┌──────────────────────────────────────────────────────────┐
│ HEADER: "Decision Logs & Audit Trail"                    │
│ Project: [All ▼] | [+ Log Decision] | [Export]           │
├──────────────────────────────────────────────────────────┤
│ FILTERS: Category▼  Date Range▼  Role▼  Status▼          │
├──────────────────────────────────────────────────────────┤
│ DECISION TABLE                                           │
│ ID | Date | Project | Decision | Made By | Category |    │
│ Impact | AI Summary | Status | Docs                      │
│ ─────────────────────────────────────────────────────── │
│ DL-041 Mar 18 Skyline Tower                             │
│   Switch from M40 to M53 concrete for Core             │
│   Made by: Vikram Sethi (Engineer)                      │
│   Category: Material | Impact: +₹4.2L cost             │
│   🤖 AI: "Grade upgrade justified by higher wind loads  │
│          on floors 22-28. Reduces risk score by 12pts." │
│   Docs: Structural calc sheet, Approval email           │
├──────────────────────────────────────────────────────────┤
│ DL-042 Mar 19 GreenField Phase II                        │
│   Delay Block B pour to Mar 24 (weather risk)           │
│   Made by: Aditya Sharma (PM)                           │
│   Category: Schedule | Impact: +4 days delay            │
│   🤖 AI: "IMD forecast shows 82% rain probability Mar  │
│          20-23. Decision reduces quality risk."         │
└──────────────────────────────────────────────────────────┘
```

#### Mock Decision Log Data
```typescript
export const MOCK_DECISION_LOGS = [
  { id: "DL-038", date: "2026-03-14", project: "Skyline Tower",
    decision: "Approved additional piling at Grid E5 after soil report",
    madeBy: "Vikram Sethi", madeByRole: "Engineer",
    category: "Structural", impact: "Cost +₹8.4L, Schedule +3 days",
    aiSummary: "Soil bearing capacity 20% below design assumption. Additional 6 bored piles eliminate foundation risk entirely. Cost justified versus structural risk.",
    status: "Implemented", documents: ["Soil Report Rev2", "Structural Note 41"] },
  { id: "DL-039", date: "2026-03-15", project: "GreenField Phase II",
    decision: "Switched Block B concrete supplier from ConcreteMix to BuildCore",
    madeBy: "Aditya Sharma", madeByRole: "PM",
    category: "Procurement", impact: "Cost -₹1.2L, Lead time -2 days",
    aiSummary: "ConcreteMix delivery reliability score dropped to 72% after equipment failure. BuildCore at 91% reliability. No quality compromise.",
    status: "Implemented", documents: ["Supplier Comparison", "PM Approval"] },
  { id: "DL-040", date: "2026-03-16", project: "EcoBuild Plant",
    decision: "Added 120kWp solar array to roof specification",
    madeBy: "Rahul Khanna", madeByRole: "PM",
    category: "Sustainability", impact: "Cost +₹82L, LEED +6 points",
    aiSummary: "Solar addition enables LEED Gold certification (from Silver). ROI 5.8 years. Aligns with client GreenMfg zero-carbon mandate.",
    status: "In Progress", documents: ["Energy Model", "Client Approval CO-037"] },
  { id: "DL-041", date: "2026-03-18", project: "Skyline Tower",
    decision: "Upgraded concrete grade M40→M53 for floors 22-28",
    madeBy: "Vikram Sethi", madeByRole: "Engineer",
    category: "Material", impact: "Cost +₹4.2L, Risk score -12 pts",
    aiSummary: "Wind tunnel study shows 18% higher lateral loads on upper floors than original design. M53 eliminates structural risk with minimal cost premium.",
    status: "Approved", documents: ["Wind Study Report", "Structural Calc 67"] },
  { id: "DL-042", date: "2026-03-19", project: "GreenField Phase II",
    decision: "Delayed Block B concrete pour from Mar 20 to Mar 24",
    madeBy: "Aditya Sharma", madeByRole: "PM",
    category: "Schedule", impact: "Schedule +4 days",
    aiSummary: "IMD 14-day forecast: 82% rain probability Mar 20-23 in Pune. Postponing pour prevents cold-joint risk and quality non-conformance. Net impact manageable within float.",
    status: "Implemented", documents: ["Weather Advisory", "PM Log"] },
]
```

---

## MODULE 17: NOTIFICATIONS HUB

### Component: Global Notification Panel (all pages)

> **Access:** All roles (own notifications only; Admin sees all)

---

### 17-A: Notification Panel

#### Layout (slide-in from right)
```
┌─────────────────────────────────┐
│ 🔔 Notifications (8 unread)     │
│ [Mark all read] [Filter▼]       │
├─────────────────────────────────┤
│ 🔴 CRITICAL                     │
│ ┌─────────────────────────────┐ │
│ │ 🔴 PPE Violation Detected   │ │
│ │ Skyline Tower — Camera 4B   │ │
│ │ Worker without helmet, Z3F22│ │
│ │ 10:42 AM · [Assign] [View]  │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ 🟡 WARNING                      │
│ ┌─────────────────────────────┐ │
│ │ ⚠️ Budget Alert             │ │
│ │ Structural Steel 8.1% over  │ │
│ │ GreenField Phase II         │ │
│ │ 09:15 AM · [Review Cost]    │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ ⏰ Milestone Due in 4 Days  │ │
│ │ Block B Slab — Apr 24       │ │
│ │ Yesterday · [View Gantt]    │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ 🔵 INFO                         │
│ ┌─────────────────────────────┐ │
│ │ 🤖 AI Report Generated      │ │
│ │ Weekly portfolio summary    │ │
│ │ ready for review            │ │
│ │ 2 hrs ago · [Download PDF]  │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

#### Notification Types & Routing
```typescript
export const MOCK_NOTIFICATIONS = [
  { id: "NTF-001", type: "safety", severity: "Critical",
    title: "PPE Violation Detected", project: "Skyline Tower",
    message: "Worker without helmet detected on Camera 4B, Zone 3 Floor 22",
    timestamp: "2026-03-20T10:42:00", isRead: false,
    actionLabel: "Assign to Safety Officer", actionRoute: "/site-monitoring",
    targetRoles: ["SUPER_ADMIN", "PROJECT_MANAGER", "ENGINEER"] },
  { id: "NTF-002", type: "cost", severity: "Warning",
    title: "Budget Over-run Alert", project: "GreenField Phase II",
    message: "Structural Steel line item is 8.1% over budget (₹12.4L)",
    timestamp: "2026-03-20T09:15:00", isRead: false,
    actionLabel: "Review Cost Estimation", actionRoute: "/cost-estimation",
    targetRoles: ["SUPER_ADMIN", "PROJECT_MANAGER"] },
  { id: "NTF-003", type: "schedule", severity: "Warning",
    title: "Milestone Due in 4 Days", project: "GreenField Phase II",
    message: "Block B Slab pour due Apr 24 — currently at 41% readiness",
    timestamp: "2026-03-19T14:00:00", isRead: false,
    actionLabel: "View Gantt", actionRoute: "/planning-assistant",
    targetRoles: ["SUPER_ADMIN", "PROJECT_MANAGER", "ENGINEER"] },
  { id: "NTF-004", type: "ai", severity: "Info",
    title: "AI Weekly Report Generated",
    message: "Portfolio weekly summary ready — 6 projects, 3 risk items",
    timestamp: "2026-03-20T08:00:00", isRead: false,
    actionLabel: "Download PDF", actionRoute: "/dashboard",
    targetRoles: ["SUPER_ADMIN", "PROJECT_MANAGER"] },
  { id: "NTF-005", type: "approval", severity: "Info",
    title: "Change Order Awaiting Approval", project: "EcoBuild Plant",
    message: "CO-040: Solar array addition — ₹82L — Client approval required",
    timestamp: "2026-03-19T11:30:00", isRead: false,
    actionLabel: "Review CO", actionRoute: "/projects/PRJ-1004",
    targetRoles: ["CLIENT", "PROJECT_MANAGER", "SUPER_ADMIN"] },
  { id: "NTF-006", type: "blueprint", severity: "Info",
    title: "Blueprint Analysis Complete", project: "Skyline Tower",
    message: "Floor Plan v3.1 analysis done — 14 clashes detected, score 83/100",
    timestamp: "2026-03-18T16:45:00", isRead: true,
    actionLabel: "View Analysis", actionRoute: "/blueprint-analyzer",
    targetRoles: ["ARCHITECT", "PROJECT_MANAGER", "SUPER_ADMIN"] },
  { id: "NTF-007", type: "risk", severity: "Warning",
    title: "Risk Score Escalated", project: "GreenField Phase II",
    message: "Project risk score crossed 65 threshold — now at 67 (Critical)",
    timestamp: "2026-03-18T10:00:00", isRead: true,
    actionLabel: "View Risk Report", actionRoute: "/risk-intelligence",
    targetRoles: ["SUPER_ADMIN", "PROJECT_MANAGER"] },
  { id: "NTF-008", type: "compliance", severity: "Warning",
    title: "Certificate Expiry in 14 Days",
    message: "Labour welfare fund payment certificate expires Apr 03",
    timestamp: "2026-03-20T07:00:00", isRead: false,
    actionLabel: "View Documents", actionRoute: "/documents",
    targetRoles: ["SUPER_ADMIN", "PROJECT_MANAGER"] },
]
```

---

## APPENDIX A: SHARED COMPONENT SPECIFICATIONS

### AI Chat Panel (All Modules)

```
┌─────────────────────────────────┐
│ 🤖 AI Assistant — [Module Name] │  ← module-specific label
│ [New Chat] [History] [⚙ Config] │
├─────────────────────────────────┤
│ Chat messages area              │
│ (ScrollArea, max-h 60vh)        │
│                                 │
│ 🤖 [AI bubble — left]           │
│              [User bubble — right]│
│                                 │
│ [Loading skeleton when typing]  │
├─────────────────────────────────┤
│ [🎤] [Type message...  ] [Send] │
│ [📎 Attach] [Regenerate 🔄]      │
└─────────────────────────────────┘
```
- Each module injects a domain-specific system prompt
- Streaming responses via Claude API `claude-sonnet-4-20250514`
- Message history persisted in Redux store per session
- "Regenerate" re-calls API with same last user message
- "Attach" allows users to reference specific project data in context

### DataTable Component (All List Pages)

```
┌──────────────────────────────────────────────────┐
│ [Search...] [Filter▼] [Sort▼] [Export CSV/Excel] │
├──────────────────────────────────────────────────┤
│ Col 1 ↑↓ | Col 2 ↑↓ | Col 3 ↑↓ | Actions        │
├──────────────────────────────────────────────────┤
│ Row 1 data                        [Edit] [Delete] │
│ Row 2 data                        [Edit] [Delete] │
├──────────────────────────────────────────────────┤
│ Showing 1–10 of 48  [< 1 2 3 4 5 >]              │
└──────────────────────────────────────────────────┘
```
- Sortable columns (click header)
- Client-side filtering with debounced search
- Pagination: 10/25/50 per page selector
- Row selection for bulk actions
- Mobile: collapses to priority columns + row expand

---

## APPENDIX B: RESPONSIVE IMPLEMENTATION GUIDE

### Tailwind Breakpoint Reference
```tsx
// KPI Grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">

// Sidebar Navigation
<nav className="hidden lg:flex lg:flex-col w-64 bg-sidebar fixed h-full" />
<Sheet>  {/* Mobile drawer */}
  <SheetTrigger className="lg:hidden"><Menu /></SheetTrigger>
</Sheet>

// Dashboard content area
<main className="lg:ml-64 min-h-screen p-4 sm:p-6 lg:p-8">

// AI Chat Panel
<aside className="
  fixed bottom-0 left-0 right-0 h-[60vh] lg:h-full
  lg:relative lg:w-80 lg:flex-shrink-0
  bg-card border-t lg:border-l border-border
  transition-transform duration-300
">

// Data Table wrapper
<div className="overflow-x-auto -mx-4 sm:mx-0 rounded-lg border">
  <table className="min-w-full">

// Chart container
<ResponsiveContainer width="100%" height={isMobile ? 200 : 320}>
```

### Page-Level Responsive Behaviour Summary
| Page | Mobile (xs) | Tablet (sm/md) | Desktop (lg+) |
|------|-------------|----------------|---------------|
| Dashboard | 1-col stacked KPIs, chat as bottom drawer | 2-col KPIs, icon rail nav | 4-col KPIs, full sidebar + chat panel |
| Projects List | 1-col project cards | 2-col cards | 3-col cards + list toggle |
| Project Detail | Tab strip scrollable, charts full-width | 2-col layout | 3-col + fixed sidebar |
| Gantt Chart | Horizontal scroll, simplified bars | Full width, daily view | Full width, weekly/monthly zoom |
| Blueprint Viewer | Full-screen modal with gesture zoom | Side-by-side viewer + analysis | 3-panel: tree + viewer + analysis |
| Site Monitoring | Stats stack, map full-width | 2-col stats + map | Grid with live map + equipment |
| AI Chat (all) | Bottom drawer (slide up) | Side panel 40% | Persistent right sidebar |
| Data Tables | 2-3 priority cols + row expand | 5-6 cols visible | All cols, inline edit |

---

## APPENDIX C: ROUTE GUARD IMPLEMENTATION

```typescript
// routes/ModuleGuard.tsx
export const ModuleGuard: React.FC<{ module: string; children: React.ReactNode }> = ({
  module, children
}) => {
  const { user } = useAuthStore();
  const hasAccess = user && MODULE_PERMISSIONS[user.role]?.includes(module);

  if (!hasAccess) return <Navigate to="/unauthorized" replace />;
  return <>{children}</>;
};

// Usage in routes.tsx
<Route path="/blueprint-analyzer" element={
  <ModuleGuard module="blueprint-analyzer">
    <BlueprintAnalyzerPage />
  </ModuleGuard>
} />
```

---

*AI-Driven Construction Management System | Module Specification v3.0 | March 2026*
*Total: 17 Modules | 5 Access Levels | 30+ Pages | 200+ Mock Data Records*
