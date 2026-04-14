import { useState, useRef, useEffect, useCallback } from "react";
import {
    Send,
    Bot,
    Sparkles,
    RefreshCw,
    HardHat,
    ClipboardList,
    Clock,
    Users,
    DollarSign,
    AlertTriangle,
    CheckCircle2,
    ArrowRight,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectPlan {
    is_project_request?: boolean;
    answer?: string;
    project_scope: {
        summary: string;
        key_deliverables: string[];
        exclusions: string[];
    };
    timeline: {
        estimated_duration: string;
        phases: {
            phase: string;
            duration: string;
            description: string;
        }[];
        critical_milestones: string[];
    };
    resource_allocation: {
        team: {
            role: string;
            count: number;
            responsibility: string;
        }[];
        equipment: string[];
        materials: string[];
    };
    budget_breakdown: {
        labour: string;
        materials: string;
        equipment: string;
        contingency: string;
        notes: string;
    };
    risks: {
        risk: string;
        severity: "Low" | "Medium" | "High";
        mitigation: string;
    }[];
    recommendations: string[];
    next_steps: string[];
}

// ─── Sub-components for Project Plan ──────────────────────────────────────────

function SectionTitle({ icon: Icon, title, colorClass }: { icon: any, title: string, colorClass: string }) {
    return (
        <div className="flex items-center gap-2 mb-4">
            <div className={cn("p-2 rounded-lg", colorClass)}>
                <Icon size={18} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        </div>
    );
}

function ProjectPlanView({ plan }: { plan: ProjectPlan }) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Project Scope */}
            <Card className="border-none shadow-md overflow-hidden bg-white">
                <div className="h-1.5 bg-blue-600 w-full" />
                <CardHeader>
                    <SectionTitle icon={HardHat} title="Project Scope" colorClass="bg-blue-600" />
                    <CardDescription className="text-slate-600 leading-relaxed italic">
                        "{plan.project_scope.summary}"
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-emerald-500" /> Key Deliverables
                        </h4>
                        <ul className="space-y-2">
                            {plan.project_scope.key_deliverables.map((item, i) => (
                                <li key={i} className="text-sm text-slate-700 flex gap-2">
                                    <span className="text-blue-500 font-bold">•</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {plan.project_scope.exclusions.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <AlertTriangle size={14} className="text-amber-500" /> Exclusions
                            </h4>
                            <ul className="space-y-2">
                                {plan.project_scope.exclusions.map((item, i) => (
                                    <li key={i} className="text-sm text-slate-600 flex gap-2">
                                        <span className="text-amber-500 font-bold">•</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Timeline & Phases */}
            <Card className="border-none shadow-md overflow-hidden bg-white">
                <div className="h-1.5 bg-emerald-600 w-full" />
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <SectionTitle icon={Clock} title="Timeline & Execution" colorClass="bg-emerald-600" />
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-100">
                            Est. {plan.timeline.estimated_duration}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="relative pl-4 border-l-2 border-slate-100 space-y-8">
                        {plan.timeline.phases.map((phase, i) => (
                            <div key={i} className="relative">
                                <div className="absolute -left-[25px] top-0 h-4 w-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm" />
                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <div className="flex justify-between items-center mb-1">
                                        <h5 className="font-bold text-slate-800 text-sm">{phase.phase}</h5>
                                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">{phase.duration}</span>
                                    </div>
                                    <p className="text-xs text-slate-600 leading-relaxed">{phase.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div>
                        <h4 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-3">Critical Milestones</h4>
                        <div className="flex flex-wrap gap-2">
                            {plan.timeline.critical_milestones.map((m, i) => (
                                <Badge key={i} variant="outline" className="text-slate-700 border-slate-200">
                                    {m}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Resources & Team */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-none shadow-md overflow-hidden bg-white">
                    <div className="h-1.5 bg-violet-600 w-full" />
                    <CardHeader>
                        <SectionTitle icon={Users} title="Resource Allocation" colorClass="bg-violet-600" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-3">Core Team</h4>
                            <div className="space-y-3">
                                {plan.resource_allocation.team.map((t, i) => (
                                    <div key={i} className="flex justify-between items-start text-sm">
                                        <div>
                                            <p className="font-bold text-slate-800">{t.role}</p>
                                            <p className="text-xs text-slate-500">{t.responsibility}</p>
                                        </div>
                                        <Badge className="bg-violet-50 text-violet-700 border-violet-100">x{t.count}</Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-2">Equipment</h4>
                                <ul className="text-xs text-slate-600 space-y-1">
                                    {plan.resource_allocation.equipment.map((e, i) => <li key={i}>• {e}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-2">Key Materials</h4>
                                <ul className="text-xs text-slate-600 space-y-1">
                                    {plan.resource_allocation.materials.map((m, i) => <li key={i}>• {m}</li>)}
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md overflow-hidden bg-white">
                    <div className="h-1.5 bg-amber-600 w-full" />
                    <CardHeader>
                        <SectionTitle icon={DollarSign} title="Budget Breakdown" colorClass="bg-amber-600" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                            {[
                                { label: "Labour Cost", value: plan.budget_breakdown.labour },
                                { label: "Material Cost", value: plan.budget_breakdown.materials },
                                { label: "Equipment Cost", value: plan.budget_breakdown.equipment },
                                { label: "Contingency", value: plan.budget_breakdown.contingency },
                            ].map((item, i) => (
                                <div key={i}>
                                    <p className="text-[11px] text-slate-500 uppercase font-medium tracking-tight mb-0.5">{item.label}</p>
                                    <p className="text-lg font-bold text-slate-800">{item.value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <p className="text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wider">Financial Notes</p>
                            <p className="text-xs text-slate-600 leading-relaxed italic">{plan.budget_breakdown.notes}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Risk Assessment */}
            <Card className="border-none shadow-md overflow-hidden bg-white">
                <div className="h-1.5 bg-red-600 w-full" />
                <CardHeader>
                    <SectionTitle icon={AlertTriangle} title="Risk Assessment" colorClass="bg-red-600" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {plan.risks.map((r, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <div className={cn(
                                    "shrink-0 h-2 w-2 rounded-full mt-2",
                                    r.severity === "High" ? "bg-red-500" : r.severity === "Medium" ? "bg-amber-500" : "bg-emerald-500"
                                )} />
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-slate-800 text-sm">{r.risk}</p>
                                        <Badge className={cn(
                                            "text-[9px] uppercase font-bold",
                                            r.severity === "High" ? "bg-red-50 text-red-700 border-red-100" : 
                                            r.severity === "Medium" ? "bg-amber-50 text-amber-700 border-amber-100" : 
                                            "bg-emerald-50 text-emerald-700 border-emerald-100"
                                        )} variant="outline">
                                            {r.severity} Risk
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-slate-600"><span className="font-semibold text-slate-800">Mitigation:</span> {r.mitigation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recommendations & Next Steps */}
            <div className="grid md:grid-cols-2 gap-6 pb-10">
                <Card className="border-none shadow-md bg-white">
                    <CardHeader>
                        <SectionTitle icon={Sparkles} title="Expert Recommendations" colorClass="bg-[hsl(25,99%,55%)]" />
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {plan.recommendations.map((item, i) => (
                                <li key={i} className="text-sm text-slate-700 flex gap-3">
                                    <div className="shrink-0 h-5 w-5 rounded-full bg-orange-50 flex items-center justify-center text-[10px] font-bold text-orange-600 border border-orange-100">{i + 1}</div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-slate-900 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <ArrowRight size={120} className="text-white rotate-[-30deg]" />
                    </div>
                    <CardHeader>
                        <SectionTitle icon={ClipboardList} title="Next Steps" colorClass="bg-white/20" />
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {plan.next_steps.map((item, i) => (
                                <li key={i} className="text-sm text-slate-300 flex gap-3 items-start group">
                                    <div className="mt-1 h-3 w-3 rounded-sm border border-slate-700 bg-slate-800 flex items-center justify-center shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <Button className="w-full mt-6 bg-white text-slate-900 hover:bg-white/90 gap-2 font-bold py-6">
                            Create Project from Plan <ArrowRight size={16} />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function EngineerChatPage() {
    const { token } = useAuthStore();
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [projectPlan, setProjectPlan] = useState<ProjectPlan | null>(null);
    const [error, setError] = useState<string | null>(null);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (projectPlan || error) {
            scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [projectPlan, error]);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setProjectPlan(null);

        try {
            const baseUrl = import.meta.env.VITE_API_URL || "";
            const response = await fetch(`${baseUrl}/engineer/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                    prompt: inputValue.trim(),
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to generate project plan");
            }

            if (result.data && result.data.is_project_request === false) {
                setError(result.data.answer || "Please describe a construction project. E.g., 'Build a 3-story residential apartment in Chennai...'");
                return;
            }

            setProjectPlan(result.data);
        } catch (err: any) {
            console.error("Engineer chat error:", err);
            setError(err.message || "An unexpected error occurred while processing your request.");
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setProjectPlan(null);
        setError(null);
        setInputValue("");
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 min-h-[calc(100vh-120px)] flex flex-col">
            {/* Header section */}
            <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-gradient-to-br from-[hsl(213,65%,18%)] to-[hsl(25,99%,55%)] shadow-xl animate-bounce">
                    <Bot size={32} className="text-white" />
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(213,65%,18%)] to-[hsl(25,99%,55%)]">Project Chat</span></h1>
                <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
                    Describe your construction project requirements and Aura will generate a detailed project plan, timeline, and resource allocation.
                </p>
            </div>

            {/* Input Section */}
            {!projectPlan && (
                <Card className="border-none shadow-2xl overflow-hidden bg-white mb-8">
                    <CardHeader className="bg-slate-50 border-b border-slate-100">
                        <CardTitle className="text-slate-800 flex items-center gap-2">
                            <Sparkles size={20} className="text-[hsl(25,99%,55%)]" /> Describe your requirements
                        </CardTitle>
                        <CardDescription>
                            Include details like location, building type, floors, budget, and specific constraints.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Example: Build a 3-story residential apartment in Chennai for 12 families, budget ₹1.2 crore, including solar panels and earthquake resistant features..."
                                className="w-full min-h-[160px] p-4 text-slate-800 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[hsl(25,99%,55%)] focus:border-transparent outline-none transition-all resize-none shadow-inner"
                                disabled={isLoading}
                            />
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-slate-400 italic">
                                    AI processing can take 30–120 seconds for complex projects.
                                </p>
                                <Button 
                                    type="submit" 
                                    disabled={!inputValue.trim() || isLoading}
                                    className="bg-gradient-to-r from-[hsl(213,65%,18%)] to-[hsl(25,99%,55%)] px-8 py-6 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={18} className="mr-2 animate-spin" /> Analyzing Requirements...
                                        </>
                                    ) : (
                                        <>
                                            Generate Project Plan <Send size={18} className="ml-2" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Results Section */}
            {isLoading && !projectPlan && (
                <div className="flex-1 flex flex-col items-center justify-center py-20 animate-pulse">
                    <div className="relative mb-8">
                        <div className="h-24 w-24 rounded-full border-4 border-slate-100 border-t-[hsl(25,99%,55%)] animate-spin" />
                        <Bot size={40} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Aura is thinking...</h2>
                    <p className="text-slate-500 mt-2">Developing scope, estimating budgets, and assessing risks.</p>
                </div>
            )}

            {error && (
                <div className="p-6 rounded-2xl bg-red-50 border border-red-100 text-red-700 mb-8 animate-in slide-in-from-top-4">
                    <div className="flex items-center gap-3 mb-2 font-bold">
                        <AlertTriangle size={20} /> Request Failed
                    </div>
                    <p className="text-sm">{error}</p>
                    <Button variant="outline" onClick={handleSubmit} className="mt-4 border-red-200 text-red-700 hover:bg-red-100">
                        Try Again
                    </Button>
                </div>
            )}

            {projectPlan && (
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 py-1.5 px-4 rounded-full text-sm font-bold flex items-center gap-2">
                            <CheckCircle2 size={16} /> Planning Complete
                        </Badge>
                        <Button variant="ghost" onClick={reset} className="text-slate-500 hover:text-slate-800 gap-2">
                            <RefreshCw size={14} /> Start New Plan
                        </Button>
                    </div>
                    <ProjectPlanView plan={projectPlan} />
                </div>
            )}

            <div ref={scrollRef} />
        </div>
    );
}
