import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot, type Root } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import Scheduling from "./pages/Scheduling";
import Costs from "./pages/Costs";
import Documents from "./pages/Documents";
import SiteIntelligence from "./pages/SiteIntelligence";
import AIAssistant from "./pages/AIAssistant";
import Reports from "./pages/Reports";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/scheduling" element={<Scheduling />} />
          <Route path="/costs" element={<Costs />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/site-intelligence" element={<SiteIntelligence />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const rootElement = document.getElementById("root");

if (rootElement) {
  // Get or create the root instance, storing it on window to persist across HMR
  const windowWithRoot = window as Window & { __APP_ROOT?: Root };

  if (!windowWithRoot.__APP_ROOT) {
    windowWithRoot.__APP_ROOT = createRoot(rootElement);
  }

  windowWithRoot.__APP_ROOT.render(<App />);
}
