import { useState, useRef, useEffect, useCallback } from "react";
import {
    X,
    Send,
    Minimize2,
    Maximize2,
    Bot,
    Sparkles,
    RefreshCw,
    ThumbsUp,
    ThumbsDown,
    Copy,
    ChevronDown,
    Mic,
    Paperclip,
    MoreHorizontal,
    Zap,
    AlertTriangle,
    TrendingUp,
    HardHat,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
    id: string;
    role: "aura" | "user";
    text: string;
    timestamp: Date;
    status?: "typing" | "sent" | "delivered";
    liked?: boolean | null;
    copied?: boolean;
    suggestions?: string[];
    tag?: "insight" | "alert" | "tip" | "answer";
    projects?: any[];
}


// ─── Quick action prompts per context ────────────────────────────────────────

const QUICK_PROMPTS = [
    { icon: Zap, label: "Project health", text: "Give me a health summary of all active projects" },
    { icon: AlertTriangle, label: "Top risks", text: "What are the top 3 risks I should address today?" },
    { icon: TrendingUp, label: "Budget status", text: "Show me budget variance across all projects" },
    { icon: HardHat, label: "Site safety", text: "Any safety incidents or PPE alerts this week?" },
];

// ─── Formatted message text (bold markdown support) ───────────────────────────

function FormattedText({ text }: { text: string }) {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return (
        <span>
            {parts.map((part, i) =>
                i % 2 === 1 ? (
                    <strong key={i} className="font-semibold">
                        {part}
                    </strong>
                ) : (
                    <span key={i}>{part}</span>
                ),
            )}
        </span>
    );
}

// ─── Tag badge ────────────────────────────────────────────────────────────────

