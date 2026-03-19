import { useState } from "react";
import { X, Bell, CheckCheck, ArrowRight, AlertTriangle, Shield, Clock, Bot, FileCheck, FileWarning, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_NOTIFICATIONS, NotificationItem, NotificationSeverity } from "@/constants/mockNotifications";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// ─── Config ───────────────────────────────────────────────────────────────────

const SEVERITY_STYLES: Record<NotificationSeverity, { border: string; badge: string; dot: string }> = {
    Critical: { border: "border-l-red-500", badge: "bg-red-100 text-red-700", dot: "bg-red-500" },
    Warning: { border: "border-l-amber-500", badge: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
    Info: { border: "border-l-blue-500", badge: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
};

const TYPE_ICONS: Record<string, typeof Bell> = {
    safety: Shield,
    cost: TrendingUp,
    schedule: Clock,
    ai: Bot,
    approval: FileCheck,
    blueprint: FileWarning,
    risk: AlertTriangle,
    compliance: FileCheck,
};

function NotifCard({ notif }: { notif: NotificationItem }) {
    const s = SEVERITY_STYLES[notif.severity];
    const Icon = TYPE_ICONS[notif.type] || Bell;
    const timeAgo = (() => {
        const diff = Date.now() - new Date(notif.timestamp).getTime();
        const hrs = Math.floor(diff / 3600000);
        if (hrs < 1) return `${Math.floor(diff / 60000)} min ago`;
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    })();

    return (
        <div className={cn(
            "flex gap-3 p-3 rounded-xl border-l-2 transition-colors",
            notif.isRead ? "bg-slate-50/50 opacity-70" : "bg-white",
            s.border
        )}>
            <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                notif.severity === "Critical" ? "bg-red-50" : notif.severity === "Warning" ? "bg-amber-50" : "bg-blue-50"
            )}>
                <Icon size={14} className={notif.severity === "Critical" ? "text-red-600" : notif.severity === "Warning" ? "text-amber-600" : "text-blue-600"} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-xs font-semibold leading-tight", !notif.isRead && "text-foreground")}>{notif.title}</p>
                    <span className="text-[10px] text-muted-foreground shrink-0">{timeAgo}</span>
                </div>
                {notif.project && <p className="text-[10px] text-[hsl(25,99%,55%)] font-medium mt-0.5">{notif.project}</p>}
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{notif.message}</p>
                <Link
                    to={notif.actionRoute}
                    className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-medium text-[hsl(213,65%,40%)] hover:text-[hsl(213,65%,18%)] transition-colors"
                >
                    {notif.actionLabel} <ArrowRight size={9} />
                </Link>
            </div>
            {!notif.isRead && <div className={cn("h-2 w-2 rounded-full mt-1.5 shrink-0", s.dot)} />}
        </div>
    );
}

// ─── Main Panel ────────────────────────────────────────────────────────────────

interface NotificationsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
    const { user } = useAuthStore();
    const [filter, setFilter] = useState<"All" | "Unread" | "Critical">("All");

    const userNotifs = MOCK_NOTIFICATIONS.filter((n) => n.targetRoles.includes(user?.role || ""));
    const filtered = userNotifs.filter((n) => {
        if (filter === "Unread") return !n.isRead;
        if (filter === "Critical") return n.severity === "Critical";
        return true;
    });
    const unreadCount = userNotifs.filter((n) => !n.isRead).length;
    const criticals = userNotifs.filter((n) => n.severity === "Critical");
    const warnings = userNotifs.filter((n) => n.severity === "Warning");
    const infos = userNotifs.filter((n) => n.severity === "Info");

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={onClose} />

            {/* Panel */}
            <div className="fixed inset-y-0 right-0 z-50 flex flex-col w-full max-w-sm bg-white shadow-2xl border-l border-slate-200 animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                        <Bell size={18} className="text-[hsl(213,65%,18%)]" />
                        <h2 className="font-semibold text-foreground">Notifications</h2>
                        {unreadCount > 0 && (
                            <Badge className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 h-5">
                                {unreadCount}
                            </Badge>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="text-xs gap-1 h-7">
                            <CheckCheck size={12} /> Mark all read
                        </Button>
                        <button onClick={onClose} className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
                            <X size={15} />
                        </button>
                    </div>
                </div>

                {/* Severity strip */}
                <div className="flex gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-1.5 text-[11px] text-red-600 font-medium">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-[10px] font-bold">{criticals.length}</div>
                        Critical
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-600 font-medium">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-[10px] font-bold">{warnings.length}</div>
                        Warning
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-blue-600 font-medium">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold">{infos.length}</div>
                        Info
                    </div>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-1 px-4 py-2 border-b border-slate-100">
                    {(["All", "Unread", "Critical"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                                filter === f ? "bg-[hsl(213,65%,18%)] text-white" : "text-muted-foreground hover:bg-slate-100"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Notification list */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                    {/* Critical section */}
                    {filtered.filter(n => n.severity === "Critical").length > 0 && (
                        <>
                            <p className="text-[10px] font-semibold text-red-600 uppercase tracking-wider px-1">🔴 Critical</p>
                            {filtered.filter(n => n.severity === "Critical").map(n => <NotifCard key={n.id} notif={n} />)}
                        </>
                    )}
                    {/* Warning section */}
                    {filtered.filter(n => n.severity === "Warning").length > 0 && (
                        <>
                            <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider px-1 mt-3">🟡 Warning</p>
                            {filtered.filter(n => n.severity === "Warning").map(n => <NotifCard key={n.id} notif={n} />)}
                        </>
                    )}
                    {/* Info section */}
                    {filtered.filter(n => n.severity === "Info").length > 0 && (
                        <>
                            <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider px-1 mt-3">🔵 Info</p>
                            {filtered.filter(n => n.severity === "Info").map(n => <NotifCard key={n.id} notif={n} />)}
                        </>
                    )}

                    {filtered.length === 0 && (
                        <div className="py-12 text-center text-muted-foreground">
                            <Bell size={40} className="mx-auto mb-3 opacity-20" />
                            <p className="text-sm font-medium">All caught up!</p>
                            <p className="text-xs mt-1">No notifications to show</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

// Export unread count for the badge
export { MOCK_NOTIFICATIONS };
