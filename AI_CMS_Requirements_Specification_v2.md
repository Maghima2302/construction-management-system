# AI-DRIVEN CONSTRUCTION MANAGEMENT SYSTEM
## Comprehensive Product Requirements & Feature Specification

> **Document Version:** v2.0 — Production Ready
> **Architecture Stack:** React + TypeScript + AI/ML Backend
> **Date:** March 2026
> **Classification:** Internal — Engineering & Product

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview & System Architecture](#2-project-overview--system-architecture)
3. [Role Definitions, Responsibilities & Access Matrix](#3-role-definitions-responsibilities--access-matrix)
4. [Module Feature Specifications](#4-module-feature-specifications)
5. [Responsive Design Requirements](#5-responsive-design-requirements)
6. [AI & Automation Architecture](#6-ai--automation-architecture)
7. [AI Implementation Prompt (For Development)](#7-ai-implementation-prompt-for-development)
8. [Role-Based Access Control (RBAC) Matrix](#8-role-based-access-control-rbac-matrix)
9. [Mock API & Data Structure](#9-mock-api--data-structure)
10. [Demo Credentials & Onboarding](#10-demo-credentials--onboarding)

---

## 1. Executive Summary

The **AI-Driven Construction Management System (AI-CMS)** is a next-generation, enterprise-grade platform purpose-built for the construction industry. Leveraging Artificial Intelligence, Machine Learning, Natural Language Processing, and Computer Vision, the platform unifies every phase of a construction project — from client requirement capture through delivery and post-handover analytics — into a single cohesive digital workspace.

### Market Imperative

The global AI-in-construction market is projected to expand from **USD 3.93 billion (2024)** to **USD 22.68 billion by 2032** at a **24.6% CAGR**. Early adopters report:
- 58% gains in efficiency from AI-powered resource optimisation
- 40–50% reduction in safety incidents with computer vision monitoring
- 35% faster project delivery with AI schedule prediction
- 30% cost savings through intelligent procurement and supplier management

### Core Value Propositions

- **End-to-end project visibility** with AI-generated risk forecasts and schedule predictions
- **Role-aware dashboards** eliminating information overload for each stakeholder class
- **Automated compliance**, sustainability scoring, and carbon tracking
- **Conversational AI assistant** embedded in every module for instant decision support
- **Real-time site monitoring** with computer-vision safety alerts
- **Blueprint analysis** with generative design suggestions and clash detection
- **Predictive cost intelligence** with market-linked material pricing
- **Workforce analytics** with fatigue prediction and skill-gap management

---

## 2. Project Overview & System Architecture

### 2.1 System Purpose

AI-CMS replaces fragmented spreadsheets, siloed email chains, and disconnected project-management tools with a unified platform that surfaces the right insight to the right person at the right time. The system is designed around **five core user roles**, each with a dedicated dashboard experience, granular permissions, and a tailored AI workflow.

### 2.2 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 + TypeScript + Tailwind CSS + Vite | Responsive SPA, role-aware routing |
| State Management | Redux Toolkit + React Query | Global state + server cache sync |
| AI / LLM | Claude API (Anthropic) + OpenAI Embeddings | Chat, summarisation, RAG Q&A |
| Vision AI | Computer Vision API + TensorFlow.js | Blueprint analysis, site safety |
| Backend | Node.js / FastAPI + PostgreSQL + Redis | REST APIs, caching, job queues |
| Authentication | JWT + RBAC middleware | Role-based access control |
| Charts & Viz | Recharts + D3.js | KPIs, Gantt, heatmaps |
| Mobile / PWA | Responsive CSS Grid + Service Workers | Field access on tablets/phones |
| Vector DB | Chroma / Pinecone | RAG material & knowledge search |
| Notifications | WebSocket + Push API | Real-time alerts across all roles |

### 2.3 Refined Module Set (R&D Filtered)

Based on research into leading platforms — **Procore, Autodesk Construction Cloud, Buildertrend, PlanGrid, Fieldwire, ALICE Technologies, OpenSpace AI** — the following module selection retains maximum AI value while removing redundancy.

| # | Module | Status | AI Feature |
|---|--------|--------|-----------|
| 1 | Role-Based Dashboard Hub | ✅ KEEP | AI KPI summaries, predictive alerts, NLP chat |
| 2 | AI Requirement Interview | ✅ KEEP | Conversational intake, NLP requirement extraction |
| 3 | Project Lifecycle Manager | ✅ KEEP | AI schedule prediction, milestone risk scoring |
| 4 | Cost Estimation Engine | ✅ KEEP | ML cost model, real-time material price feeds |
| 5 | Construction Risk Intelligence | ✅ KEEP | Predictive heatmap, weather-risk correlation |
| 6 | AI Planning Assistant | ✅ KEEP | Gantt auto-generation, resource optimisation |
| 7 | AI Blueprint Analyzer | ✅ KEEP | Computer vision, clash detection, design scoring |
| 8 | Smart Site Monitoring | ✅ KEEP | CV safety alerts, progress tracking, equipment IoT |
| 9 | Material Recommendation (RAG) | ✅ KEEP | LLM + vector DB material intelligence |
| 10 | Sustainability Analyzer | ✅ KEEP | Carbon tracker, green-cert scoring, eco-alternatives |
| 11 | Supplier Intelligence | ✅ KEEP | AI rating, lead-time prediction, risk assessment |
| 12 | Workforce Analytics | ✅ KEEP | Productivity AI, fatigue prediction, skill-gap |
| 13 | Client Portal | ✅ KEEP | Self-service progress, AI Q&A, approval workflows |
| 14 | Construction Knowledge AI | ✅ KEEP | RAG knowledge base, code/regulation Q&A |
| 15 | Decision Log & Audit Trail | ✅ KEEP | Auto-summary, AI rationale capture |
| 16 | Document Management | ➕ ADDED | AI OCR, auto-classification, version control |
| 17 | Financial Dashboard | ➕ ADDED | Budget burn rate, cash-flow forecast, invoice AI |
| 18 | Notifications & Alerts Hub | ✅ KEEP | Smart priority ranking, anomaly detection |
| 19 | AI Interview History | ❌ REMOVE | Merged into Requirement Interview module |
| 20 | Separate Material Compat Route | ❌ REMOVE | Consolidated into Material Recommendation |

---

## 3. Role Definitions, Responsibilities & Access Matrix

### 3.1 Super Admin
**Platform Owner & System Orchestrator**

#### Responsibilities
- Full read/write access to all modules, projects, and users across the organisation
- User provisioning, role assignment, and permission management
- System configuration: integrations, API keys, feature flags, SSO settings
- Organisation-level financial oversight: all projects, budgets, burn rates
- AI model configuration and prompt tuning for custom domain knowledge
- Audit log review, compliance reporting, and data export
- SLA monitoring, alert thresholds, and escalation rules
- Organisation-wide performance benchmarking and reporting

#### AI-Powered Features
- Cross-project AI performance dashboard (cost overruns, risk trends, team productivity)
- AI-generated executive report narratives with one-click export
- Anomaly detection alerts across all projects and users
- Natural language query engine: *"Show projects over budget by >10%"*
- Automated compliance report generation (ISO, OSHA, local codes)
- AI-predicted portfolio risk for the next 90 days

#### Dashboard KPIs
| KPI | Description |
|-----|------------|
| Total Projects | Active / At-Risk / Completed count |
| Budget Utilisation % | Organisation-wide spend vs approved budget |
| Schedule Variance | Average delay days across all active projects |
| Open Safety Incidents | Unresolved incidents, severity-weighted |
| AI Model Usage & Cost | API calls, tokens, and cost per month |
| Portfolio Sustainability Score | Average green rating across all projects |

---

### 3.2 Project Manager
**Project Delivery Owner**

#### Responsibilities
- End-to-end project lifecycle ownership: initiation to handover
- Milestone creation, task assignment, and progress tracking
- Budget management, change-order approvals, and financial reporting
- Cross-functional team coordination (architects, engineers, suppliers)
- Client communication, status reporting, and approval collection
- Risk register maintenance and escalation to Super Admin
- Subcontractor onboarding, performance tracking, and payment processing
- Daily site log review and issue resolution

#### AI-Powered Features
- AI schedule optimizer: auto-rebalances tasks when delays are detected
- Predictive cost alert: flags budget over-runs 2–4 weeks in advance
- AI meeting summariser: auto-extracts action items from meeting recordings
- Smart RFI (Request for Information) drafting and routing
- Weather-adjusted timeline recalculation
- One-click AI progress report generation for client delivery

#### Dashboard KPIs
| KPI | Description |
|-----|------------|
| Project Health Score | Composite AI metric (0–100) |
| Milestone Completion % | Actual vs planned milestone burn-down |
| Budget Spent vs Forecast | Real-time financial variance |
| Open Issues & RFIs | Unresolved items by priority |
| Workforce Utilisation % | Deployed vs available labour |
| Risk Score | Current week composite risk rating |

---

### 3.3 Architect
**Design Authority & Innovation Driver**

#### Responsibilities
- Schematic design, design development, and construction document production
- Blueprint upload, revision management, and drawing version control
- Design compliance review against local codes and client requirements
- Material specification, sustainability scoring, and eco-design integration
- BIM model management and clash detection sign-off
- Client design presentation and approval capture
- Coordination with structural and MEP engineers on design intent
- Design change documentation and impact assessment

#### AI-Powered Features
- AI Blueprint Analyzer: automated space utilisation scoring, clash detection
- Generative design suggestions: AI proposes alternative layouts based on constraints
- Lighting and ventilation simulation with sustainability impact scores
- Smart material optimizer: AI recommends alternatives balancing cost, sustainability, and aesthetics
- Code compliance checker: instant cross-reference against relevant building codes
- AI design critique: identifies accessibility gaps, structural concerns, and inefficiencies

#### Dashboard KPIs
| KPI | Description |
|-----|------------|
| Drawings Approved vs Pending | Drawing approval pipeline status |
| Design Change Requests | Open and closed DCRs |
| Blueprint Analysis Score | AI-generated design quality score |
| Sustainability Rating | Design-phase environmental score |
| BIM Clash Count | Resolved vs open clashes |
| Material Specification % | Completion of material schedules |

---

### 3.4 Civil Engineer
**Structural Integrity & Site Execution Lead**

#### Responsibilities
- Structural design verification, load calculations, and foundation assessment
- Site supervision, daily progress inspection, and quality control
- Material testing oversight, inspection reports, and NCR management
- Equipment deployment planning and utilisation tracking
- Safety protocol enforcement, incident reporting, and near-miss logging
- Subcontractor technical supervision and quality sign-off
- As-built documentation and site survey management
- Temporary works design review and approval

#### AI-Powered Features
- Structural Risk Prediction Dashboard: load capacity analysis, foundation risk heatmap
- Construction Timeline AI Predictor: identifies bottlenecks 3–6 weeks ahead
- Smart Site Progress Tracker: computer vision progress % vs planned
- Equipment predictive maintenance alerts from IoT sensor data
- AI safety incident pattern recognition and prevention recommendations
- Automated NCR drafting with photo evidence linking

#### Dashboard KPIs
| KPI | Description |
|-----|------------|
| Site Progress % | Actual vs planned (computer vision derived) |
| Open NCRs & Inspections | Non-conformance reports by status |
| Equipment Utilisation % | Active vs idle equipment ratio |
| Safety Incident Rate | Per 100,000 person-hours |
| Structural Risk Score | AI-assessed risk on structural elements |
| Daily Labour Hours | Logged hours vs planned |

---

### 3.5 Client
**Project Sponsor & Requirement Owner**

#### Responsibilities
- Project requirement definition via AI-guided intake interview
- Design approval at key milestones (schematic, design development, CDs)
- Budget approval for change orders above agreed threshold
- Final inspection and project sign-off
- Communication with project manager on scope changes and concerns

#### AI-Powered Features
- AI Requirement Interview: conversational multi-turn requirement capture
- Self-service project status portal with plain-English AI progress summaries
- Visual progress timeline with photo/video site evidence
- AI Q&A assistant: ask questions about project status, materials, timeline
- Personalised cost breakdown with what-if scenario modelling
- Approval workflow: digital sign-off with AI change-impact previews

#### Dashboard KPIs
| KPI | Description |
|-----|------------|
| Project Completion % | Overall project progress |
| Budget: Approved vs Spent | Financial transparency view |
| Next Milestone & ETA | Upcoming deliverable with AI-predicted date |
| Outstanding Approvals | Items requiring client sign-off |
| Sustainability Score | Project environmental performance |
| Change Orders | Pending and approved change requests |

---

## 4. Module Feature Specifications

### 4.1 Role-Based Dashboard Hub

> The command centre of the platform. Each role loads a uniquely configured dashboard with relevant KPIs, AI insight cards, live alerts, and quick-action widgets. Fully responsive across all screen sizes.

**Key Features:**
- Role-aware KPI grid with sparkline trend indicators and week-over-week delta
- AI Insight Digest: 3–5 daily AI-generated priority items with one-click action
- Unified notification centre with smart priority ranking (Critical / Warning / Info)
- Recent activity feed with project-scoped filtering
- Quick-launch widget tiles for most-used module functions per role
- Responsive grid: 4-col desktop → 2-col tablet → 1-col mobile
- Dark/light mode toggle with role-colour theming
- Pinnable widgets — each user customises their own layout
- Real-time WebSocket updates for live project data changes

---

### 4.2 AI Requirement Interview

> Replaces static intake forms with a conversational, multi-turn AI interview. The system asks clarifying questions, handles ambiguity, and produces a structured Requirement Document automatically.

**Key Features:**
- Multi-turn chat powered by LLM (Claude API) with domain-aware construction prompts
- Extracts: project type, budget, timeline, sustainability goals, design preferences, regulatory constraints
- Generates structured Requirement Document (PDF/DOCX) on completion
- Requirement completeness score with gap-filling prompts
- Historical interview library — revisit, edit, and re-generate requirements
- Auto-links requirements to relevant project modules (risk, planning, materials)
- Supports voice input on mobile (Web Speech API)
- Conflict detection: flags contradictions between stated requirements

---

### 4.3 Project Lifecycle Manager

> Full project portfolio and single-project management — from creation and planning through execution, quality control, and handover.

**Key Features:**
- Project creation wizard with AI-pre-filled fields from Requirement Interview
- Milestone-based Gantt chart with AI-predicted completion dates
- Task management with dependency mapping, assignee tracking, and priority labels
- Change-order workflow: request → AI impact analysis → approval → implementation
- Risk-adjusted schedule: timeline auto-adjusts when risk events are logged
- Document version control for drawings, specs, and contracts
- Project health score (composite AI metric: schedule + budget + risk + team)
- One-click AI project status report generation for stakeholder distribution
- Sub-project and phase management with WBS (Work Breakdown Structure)

---

### 4.4 Cost Estimation Engine

> AI-powered cost modelling from early-stage concept through detailed BoQ, with real-time market price integration and scenario analysis.

**Key Features:**
- ML cost model trained on historical project data + regional price indices
- Quantity take-off from uploaded blueprints (AI-parsed dimensions)
- Real-time material price feeds with cost-impact alerts on price spikes
- Scenario modelling: compare 3 material/method options side-by-side
- Budget variance tracker with weekly trend chart
- Change-order cost impact auto-calculation
- Cash-flow projection with S-curve visualisation
- Export to Excel / PDF with itemised BoQ breakdown
- Contingency reserve modelling with risk-linked drawdown

---

### 4.5 Construction Risk Intelligence

> Proactive risk identification, scoring, and mitigation management using ML risk models and external data feeds (weather, geotechnical, market).

**Key Features:**
- Risk register with AI-assigned probability/impact scores
- Risk heatmap (2×2 probability-impact matrix, interactive)
- Weather risk integration: 14-day forecast overlaid on critical path activities
- AI risk trend analysis: how project risk evolves over time
- Automated risk mitigation suggestion engine
- Safety incident tracking with AI pattern recognition
- Regulatory compliance risk flagging (OSHA, local codes)
- Project-level risk score card with RAG (Red/Amber/Green) status
- Cross-project risk comparison for portfolio-level insight

---

### 4.6 AI Planning Assistant

> Intelligent construction scheduling and resource planning — AI builds, optimises, and maintains the construction schedule throughout the project lifecycle.

**Key Features:**
- AI Gantt generation from scope of work description (NLP input)
- Resource-levelling algorithm: balances labour, equipment, and materials across tasks
- Critical path analysis with AI-identified float and squeeze points
- What-if scenario planner: simulate impact of delays, resource changes
- Subcontractor schedule coordination with conflict detection
- Labour workload chart: per-trade breakdown week by week
- Look-ahead schedules (3-week, 6-week) auto-generated for field teams
- Integration hooks for Primavera P6 / MS Project export
- AI-detected schedule risks with automated mitigation proposals

---

### 4.7 AI Blueprint Analyzer

> Upload architectural and structural drawings; AI parses, analyses, and returns design insights, clash reports, and improvement recommendations.

**Key Features:**
- PDF/DXF/DWG drawing upload with AI layer parsing
- Space utilisation analysis: occupancy density, circulation efficiency scoring
- BIM clash detection: identifies structural, MEP, and architectural conflicts
- Lighting simulation: daylight factor estimation per room
- Ventilation assessment: natural vs mechanical needs analysis
- Accessibility compliance checker (ADA / local standards)
- AI design critique report with scored improvement suggestions
- Generative design mode: AI proposes alternative layouts for selected zones
- Version comparison: visual diff between drawing revisions

---

### 4.8 Smart Site Monitoring Dashboard

> Real-time construction site visibility combining IoT sensor data, computer vision (CCTV feeds), drone data, and worker wearables.

**Key Features:**
- Live site progress map with percentage complete per zone
- Computer vision safety: PPE detection, restricted zone breach alerts
- Equipment utilisation tracker with idle-time alerts
- Worker attendance and hours tracking (RFID/biometric integration)
- Daily site diary auto-generation from sensor + vision data
- Weather station integration with work-stop alerts
- Photo/video evidence timeline with AI object tagging
- Drone survey integration: periodic aerial progress comparison
- Heatmap of high-activity zones for logistics optimisation

---

### 4.9 Material Recommendation (AI RAG)

> Retrieval-Augmented Generation (RAG) material intelligence engine. Engineers and architects ask natural-language questions; AI retrieves and synthesises recommendations from a curated construction knowledge base.

**Key Features:**
- Vector database of 10,000+ construction materials with specs and pricing
- NLP query: *"High-strength concrete suitable for coastal environment under $X/m³"*
- Alternative comparison matrix: performance, cost, sustainability, availability
- AI sustainability scoring per material (embodied carbon, recyclability)
- Supplier availability check with lead-time integration
- Material substitution alerts when specified material is unavailable
- Project-specific material schedule auto-generated from specifications
- Historical usage analytics: which materials performed best in similar projects

---

### 4.10 Sustainability Analyzer

> Tracks, scores, and optimises the environmental footprint of construction projects against green building standards (LEED, BREEAM, IGBC).

**Key Features:**
- Carbon emission tracker: Scope 1/2/3 per project phase
- Green certification scorecard (LEED / BREEAM / IGBC) with gap analysis
- Embodied carbon vs operational carbon comparison chart
- AI eco-recommendation engine: suggests material/process changes to reduce footprint
- Renewable energy integration modelling (solar, rainwater harvesting sizing)
- Waste management tracker: diversion rate from landfill
- Sustainability report auto-generation for client and regulatory submission
- Peer benchmark: compare project sustainability vs industry average

---

### 4.11 Supplier Intelligence

> AI-driven supplier discovery, evaluation, and performance management with real-time market intelligence.

**Key Features:**
- Supplier database with AI-generated performance scores (quality, delivery, price)
- Lead-time prediction model using historical order and logistics data
- Price comparison engine across multiple suppliers for each material category
- Supply chain risk alerts: geopolitical, logistics, and financial risk flags
- Automated RFQ (Request for Quotation) generation and tracking
- Contract milestone tracking with payment schedule integration
- Supplier rating dashboard with review capture from site teams
- Preferred supplier shortlist AI-recommendation per project type and location

---

### 4.12 Workforce Analytics

> Data-driven labour management — from skill-gap identification and deployment planning to fatigue monitoring and productivity analysis.

**Key Features:**
- Labour distribution chart: trade breakdown vs project phase requirement
- Productivity index per team/trade with trend analysis
- AI fatigue prediction: flags workers at high overtime risk
- Skill-gap analysis: identifies missing certifications for upcoming project phases
- Training recommendation engine: links skill gaps to available courses
- Attendance and hours dashboard with overtime cost tracking
- Workforce capacity planning: forward look at labour demand vs availability
- Safety incident correlation: links fatigue/overtime patterns to incident rate

---

### 4.13 Document Management & AI OCR

> Centralised document repository with AI-powered classification, search, and version control.

**Key Features:**
- Multi-format upload: PDF, DOCX, DWG, IFC, images
- AI OCR and auto-classification (drawings vs specs vs contracts vs reports)
- Semantic search: *"find all documents related to foundation waterproofing"*
- Version control with diff highlighting between drawing revisions
- Approval workflow: review → comment → approve/reject with signature capture
- Expiry alerting for certificates, insurance, and compliance documents
- Bulk download and audit trail for regulatory submission
- Integration with Blueprint Analyzer for uploaded drawing auto-analysis

---

### 4.14 Financial Dashboard

> Real-time financial oversight from project-level cost tracking through organisational portfolio financial health.

**Key Features:**
- Budget burn rate chart with AI-projected final cost (EAC — Estimate at Completion)
- Earned Value Management (EVM) metrics: SPI, CPI, EV, PV, AC
- Invoice processing with AI data extraction from uploaded invoices
- Cash-flow waterfall with weekly actuals vs forecast
- Change-order financial impact ledger
- Multi-currency support with real-time FX conversion
- Contingency reserve tracker with drawdown visualisation
- Export: project P&L, cost-by-WBS, and variance reports

---

### 4.15 Construction Knowledge AI

> An always-available AI assistant trained on construction codes, standards, best practices, and project-specific documents.

**Key Features:**
- RAG-powered Q&A over uploaded project documents + curated knowledge base
- Building code reference engine (IS, BS, ACI, Eurocode, OSHA)
- Best-practice guide retrieval by topic (formwork, waterproofing, etc.)
- AI explains technical terms and standards in plain English
- Lesson-learned database from completed projects
- Integration with all modules: contextual knowledge available in-situ
- Conversation history saved per user with topic tagging
- Admin-configurable knowledge base with custom document uploads

---

## 5. Responsive Design Requirements

Every page must be fully responsive across four breakpoints. Field teams access the system via mobile and tablet; responsiveness is a **non-negotiable production requirement**.

### Breakpoint Definitions

| Breakpoint | Width | Grid Layout | Key Behaviour |
|-----------|-------|-------------|---------------|
| Mobile (xs) | < 640px | Single column | Collapsible nav drawer, stacked KPI cards, full-width tables with horizontal scroll, touch-optimised controls, FAB for primary actions |
| Tablet (sm/md) | 640–1024px | 2-column grid | Sidebar collapses to icon rail, KPI grid 2-up, charts full-width, modals fullscreen |
| Desktop (lg) | 1024–1440px | 3-column grid | Persistent sidebar, 3–4 KPI tiles per row, charts side-by-side, data tables paginated |
| Wide (xl) | > 1440px | 4-column grid | Max-width 1600px container, 4 KPI tiles, dual-panel detail views, expanded Gantt chart |

### Page-Level Responsive Rules

- **Dashboard:** KPI cards stack vertically on mobile; chart panels collapse to touch carousels
- **Gantt Chart:** Horizontal scroll on mobile with touch pinch-to-zoom; full width on desktop
- **Data Tables:** Priority columns visible on mobile; secondary columns accessible via row-expand
- **Blueprint Analyzer:** Full-screen viewer on mobile with gesture-based zoom/pan
- **AI Chat Panel:** Fixed bottom drawer on mobile; persistent right side panel on desktop
- **Site Monitoring Map:** Full-screen modal on mobile; embedded panel on desktop
- **Forms & Wizards:** Single-field-per-step on mobile; multi-column grid on desktop
- **Navigation:** Hamburger → drawer on mobile; icon rail on tablet; full labelled sidebar on desktop

### Tailwind CSS Implementation Guide

```tsx
// KPI Grid — responsive columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

// AI Chat Panel — drawer on mobile, sidebar on desktop
<div className="fixed bottom-0 w-full lg:relative lg:w-80 lg:h-full">

// Navigation Sidebar
<nav className="hidden lg:flex lg:flex-col lg:w-64">
<button className="lg:hidden" onClick={toggleDrawer}>☰</button>

// Data Table — horizontal scroll on mobile
<div className="overflow-x-auto -mx-4 sm:mx-0">
  <table className="min-w-full">
```

---

## 6. AI & Automation Architecture

### 6.1 AI Feature Taxonomy

| AI Category | Technology | Modules Applied | User Benefit |
|-------------|-----------|----------------|-------------|
| Conversational AI | LLM (Claude API) | AI Interview, Knowledge AI, Client Portal | Natural language interaction for all users |
| Predictive ML | Regression + Gradient Boosting | Risk, Cost, Schedule, Workforce | Early warning on overruns and delays |
| Computer Vision | CV API + YOLO models | Blueprint Analyzer, Site Monitoring | Automated visual inspection at scale |
| RAG / Vector Search | Embeddings + Chroma/Pinecone | Materials, Knowledge, Documents | Contextual answer synthesis from docs |
| NLP Extraction | NER + Entity Extraction | Requirements, RFIs, Meeting Notes | Structured data from unstructured text |
| Optimisation AI | Linear Programming + GA | Planning, Workforce, Suppliers | Optimal resource and schedule allocation |
| Anomaly Detection | Isolation Forest / LSTM | Financial, Site Monitoring, Safety | Proactive alerting on unusual patterns |
| Generative Design | Parametric + LLM hybrid | Blueprint Analyzer | Alternative design option generation |

### 6.2 Automation Workflows

#### 1. Schedule Auto-Repair
When a task is marked delayed, AI automatically adjusts downstream tasks, reassigns float buffer, and notifies the PM with a revised critical path.

#### 2. Invoice Auto-Processing
Uploaded supplier invoices are OCR'd, line items extracted, matched against POs, and routed for approval with discrepancy flags highlighted.

#### 3. Daily Site Report Generation
At 18:00 daily, AI aggregates sensor data, progress photos, attendance records, and safety alerts into a formatted daily site report sent to PM and client.

#### 4. Material Reorder Alert
When material stock falls below threshold, AI cross-references project schedule to predict depletion date and triggers automated RFQ to preferred suppliers.

#### 5. Risk Escalation
When a risk score crosses a predefined threshold, AI generates a mitigation brief and auto-escalates to the relevant role with suggested actions.

#### 6. Meeting Action Extraction
Meeting recordings uploaded by PM are transcribed, action items extracted with owners and due dates, and added to the task management system.

#### 7. Compliance Expiry Alert
30/14/7 days before certificates, permits, or insurance policies expire, AI triggers escalating alerts to Super Admin and PM.

#### 8. Progress Photo Analysis
Drone and site camera uploads are auto-analysed by computer vision to estimate progress %, detect safety violations, and tag objects.

### 6.3 Claude API Integration Pattern

```typescript
// Module-level AI Chat — streaming response
const streamAIResponse = async (
  moduleContext: string,
  userMessage: string,
  projectData: ProjectContext
) => {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `You are an AI assistant for a construction management system.
               Context: ${moduleContext}
               Project Data: ${JSON.stringify(projectData)}
               Always provide actionable, construction-specific recommendations.`,
      messages: [{ role: "user", content: userMessage }],
      stream: true,
    }),
  });
  // Handle streaming chunks...
};
```

---

## 7. AI Implementation Prompt (For Development)

Use the following master prompt when instructing an AI coding assistant (Claude, Cursor, Copilot) to scaffold or build any module of this system.

---

```
You are a senior full-stack engineer building an AI-Driven Construction Management System.
Tech stack: React 18 + TypeScript + Tailwind CSS + Redux Toolkit + React Query + Recharts + Lucide Icons.
The system serves 5 roles: Super Admin, Project Manager, Architect, Civil Engineer, Client.

GLOBAL REQUIREMENTS:
• Every component must be fully responsive:
  mobile (xs <640px), tablet (sm 640-1024px), desktop (lg 1024-1440px), wide (xl >1440px).
• Use CSS Grid with auto-fit/auto-fill for KPI cards; Tailwind breakpoint classes throughout.
• All data tables must support horizontal scroll on mobile and column-priority collapsing.
• AI Chat Panel: fixed bottom drawer on mobile, persistent right sidebar on desktop.
• Navigation: hamburger+drawer on mobile, icon rail on tablet, full sidebar on desktop.

AI INTEGRATION:
• Every module exposes an AIChatPanel connected to the Claude API (claude-sonnet-4-20250514).
• Each module has a domain-specific system prompt injected.
  Example — risk module: "You are a construction risk analyst specialising in..."
• AI generates: daily insight digests, schedule recommendations, cost alerts, report narratives.
• Implement RAG for Material Recommendation and Knowledge AI using vector embeddings.
• Use streaming API responses for all chat interactions (ReadableStream + useEffect).

MODULE-SPECIFIC PROMPT — replace [MODULE NAME] and [MODULE DESCRIPTION]:

  Build the [MODULE NAME] module for the AI-CMS platform.
  Description: [MODULE DESCRIPTION].

  Include:
  1.  Main page component with responsive layout (mobile-first Tailwind classes).
  2.  KPI summary grid — 4 cards desktop / 2 tablet / 1 mobile, with sparkline trends.
  3.  Primary data visualisation (Recharts BarChart/LineChart/PieChart) — ResponsiveContainer.
  4.  Data table with DataTable component — sortable, filterable, paginated, mobile-optimised.
  5.  AI Insight Panel — calls Claude API with module-specific system prompt; streaming; skeleton loader.
  6.  Action panel — primary CTA buttons per user role (check RBAC from constants/rbac.ts).
  7.  Empty states, error boundaries, and loading skeletons for every async section.
  8.  TypeScript interfaces for all data models in types/ folder.
  9.  Mock data in constants/mock[ModuleName].ts with at least 20 realistic construction records.
  10. Unit test scaffolding with Vitest for core business logic functions.

QUALITY STANDARDS:
• Accessibility: WCAG 2.1 AA — aria-labels, keyboard navigation, focus rings on all interactive elements.
• Performance: lazy-load all route components; virtualise lists >100 rows; memo heavy chart renders.
• Theming: CSS custom properties for brand colours; support prefers-color-scheme dark mode.
• Error handling: global error boundary + toast notification system for API failures.
• No hardcoded strings — all labels through constants/strings.ts (i18n-ready).
• Every AI-generated text block must have a "Regenerate" button and feedback thumbs.
• All forms must have real-time validation with inline error messages.
• Loading states: skeleton loaders (not spinners) for all data-fetching sections.
```

---

## 8. Role-Based Access Control (RBAC) Matrix

> **Legend:** `A` = Admin (full control) | `W` = Write (create/edit/delete) | `R` = Read-only | `—` = No Access

| Module | Super Admin | Project Manager | Architect | Civil Engineer | Client |
|--------|:-----------:|:---------------:|:---------:|:--------------:|:------:|
| Dashboard Hub | A | W | W | W | R |
| AI Requirement Interview | A | W | R | R | W |
| Project Lifecycle | A | W | R | W | R |
| Cost Estimation | A | W | R | R | R |
| Risk Intelligence | A | W | R | W | R |
| AI Planning Assistant | A | W | R | W | — |
| Blueprint Analyzer | A | R | W | R | — |
| Site Monitoring | A | W | R | W | R |
| Material Recommendation | A | W | W | W | R |
| Sustainability Analyzer | A | W | W | R | R |
| Supplier Intelligence | A | W | R | W | — |
| Workforce Analytics | A | W | — | W | — |
| Document Management | A | W | W | W | R |
| Financial Dashboard | A | W | — | — | R |
| Construction Knowledge AI | A | W | W | W | R |
| Decision Logs | A | W | W | W | R |
| Notifications Hub | A | W | W | W | R |
| User Management | A | — | — | — | — |
| System Configuration | A | — | — | — | — |

---

## 9. Mock API & Data Structure

All mock API functions reside in `services/mockApi.ts`. Each returns typed `Promise` responses matching interfaces in `types/`.

### API Surface

| Function | Returns | Notes |
|----------|---------|-------|
| `getDashboardByRole(role)` | `DashboardData` | KPIs, widgets, alerts per role |
| `getProjects()` | `Project[]` | Full portfolio with health scores |
| `getProjectById(id)` | `Project` | Single project with all sub-data |
| `getClients()` / `getClientById(id)` | `Client[]` / `Client` | CRM data with requirement history |
| `getMaterials(query?)` | `Material[]` | RAG-compatible search with filters |
| `getCostEstimation(projectId)` | `CostEstimation` | BoQ, S-curve, scenarios |
| `getRiskIntelligence(projectId)` | `RiskData` | Heatmap, trend, alerts |
| `getPlanningAssistant(projectId)` | `PlanningData` | Schedule, resources, look-ahead |
| `getSustainability(projectId)` | `SustainabilityData` | Carbon, scores, recommendations |
| `getBlueprintAnalysis(fileId)` | `BlueprintAnalysis` | Vision results, clash report |
| `getSiteMonitoring(projectId)` | `SiteData` | Live stats, equipment, attendance |
| `getSuppliers(filters?)` | `Supplier[]` | Ratings, lead times, pricing |
| `getWorkforce(projectId)` | `WorkforceData` | Productivity, skills, utilisation |
| `getDocuments(projectId, type?)` | `Document[]` | Filtered by type, version history |
| `getFinancials(projectId)` | `FinancialData` | EVM, cash flow, invoices |
| `getNotifications(userId)` | `Notification[]` | Priority-ranked, unread count |
| `getDecisionLogs(projectId)` | `DecisionLog[]` | AI-summarised log entries |
| `getKnowledgeAnswer(query)` | `KnowledgeResponse` | RAG-synthesised answer + sources |

### Folder Structure

```
client/
├── app/routes.tsx
├── assets/
├── components/
│   ├── ui/                    # shadcn/ui base components
│   ├── charts/                # AnalyticsChart, GanttChart, HeatmapChart
│   └── common/                # AIChatPanel, DataTable, KPICard, Timeline
├── constants/
│   ├── mockProjects.ts        # 15+ projects with milestones, risk, budget
│   ├── mockClients.ts         # 10+ clients with requirement history
│   ├── mockMaterials.ts       # 50+ materials with specs and pricing
│   ├── mockCostEstimation.ts  # BoQ data, S-curves, scenarios
│   ├── mockDashboard.ts       # Role-wise KPIs and widgets
│   ├── mockRisk.ts            # Heatmap, trend, safety alerts
│   ├── mockPlanning.ts        # Schedule tasks, labour workload
│   ├── mockSustainability.ts  # Carbon, metrics, eco-recommendations
│   ├── mockBlueprintAnalysis.ts
│   ├── mockSiteMonitoring.ts
│   ├── mockSuppliers.ts
│   ├── mockWorkforce.ts
│   └── rbac.ts                # Permission definitions per role/module
├── features/
│   ├── auth/pages/
│   ├── dashboard/pages/
│   ├── projects/{pages,components}/
│   ├── risk-intelligence/{pages,components}/
│   ├── planning-assistant/{pages,components}/
│   ├── blueprint-analyzer/{pages,components}/
│   ├── site-monitoring/{pages,components}/
│   ├── sustainability/{pages,components}/
│   └── ... (one folder per module)
├── services/
│   ├── api.ts                 # Real API client (Axios + interceptors)
│   └── mockApi.ts             # Mock data service (dev/demo)
├── store/                     # Redux slices per domain
├── types/                     # TypeScript interfaces
├── hooks/                     # Custom hooks (useRole, useAI, useSiteData)
└── utils/                     # Formatters, validators, helpers
```

---

## 10. Demo Credentials & Onboarding

### Login Credentials

| Role | Email | Password | Default Dashboard Route |
|------|-------|----------|------------------------|
| Super Admin | `superadmin@cms.com` | `SuperAdmin@123` | `/dashboard/super-admin` |
| Project Manager | `pm@cms.com` | `ProjectManager@123` | `/dashboard/project-manager` |
| Architect | `architect@cms.com` | `Architect@123` | `/dashboard/architect` |
| Civil Engineer | `engineer@cms.com` | `Engineer@123` | `/dashboard/engineer` |
| Client | `client@cms.com` | `Client@123` | `/dashboard/client` |

### Route Map

| Route | Module | Access |
|-------|--------|--------|
| `/login` | Authentication | Public |
| `/unauthorized` | Auth Error | Public |
| `/dashboard` | Role redirect | All roles |
| `/dashboard/:role` | Role Dashboard | Role-specific |
| `/projects` | Project List | All except Client |
| `/projects/:id` | Project Detail | All roles |
| `/projects/create` | New Project | PM, Super Admin |
| `/ai-interview` | AI Requirement Interview | PM, Client, Super Admin |
| `/materials` | Material Recommendation | Arch, Engineer, PM |
| `/cost-estimation` | Cost Engine | PM, Super Admin, Client (R) |
| `/risk-intelligence` | Risk Module | PM, Engineer, Super Admin |
| `/planning-assistant` | Planning AI | PM, Engineer |
| `/sustainability` | Sustainability | Arch, PM, Super Admin |
| `/blueprint-analyzer` | Blueprint AI | Architect |
| `/site-monitoring` | Site Dashboard | PM, Engineer, Client (R) |
| `/suppliers` | Supplier Intel | PM, Engineer |
| `/workforce` | Workforce Analytics | PM, Engineer |
| `/construction-knowledge` | Knowledge AI | All roles |
| `/documents` | Document Management | All roles |
| `/financials` | Financial Dashboard | PM, Super Admin, Client (R) |
| `/decision-logs` | Decision Log | PM, Arch, Engineer |
| `/clients` | Client Management | PM, Super Admin |
| `/clients/:id` | Client Detail | PM, Super Admin |

### Onboarding Notes

Each demo account is pre-seeded with role-relevant mock data. The login page at `/login` automatically redirects to the correct role dashboard on authentication. An `/unauthorized` page handles access attempts outside role permissions. First-time login triggers a guided onboarding tour highlighting key module features for the specific role.

---

## Appendix: Key AI Prompts Per Module

| Module | System Prompt Seed |
|--------|-------------------|
| Dashboard | *"You are an executive construction AI analyst. Summarise today's key project risks and opportunities in 3 bullet points."* |
| Risk | *"You are a construction risk specialist. Analyse the provided risk register and suggest the top 3 mitigation actions."* |
| Planning | *"You are an expert construction scheduler. Identify schedule bottlenecks and propose resource reallocation."* |
| Blueprint | *"You are an architectural AI reviewer. Analyse this blueprint for space efficiency, code compliance, and design improvements."* |
| Materials | *"You are a construction materials expert. Recommend the best material options considering cost, durability, and sustainability."* |
| Sustainability | *"You are a green building consultant. Suggest specific actions to improve the project's LEED certification score."* |
| Knowledge | *"You are a construction knowledge assistant with expertise in building codes, standards, and best practices."* |
| Cost | *"You are a construction cost estimator. Identify cost overrun risks and suggest value engineering opportunities."* |

---

*AI-Driven Construction Management System | Requirements Specification v2.0 | Confidential — Internal Use Only | March 2026*