function TagBadge({ tag }: { tag?: ChatMessage["tag"] }) {
    if (!tag) return null;
    const map = {
        insight: { label: "Insight", cls: "bg-blue-100 text-blue-700" },
        alert: { label: "Alert", cls: "bg-amber-100 text-amber-700" },
        tip: { label: "Tip", cls: "bg-emerald-100 text-emerald-700" },
        answer: { label: "Answer", cls: "bg-violet-100 text-violet-700" },
    };
    const conf = map[tag];
    return (
        <span
            className={cn(
                "inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide mr-2",
                conf.cls,
            )}
        >
            {conf.label}
        </span>
    );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingDots() {
    return (
        <div className="flex items-center gap-1 px-1 py-2">
            {[0, 1, 2].map((i) => (
                <span
                    key={i}
                    className="h-2 w-2 rounded-full bg-primary/60 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                />
            ))}
        </div>
    );
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function MessageBubble({
    message,
    onLike,
    onCopy,
    onSelectProject,
}: {
    message: ChatMessage;
    onLike: (id: string, liked: boolean) => void;
    onCopy: (id: string, text: string) => void;
    onSelectProject?: (projectId: string, projectName: string) => void;
}) {
    const isAura = message.role === "aura";

    return (
        <div
            className={cn(
                "flex gap-2 group",
                isAura ? "flex-row" : "flex-row-reverse",
            )}
        >
            {/* Avatar */}
            {isAura && (
                <div className="shrink-0 mt-1">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[hsl(213,65%,30%)] to-[hsl(25,99%,55%)] flex items-center justify-center shadow-md">
                        <Sparkles size={12} className="text-white" />
                    </div>
                </div>
            )}

            <div className={cn("flex flex-col gap-1 max-w-[85%]", isAura ? "items-start" : "items-end")}>
                {/* Tag */}
                {isAura && message.tag && <TagBadge tag={message.tag} />}

                {/* Bubble */}
                <div
                    className={cn(
                        "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                        isAura
                            ? "bg-white border border-slate-100 text-slate-800 rounded-tl-sm"
                            : "bg-gradient-to-br from-[hsl(213,65%,18%)] to-[hsl(213,65%,28%)] text-white rounded-tr-sm",
                    )}
                >
                    {message.status === "typing" ? (
                        <TypingDots />
                    ) : (
                        <FormattedText text={message.text} />
                    )}
                </div>

                {/* Suggestions */}
                {isAura && message.suggestions && message.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                        {message.suggestions.map((s) => (
                            <button
                                key={s}
                                className="text-xs bg-slate-100 hover:bg-[hsl(25,99%,55%)] hover:text-white text-slate-600 rounded-full px-2.5 py-1 transition-all duration-200 border border-slate-200 hover:border-transparent"
                                onClick={() => { }}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}

                {/* Projects */}
                {isAura && message.projects && message.projects.length > 0 && (
                    <div className="flex flex-col gap-2 mt-2 w-full max-w-full">
                        {message.projects.map((proj) => (
                            <button
                                key={proj.project_id}
                                onClick={() => onSelectProject && onSelectProject(proj.project_id, proj.project_name)}
                                className="flex flex-col items-start p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-white hover:border-[hsl(213,65%,40%)] hover:shadow-sm transition-all text-left w-full group"
                            >
                                <span className="font-semibold text-slate-800 text-[13px] group-hover:text-[hsl(213,65%,35%)]">{proj.project_name}</span>
                                <span className="text-[10px] text-slate-500 mt-0.5 tracking-wide uppercase font-medium">{proj.status} &bull; {proj.location}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Meta row */}
                <div
                    className={cn(
                        "flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity",
                        isAura ? "flex-row" : "flex-row-reverse",
                    )}
                >
                    <span className="text-[10px] text-slate-400">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>

                    {isAura && (
                        <div className="flex items-center gap-1">
                            <button
                                title="Like"
                                onClick={() => onLike(message.id, true)}
                                className={cn(
                                    "p-0.5 rounded hover:text-emerald-500 transition-colors",
                                    message.liked === true ? "text-emerald-500" : "text-slate-400",
                                )}
                            >
                                <ThumbsUp size={11} />
                            </button>
                            <button
                                title="Dislike"
                                onClick={() => onLike(message.id, false)}
                                className={cn(
                                    "p-0.5 rounded hover:text-red-400 transition-colors",
                                    message.liked === false ? "text-red-400" : "text-slate-400",
                                )}
                            >
                                <ThumbsDown size={11} />
                            </button>
                            <button
                                title="Copy"
                                onClick={() => onCopy(message.id, message.text)}
                                className={cn(
                                    "p-0.5 rounded hover:text-[hsl(25,99%,55%)] transition-colors",
                                    message.copied ? "text-[hsl(25,99%,55%)]" : "text-slate-400",
                                )}
                            >
                                {message.copied ? <RefreshCw size={11} /> : <Copy size={11} />}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Main Aura Chatbot Component ──────────────────────────────────────────────

interface AuraChatbotProps {
    context?: "dashboard" | "risk" | "planning" | "default";
}

export default function AuraChatbot({ context = "default" }: AuraChatbotProps) {
    const { user, token } = useAuthStore();

    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const defaultWelcomeMessage: ChatMessage = {
        id: "welcome-msg",
        role: "aura",
        text: "Hi! I'm **Aura** — your AI-powered construction intelligence assistant. Ask me anything about your projects, risk scores, materials, schedules, or compliance standards.",
        timestamp: new Date(),
        tag: "tip",
        suggestions: [
            "Project health summary",
            "Top 3 risks today",
            "Material recommendations",
            "Budget status",
        ],
    };

    const [messages, setMessages] = useState<ChatMessage[]>([defaultWelcomeMessage]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [unreadCount, setUnreadCount] = useState(1);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setUnreadCount(0);
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [isOpen, messages, scrollToBottom]);

    const handleOpen = () => {
        setIsOpen(true);
        setUnreadCount(0);
    };

    const sendMessage = useCallback(
        async (text: string, projectId: string | null = null) => {
            if (!text.trim()) return;

            const userMsg: ChatMessage = {
                id: `u-${Date.now()}`,
                role: "user",
                text: text.trim(),
                timestamp: new Date(),
                status: "sent",
            };

            setMessages((prev) => [...prev, userMsg]);
            setInputValue("");
            setIsTyping(true);

            try {
                const baseUrl = import.meta.env.VITE_API_URL || "";
                const isEngineerChat = user?.role === "SUPER_ADMIN" || user?.role === "ENGINEER";
                const endpoint = isEngineerChat ? "/engineer/chat" : "/client/chat";
                
                const response = await fetch(`${baseUrl}${endpoint}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                    },
                    body: isEngineerChat 
                        ? JSON.stringify({ prompt: text.trim() })
                        : JSON.stringify({
                            message: text.trim(),
                            selected_project_id: projectId,
                        }),
                });

                if (!response.ok) {
                    throw new Error("Failed to communicate with Aura");
                }

                const dataResult = await response.json();
                const responseData = dataResult.data;

                let finalAnswer = "";
                let suggestions: string[] = [];
                let projects: any[] = [];
                let tag: ChatMessage["tag"] = "answer";

                if (isEngineerChat && responseData.is_project_request && responseData.project_scope) {
                    // Handle complex Engineer Project Plan response
                    const plan = responseData;
                    finalAnswer = `**Project Plan Generated**\n\n**Scope:** ${plan.project_scope.summary}\n\n**Timeline:** ${plan.timeline.estimated_duration}\n\n**Budget:** Labour (${plan.budget_breakdown.labour}), Materials (${plan.budget_breakdown.materials})\n\n**Top Risks:**\n${plan.risks.slice(0, 2).map((r: any) => `- ${r.risk} (${r.severity})`).join("\n")}`;
                    tag = "insight";
                    suggestions = ["View full plan", "Export to PDF", "Resource details"];
                } else {
                    // Original client chat response handling
                    finalAnswer = responseData.answer || "";
                    if (responseData.project_insights) {
                        finalAnswer += `\n\n**Activity Insight:**\n${responseData.project_insights}`;
                    }
                    if (responseData.risks && responseData.risks.length > 0) {
                        finalAnswer += `\n\n**Risks Detected:**\n- ${responseData.risks.join("\n- ")}`;
                    }
                    if (!finalAnswer && responseData.awaiting_selection) {
                        finalAnswer = "I found multiple projects. Which one would you like to know about?";
                    }
                    suggestions = responseData.materials?.slice(0, 3) || [];
                    projects = responseData.projects || [];
                    tag = responseData.project_insights ? "insight" : (responseData.risks?.length ? "alert" : "answer");
                }

                const auraMsg: ChatMessage = {
                    id: `a-${Date.now()}`,
                    role: "aura",
                    text: finalAnswer,
                    timestamp: new Date(),
                    status: "delivered",
                    tag,
                    suggestions,
                    projects,
                };

                setMessages((prev) => [...prev, auraMsg]);
            } catch (error) {
                console.error("Chat error:", error);
                
                const errorMsg: ChatMessage = {
                    id: `e-${Date.now()}`,
                    role: "aura",
                    text: "I encountered an error trying to process your request. Please ensure the backend is running and try again.",
                    timestamp: new Date(),
                    status: "delivered",
                    tag: "alert",
                };
                
                setMessages((prev) => [...prev, errorMsg]);
            } finally {
                setIsTyping(false);
            }
        },
        [token],
    );

    const handleSend = () => sendMessage(inputValue);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleLike = (id: string, liked: boolean) => {
        setMessages((prev) =>
            prev.map((m) =>
                m.id === id ? { ...m, liked: m.liked === liked ? null : liked } : m,
            ),
        );
    };

    const handleCopy = (id: string, text: string) => {
        navigator.clipboard.writeText(text).catch(() => { });
        setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, copied: true } : m)),
        );
        setTimeout(
            () =>
                setMessages((prev) =>
                    prev.map((m) => (m.id === id ? { ...m, copied: false } : m)),
                ),
            2000,
        );
    };

    const handleClear = () => {
        setMessages([{ ...defaultWelcomeMessage, id: `welcome-msg-${Date.now()}` }]);
    };

    // ── FAB (floating action button) ──────────────────────────────────────────

    if (!isOpen) {
        return (
            <button
                id="aura-chatbot-fab"
                onClick={handleOpen}
                className="fixed bottom-6 right-6 z-50 group"
                aria-label="Open Aura AI assistant"
            >
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full bg-[hsl(25,99%,55%)] animate-ping opacity-20" />

                <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-[hsl(213,65%,18%)] to-[hsl(213,65%,32%)] shadow-2xl flex items-center justify-center border-2 border-[hsl(25,99%,55%)] transition-transform duration-200 group-hover:scale-110">
                    <Sparkles size={22} className="text-[hsl(25,99%,55%)]" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[hsl(25,99%,55%)] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                            {unreadCount}
                        </span>
                    )}
                </div>

                {/* Tooltip label */}
                <span className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-[hsl(213,65%,15%)] text-white text-xs font-medium px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
                    Ask Aura ✨
                </span>
            </button>
        );
    }

    // ── Chat window ───────────────────────────────────────────────────────────

    const windowCls = cn(
        "fixed z-50 flex flex-col rounded-2xl shadow-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300",
        isExpanded
            ? "bottom-4 right-4 w-[min(680px,calc(100vw-2rem))] h-[min(780px,calc(100vh-2rem))]"
            : "bottom-6 right-6 w-[min(400px,calc(100vw-1.5rem))] h-[min(600px,calc(100vh-2rem))]",
    );

    return (
        <div id="aura-chatbot-window" className={windowCls}>
            {/* ── Header ──────────────────────────────────────────────────────── */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[hsl(213,65%,18%)] to-[hsl(213,65%,28%)] text-white shrink-0">
                {/* Avatar */}
                <div className="relative shrink-0">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[hsl(25,99%,55%)] to-[hsl(35,99%,60%)] flex items-center justify-center shadow-lg">
                        <Sparkles size={17} className="text-white" />
                    </div>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[hsl(213,65%,18%)]" />
                </div>

                {/* Name block */}
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-none">Aura</p>
                    <p className="text-[11px] text-white/70 mt-0.5 truncate">
                        AI Construction Assistant · Online
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    <button
                        title="Clear conversation"
                        onClick={handleClear}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <RefreshCw size={14} />
                    </button>
                    <button
                        title={isExpanded ? "Collapse" : "Expand"}
                        onClick={() => setIsExpanded((v) => !v)}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>
                    <button
                        title="Close"
                        onClick={() => setIsOpen(false)}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* ── Context banner ────────────────────────────────────────────────── */}
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border-b border-slate-100 shrink-0">
                <Bot size={12} className="text-slate-400" />
                <p className="text-[11px] text-slate-500 truncate">
                    {user
                        ? `Hi ${user.name.split(" ")[0]} · Aura is aware of your ${context} context`
                        : "Aura AI · Construction Intelligence · powered by Civiora"}
                </p>
            </div>

            {/* ── Messages area ─────────────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50/50">
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        onLike={handleLike}
                        onCopy={handleCopy}
                        onSelectProject={(id, name) => sendMessage(name.toLowerCase(), id)}
                    />
                ))}

                {/* Typing indicator */}
                {isTyping && (
                    <div className="flex gap-2 items-start">
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[hsl(213,65%,30%)] to-[hsl(25,99%,55%)] flex items-center justify-center shadow-md shrink-0 mt-1">
                            <Sparkles size={12} className="text-white" />
                        </div>
                        <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm">
                            <TypingDots />
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* ── Quick prompts (only when few messages) ────────────────────────── */}
            {messages.length <= 2 && (
                <div className="px-3 pb-2 pt-1 border-t border-slate-100 bg-white shrink-0">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mb-2 px-1">
                        Quick actions
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                        {QUICK_PROMPTS.map(({ icon: Icon, label, text }) => (
                            <button
                                key={label}
                                onClick={() => sendMessage(text)}
                                className="flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs text-slate-600 bg-slate-50 hover:bg-[hsl(213,65%,18%)] hover:text-white border border-slate-200 hover:border-transparent transition-all duration-200 text-left"
                            >
                                <Icon size={12} className="shrink-0" />
                                <span className="truncate">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Input area ────────────────────────────────────────────────────── */}
            <div className="flex items-end gap-2 px-3 py-3 border-t border-slate-100 bg-white shrink-0">
                <div className="flex-1 flex items-end gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-[hsl(25,99%,55%)] focus-within:ring-2 focus-within:ring-[hsl(25,99%,55%)]/20 transition-all">
                    <button
                        title="Attach file"
                        className="text-slate-400 hover:text-[hsl(25,99%,55%)] transition-colors shrink-0 mb-0.5"
                    >
                        <Paperclip size={15} />
                    </button>
                    <input
                        ref={inputRef}
                        type="text"
                        id="aura-chat-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask Aura anything…"
                        className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none resize-none min-w-0"
                        disabled={isTyping}
                        autoComplete="off"
                    />
                    <button
                        title="Voice input"
                        className="text-slate-400 hover:text-[hsl(25,99%,55%)] transition-colors shrink-0 mb-0.5"
                    >
                        <Mic size={15} />
                    </button>
                </div>

                <button
                    id="aura-send-btn"
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    className={cn(
                        "h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0",
                        inputValue.trim() && !isTyping
                            ? "bg-gradient-to-br from-[hsl(213,65%,18%)] to-[hsl(25,99%,55%)] text-white shadow-md hover:shadow-lg hover:scale-105"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed",
                    )}
                >
                    <Send size={15} />
                </button>
            </div>

            {/* ── Footer ────────────────────────────────────────────────────────── */}
            <div className="flex items-center justify-center gap-1 py-1.5 bg-white border-t border-slate-100 shrink-0">
                <Sparkles size={9} className="text-[hsl(25,99%,55%)]" />
                <p className="text-[10px] text-slate-400 font-medium">
                    Powered by Aura · Civiora AI · Responses may vary
                </p>
            </div>
        </div>
    );
}
