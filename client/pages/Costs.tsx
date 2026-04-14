import { useState } from "react";
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  Calendar as CalendarIcon, 
  FileText,
  Search,
  Filter,
  Download,
  AlertTriangle,
  CheckCircle2,
  PieChart as PieIcon,
  Receipt,
  Clock,
  Box,
  Layers,
  MapPin,
  Truck
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import AnalyticsChart from "@/components/charts/AnalyticsChart";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Dummy Data
const MOCK_INVENTORY = [
  { item: "Portland Cement", stock: 85, unit: "Bags", status: "Healthy", location: "Warehouse A" },
  { item: "Steel Fe500D", stock: 22, unit: "Tons", status: "Low Stock", location: "Site Yard 1" },
  { item: "Sand Aggregates", stock: 120, unit: "m3", status: "Healthy", location: "Warehouse B" },
  { item: "Wood Ply (12mm)", stock: 450, unit: "Sheets", status: "Healthy", location: "Warehouse A" },
  { item: "Coarse Aggregates", stock: 12, unit: "m3", status: "Critically Low", location: "Warehouse B" },
];

// Dummy Data
const MOCK_COST_DATA = {
  summary: {
    totalBudget: 4500000,
    actualSpent: 2850000,
    remainingBalance: 1650000,
    spentPercent: 63.3,
    variance: -150000, // Under budget
  },
  spendingTrends: [
    { month: "Jan", amount: 250000 },
    { month: "Feb", amount: 480000 },
    { month: "Mar", amount: 820000 },
    { month: "Apr", amount: 650000 },
    { month: "May", amount: 650000 },
  ],
  categoryBreakdown: [
    { category: "Materials", estimated: 1800000, actual: 1250000, variance: -550000, status: "Under Control" },
    { category: "Labour", estimated: 1200000, actual: 950000, variance: -250000, status: "Under Control" },
    { category: "Equipment", estimated: 600000, actual: 420000, variance: -180000, status: "Under Control" },
    { category: "Overheads", estimated: 400000, actual: 230000, variance: -170000, status: "Under Control" },
  ],
  paymentSchedule: [
    { id: "PAY-001", description: "Advance Payment - Concrete Crew", amount: 450000, date: "2024-04-05", status: "Paid", type: "Bank Transfer" },
    { id: "PAY-002", description: "Material Procurement - Steel Bars", amount: 820000, date: "2024-04-12", status: "Paid", type: "Wire" },
    { id: "PAY-003", description: "Equpiment Rental - Crane Service", amount: 125000, date: "2024-04-20", status: "Processing", type: "Invoice" },
    { id: "PAY-004", description: "Bi-weekly Labour Wages", amount: 320000, date: "2024-05-01", status: "Scheduled", type: "Bank Transfer" },
    { id: "PAY-005", description: "Foundation Compliance Inspection", amount: 45000, date: "2024-05-10", status: "Upcoming", type: "Credit" },
  ],
  lineItems: [
    { item: "Portland Cement (CEM I 42.5N)", unit: "Bags", quantity: 500, rate: 450, total: 225000, status: "Settled" },
    { item: "Steel Reinforcement TMT Fe500D", unit: "Tons", quantity: 12, rate: 68500, total: 822000, status: "Settled" },
    { item: "Crushed Stone Aggregates (20mm)", unit: "m3", quantity: 80, rate: 3200, total: 256000, status: "Settled" },
    { item: "Ready-Mix Concrete (M25)", unit: "m3", quantity: 150, rate: 5800, total: 870000, status: "Partial" },
    { item: "Safety Gear & PPE Kit", unit: "Set", quantity: 50, rate: 2400, total: 120000, status: "Settled" },
  ]
};

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function Costs() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);

  const handleAuditRequest = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      toast({
        title: "Audit Dispatch Successful",
        description: "An inventory audit request has been sent to the onsite warehouse managers.",
      });
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center gap-2 underline decoration-primary/20 decoration-4 underline-offset-8">
            <DollarSign className="text-primary" /> Budget & Cost Control
          </h1>
          <p className="text-muted-foreground mt-3 font-medium">Manage project finances, monitor variances, and track payment schedules.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 border-slate-200">
            <Download size={16} /> Export Report
          </Button>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                <PlusIcon size={16} /> Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] rounded-3xl p-8">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Record New Expense</DialogTitle>
                <DialogDescription>
                  Enter details for a new expenditure, material purchase, or service payment.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="desc">Expense Description</Label>
                  <Input id="desc" placeholder="e.g., Cement Bags Purchase - Phase 2" className="bg-slate-50 border-none h-11" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cat">Category</Label>
                    <select id="cat" className="flex h-11 w-full rounded-md border-none bg-slate-50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option>Materials</option>
                      <option>Labour</option>
                      <option>Equipment</option>
                      <option>Overheads</option>
                      <option>Logistics</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input id="amount" type="number" placeholder="0.00" className="bg-slate-50 border-none h-11" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ref">Reference / Invoice #</Label>
                    <Input id="ref" placeholder="INV-2024-..." className="bg-slate-50 border-none h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Transaction Date</Label>
                    <Input id="date" type="date" className="bg-slate-50 border-none h-11" />
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0 font-semibold">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Discard</Button>
                <Button onClick={() => setIsModalOpen(false)} className="bg-primary px-8">Confirm Entry</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Primary Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card className="border-none shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-10 transform scale-150 group-hover:rotate-12 transition-transform">
            <Wallet size={120} />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Total Allocated Budget</CardDescription>
            <CardTitle className="text-3xl font-black">{formatCurrency(MOCK_COST_DATA.summary.totalBudget)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
              <TrendingUp size={14} /> Fixed Price Contract
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white overflow-hidden relative group">
           <CardHeader className="pb-2">
            <CardDescription className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Current Expenditure</CardDescription>
            <CardTitle className="text-3xl font-black text-slate-900">{formatCurrency(MOCK_COST_DATA.summary.actualSpent)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex justify-between items-end mb-1">
                <span className="text-xs font-bold text-slate-500">{MOCK_COST_DATA.summary.spentPercent}% Consumed</span>
                <span className="text-xs font-bold text-primary">Budget Cap: 95%</span>
             </div>
             <Progress value={MOCK_COST_DATA.summary.spentPercent} className="h-2.5 bg-slate-100" />
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-emerald-50 overflow-hidden relative group">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-600/70 font-bold uppercase tracking-wider text-[10px]">Remaining Balance</CardDescription>
            <CardTitle className="text-3xl font-black text-emerald-700">{formatCurrency(MOCK_COST_DATA.summary.remainingBalance)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
              <ArrowDownRight size={14} /> {formatCurrency(Math.abs(MOCK_COST_DATA.summary.variance))} Saving
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white md:col-span-3 xl:col-span-1 border-2 border-slate-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <PieIcon size={16} className="text-primary" /> Allocation Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Materials</span>
                <span className="font-bold">44%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Labour</span>
                <span className="font-bold">33%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Equip / Misc</span>
                <span className="font-bold">23%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="breakdown" className="w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <TabsList className="bg-slate-100 p-1 rounded-xl h-11">
            <TabsTrigger value="breakdown" className="rounded-lg gap-2 data-[state=active]:shadow-md">
              <PieIcon size={14} /> Cost Analysis
            </TabsTrigger>
            <TabsTrigger value="payments" className="rounded-lg gap-2 data-[state=active]:shadow-md">
              <CreditCard size={14} /> Payments Hub
            </TabsTrigger>
            <TabsTrigger value="reporting" className="rounded-lg gap-2 data-[state=active]:shadow-md">
              <Receipt size={14} /> Itemized Billing
            </TabsTrigger>
          </TabsList>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input 
              placeholder="Filter payments or items..." 
              className="pl-10 border-slate-200 h-11 rounded-xl shadow-sm focus:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Cost Analysis Tab */}
        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-lg">Spend Trend</CardTitle>
                <CardDescription>Monthly cumulative expenditure vs budget</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <AnalyticsChart 
                  data={MOCK_COST_DATA.spendingTrends} 
                  xKey="month" 
                  yKey="amount" 
                  mode="bar" 
                  color="hsl(var(--primary))" 
                />
              </CardContent>
            </Card>

            <div className="space-y-4">
              {MOCK_COST_DATA.categoryBreakdown.map((cat, i) => (
                <Card key={i} className="border-2 border-slate-50 shadow-none hover:border-primary/20 transition-all group">
                  <CardContent className="p-4 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {cat.category === "Materials" ? <Wallet size={18} /> : 
                         cat.category === "Labour" ? <UsersIcon size={18} /> : 
                         <Receipt size={18} />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{cat.category}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{cat.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-900">{formatCurrency(cat.actual)}</p>
                      <p className="text-xs text-slate-500 font-medium">of {formatCurrency(cat.estimated)} Est.</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Payments Hub Tab */}
        <TabsContent value="payments">
          <Card className="border-none shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-bold text-[10px] uppercase tracking-widest text-slate-500">Transaction ID</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase tracking-widest text-slate-500">Description</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase tracking-widest text-slate-500">Due/Paid Date</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase tracking-widest text-slate-500">Method</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase tracking-widest text-slate-500">Amount</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase tracking-widest text-slate-500">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_COST_DATA.paymentSchedule.map((p) => (
                  <TableRow key={p.id} className="hover:bg-slate-50 group">
                    <TableCell className="font-bold text-slate-400 text-xs">{p.id}</TableCell>
                    <TableCell className="font-semibold text-slate-800">{p.description}</TableCell>
                    <TableCell className="text-slate-600 text-xs">
                       <span className="flex items-center gap-1.5"><CalendarIcon size={12} /> {p.date}</span>
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">{p.type}</TableCell>
                    <TableCell className="font-bold text-slate-900">{formatCurrency(p.amount)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn(
                        "text-[9px] uppercase font-black px-2.5 shadow-none",
                        p.status === "Paid" ? "bg-emerald-100 text-emerald-700" :
                        p.status === "Processing" ? "bg-amber-100 text-amber-700" :
                        "bg-slate-100 text-slate-600"
                      )}>
                        {p.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Itemized Billing Tab */}
        <TabsContent value="reporting">
          <Card className="border-none shadow-sm">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-slate-800">Procurement Items</h3>
                <p className="text-xs text-slate-500">Detailed list of materials and services settled to date</p>
              </div>
              <Sheet open={isInventoryOpen} onOpenChange={setIsInventoryOpen}>
                <SheetTrigger asChild>
                  <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/5 font-bold uppercase text-[10px] tracking-widest">
                    See Inventory →
                  </Button>
                </SheetTrigger>
                <SheetContent className="sm:max-w-md border-l-0 shadow-2xl p-0 overflow-hidden">
                  <div className="h-full flex flex-col">
                    <div className="p-8 bg-slate-900 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Box size={140} />
                      </div>
                      <SheetHeader className="relative z-10">
                        <SheetTitle className="text-2xl font-black text-white">Project Inventory</SheetTitle>
                        <SheetDescription className="text-slate-400 font-medium">
                          Real-time stock levels of critical construction materials.
                        </SheetDescription>
                      </SheetHeader>
                    </div>

                    <ScrollArea className="flex-1 p-6">
                      <div className="space-y-6">
                        {MOCK_INVENTORY.map((item, i) => (
                          <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-primary/20 transition-all shadow-sm group">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                                  <Layers size={20} />
                                </div>
                                <div>
                                  <h4 className="font-bold text-slate-800">{item.item}</h4>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                    <MapPin size={10} /> {item.location}
                                  </p>
                                </div>
                              </div>
                              <Badge className={cn(
                                "text-[9px] font-black uppercase tracking-wider",
                                item.status === "Healthy" ? "bg-emerald-100 text-emerald-700" :
                                item.status === "Low Stock" ? "bg-amber-100 text-amber-700" :
                                "bg-red-100 text-red-700"
                              )}>
                                {item.status}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-slate-500 font-medium">Available Units</span>
                                <span className="font-black text-slate-800">{item.stock} {item.unit}</span>
                              </div>
                              <Progress 
                                value={item.stock > 100 ? 100 : item.stock} 
                                className={cn(
                                  "h-1.5 bg-slate-100",
                                  item.status === "Healthy" ? "[&>div]:bg-emerald-500" :
                                  item.status === "Low Stock" ? "[&>div]:bg-amber-500" :
                                  "[&>div]:bg-red-500"
                                )} 
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <Card className="mt-8 bg-primary/5 border-dashed border-primary/20 shadow-none rounded-2xl">
                        <CardContent className="p-4 flex items-center gap-4">
                          <Truck className="text-primary" />
                          <div>
                            <p className="text-xs font-bold text-primary uppercase tracking-widest">Next Restock</p>
                            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                              Planned for <strong>Steel Fe500D</strong> on Friday, April 19th.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollArea>
                    <div className="p-6 border-t bg-slate-50">
                       <Button 
                         className="w-full h-12 rounded-xl font-bold gap-2 bg-slate-900 hover:bg-slate-800 text-white"
                         onClick={handleAuditRequest}
                         disabled={isAuditing}
                       >
                         {isAuditing ? (
                           <span className="flex items-center gap-2 animate-pulse">
                             <Clock size={18} className="animate-spin" /> Dispatching Audit...
                           </span>
                         ) : (
                           <>
                             <Download size={18} /> Request Inventory Audit
                           </>
                         )}
                       </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="text-[10px] font-black uppercase text-slate-400">Material/Item</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-400">Unit</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-400">Qty</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-400 text-right">Rate</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-400 text-right">Total Settled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_COST_DATA.lineItems.map((item, idx) => (
                  <TableRow key={idx} className="h-14">
                    <TableCell className="font-bold text-slate-700">{item.item}</TableCell>
                    <TableCell className="text-slate-500 text-sm italic">{item.unit}</TableCell>
                    <TableCell className="font-medium">{item.quantity}</TableCell>
                    <TableCell className="text-right text-slate-600 text-sm font-semibold">{formatCurrency(item.rate)}</TableCell>
                    <TableCell className="text-right">
                       <span className="font-black text-slate-900">{formatCurrency(item.total)}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Financial Health Alert */}
      <Card className="border-l-4 border-l-amber-500 bg-amber-50/50 shadow-none">
        <CardContent className="p-4 flex items-start gap-4">
          <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-amber-900 text-sm">Financial Forecast Insight</h4>
            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
              Based on current procurement rates, you are on track to save approximately <strong>4.2%</strong> of the total budget. However, equipment rental costs for Phase 3 (Systems) are projected to rise by 12% next month. Consider pre-booking resources now to lock in current rates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const PlusIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="M12 5v14" />
  </svg>
);

const UsersIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

