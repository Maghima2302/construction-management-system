import { useState } from "react";
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Eye, 
  History, 
  MoreVertical,
  FileCode,
  FileSpreadsheet,
  FileCheck,
  FolderOpen,
  Clock,
  ShieldCheck,
  HardDrive,
  UploadCloud,
  ChevronRight,
  ExternalLink,
  BoxSelect,
  Box as Cube,
  Settings2,
  Maximize2,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { useToast } from "@/hooks/use-toast";

// Dummy Data
const MOCK_DOCUMENTS = [
  { id: 1, name: "Site_Plan_A1_v2.pdf", category: "Blueprints", type: "PDF", size: "4.2 MB", author: "Architect John", date: "2024-04-10", version: "v2.0", status: "Approved", description: "Main site layout for Phase 1 construction including boundary detail." },
  { id: 2, name: "Foundation_Specs_Final.dwg", category: "Drawings", type: "CAD", size: "18.5 MB", author: "Eng. Sarah", date: "2024-04-12", version: "v1.4", status: "Under Review", description: "Detailed CAD drawing of central foundation piles and reinforcement." },
  { id: 3, name: "Labour_Contract_Q2.docx", category: "Contracts", type: "DOCX", size: "1.2 MB", author: "Legal Dept", date: "2024-04-05", version: "v1.0", status: "Signed", description: "Biannual labour supply agreement for Q2-Q3 2024." },
  { id: 4, name: "Safety_Audit_Report.pdf", category: "Reports", type: "PDF", size: "2.8 MB", author: "HSE Officer", date: "2024-04-14", version: "v3.1", status: "Approved", description: "Monthly safety audit report for the west wing assembly." },
  { id: 5, name: "Electrical_Routing_L1.dwg", category: "Blueprints", type: "CAD", size: "12.1 MB", author: "Power Systems", date: "2024-04-13", version: "v2.2", status: "Draft", description: "Level 1 electrical conduit routing plan." },
  { id: 6, name: "Material_Procurement_Log.xlsx", category: "Reports", type: "XLSX", size: "0.8 MB", author: "Admin", date: "2024-04-14", version: "v1.0", status: "Live", description: "Daily log of materials received and inspected at site." },
];

const MOCK_BIM_MODELS = [
  { id: "BIM-001", name: "Structural_LOD350_Final.rvt", size: "142 MB", elements: 8420, clashes: 12, health: "Optimized", lastSync: "2 hours ago" },
  { id: "BIM-002", name: "MEP_Systems_Phase2.ifc", size: "85 MB", elements: 4100, clashes: 45, health: "Review Required", lastSync: "5 hours ago" },
  { id: "BIM-003", name: "Architectural_Core.nwd", size: "210 MB", elements: 12500, clashes: 0, health: "Clean", lastSync: "1 day ago" },
];

const VERSION_HISTORY = [
  { version: "v2.0", date: "2024-04-10", author: "Architect John", note: "Updated floor area measurements" },
  { version: "v1.1", date: "2024-03-28", author: "Architect John", note: "Initial structural feedback integrated" },
  { version: "v1.0", date: "2024-03-15", author: "Architect John", note: "Concept drawing submission" },
];

const CATEGORIES = [
  { name: "Blueprints", count: 12, icon: <FileCode size={18} />, color: "bg-blue-50 text-blue-600" },
  { name: "Contracts", count: 8, icon: <FileCheck size={18} />, color: "bg-emerald-50 text-emerald-600" },
  { name: "Reports", count: 24, icon: <FileSpreadsheet size={18} />, color: "bg-amber-50 text-amber-600" },
  { name: "BIM Models", count: 3, icon: <Cube size={18} />, color: "bg-indigo-50 text-indigo-600" },
  { name: "Legal", count: 5, icon: <ShieldCheck size={18} />, color: "bg-purple-50 text-purple-600" },
];

