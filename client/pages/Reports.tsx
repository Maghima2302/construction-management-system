import { useState } from "react";
import { 
  BarChart3, 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Printer,
  Share2,
  PieChart,
  HardHat,
  Construction,
  Layers
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import AnalyticsChart from "@/components/charts/AnalyticsChart";
import { useToast } from "@/hooks/use-toast";

// Dummy Data
const MOCK_REPORTS = [
  { id: "REP-001", name: "Monthly Progress Report - March", type: "PDF", size: "4.8 MB", category: "Progress", date: "2024-04-01", status: "Ready" },
  { id: "REP-002", name: "Labour Utilization Audit Q1", type: "XLSX", size: "1.2 MB", category: "Resources", date: "2024-03-28", status: "Generated" },
  { id: "REP-003", name: "Safety Compliance Summary", type: "PDF", size: "2.5 MB", category: "Safety", date: "2024-04-10", status: "Ready" },
  { id: "REP-004", name: "Project Timeline Variance Analyser", type: "PDF", size: "3.1 MB", category: "Scheduling", date: "2024-04-12", status: "Live" },
  { id: "REP-005", name: "Sub-Contractor Performance Index", type: "DOCX", size: "0.8 MB", category: "Resources", date: "2024-04-05", status: "Ready" },
];

const RESOURCE_DATA = [
  { name: "Labour", current: 85, peak: 120, trend: "+12%" },
  { name: "Equipment", current: 42, peak: 50, trend: "-5%" },
  { name: "Engineers", current: 18, peak: 20, trend: "+2%" },
  { name: "Safety Staff", current: 6, peak: 8, trend: "0%" },
];

const MONTHLY_PROGRESS = [
  { month: "Jan", amount: 15 },
  { month: "Feb", amount: 32 },
  { month: "Mar", amount: 48 },
  { month: "Apr", amount: 65 },
  { month: "May", amount: 82 },
];

export default function Reports() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const handleDownload = (name: string) => {
    toast({
      title: "Generating Report",
      description: `Preparing ${name} for high-quality export.`,
    });
  };

  const filteredReports = MOCK_REPORTS.filter(rep => 
    (activeTab === "all" || rep.category.toLowerCase() === activeTab.toLowerCase()) &&
    rep.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-primary/10 text-primary">
              <BarChart3 size={28} />
            </span>
            Insights & Analytics
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Downloadable stakeholder reports and live project performance summaries.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="gap-2 rounded-xl h-11 border-slate-200">
             <Printer size={18} /> Batch Print
           </Button>
           <Button className="gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl h-11 shadow-lg shadow-primary/20">
             <Share2 size={18} /> Publish Reports
           </Button>
        </div>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm bg-white overflow-hidden group">
           <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                 <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <TrendingUp size={24} />
                 </div>
                 <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-bold">Ahead of Schedule</Badge>
              </div>
              <h4 className="text-3xl font-black text-slate-800 tracking-tighter">82%</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Completion Progress</p>
           </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden group">
           <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                 <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                    <HardHat size={24} />
                 </div>
                 <Badge variant="secondary" className="bg-slate-50 text-slate-500 border-none font-bold">LOD 350 Status</Badge>
              </div>
              <h4 className="text-3xl font-black text-slate-800 tracking-tighter">142</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Active Site Personnel</p>
           </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden group">
           <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                 <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={24} />
                 </div>
                 <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-bold">Excellent Safety</Badge>
              </div>
              <h4 className="text-3xl font-black text-slate-800 tracking-tighter">0</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Monthly Incidents</p>
           </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden group">
           <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                 <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                    <PieChart size={24} />
                 </div>
                 <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none font-bold">Under Budget</Badge>
              </div>
              <h4 className="text-3xl font-black text-slate-800 tracking-tighter">63%</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Total Budget Utilised</p>
           </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         {/* Main Report Center */}
         <div className="xl:col-span-2 space-y-6">
            <Card className="border-none shadow-xl rounded-[2rem] bg-white overflow-hidden">
               <CardHeader className="p-8 pb-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                     <div>
                        <CardTitle className="text-2xl font-black">Report Center</CardTitle>
                        <CardDescription className="font-medium">Direct stakeholder access to latest summaries</CardDescription>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="relative">
                           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                           <Input 
                              placeholder="Search summaries..." 
                              className="pl-10 h-11 border-slate-100 bg-slate-50 rounded-xl"
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                           />
                        </div>
                        <Button size="icon" variant="outline" className="h-11 w-11 rounded-xl border-slate-100">
                           <Filter size={18} className="text-slate-400" />
                        </Button>
                     </div>
                  </div>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
                     <TabsList className="bg-slate-100 p-1 rounded-xl h-11">
                        <TabsTrigger value="all" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">All Reports</TabsTrigger>
                        <TabsTrigger value="Progress" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">Progress</TabsTrigger>
                        <TabsTrigger value="Resources" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">Resources</TabsTrigger>
                        <TabsTrigger value="Scheduling" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">Scheduling</TabsTrigger>
                     </TabsList>
                  </Tabs>
               </CardHeader>

               <CardContent className="px-0">
                  <div className="overflow-x-auto">
                     <Table>
                        <TableHeader className="bg-slate-50/50">
                           <TableRow>
                              <TableHead className="px-8 font-bold text-[10px] uppercase tracking-widest text-slate-400">Report Reference</TableHead>
                              <TableHead className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Format</TableHead>
                              <TableHead className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Date Generated</TableHead>
                              <TableHead className="font-bold text-[10px] uppercase tracking-widest text-slate-400 text-right px-8"></TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {filteredReports.map((report) => (
                              <TableRow key={report.id} className="group h-16 hover:bg-slate-50 transition-colors">
                                 <TableCell className="px-8">
                                    <div className="flex items-center gap-3">
                                       <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                                          <FileText size={18} />
                                       </div>
                                       <div>
                                          <p className="font-bold text-slate-800 leading-none mb-1 group-hover:text-primary cursor-pointer">{report.name}</p>
                                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{report.id} &bull; {report.size}</p>
                                       </div>
                                    </div>
                                 </TableCell>
                                 <TableCell>
                                    <Badge variant="secondary" className="bg-slate-100 text-[10px] font-black uppercase text-slate-600 border-none px-2.5">
                                       {report.type}
                                    </Badge>
                                 </TableCell>
                                 <TableCell className="text-xs font-bold text-slate-500">{report.date}</TableCell>
                                 <TableCell className="text-right px-8">
                                    <Button size="icon" variant="ghost" className="h-9 w-9 text-slate-400 hover:text-primary" onClick={() => handleDownload(report.name)}>
                                       <Download size={18} />
                                    </Button>
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-none shadow-xl rounded-[2rem] bg-slate-900 text-white p-8 overflow-hidden relative">
               <div className="absolute top-0 right-0 p-12 opacity-5">
                  <Construction size={220} />
               </div>
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                     <Badge className="bg-primary text-white border-none font-bold uppercase tracking-widest text-[10px] mb-4">Timeline Accuracy</Badge>
                     <h3 className="text-3xl font-black tracking-tight mb-4 leading-tight">Monthly Project Variance & Flow</h3>
                     <p className="text-slate-400 text-sm font-medium leading-relaxed">
                        Data extrapolated from onsite daily logs and material gate passes. Currently tracking 4 days ahead of central timeline.
                     </p>
                     <div className="flex items-center gap-4 mt-8">
                        <div className="flex flex-col">
                           <span className="text-2xl font-black text-white">+12%</span>
                           <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Growth</span>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="flex flex-col">
                           <span className="text-2xl font-black text-white">4.2d</span>
                           <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Slack</span>
                        </div>
                     </div>
                  </div>
                  <div className="h-64 pt-4">
                     <AnalyticsChart data={MONTHLY_PROGRESS} color="primary" />
                  </div>
               </div>
            </Card>
         </div>

         {/* Sidebar: Resource Utilization */}
         <div className="space-y-6">
            <Card className="border-none shadow-xl rounded-[2rem] bg-white overflow-hidden">
               <CardHeader className="p-8 pb-4 border-b border-slate-50">
                  <div className="flex items-center gap-3">
                     <Users size={20} className="text-primary" />
                     <CardTitle className="text-xl font-black tracking-tight">Resource Load</CardTitle>
                  </div>
                  <CardDescription className="font-medium mt-1">On-site capacity vs demand</CardDescription>
               </CardHeader>
               <CardContent className="p-8 space-y-8">
                  {RESOURCE_DATA.map((r, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-700">{r.name}</span>
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{r.current} / {r.peak}</span>
                       </div>
                       <div className="relative pt-1">
                          <Progress value={(r.current / r.peak) * 100} className="h-2 rounded-full bg-slate-100 [&>div]:bg-primary" />
                          <div className={cn(
                             "absolute right-0 -top-6 text-[9px] font-black uppercase flex items-center gap-1",
                             r.trend.startsWith("+") ? "text-emerald-500" : r.trend === "0%" ? "text-slate-400" : "text-amber-500"
                          )}>
                             {r.trend.startsWith("+") ? <TrendingUp size={10} /> : <Clock size={10} />}
                             {r.trend} Load
                          </div>
                       </div>
                    </div>
                  ))}

                  <div className="pt-4 space-y-4 border-t border-slate-50">
                     <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Schedule Summary</h5>
                     <div className="space-y-4">
                        {[
                           { label: "Foundation Phase", date: "April 20", icon: <Layers size={14} />, status: "Done" },
                           { label: "Steel Assembly", date: "May 12", icon: <Construction size={14} />, status: "In Progress" },
                        ].map((item, i) => (
                           <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors">
                              <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                                 {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                 <p className="text-xs font-bold text-slate-800 truncate">{item.label}</p>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.date}</p>
                              </div>
                              <ArrowRight size={16} className="text-slate-200" />
                           </div>
                        ))}
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-primary/5 rounded-[2rem] p-8 border-2 border-primary/10">
               <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 mb-6">
                     <Clock size={32} />
                  </div>
                  <h4 className="text-xl font-black text-slate-800 mb-2 tracking-tight">Custom Report Builder</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                     Assemble custom metrics and stakeholder views for precise project visibility.
                  </p>
                  <Button className="w-full bg-white text-slate-900 border-none font-bold rounded-xl h-11 hover:bg-white/80 shadow-sm">
                     Launch Generator
                  </Button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}

