import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Calendar,
  DollarSign,
  FileText,
  Camera,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  HardHat,
  CheckCircle2,
  Bell,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { UserRole } from "@/types/auth";

interface NavItem {
  name: string;
  icon: React.ReactNode;
  href: string;
}

const defaultNavItems: NavItem[] = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/" },
  { name: "Clients", icon: <Users size={20} />, href: "/clients" },
  { name: "Projects", icon: <FolderOpen size={20} />, href: "/projects" },
  { name: "Scheduling", icon: <Calendar size={20} />, href: "/scheduling" },
  { name: "Cost & Contracts", icon: <DollarSign size={20} />, href: "/costs" },
  { name: "Documents/BIM", icon: <FileText size={20} />, href: "/documents" },
  { name: "Site Intelligence", icon: <Camera size={20} />, href: "/site-intelligence" },
  { name: "Reports", icon: <BarChart3 size={20} />, href: "/reports" },
  { name: "Engineer Chat", icon: <Bot size={20} />, href: "/engineer/chat" },
  { name: "Settings", icon: <Settings size={20} />, href: "/settings" },
];

const clientNavItems: NavItem[] = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/" },
  { name: "Projects", icon: <HardHat size={20} />, href: "/projects" },
  { name: "Project Timeline", icon: <Calendar size={20} />, href: "/scheduling" },
  { name: "Approvals", icon: <CheckCircle2 size={20} />, href: "/approvals" },
  { name: "Documents", icon: <FileText size={20} />, href: "/documents" },
  { name: "Budget & Costs", icon: <DollarSign size={20} />, href: "/costs" },
  { name: "Messages", icon: <MessageSquare size={20} />, href: "/messages" },
  { name: "Notifications", icon: <Bell size={20} />, href: "/notifications" },
  { name: "Reports", icon: <BarChart3 size={20} />, href: "/reports" },
  { name: "Settings", icon: <Settings size={20} />, href: "/settings" },
];

const engineerNavItems: NavItem[] = [
  ...defaultNavItems.slice(0, 7), // Up to Site Intelligence
  { name: "Engineer AI Workspace", icon: <Bot size={20} className="text-accent" />, href: "/engineer/chat" },
  ...defaultNavItems.slice(7), // Reports and Settings
];

const navItemsByRole: Partial<Record<UserRole, NavItem[]>> = {
  CLIENT: clientNavItems,
  SUPER_ADMIN: defaultNavItems,
  PROJECT_MANAGER: defaultNavItems,
  ARCHITECT: defaultNavItems,
  ENGINEER: engineerNavItems,
};

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { user } = useAuthStore();
  const role = user?.role as UserRole;

  const items = role === "CLIENT"
    ? clientNavItems
    : navItemsByRole[role] || defaultNavItems;

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-screen bg-primary text-primary-foreground transition-all duration-300 ease-out z-50",
        isOpen ? "w-64" : "w-20"
      )}
      style={{
        background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(213, 65%, 22%) 100%)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-20 px-6 border-b border-sidebar-border">
        {isOpen && (
          <div className="flex items-center gap-2">
            <Building2 size={28} className="text-accent" />
            <h1 className="text-lg font-bold">Civiora</h1>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          {isOpen ? (
            <ChevronLeft size={20} />
          ) : (
            <ChevronRight size={20} />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-8 overflow-y-auto">
        <ul className="space-y-2">
          {items.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <li key={item.name + item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-accent text-primary font-semibold"
                      : "text-primary-foreground hover:bg-sidebar-accent hover:text-primary-foreground"
                  )}
                  title={!isOpen ? item.name : undefined}
                >
                  {item.icon}
                  {isOpen && <span className="truncate">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-sidebar-border">
        {isOpen && (
          <p className="text-xs opacity-60 text-center">
            ConstructAI™ v1.0
          </p>
        )}
      </div>
    </div>
  );
};