export default function Documents() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const filteredDocs = MOCK_DOCUMENTS.filter(doc => 
    (activeTab === "all" || doc.category === activeTab) &&
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenHistory = (doc: any) => {
    setSelectedDoc(doc);
    setIsHistoryOpen(true);
  };

  const handleOpenView = (doc: any) => {
    setSelectedDoc(doc);
    setIsViewOpen(true);
  };

  const handleDownload = (docName: string) => {
    toast({
      title: "Download Started",
      description: `${docName} is being prepared for download.`,
    });
  };

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsUploadOpen(false);
      toast({
        title: "Upload Successful",
        description: "Your document has been added to the project vault.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-primary/10 text-primary">
              <FolderOpen size={28} />
            </span>
            Document Vault
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Secure repository for blueprints, contracts, and technical specifications.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 rounded-xl h-11 border-slate-200">
            <History size={18} /> Recent Activity
          </Button>
          
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 rounded-xl h-11 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                <UploadCloud size={18} /> Upload New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-3xl p-8">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">Upload Construction Document</DialogTitle>
                <DialogDescription>
                  Drag and drop your technical drawings or contracts here.
                </DialogDescription>
              </DialogHeader>
              <div className="py-8">
                <div 
                  className={cn(
                    "h-48 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center group transition-all cursor-pointer",
                    isUploading ? "bg-slate-50 border-slate-200" : "border-slate-100 bg-slate-50/50 hover:border-primary/40 hover:bg-primary/5"
                  )}
                  onClick={() => !isUploading && handleUpload()}
                >
                  <div className={cn(
                    "h-14 w-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary mb-4 transition-transform",
                    isUploading ? "animate-bounce" : "group-hover:scale-110"
                  )}>
                    {isUploading ? <Clock className="animate-spin" size={24} /> : <HardDrive size={24} />}
                  </div>
                  <p className="text-sm font-bold text-slate-700">{isUploading ? "Dispersing to Vault..." : "Click to Browse or Drag Files"}</p>
                  <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-bold font-mono">Max size: 50MB</p>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0 font-semibold">
                 <Button variant="ghost" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
                 <Button className="bg-primary px-8" onClick={handleUpload} disabled={isUploading}>
                   {isUploading ? "Uploading..." : "Start Upload"}
                 </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Categories Grid (same) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group" onClick={() => setActiveTab(cat.name)}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform", cat.color)}>
                {cat.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{cat.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{cat.count} documents</p>
              </div>
              <ChevronRight className="ml-auto text-slate-300 group-hover:text-primary transition-colors" size={20} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main File Explorer */}
      <Card className="border-none shadow-xl bg-white overflow-hidden rounded-[2rem]">
        <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
          <div className="px-8 pt-8 flex flex-col xl:flex-row xl:items-center justify-between gap-6 overflow-x-auto pb-4">
            <TabsList className="bg-slate-100 p-1 rounded-2xl h-14 w-fit min-w-max">
              <TabsTrigger value="all" className="rounded-xl px-6 h-12 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-lg">
                <FolderOpen size={16} /> All Files
              </TabsTrigger>
              <TabsTrigger value="Blueprints" className="rounded-xl px-6 h-12 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-lg">
                <FileCode size={16} /> Blueprints
              </TabsTrigger>
              <TabsTrigger value="Contracts" className="rounded-xl px-6 h-12 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-lg">
                <FileCheck size={16} /> Contracts
              </TabsTrigger>
              <TabsTrigger value="Reports" className="rounded-xl px-6 h-12 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-lg">
                <FileSpreadsheet size={16} /> Reports
              </TabsTrigger>
              <TabsTrigger value="BIM Models" className="rounded-xl px-6 h-12 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-lg">
                <Cube size={16} /> BIM Models
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-4 min-w-max">
              <div className="relative w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input 
                  placeholder="Search vault..." 
                  className="pl-12 h-14 border-slate-100 bg-slate-50 focus:bg-white rounded-2xl transition-all shadow-inner"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button size="icon" variant="outline" className="h-14 w-14 rounded-2xl border-slate-100 bg-slate-50">
                <Filter size={20} className="text-slate-500" />
              </Button>
            </div>
          </div>

          <CardContent className="p-0">
            {activeTab === "BIM Models" ? (
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-50/50">
                {MOCK_BIM_MODELS.map((model) => (
                  <Card key={model.id} className="border-none shadow-sm rounded-3xl overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all">
                    <div className="h-48 bg-slate-900 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
                      <Cube size={64} className="text-primary/40 group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-lg bg-white/10 text-white backdrop-blur-md border-none">
                          <Maximize2 size={14} />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge className={cn(
                          "text-[9px] font-black uppercase tracking-widest border-none px-2",
                          model.health === "Optimized" || model.health === "Clean" ? "bg-emerald-500" : "bg-amber-500"
                        )}>
                          {model.health}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                       <div>
                          <h4 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-primary transition-colors cursor-pointer">{model.name}</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Ref: {model.id} &bull; Synced {model.lastSync}</p>
                       </div>

                       <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-100">
                          <div>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Elements</p>
                             <p className="text-sm font-black text-slate-700">{model.elements.toLocaleString()}</p>
                          </div>
                          <div>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Clashes</p>
                             <p className={cn("text-sm font-black", model.clashes > 0 ? "text-red-500" : "text-emerald-500")}>
                                {model.clashes} detected
                             </p>
                          </div>
                       </div>

                       <div className="flex items-center justify-between gap-3 pt-2">
                          <Button size="sm" className="flex-1 rounded-xl bg-slate-900 font-bold h-10 gap-2">
                             Full Inspection
                          </Button>
                          <Button size="icon" variant="outline" className="h-10 w-10 rounded-xl border-slate-100">
                             <Settings2 size={16} />
                          </Button>
                       </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Add Model Placeholder */}
                <div className="h-auto min-h-[400px] rounded-3xl border-2 border-dashed border-slate-200 bg-white/50 flex flex-col items-center justify-center p-8 text-center transition-all hover:bg-white hover:border-primary/20 cursor-pointer group">
                   <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary/5 group-hover:text-primary transition-all mb-4">
                      <Plus size={32} />
                   </div>
                   <h5 className="font-bold text-slate-700">Integrate 3D Model</h5>
                   <p className="text-xs text-slate-400 mt-2 max-w-[200px]">Connect Revit, Navisworks, or IFC models to the project stream.</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow>
                      <TableHead className="px-8 h-12 font-bold text-[11px] uppercase tracking-widest text-slate-400">Document Name</TableHead>
                      <TableHead className="h-12 font-bold text-[11px] uppercase tracking-widest text-slate-400">Category</TableHead>
                      <TableHead className="h-12 font-bold text-[11px] uppercase tracking-widest text-slate-400">Size</TableHead>
                      <TableHead className="h-12 font-bold text-[11px] uppercase tracking-widest text-slate-400">Version</TableHead>
                      <TableHead className="h-12 font-bold text-[11px] uppercase tracking-widest text-slate-400">Status</TableHead>
                      <TableHead className="h-12 text-right px-8"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocs.map((doc) => (
                      <TableRow key={doc.id} className="h-20 hover:bg-slate-50/80 transition-colors group">
                        <TableCell className="px-8" onClick={() => handleOpenView(doc)}>
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-lg",
                              doc.type === "PDF" ? "bg-red-500 shadow-red-100" :
                              doc.type === "CAD" ? "bg-indigo-500 shadow-indigo-100" :
                              doc.type === "XLSX" ? "bg-emerald-500 shadow-emerald-100" : "bg-blue-500 shadow-blue-100"
                            )}>
                              <FileText size={20} />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 leading-none mb-1 group-hover:text-primary transition-colors cursor-pointer">{doc.name}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{doc.author} &bull; {doc.date}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="rounded-lg bg-slate-50 border-none font-bold text-[10px] uppercase text-slate-500">{doc.category}</Badge>
                        </TableCell>
                        <TableCell className="text-sm font-medium text-slate-500 font-mono italic">{doc.size}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase text-slate-600">
                            <Clock size={10} /> {doc.version}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={cn(
                            "px-3 py-1 font-bold text-[10px] uppercase tracking-wider rounded-lg shadow-sm border-none",
                            doc.status === "Approved" || doc.status === "Signed" ? "bg-emerald-500" :
                            doc.status === "Under Review" ? "bg-amber-500" : "bg-slate-400"
                          )}>
                            {doc.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-8">
                          <div className="flex items-center justify-end gap-2">
                             <Button 
                               variant="ghost" 
                               size="icon" 
                               className="h-10 w-10 text-slate-400 hover:text-primary hover:bg-primary/5"
                               onClick={() => handleOpenView(doc)}
                             >
                               <Eye size={18} />
                             </Button>
                             <Button 
                               variant="ghost" 
                               size="icon" 
                               className="h-10 w-10 text-slate-400 hover:text-primary hover:bg-primary/5"
                               onClick={() => handleDownload(doc.name)}
                             >
                               <Download size={18} />
                             </Button>
                             
                             <DropdownMenu>
                               <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400">
                                   <MoreVertical size={18} />
                                 </Button>
                               </DropdownMenuTrigger>
                               <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
                                 <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-slate-400 px-3 py-2">Quick Actions</DropdownMenuLabel>
                                 <DropdownMenuItem className="rounded-xl px-3 py-2 cursor-pointer gap-2" onClick={() => handleOpenHistory(doc)}>
                                   <History size={16} /> View Version History
                                 </DropdownMenuItem>
                                 <DropdownMenuItem className="rounded-xl px-3 py-2 cursor-pointer gap-2" onClick={() => handleOpenView(doc)}>
                                   <FileText size={16} /> Document Details
                                 </DropdownMenuItem>
                                 <DropdownMenuItem className="rounded-xl px-3 py-2 cursor-pointer gap-2" onClick={() => handleDownload(doc.name)}>
                                   <ExternalLink size={16} /> Share Secure Link
                                 </DropdownMenuItem>
                                 <DropdownMenuSeparator className="my-1" />
                                 <DropdownMenuItem className="rounded-xl px-3 py-2 cursor-pointer gap-2 text-red-600 focus:text-red-600 focus:bg-red-50">
                                   Archive Document
                                 </DropdownMenuItem>
                               </DropdownMenuContent>
                             </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Tabs>
      </Card>

      {/* Storage Overview Footer */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
         <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
               <HardDrive size={24} />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Project Storage Usage</p>
               <h4 className="font-black text-slate-800 tracking-tight">28.4 GB <span className="text-slate-300 font-medium">/ 100 GB</span></h4>
            </div>
         </div>
         <Button variant="link" className="text-primary font-black uppercase text-[10px] tracking-[0.2em]">
            Manage Subscription Details &rarr;
         </Button>
      </div>

      {/* Version History Dialog */}
      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl p-8 overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-primary">
            <History size={160} />
          </div>
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-2xl font-black">Version History</DialogTitle>
            <DialogDescription>
              {selectedDoc?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-6 relative z-10">
             {VERSION_HISTORY.map((v, i) => (
                <div key={i} className="flex gap-4 group">
                   <div className="flex flex-col items-center gap-1">
                      <div className="h-8 w-8 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                         {v.version}
                      </div>
                      {i !== VERSION_HISTORY.length - 1 && <div className="w-0.5 flex-1 bg-slate-100 rounded-full" />}
                   </div>
                   <div className="pb-4">
                      <p className="text-sm font-bold text-slate-800">{v.note}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{v.author} &bull; {v.date}</p>
                      <Button variant="link" className="p-0 h-auto text-[10px] font-black uppercase tracking-widest mt-2 hover:no-underline text-primary/60 hover:text-primary">
                         Restore This Version
                      </Button>
                   </div>
                </div>
             ))}
          </div>
          <DialogFooter>
             <Button className="w-full bg-slate-900 h-12 rounded-xl font-bold" onClick={() => setIsHistoryOpen(false)}>Close Timeline</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document Details Modal (EYE BUTTON RESPONSE) */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-slate-900 p-10 text-white relative">
             <div className="absolute top-0 right-0 p-10 opacity-10">
                <FileText size={120} />
             </div>
             <div className="relative z-10">
                <Badge className="bg-primary text-white font-black text-[10px] uppercase tracking-widest mb-4 border-none px-3">Document Profile</Badge>
                <DialogTitle className="text-3xl font-black leading-tight mb-2 tracking-tight">
                   {selectedDoc?.name}
                </DialogTitle>
                <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                   <span className="flex items-center gap-1.5"><History size={14} /> Version {selectedDoc?.version}</span>
                   <span className="flex items-center gap-1.5"><ShieldCheck size={14} /> {selectedDoc?.status}</span>
                </div>
             </div>
          </div>
          <div className="p-10 space-y-8 bg-white">
             <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Full Description</h4>
                <p className="text-slate-600 font-medium leading-relaxed">
                   {selectedDoc?.description}
                </p>
             </div>

             <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Metadata</p>
                   <div className="space-y-3 pt-1">
                      <div className="flex items-center justify-between">
                         <span className="text-xs text-slate-500 font-medium">Category</span>
                         <span className="text-xs font-bold text-slate-800">{selectedDoc?.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-xs text-slate-500 font-medium">File Size</span>
                         <span className="text-xs font-bold text-slate-800 font-mono tracking-tighter">{selectedDoc?.size}</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-xs text-slate-500 font-medium">Format</span>
                         <Badge variant="secondary" className="font-black text-[9px] uppercase px-2">{selectedDoc?.type}</Badge>
                      </div>
                   </div>
                </div>
                <div className="space-y-2">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ownership</p>
                   <div className="space-y-3 pt-1">
                      <div className="flex items-center justify-between">
                         <span className="text-xs text-slate-500 font-medium">Author</span>
                         <span className="text-xs font-bold text-slate-800">{selectedDoc?.author}</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-xs text-slate-500 font-medium">Last Modified</span>
                         <span className="text-xs font-bold text-slate-800">{selectedDoc?.date}</span>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <Button className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 font-bold gap-2" onClick={() => handleDownload(selectedDoc?.name)}>
                   <Download size={18} /> Official Download
                </Button>
                <Button variant="outline" className="h-12 w-12 rounded-xl border-slate-100" onClick={() => setIsViewOpen(false)}>
                   <Eye size={18} className="text-slate-400" />
                </Button>
             </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

