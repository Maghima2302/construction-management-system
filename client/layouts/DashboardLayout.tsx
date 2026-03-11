import { Bell, Building2, LogOut, Search } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ROLE_LABELS } from "@/constants/rbac";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", module: "dashboard" },
  { to: "/clients", label: "Clients", module: "clients" },
  { to: "/projects", label: "Projects", module: "projects" },
  { to: "/risk-intelligence", label: "Risk Intelligence", module: "risk-intelligence" },
  { to: "/planning-assistant", label: "Planning Assistant", module: "planning-assistant" },
  { to: "/sustainability", label: "Sustainability", module: "sustainability" },
  { to: "/blueprint-analyzer", label: "Blueprint Analyzer", module: "blueprint-analyzer" },
  { to: "/site-monitoring", label: "Site Monitoring", module: "site-monitoring" },
  { to: "/suppliers", label: "Suppliers", module: "suppliers" },
  { to: "/workforce", label: "Workforce", module: "workforce" },
  { to: "/construction-knowledge", label: "Knowledge AI", module: "construction-knowledge" },
  { to: "/ai-interview", label: "AI Interview", module: "ai-interview" },
  { to: "/materials", label: "Materials", module: "materials" },
  { to: "/cost-estimation", label: "Cost Estimation", module: "cost-estimation" },
  { to: "/decision-logs", label: "Decision Logs", module: "decision-logs" },
];

export default function DashboardLayout() {
  const location = useLocation();
  const { user, logout, hasModuleAccess } = useAuthStore();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-72 shrink-0 border-r border-border bg-primary text-primary-foreground lg:block">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <Building2 size={20} className="text-accent" />
          <span className="font-semibold">Civiora Enterprise</span>
        </div>
        <div className="p-4">
          <div className="mb-5 rounded-lg bg-white/10 p-3 text-sm">
            <p className="font-medium">{user?.name}</p>
            <p className="text-xs text-primary-foreground/75">{user?.company}</p>
            <p className="text-xs text-accent mt-1">{ROLE_LABELS[user?.role || "CLIENT"]}</p>
          </div>
          <nav className="space-y-1">
            {NAV_ITEMS.filter((item) => hasModuleAccess(item.module)).map((item) => {
              const active =
                location.pathname === item.to ||
                (item.to !== "/dashboard" && location.pathname.startsWith(item.to));

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors",
                    active ? "bg-accent text-accent-foreground font-medium" : "hover:bg-white/10",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur lg:px-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search projects, clients, activities"
              className="w-full rounded-md border border-input bg-card py-2 pl-9 pr-3 text-sm"
            />
          </div>
          <div className="ml-3 flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell size={18} />
            </Button>
            <Button variant="outline" size="sm" onClick={logout} className="gap-1">
              <LogOut size={14} /> Logout
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
