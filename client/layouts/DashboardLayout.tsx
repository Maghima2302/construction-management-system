import { useState } from "react";
import { LogOut, Search } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import AuraChatbot from "@/components/common/AuraChatbot";
import NotificationsPanel, { MOCK_NOTIFICATIONS } from "@/components/common/NotificationsPanel";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = MOCK_NOTIFICATIONS.filter(
    (n) => !n.isRead && n.targetRoles.includes(user?.role || ""),
  ).length;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar Component */}
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col ml-20 lg:ml-64 transition-all duration-300">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur lg:px-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search projects, clients, activities"
              className="w-full rounded-md border border-input bg-card py-2 pl-9 pr-3 text-sm focus:ring-2 focus:ring-accent/50 outline-none"
            />
          </div>
          <div className="ml-3 flex items-center gap-2">
            <button
              onClick={() => setNotifOpen(true)}
              className="relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-muted/50 transition-colors"
              aria-label="Notifications"
            >
              <BellIcon />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <Button variant="outline" size="sm" onClick={logout} className="gap-1 rounded-lg">
              <LogOut size={14} /> Logout
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* Notifications Hub */}
      <NotificationsPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />

      {/* Aura AI Chatbot */}
      <AuraChatbot context="dashboard" />
    </div>
  );
}

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

