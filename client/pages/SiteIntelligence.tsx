import { useState } from "react";
import { 
  Camera, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Scan, 
  ShieldAlert, 
  Zap,
  Activity,
  Play,
  Maximize2,
  RefreshCw,
  Video
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Dummy Data
const SITE_ALERTS = [
  { id: 1, type: "Defect", severity: "High", item: "Structural Crack", location: "Column B4, Level 2", timestamp: "10 mins ago", status: "Flagged", img: "https://images.unsplash.com/photo-1590069230002-7067d9d7ec49?q=80&w=2670&auto=format&fit=crop" },
  { id: 2, type: "Safety", severity: "Critical", item: "PPE Violation", location: "Site Entrance", timestamp: "2 hours ago", status: "Intervened", img: "https://images.unsplash.com/photo-1504307651254-35680f3366d4?q=80&w=2670&auto=format&fit=crop" },
  { id: 3, type: "Progress", severity: "Low", item: "Slab Curing Complete", location: "West Wing", timestamp: "Today, 09:00 AM", status: "Verified", img: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2670&auto=format&fit=crop" },
];

const STREAMS = [
  { id: "CAM-01", name: "Tower Crane North", status: "Live", viewers: 4, label: "Structural" },
  { id: "CAM-02", name: "Main Entrance", status: "Recording", viewers: 1, label: "Security" },
  { id: "CAM-03", name: "Foundation Pit", status: "Live", viewers: 12, label: "Progress" },
];

export default function SiteIntelligence() {
  const [activeTab, setActiveTab] = useState("insights");

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-primary/10 text-primary">
              <Camera size={28} />
            </span>
            Site Intelligence
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">BIM Link: Real-time visual monitoring and AI-powered field insights.</p>
        </div>
        <div className="flex items-center gap-2">
           <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 px-3 py-1.5 font-bold gap-2">
             <Activity size={14} /> AI Processing Active
           </Badge>
           <Button className="gap-2 bg-slate-900 border-none rounded-xl h-11">
             <RefreshCw size={18} /> Rescan Site
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: AI Alerts & Feed */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-primary text-white p-8">
              <div className="flex items-center justify-between">
                <div>
                   <CardTitle className="text-2xl font-black">AI Field Alerts</CardTitle>
                   <CardDescription className="text-primary-foreground/60 font-medium">Auto-detected site events</CardDescription>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                   <Zap size={24} className="text-accent" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-100">
                  {SITE_ALERTS.map((alert) => (
                    <div key={alert.id} className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group">
                       <div className="flex gap-4">
                          <div className="h-16 w-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                             <img src={alert.img} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="site scan" />
                          </div>
                          <div className="flex-1 min-w-0">
                             <div className="flex items-center justify-between mb-1">
                                <Badge className={cn(
                                   "text-[9px] font-black uppercase tracking-widest",
                                   alert.severity === "Critical" ? "bg-red-500 text-white" :
                                   alert.severity === "High" ? "bg-amber-500 text-white" : "bg-blue-500 text-white"
                                )}>
                                   {alert.severity} {alert.type}
                                </Badge>
                                <span className="text-[10px] text-slate-400 font-bold uppercase">{alert.timestamp}</span>
                             </div>
                             <h4 className="font-bold text-slate-800 truncate">{alert.item}</h4>
                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                                <Scan size={10} /> {alert.location}
                             </p>
                          </div>
                       </div>
                       <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                          <div className="flex items-center gap-1.5">
                             {alert.status === "Verified" ? (
                               <CheckCircle2 size={14} className="text-emerald-500" />
                             ) : (
                               <AlertCircle size={14} className="text-amber-500" />
                             )}
                             <span className="text-[10px] font-black uppercase text-slate-500">{alert.status}</span>
                          </div>
                          <Button size="sm" variant="ghost" className="text-primary h-7 px-2 font-bold text-[10px] uppercase tracking-widest hover:bg-primary/5">
                             Full Report →
                          </Button>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="p-4 bg-slate-50 text-center">
                  <Button variant="link" className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                    View All Filtered Insights
                  </Button>
               </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-indigo-600 text-white rounded-[2rem]">
             <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                   <ShieldAlert size={32} className="text-accent" />
                   <div>
                      <h4 className="font-bold text-lg">PPE Compliance</h4>
                      <p className="text-xs text-white/60">AI Daily Site Score</p>
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between text-sm font-black italic">
                      <span>92.4%</span>
                      <span>Target: 100%</span>
                   </div>
                   <Progress value={92.4} className="h-2 bg-white/10 [&>div]:bg-accent" />
                </div>
                <p className="text-[10px] text-white/50 mt-4 leading-relaxed font-medium">
                  Site entrance monitoring has detected 3 incidents of missing safety vests this morning. Automatic reminders dispatched to foreman.
                </p>
             </CardContent>
          </Card>
        </div>

        {/* Right Column: Visual Monitoring */}
        <div className="xl:col-span-2 space-y-8">
          
          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-3">
                <Video size={20} className="text-slate-400" />
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Live Site Streams</h3>
             </div>
             <div className="flex items-center border rounded-xl overflow-hidden p-1 bg-slate-100/50">
                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg bg-white shadow-sm"><LayoutGrid size={16} /></Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg"><List size={16} /></Button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {STREAMS.map((s) => (
               <Card key={s.id} className="border-none shadow-lg rounded-[2.5rem] overflow-hidden group">
                  <div className="h-64 bg-slate-900 relative">
                     <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                        <div className={cn(
                           "h-2 w-2 rounded-full animate-pulse",
                           s.status === "Live" ? "bg-red-500" : "bg-slate-400"
                        )} />
                        <span className="text-[10px] font-black uppercase text-white drop-shadow-md">{s.status}</span>
                     </div>
                     <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-white/10 backdrop-blur-md text-white border-none py-1.5 px-3 uppercase text-[9px] font-black tracking-widest">
                          {s.label}
                        </Badge>
                     </div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                        <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                           <Play size={28} className="fill-current ml-1" />
                        </div>
                     </div>
                     <img 
                       src={s.id === "CAM-01" ? "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2670&auto=format&fit=crop" : 
                            s.id === "CAM-02" ? "https://images.unsplash.com/photo-1504307651254-35680f3366d4?q=80&w=2670&auto=format&fit=crop" :
                            "https://images.unsplash.com/photo-1590674867551-11c3a2df3193?q=80&w=2670&auto=format&fit=crop"} 
                       className="h-full w-full object-cover" 
                       alt="stream" 
                     />
                  </div>
                  <CardContent className="p-6 flex items-center justify-between bg-white border-t border-slate-50">
                     <div>
                        <h4 className="font-bold text-slate-800">{s.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1">
                           <Clock size={10} /> Latency: 120ms &bull; {s.viewers} Active
                        </p>
                     </div>
                     <Button size="icon" variant="ghost" className="h-10 w-10 text-slate-400 hover:text-primary rounded-xl">
                        <Maximize2 size={18} />
                     </Button>
                  </CardContent>
               </Card>
             ))}

             <div className="h-auto min-h-[300px] border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-primary/20 hover:bg-white transition-all">
                <div className="h-14 w-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-slate-300 group-hover:text-primary transition-all mb-4">
                   <Video size={24} />
                </div>
                <h5 className="font-bold text-slate-700">Add Live Camera Feed</h5>
                <p className="text-xs text-slate-400 mt-2 max-w-[200px]">Supports IP Cameras, GoPros, and Drone streams.</p>
             </div>
          </div>

          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
             <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-black">Project Progress Timeline</CardTitle>
                <CardDescription className="font-medium">Monthly visual evolution and completions</CardDescription>
             </CardHeader>
             <CardContent className="p-8 pt-4">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                   {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="min-w-[120px] flex flex-col gap-2 group cursor-pointer">
                         <div className="h-24 w-full rounded-2xl bg-slate-100 overflow-hidden border border-slate-100 group-hover:border-primary transition-all relative">
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                               <Maximize2 size={16} className="text-white" />
                            </div>
                            <img src={`https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2670&auto=format&fit=crop&sig=${i}`} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="progress" />
                         </div>
                         <div className="text-center px-1">
                            <p className="text-[10px] font-black uppercase text-slate-400">Month 0{i}</p>
                            <p className="text-[11px] font-bold text-slate-700">Phase Complete</p>
                         </div>
                      </div>
                   ))}
                </div>
             </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
