import { useState } from "react";
import { 
  List, 
  GanttChartSquare, 
  Plus, 
  Filter, 
  Search,
  MoreVertical,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import GanttChart from "@/components/charts/GanttChart";
import { cn } from "@/lib/utils";

// Dummy Data
const MOCK_TASKS = [
  { id: 1, task: "Site Excavation", phase: "Groundwork", assigned: "Civil Team A", start: "2024-04-01", end: "2024-04-10", duration: 10, status: "Completed", priority: "High" },
  { id: 2, task: "Foundation Pouring", phase: "Groundwork", assigned: "Concrete Crew", start: "2024-04-11", end: "2024-04-20", duration: 10, status: "In Progress", priority: "High" },
  { id: 3, task: "Steel Reinforcement", phase: "Structure", assigned: "Ironworks Ltd", start: "2024-04-21", end: "2024-05-05", duration: 15, status: "Pending", priority: "Medium" },
  { id: 4, task: "Formwork Installation", phase: "Structure", assigned: "Civil Team B", start: "2024-05-06", end: "2024-05-15", duration: 10, status: "Pending", priority: "Medium" },
  { id: 5, task: "Electrical Conduit Laying", phase: "Systems", assigned: "Volt Masters", start: "2024-05-16", end: "2024-05-25", duration: 10, status: "Pending", priority: "Low" },
  { id: 6, task: "Plumbing Rough-in", phase: "Systems", assigned: "Flow Solutions", start: "2024-05-16", end: "2024-05-22", duration: 7, status: "Pending", priority: "Medium" },
  { id: 7, task: "Roof Decking", phase: "Finishing", assigned: "Top Decking", start: "2024-05-26", end: "2024-06-05", duration: 11, status: "Pending", priority: "High" },
];

export default function Scheduling() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("timeline");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTasks = MOCK_TASKS.filter(t => 
    t.task.toLowerCase().includes(search.toLowerCase()) || 
    t.phase.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Timeline</h1>
          <p className="text-muted-foreground">Manage and track project milestones, phases, and daily task schedules.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter size={16} /> Filter
          </Button>
          
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                <Plus size={16} /> New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-3xl p-8 overflow-hidden">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Add New Schedule Task</DialogTitle>
                <DialogDescription>
                  Enter the details for the new project milestone or task.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="taskName">Task Name</Label>
                  <Input id="taskName" placeholder="e.g., Concrete Pouring Phase 1" className="bg-slate-50 border-none h-11" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phase">Phase</Label>
                    <Input id="phase" placeholder="e.g., Groundwork" className="bg-slate-50 border-none h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <select className="flex h-11 w-full rounded-md border-none bg-slate-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start">Start Date</Label>
                    <Input id="start" type="date" className="bg-slate-50 border-none h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (Days)</Label>
                    <Input id="duration" type="number" className="bg-slate-50 border-none h-11" />
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0 font-semibold">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsModalOpen(false)} className="bg-primary px-8">Create Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-emerald-50/50 border-emerald-100 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Completed</p>
              <h3 className="text-2xl font-bold text-emerald-700">12</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50/50 border-amber-100 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">In Progress</p>
              <h3 className="text-2xl font-bold text-amber-700">08</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Clock size={20} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50/50 border-blue-100 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">On Hold</p>
              <h3 className="text-2xl font-bold text-blue-700">02</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <AlertCircle size={20} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-50 border-slate-200 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Tasks</p>
              <h3 className="text-2xl font-bold text-slate-700">45</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <List size={20} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm">
        <Tabs defaultValue="timeline" className="w-full" onValueChange={setView}>
          <div className="px-6 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <TabsList className="grid grid-cols-2 w-full md:w-[350px] h-[48px] p-1 bg-slate-100/80 shadow-inner rounded-xl">
              <TabsTrigger value="timeline" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                <GanttChartSquare size={16} /> Timeline View
              </TabsTrigger>
              <TabsTrigger value="list" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                <List size={16} /> List
              </TabsTrigger>
            </TabsList>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Find tasks, phases, teams..." 
                className="pl-9 bg-white border-2 border-slate-100 focus:border-primary/20 h-11 rounded-xl shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <CardContent className="p-6">
            <TabsContent value="timeline" className="mt-0">
              <div className="p-6 bg-white rounded-2xl border-2 border-slate-50 shadow-sm">
                <GanttChart 
                  title="Project Master Schedule - Q2 2024"
                  tasks={filteredTasks.map(t => ({
                    taskName: t.task,
                    durationDays: t.duration,
                    completionStatus: t.status as any
                  }))} 
                />
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <div className="rounded-2xl border-2 border-slate-50 overflow-hidden bg-white shadow-sm">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-bold text-slate-500 h-12">Task Name</TableHead>
                      <TableHead className="font-bold text-slate-500 h-12">Phase</TableHead>
                      <TableHead className="font-bold text-slate-500 h-12">Assigned To</TableHead>
                      <TableHead className="font-bold text-slate-500 h-12">Date Range</TableHead>
                      <TableHead className="font-bold text-slate-500 h-12">Priority</TableHead>
                      <TableHead className="font-bold text-slate-500 h-12">Status</TableHead>
                      <TableHead className="text-right h-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks.map((task) => (
                      <TableRow key={task.id} className="hover:bg-slate-50/50 transition-colors h-16">
                        <TableCell className="font-bold text-slate-700">{task.task}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 font-bold text-[10px]">
                            {task.phase}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600 font-medium text-sm">{task.assigned}</TableCell>
                        <TableCell className="text-slate-500 text-xs font-mono">
                          {task.start} &rarr; {task.end}
                        </TableCell>
                        <TableCell>
                          <div className={cn(
                            "inline-flex items-center gap-2 px-2 py-1 rounded-lg text-xs font-bold",
                            task.priority === "High" ? "text-red-600 bg-red-50" :
                            task.priority === "Medium" ? "text-amber-600 bg-amber-50" : "text-emerald-600 bg-emerald-50"
                          )}>
                            <span className={cn(
                              "h-2 w-2 rounded-full",
                              task.priority === "High" ? "bg-red-500 animate-pulse" :
                              task.priority === "Medium" ? "bg-amber-500" : "bg-emerald-500"
                            )} />
                            {task.priority}
                          </div>
                        </TableCell>
                        <TableCell>
                           <Badge variant="secondary" className={cn(
                             "text-[9px] uppercase font-black px-2.5 py-1 shadow-sm",
                             task.status === "Completed" ? "bg-emerald-100 text-emerald-700" :
                             task.status === "In Progress" ? "bg-amber-100 text-amber-700" :
                             "bg-slate-100 text-slate-600"
                           )}>
                             {task.status}
                           </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-primary transition-colors">
                            <MoreVertical size={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
      
      {/* Legend & Help */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest px-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5 group cursor-help">
            <span className="h-3.5 w-3.5 rounded-full bg-emerald-500 shadow-md shadow-emerald-100 group-hover:scale-125 transition-transform" /> Completed
          </div>
          <div className="flex items-center gap-2.5 group cursor-help">
            <span className="h-3.5 w-3.5 rounded-full bg-amber-500 shadow-md shadow-amber-100 group-hover:scale-125 transition-transform" /> Active
          </div>
          <div className="flex items-center gap-2.5 group cursor-help">
            <span className="h-3.5 w-3.5 rounded-full bg-slate-400 shadow-md shadow-slate-100 group-hover:scale-125 transition-transform" /> Planned
          </div>
        </div>
        <p className="flex items-center gap-2">
          <Sparkles size={14} className="text-primary" />
          AI Sync: Today at 02:45 PM
        </p>
      </div>
    </div>
  );
}
