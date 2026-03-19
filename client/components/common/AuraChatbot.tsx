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
}

// ─── Dummy conversation bank (contextual, realistic) ──────────────────────────

const DUMMY_CONVERSATIONS: Record<string, ChatMessage[]> = {
    dashboard: [
        {
            id: "a1",
            role: "aura",
            text: "👋 Hello! I'm **Aura**, your AI construction assistant. Based on today's portfolio data, I've identified **3 high-priority items** that need your attention.",
            timestamp: new Date(Date.now() - 1000 * 60 * 5),
            tag: "insight",
            suggestions: [
                "Show risk alerts",
                "Budget summary",
                "Upcoming milestones",
            ],
        },
    ],
    risk: [
        {
            id: "r1",
            role: "aura",
            text: "⚠️ **GreenField Phase II** has a delay probability of **42%** based on current progress velocity and upcoming weather patterns. I recommend reviewing buffer allocations for Week 17–18.",
            timestamp: new Date(Date.now() - 1000 * 60 * 3),
            tag: "alert",
            suggestions: [
                "Mitigation options",
                "Reallocate resources",
                "Notify PM",
            ],
        },
    ],
    planning: [
        {
            id: "p1",
            role: "aura",
            text: "📅 Critical path analysis complete. **Foundation → Structural Steel → MEP Rough-in** is your longest sequence at **47 working days**. I found a 4-day float in the glazing package.",
            timestamp: new Date(Date.now() - 1000 * 60 * 2),
            tag: "insight",
            suggestions: [
                "Optimize schedule",
                "View Gantt",
                "Labour breakdown",
            ],
        },
    ],
    default: [
        {
            id: "d1",
            role: "aura",
            text: "Hi! I'm **Aura** — your AI-powered construction intelligence assistant. Ask me anything about your projects, risk scores, materials, schedules, or compliance standards.",
            timestamp: new Date(Date.now() - 1000 * 60 * 1),
            tag: "tip",
            suggestions: [
                "Project health summary",
                "Top 3 risks today",
                "Material recommendations",
                "Budget status",
            ],
        },
    ],
};

// ─── Contextual Aura responses (dummy AI) ─────────────────────────────────────

const AURA_RESPONSES: string[] = [
    "Based on current site data, **Skyline Corporate Tower** is tracking at **78% completion** — ahead of schedule by 4 days. Material delivery for facade cladding is confirmed for next Tuesday.",
    "I've analysed the risk register. Your top mitigation priority is the **concrete pour window** for Block B Slab — weather forecast shows a 34% chance of rain during the planned window on Apr 24.",
    "Cost intelligence update: steel prices have increased **6.2% this week** in the regional market. Your approved BoQ for structural steel may need a change-order review within 72 hours.",
    "Workforce analytics flag: **18 workers** are approaching overtime thresholds this week. Redistributing 4 trades to the finishing crew could save approximately **$12,400** in overtime costs.",
    "Sustainability check: At current carbon emission rate, **EcoBuild Plant** will score **71/100** on the LEED pre-assessment — 4 points below the Silver threshold. I recommend switching to low-carbon concrete for the remaining pours.",
    "Blueprint Analyzer detected **3 potential MEP clashes** in the revised Level 4 drawing set. Coordination meeting recommended before issue-for-construction.",
    "Your Q2 cash-flow projection shows a **$2.1M gap** in May. Accelerating 2 milestone completions could trigger earlier payment. Shall I generate a cash-flow optimisation report?",
    "I found **2 supplier alternatives** for Type-C rebar that are 11% cheaper with equivalent lead times. Want me to compare specs and generate an RFQ draft?",
];

let responseIndex = 0;

function getNextResponse(): string {
    const response = AURA_RESPONSES[responseIndex % AURA_RESPONSES.length];
    responseIndex++;
    return response;
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
}: {
    message: ChatMessage;
    onLike: (id: string, liked: boolean) => void;
    onCopy: (id: string, text: string) => void;
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
    const { user } = useAuthStore();

    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>(() => {
        return DUMMY_CONVERSATIONS[context] ?? DUMMY_CONVERSATIONS.default;
    });
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
        async (text: string) => {
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

            // Simulate Aura typing (1.2–2s delay)
            await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

            const auraMsg: ChatMessage = {
                id: `a-${Date.now()}`,
                role: "aura",
                text: getNextResponse(),
                timestamp: new Date(),
                status: "delivered",
                tag: "answer",
                suggestions: ["Follow-up question", "Export report", "Schedule action"],
            };

            setIsTyping(false);
            setMessages((prev) => [...prev, auraMsg]);
        },
        [],
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
        setMessages(DUMMY_CONVERSATIONS[context] ?? DUMMY_CONVERSATIONS.default);
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
