import { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Bot, 
  Send, 
  HardHat, 
  ClipboardList, 
  Clock, 
  Users, 
  Wrench, 
  Wallet, 
  AlertTriangle, 
  Lightbulb, 
  ListChecks,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Construction
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { engineerChatService, EngineerChatResponse } from "@/services/engineerChatService";
import { cn } from "@/lib/utils";

export default function EngineerChatPage() {
  const { token, user } = useAuthStore();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<EngineerChatResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await engineerChatService.sendMessage(prompt, token!);
      setResponse(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (response) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [response]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent flex items-center gap-3">
            <HardHat className="text-primary" />
            AI Engineer Workspace
          </h1>
          <p className="text-muted-foreground mt-1">
            Generate comprehensive construction project plans with intelligent resource and risk analysis.
          </p>
        </div>
        <Badge variant="outline" className="h-fit py-1.5 px-3 border-blue-200 bg-blue-50 text-blue-700 font-semibold gap-1.5">
          <Bot size={14} /> Engineer AI v2.4
        </Badge>
      </div>

      {/* Input Section */}
      <Card className="border-2 border-primary/10 shadow-xl shadow-primary/5 overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 border-b border-primary/10">
          <div className="flex items-center gap-2 text-primary font-semibold mb-2">
            <Sparkles size={18} />
            <span>Project Requirement Input</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Describe your project in detail (location, budget, scope, duration) to get a structured execution plan.
          </p>
        </div>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="e.g., Build a 3-story residential apartment in Chennai for 12 families, budget ₹1.2 crore with 10 months timeline..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-[120px] text-base resize-none border-primary/20 focus-visible:ring-primary/30 p-4"
                disabled={isLoading}
              />
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded border">
                Shift + Enter for new line
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500 flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} /> ~60s processing
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={12} /> Structured Output
                </span>
              </div>
              <Button 
                type="submit" 
                size="lg"
                disabled={!prompt.trim() || isLoading}
                className="gap-2 px-8 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={18} />
                    </motion.div>
                    Aura is thinking...
                  </>
                ) : (
                  <>
                    Generate Project Plan
                    <Send size={18} />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="bg-red-50 border-red-200 text-red-700">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertTriangle className="shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[85%]" />
            </div>
          </Card>
          <div className="grid md:grid-cols-2 gap-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      )}

      {/* AI Response */}
      <div ref={scrollRef}>
        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Scope Summary */}
              <Card className="border-l-4 border-l-primary shadow-lg">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ClipboardList size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Project Scope & Summary</CardTitle>
                    <CardDescription>Generated construction overview</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-slate-50 p-4 rounded-xl text-slate-700 leading-relaxed border border-slate-100">
                    {response.data.project_scope.summary}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm flex items-center gap-2 text-emerald-600">
                        <ListChecks size={16} /> Key Deliverables
                      </h3>
                      <ul className="space-y-2">
                        {response.data.project_scope.key_deliverables.map((item, id) => (
                          <li key={id} className="text-sm flex items-start gap-2">
                            <ChevronRight size={14} className="mt-0.5 text-primary shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm flex items-center gap-2 text-red-600">
                        <AlertTriangle size={16} /> Exclusions
                      </h3>
                      <ul className="space-y-2">
                        {response.data.project_scope.exclusions.map((item, id) => (
                          <li key={id} className="text-sm flex items-start gap-2 italic text-slate-500">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Timeline */}
                <Card className="lg:col-span-2 shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                        <Clock size={20} />
                      </div>
                      <div>
                        <CardTitle>Project Timeline</CardTitle>
                        <CardDescription>Estimated execution phases</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-amber-600 font-bold">{response.data.timeline.estimated_duration}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative pl-6 border-l-2 border-amber-200 ml-3 space-y-8 py-2">
                      {response.data.timeline.phases.map((phase, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-amber-600 border-4 border-white shadow-sm" />
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-slate-800">{phase.phase}</h4>
                              <Badge variant="outline" className="text-amber-700 bg-amber-50 border-amber-200">{phase.duration}</Badge>
                            </div>
                            <p className="text-sm text-slate-600">{phase.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm flex items-center gap-2 text-amber-700">
                        <Calendar size={16} /> Critical Milestones
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {response.data.timeline.critical_milestones.map((m, i) => (
                          <Badge key={i} variant="secondary" className="bg-white border text-xs py-1">
                            {m}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Team & Resources */}
                <Card className="shadow-md">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Users size={20} />
                    </div>
                    <CardTitle>Resource Allocation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Management Team</h4>
                      {response.data.resource_allocation.team.map((t, i) => (
                        <div key={i} className="flex justify-between items-start border-b border-dashed border-slate-200 pb-3 last:border-0 last:pb-0">
                          <div>
                            <p className="font-bold text-sm text-slate-800">{t.role}</p>
                            <p className="text-xs text-slate-500">{t.responsibility}</p>
                          </div>
                          <Badge variant="outline" className="shrink-0">{t.count}x</Badge>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        <Wrench size={12} /> Equipment
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {response.data.resource_allocation.equipment.map((e, i) => (
                          <Badge key={i} variant="outline" className="bg-slate-50 text-[10px] uppercase font-bold tracking-tight">{e}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        <Construction size={12} /> Materials
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {response.data.resource_allocation.materials.map((m, i) => (
                          <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 text-[10px] uppercase font-bold tracking-tight">{m}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Budget */}
                <Card className="shadow-md border-emerald-100">
                  <CardHeader className="bg-emerald-50/50 flex flex-row items-center justify-between border-b">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                        <Wallet size={20} />
                      </div>
                      <div>
                        <CardTitle className="text-emerald-900">Budget Breakdown</CardTitle>
                        <CardDescription>Estimated cost allocation</CardDescription>
                      </div>
                    </div>
                    <TrendingUp className="text-emerald-600" />
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-emerald-100">
                      <div className="flex justify-between p-4 px-6 hover:bg-emerald-50/30 transition-colors">
                        <span className="text-sm font-medium text-slate-600">Labour Costs</span>
                        <span className="font-bold text-emerald-700">{response.data.budget_breakdown.labour}</span>
                      </div>
                      <div className="flex justify-between p-4 px-6 hover:bg-emerald-50/30 transition-colors">
                        <span className="text-sm font-medium text-slate-600">Materials & Procurement</span>
                        <span className="font-bold text-emerald-700">{response.data.budget_breakdown.materials}</span>
                      </div>
                      <div className="flex justify-between p-4 px-6 hover:bg-emerald-50/30 transition-colors">
                        <span className="text-sm font-medium text-slate-600">Equipment & Machinery</span>
                        <span className="font-bold text-emerald-700">{response.data.budget_breakdown.equipment}</span>
                      </div>
                      <div className="flex justify-between p-4 px-6 hover:bg-emerald-50/30 transition-colors">
                        <span className="text-sm font-medium text-slate-600">Contingency Fund</span>
                        <span className="font-bold text-emerald-700">{response.data.budget_breakdown.contingency}</span>
                      </div>
                    </div>
                    <div className="p-4 px-6 bg-emerald-50/20 text-xs italic text-emerald-800 border-t border-emerald-100">
                      <strong>Notes:</strong> {response.data.budget_breakdown.notes}
                    </div>
                  </CardContent>
                </Card>

                {/* Risks */}
                <Card className="shadow-md border-red-100">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                      <AlertTriangle size={20} />
                    </div>
                    <CardTitle>Risk Intelligence</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {response.data.risks.map((risk, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-red-100 bg-red-50/30 space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-sm text-red-900">{risk.risk}</h4>
                          <Badge className={cn(
                            risk.severity === "High" ? "bg-red-600" : 
                            risk.severity === "Medium" ? "bg-amber-500" : "bg-blue-500"
                          )}>
                            {risk.severity} Risk
                          </Badge>
                        </div>
                        <p className="text-xs text-red-800 leading-relaxed">
                          <strong className="uppercase text-[10px] tracking-widest opacity-70 block mb-1">Mitigation Strategy</strong>
                          {risk.mitigation}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Recommendations & Next Steps */}
              <div className="grid md:grid-cols-2 gap-6 pb-12">
                <Card className="bg-slate-900 text-white border-none shadow-2xl">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <Lightbulb className="text-amber-400" />
                    <CardTitle>Engineer Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {response.data.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm flex items-start gap-3 text-slate-300">
                          <div className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-amber-400 font-bold text-[10px]">{i + 1}</div>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-primary text-white border-none shadow-2xl">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <ListChecks className="text-white" />
                    <CardTitle>Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {response.data.next_steps.map((step, i) => (
                        <li key={i} className="flex items-center gap-4 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-all cursor-default">
                          <div className="h-6 w-6 rounded border-2 border-white/50 flex items-center justify-center shrink-0">
                            <ChevronRight size={14} />
                          </div>
                          <span className="text-sm font-medium">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
