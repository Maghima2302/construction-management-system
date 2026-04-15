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
  { id: 4, type: "Weather", severity: "Medium", item: "High Wind Warning", location: "Tower Crane 1", timestamp: "30 mins ago", status: "Active", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop" },
  { id: 5, type: "Security", severity: "High", item: "After-hours Access", location: "Zone D Perimeter", timestamp: "Yesterday", status: "Investigated", img: "https://images.unsplash.com/photo-1557597774-9d2739f85a76?q=80&w=2670&auto=format&fit=crop" },
];

const STREAMS = [
  { id: "CAM-01", name: "Tower Crane North", status: "Live", viewers: 4, label: "Structural", quality: "4K" },
  { id: "CAM-02", name: "Main Entrance", status: "Recording", viewers: 1, label: "Security", quality: "1080p" },
  { id: "CAM-03", name: "Foundation Pit", status: "Live", viewers: 12, label: "Progress", quality: "4K" },
  { id: "CAM-04", name: "Worker Canteen", status: "Live", viewers: 2, label: "Amenities", quality: "720p" },
];

const handleDownload = (name: string) => {
  try {
    if (!name) throw new Error("Report name is missing.");
    
    toast({
      title: "Generating Report",
      description: `Preparing ${name} for high-quality export.`,
    });
    
    // Simulate download logic
    setTimeout(() => {
      toast({
        title: "Download Started",
        description: `${name} has been successfully compiled and download started.`,
        variant: "default",
      });
    }, 1500);
  } catch (error) {
    console.error("Download failed:", error);
    toast({
      title: "Export Failed",
      description: "An error occurred while generating the report. Please try again.",
      variant: "destructive",
    });
  }
};

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

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Left Column: AI Alerts & Feed */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl border border-white/20">
            <CardHeader className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-8">
              <div className="flex items-center justify-between">
                <div>
                   <CardTitle className="text-2xl font-black tracking-tight">AI Field Intelligence</CardTitle>
                   <CardDescription className="text-indigo-100/70 font-medium">Real-time anomaly detection</CardDescription>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                   <Zap size={24} className="text-yellow-300 animate-pulse" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto scrollbar-hide">
                  {SITE_ALERTS.map((alert) => (
                    <div key={alert.id} className="p-6 hover:bg-indigo-50/30 transition-all cursor-pointer group border-l-4 border-transparent hover:border-indigo-500">
                       <div className="flex gap-4">
                          <div className="h-16 w-16 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 shadow-inner group-hover:scale-105 transition-transform duration-300">
                             <img src={alert.img} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="site scan" />
                          </div>
                          <div className="flex-1 min-w-0">
                             <div className="flex items-center justify-between mb-1">
                                <Badge className={cn(
                                   "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-sm",
                                   alert.severity === "Critical" ? "bg-red-500 text-white" :
                                   alert.severity === "High" ? "bg-orange-500 text-white" : 
                                   alert.severity === "Medium" ? "bg-amber-500 text-white" : "bg-blue-500 text-white"
                                )}>
                                   {alert.severity} {alert.type}
                                </Badge>
                                <span className="text-[10px] text-slate-400 font-bold uppercase">{alert.timestamp}</span>
                             </div>
                             <h4 className="font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">{alert.item}</h4>
                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                                <Scan size={10} className="text-indigo-400" /> {alert.location}
                             </p>
                          </div>
                       </div>
                       <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 opacity-70 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center gap-1.5">
                             {alert.status === "Verified" ? (
                               <CheckCircle2 size={14} className="text-emerald-500" />
                             ) : (
                               <AlertCircle size={14} className="text-amber-500" />
                             )}
                             <span className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">{alert.status}</span>
                          </div>
                          <Button size="sm" variant="ghost" className="text-indigo-600 h-7 px-2 font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-50">
                             Analysis Report →
                          </Button>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="p-4 bg-slate-50/50 text-center border-t border-slate-100">
                  <Button variant="link" className="text-indigo-500 font-black text-[10px] uppercase tracking-widest hover:no-underline hover:text-indigo-700">
                    See 12 More Observations
                  </Button>
               </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-[2.5rem] overflow-hidden relative group">
             <div className="absolute -right-4 -top-4 h-24 w-24 bg-indigo-500/10 blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500" />
             <CardContent className="p-8 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-14 w-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                      <ShieldAlert size={32} className="text-indigo-400" />
                   </div>
                   <div>
                      <h4 className="font-black text-lg tracking-tight">HSE Compliance</h4>
                      <p className="text-[10px] uppercase font-bold text-indigo-300/60 tracking-widest">AI Safety Score</p>
                   </div>
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between text-sm font-black">
                      <span className="text-indigo-100">92.4%</span>
                      <span className="text-indigo-400/60 font-medium">Target: 100%</span>
                   </div>
                   <div className="h-3 w-full bg-indigo-900/50 rounded-full overflow-hidden border border-indigo-800/20">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-400 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                        style={{ width: '92.4%' }} 
                      />
                   </div>
                </div>
                <p className="text-[11px] text-indigo-100/40 mt-6 leading-relaxed font-medium bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-indigo-300 font-bold block mb-1">AUTOMATED REMINDER:</span>
                  Site entrance monitoring has detected minor infractions in Zone C. Reminders dispatched to site leads.
                </p>
             </CardContent>
          </Card>
        </div>

        {/* Right Column: Visual Monitoring */}
        <div className="xl:col-span-3 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
             <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                   <Video size={20} className="text-indigo-600" />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-slate-800 tracking-tight">Visual Field Streams</h3>
                   <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Active Edge Processing Onsite</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50 shadow-inner">
                   <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl bg-white shadow-md text-indigo-600"><LayoutGrid size={18} /></Button>
                   <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-400 hover:text-slate-600"><List size={18} /></Button>
                </div>
                <Button className="rounded-2xl h-12 px-6 bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 border-none font-bold">
                   <Maximize2 size={18} className="mr-2" /> Global View
                </Button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
             {STREAMS.map((s) => (
                <div key={s.id} className="group relative">
                   <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white hover:translate-y-[-8px] transition-all duration-500 border border-slate-100">
                      <div className="h-72 bg-slate-900 relative overflow-hidden">
                         <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                            <div className={cn(
                               "h-2.5 w-2.5 rounded-full",
                               s.status === "Live" ? "bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" : "bg-slate-400"
                            )} />
                            <span className="text-[10px] font-black uppercase text-white tracking-widest drop-shadow-lg shadow-black">{s.status}</span>
                            <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 px-2 py-0 text-[8px] font-black">{s.quality}</Badge>
                         </div>
                         <div className="absolute top-6 right-6 z-20">
                            <Badge className="bg-indigo-600/90 text-white border-none py-1.5 px-4 uppercase text-[9px] font-black tracking-widest rounded-full shadow-lg">
                              {s.label}
                            </Badge>
                         </div>
                         
                         <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-indigo-900/40 backdrop-blur-[4px]">
                            <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-2xl scale-75 group-hover:scale-100 transition-all duration-500">
                               <Play size={32} className="fill-current ml-1" />
                            </div>
                         </div>

                         <img 
                           src={s.id === "CAM-01" ? "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2670&auto=format&fit=crop" : 
                                s.id === "CAM-02" ? "https://images.unsplash.com/photo-1504307651254-35680f3366d4?q=80&w=2670&auto=format&fit=crop" :
                                s.id === "CAM-03" ? "https://images.unsplash.com/photo-1590674867551-11c3a2df3193?q=80&w=2670&auto=format&fit=crop" :
                                "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2670&auto=format&fit=crop"} 
                           className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
                           alt="stream" 
                         />
                         
                         {/* Scanline overlay for aesthetic */}
                         <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
                      </div>
                      <CardContent className="p-8 bg-white relative">
                         <div className="flex items-center justify-between">
                            <div className="space-y-1">
                               <h4 className="font-black text-slate-800 text-lg group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{s.name}</h4>
                               <div className="flex items-center gap-3">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                     <Clock size={10} className="text-indigo-400" /> Latency: 42ms
                                  </p>
                                  <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest flex items-center gap-1.5 bg-indigo-50 px-2 py-0.5 rounded-full">
                                     <Users size={10} /> {s.viewers} Active
                                  </p>
                               </div>
                            </div>
                            <Button size="icon" variant="outline" className="h-12 w-12 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 rounded-2xl bg-slate-50 border-slate-100 hover:scale-110 transition-all">
                               <Maximize2 size={20} />
                            </Button>
                         </div>
                      </CardContent>
                   </Card>
                </div>
             ))}

             <div className="h-full min-h-[350px] border-4 border-dashed border-slate-100 bg-slate-50/50 rounded-[3.5rem] flex flex-col items-center justify-center p-10 text-center group cursor-pointer hover:border-indigo-100 hover:bg-white transition-all duration-500 hover:shadow-2xl">
                <div className="h-20 w-20 rounded-[2rem] bg-white shadow-xl flex items-center justify-center text-slate-300 group-hover:text-indigo-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mb-6 border border-slate-50">
                   <Video size={36} />
                </div>
                <h5 className="font-black text-slate-800 text-xl tracking-tight">Register New Feed</h5>
                <p className="text-xs text-slate-400 mt-3 max-w-[220px] font-medium leading-relaxed uppercase tracking-wider">Supports IP Cameras, GoPros, and Drone Webhook streams.</p>
                <Button variant="ghost" className="mt-6 font-black text-[10px] uppercase tracking-widest text-indigo-600 group-hover:underline">
                    Get Onboarding Guide →
                </Button>
             </div>
          </div>

          <Card className="border-none shadow-2xl rounded-[3.5rem] overflow-hidden bg-white border border-slate-100">
             <CardHeader className="p-10 pb-6">
                <div className="flex items-center justify-between">
                   <div>
                      <CardTitle className="text-3xl font-black tracking-tight text-slate-900">Historical Visual Timeline</CardTitle>
                      <CardDescription className="font-bold text-slate-400 uppercase tracking-widest mt-1">Daily progression snapshots & archives</CardDescription>
                   </div>
                   <Button variant="outline" className="border-slate-200 rounded-2xl h-12 font-bold px-6 hover:bg-slate-50">
                      View Full Archive
                   </Button>
                </div>
             </CardHeader>
             <CardContent className="p-10 pt-4">
                <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                   {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="min-w-[180px] flex flex-col gap-4 group cursor-pointer">
                         <div className="h-36 w-full rounded-[2.5rem] bg-slate-100 overflow-hidden border-4 border-white shadow-xl group-hover:border-indigo-500 group-hover:scale-105 transition-all duration-500 relative">
                            <div className="absolute inset-0 bg-indigo-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                               <Maximize2 size={24} className="text-white scale-75 group-hover:scale-100 transition-transform duration-500" />
                            </div>
                            <img src={`https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2670&auto=format&fit=crop&v=${i}`} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="progress" />
                            <div className="absolute bottom-4 left-4 right-4">
                               <Badge className="bg-white/90 text-slate-900 text-[8px] font-black uppercase w-full justify-center backdrop-blur-sm border-none">Month 0{i}</Badge>
                            </div>
                         </div>
                         <div className="text-center">
                            <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">Structural Phase {i*10}%</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Verified Apr {10+i}, 2024</p>
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
