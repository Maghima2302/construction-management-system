import { useState } from "react";
import {
   Settings,
   User,
   Bell,
   ShieldCheck,
   Globe,
   Palette,
   Save,
   Camera,
   Mail,
   Phone,
   Lock,
   Eye,
   EyeOff,
   Building2,
   HardHat,
   Moon,
   Sun,
   Laptop,
   FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/authStore";

const notificationChannels = [
   {
      title: "Project Milestones",
      desc: "Alert me when a major construction phase starts or is completed.",
      icon: <HardHat size={20} />,
      enabled: true,
      cadence: "Instant",
   },
   {
      title: "Financial Approvals",
      desc: "Get notified for pending payments, budget deviations, and approvals.",
      icon: <Globe size={20} />,
      enabled: true,
      cadence: "Within 5 minutes",
   },
   {
      title: "Direct Messages",
      desc: "Receive push and email notifications when a team member contacts you.",
      icon: <Mail size={20} />,
      enabled: true,
      cadence: "Instant",
   },
   {
      title: "Weekly Site Summaries",
      desc: "A digest of progress, blockers, photos, and key site observations.",
      icon: <FileText size={20} />,
      enabled: false,
      cadence: "Every Friday",
   },
];

const securityChecks = [
   { label: "Password age", value: "18 days old", status: "Healthy" },
   { label: "Active sessions", value: "2 trusted devices", status: "Reviewed" },
   { label: "MFA status", value: "Enabled for admin actions", status: "Protected" },
];

const themeOptions = [
   { id: "light", icon: <Sun size={24} />, label: "Alpine White", sub: "Standard light mode" },
   { id: "dark", icon: <Moon size={24} />, label: "Midnight Construction", sub: "Optimized dark mode" },
   { id: "system", icon: <Laptop size={24} />, label: "Dynamic OS", sub: "Follows device settings" },
];

const siteDefaults = [
   { label: "Measure system", value: "Metric (m, kg, m3)" },
   { label: "Base currency", value: "INR (Rs.)" },
   { label: "Timezone", value: "Asia/Kolkata" },
   { label: "Workweek", value: "Monday - Saturday" },
   { label: "Approval threshold", value: "Rs. 5,00,000" },
   { label: "Daily log sync", value: "Enabled from IoT gate passes" },
];

const activityLog = [
   {
      title: "Security policy updated",
      meta: "Today, 09:12 AM",
      detail: "MFA required for budget approvals and supplier sign-offs.",
   },
   {
      title: "Theme preference saved",
      meta: "Yesterday, 06:40 PM",
      detail: "Desktop and mobile surfaces will now follow system preference.",
   },
   {
      title: "Notification channel synced",
      meta: "2 days ago",
      detail: "Weekly site summary emails were routed to the operations inbox.",
   },
];

export default function SettingsPage() {
   const { user } = useAuthStore();
   const { toast } = useToast();
   const [showPassword, setShowPassword] = useState(false);
   const [isSaving, setIsSaving] = useState(false);
   const [selectedTheme, setSelectedTheme] = useState("light");

   const displayName = user?.name ?? "Aarav Mehta";
   const displayEmail = user?.email ?? "aarav.mehta@civiora.com";
   const displayRole = user?.role?.replace("_", " ") ?? "PROJECT MANAGER";
   const displayCompany = user?.company ?? "Civiora BuildWorks";

   const handleSave = () => {
      setIsSaving(true);
      setTimeout(() => {
         setIsSaving(false);
         toast({
            title: "Settings Updated",
            description: "Your preferences have been successfully synced with the cloud.",
         });
      }, 800);
   };

   return (
      <div className="mx-auto max-w-6xl space-y-8 pb-12">
         <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-6 md:flex-row md:items-center">
            <div className="space-y-2">
               <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-slate-900">
                  <span className="rounded-2xl bg-primary/10 p-2.5 text-primary">
                     <Settings size={28} />
                  </span>
                  System Settings
               </h1>
               <p className="max-w-2xl text-sm font-medium text-slate-500">
                  Manage your profile, notification channels, security controls, and project defaults from one place.
               </p>
            </div>

            <Button
               onClick={handleSave}
               disabled={isSaving}
               className="h-12 rounded-xl border-none bg-slate-900 px-6 font-bold text-white shadow-lg shadow-slate-200 gap-2"
            >
               {isSaving ? <Save size={18} className="animate-spin" /> : <Save size={18} />}
               {isSaving ? "Saving Changes..." : "Save Settings"}
            </Button>
         </div>

         <div className="grid gap-4 md:grid-cols-4">
            {[
               { label: "Profile completeness", value: "92%", note: "Avatar, email, and role are synced" },
               { label: "Active alerts", value: "4", note: "3 enabled, 1 muted" },
               { label: "Security posture", value: "Strong", note: "MFA and trusted device checks on" },
               { label: "Last synced", value: "2 min ago", note: "Cloud preferences saved successfully" },
            ].map((stat) => (
               <Card key={stat.label} className="border-none shadow-sm">
                  <CardContent className="space-y-2 p-5">
                     <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{stat.label}</p>
                     <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                     <p className="text-xs font-medium text-slate-500">{stat.note}</p>
                  </CardContent>
               </Card>
            ))}
         </div>

         <Tabs defaultValue="profile" className="flex flex-col gap-8 lg:flex-row">
            <TabsList className="flex h-auto items-start gap-2 bg-transparent p-0 lg:w-72 lg:flex-col">
               {[
                  { id: "profile", icon: <User size={18} />, label: "Public Profile" },
                  { id: "notifications", icon: <Bell size={18} />, label: "Communications" },
                  { id: "security", icon: <ShieldCheck size={18} />, label: "Security & Ops" },
                  { id: "project", icon: <Building2 size={18} />, label: "Site Defaults" },
                  { id: "appearance", icon: <Palette size={18} />, label: "Appearance" },
               ].map((tab) => (
                  <TabsTrigger
                     key={tab.id}
                     value={tab.id}
                     className="w-full justify-start gap-3 rounded-xl px-4 py-3 font-bold text-slate-500 transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
                  >
                     {tab.icon}
                     {tab.label}
                  </TabsTrigger>
               ))}
            </TabsList>

            <div className="flex-1 space-y-8">
               <TabsContent value="profile" className="m-0 focus-visible:outline-none">
                  <Card className="overflow-hidden rounded-[2.5rem] border-none shadow-xl">
                     <div className="relative h-32 bg-gradient-to-r from-primary via-sky-600 to-cyan-500" />
                     <CardContent className="relative z-10 -mt-12 p-10 pt-0">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                           <div className="flex items-end gap-6">
                              <div className="group relative h-32 w-32 overflow-hidden rounded-[2rem] border-4 border-white bg-white p-1 shadow-xl">
                                 <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0D8ABC&color=fff&size=128`}
                                    className="h-full w-full rounded-[1.8rem] object-cover"
                                    alt="avatar"
                                 />
                                 <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                    <Camera size={32} className="text-white" />
                                 </div>
                              </div>

                              <div className="space-y-1 pb-2">
                                 <h2 className="text-2xl font-black tracking-tight text-slate-900">{displayName}</h2>
                                 <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                                    {displayRole} - Site ID #4412
                                 </p>
                                 <div className="flex flex-wrap gap-2 pt-2">
                                    <Badge className="border-none bg-emerald-100 px-3 py-1 text-emerald-700 hover:bg-emerald-100">
                                       Verified Profile
                                    </Badge>
                                    <Badge variant="outline" className="border-slate-200 text-slate-600">
                                       {displayCompany}
                                    </Badge>
                                 </div>
                              </div>
                           </div>

                           <div className="rounded-3xl bg-slate-50 p-5 shadow-sm">
                              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Account snapshot</p>
                              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                 <div>
                                    <p className="text-xs text-slate-400">Primary email</p>
                                    <p className="font-bold text-slate-800">{displayEmail}</p>
                                 </div>
                                 <div>
                                    <p className="text-xs text-slate-400">Office location</p>
                                    <p className="font-bold text-slate-800">Mumbai HQ</p>
                                 </div>
                                 <div>
                                    <p className="text-xs text-slate-400">Last login</p>
                                    <p className="font-bold text-slate-800">Today, 08:24 AM</p>
                                 </div>
                                 <div>
                                    <p className="text-xs text-slate-400">Access tier</p>
                                    <p className="font-bold text-slate-800">Operations Lead</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                           <div className="space-y-2">
                              <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Name</Label>
                              <Input defaultValue={displayName} className="h-12 rounded-xl border-slate-100 bg-slate-50 font-medium focus:ring-primary/20" />
                           </div>
                           <div className="space-y-2">
                              <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                              <div className="relative">
                                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                 <Input defaultValue={displayEmail} className="h-12 rounded-xl border-slate-100 bg-slate-50 pl-10 font-medium focus:ring-primary/20" />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Phone Number</Label>
                              <div className="relative">
                                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                 <Input defaultValue="+91 98XXX XXXXX" className="h-12 rounded-xl border-slate-100 bg-slate-50 pl-10 font-medium focus:ring-primary/20" />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <Label className="text-xs font-black uppercase tracking-widest text-slate-400">User Group</Label>
                              <Input defaultValue="Internal Operations" readOnly className="h-12 rounded-xl border-slate-100 bg-slate-100 font-bold text-slate-400" />
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>

               <TabsContent value="notifications" className="m-0 focus-visible:outline-none">
                  <Card className="rounded-[2.5rem] border-none shadow-xl">
                     <CardHeader className="p-10 pb-6">
                        <CardTitle className="text-2xl font-black text-slate-900">Notification Channels</CardTitle>
                        <CardDescription className="font-medium">
                           Control how alerts are delivered across project workstreams.
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-6 p-10 pt-0">
                        {notificationChannels.map((item) => (
                           <div key={item.title} className="flex items-center justify-between gap-8 rounded-3xl border border-slate-100 bg-slate-50/70 p-5">
                              <div className="flex gap-4">
                                 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm">
                                    {item.icon}
                                 </div>
                                 <div className="space-y-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                       <h4 className="font-bold text-slate-900">{item.title}</h4>
                                       <Badge variant="outline" className="border-slate-200 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                                          {item.cadence}
                                       </Badge>
                                    </div>
                                    <p className="max-w-2xl text-xs font-medium leading-relaxed text-slate-500">{item.desc}</p>
                                 </div>
                              </div>
                              <Switch defaultChecked={item.enabled} />
                           </div>
                        ))}
                     </CardContent>
                  </Card>
               </TabsContent>

               <TabsContent value="security" className="m-0 focus-visible:outline-none">
                  <Card className="rounded-[2.5rem] border-none shadow-xl">
                     <CardHeader className="p-10 pb-6">
                        <CardTitle className="text-2xl font-black text-slate-900">Operational Security</CardTitle>
                        <CardDescription className="font-medium">
                           Protect your account with credential, session, and access controls.
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-10 p-10 pt-0">
                        <div className="grid gap-4 md:grid-cols-3">
                           {securityChecks.map((item) => (
                              <div key={item.label} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                                 <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                                 <p className="mt-2 text-lg font-black text-slate-900">{item.value}</p>
                                 <p className="mt-1 text-xs font-medium text-emerald-700">{item.status}</p>
                              </div>
                           ))}
                        </div>

                        <Separator className="bg-slate-100" />

                        <div className="space-y-6">
                           <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Change Credentials</h4>
                           <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                              <div className="space-y-2">
                                 <Label className="text-[10px] font-black uppercase text-slate-500">Current Security Key</Label>
                                 <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <Input type={showPassword ? "text" : "password"} defaultValue="••••••••••••" className="h-11 rounded-xl border-slate-100 bg-slate-50 pl-10" />
                                    <button
                                       type="button"
                                       onClick={() => setShowPassword((current) => !current)}
                                       className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-primary"
                                    >
                                       {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <Label className="text-[10px] font-black uppercase text-slate-500">New Password</Label>
                                 <Input type="password" placeholder="Min. 12 characters" className="h-11 rounded-xl border-slate-100 bg-slate-50" />
                              </div>
                           </div>
                        </div>

                        <div className="flex flex-col justify-between gap-4 rounded-[2rem] border border-indigo-100 bg-indigo-50/60 p-6 md:flex-row md:items-center">
                           <div className="flex gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                                 <ShieldCheck size={24} />
                              </div>
                              <div>
                                 <h4 className="font-bold text-indigo-900">Multi-Factor Authentication (MFA)</h4>
                                 <p className="text-xs font-medium text-indigo-700/60">
                                    Add an extra verification step for sensitive actions and approvals.
                                 </p>
                              </div>
                           </div>
                           <Button variant="outline" className="rounded-xl border-indigo-200 text-indigo-600 hover:bg-indigo-100">
                              Configure
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>

               <TabsContent value="appearance" className="m-0 focus-visible:outline-none">
                  <Card className="rounded-[2.5rem] border-none shadow-xl">
                     <CardHeader className="p-10 pb-6">
                        <CardTitle className="text-2xl font-black text-slate-900">Visual Experience</CardTitle>
                        <CardDescription className="font-medium">
                           Personalize how ConstructAI looks on desktop and tablet screens.
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="p-10 pt-0">
                        <div className="grid grid-cols-1 gap-6 pb-6 md:grid-cols-3">
                           {themeOptions.map((theme) => (
                              <button
                                 key={theme.id}
                                 type="button"
                                 onClick={() => setSelectedTheme(theme.id)}
                                 className={cn(
                                    "flex flex-col items-center rounded-[2rem] border-2 p-6 text-center transition-all",
                                    selectedTheme === theme.id
                                       ? "border-primary bg-primary/5 shadow-sm"
                                       : "border-slate-100 hover:border-primary/20 hover:bg-slate-50",
                                 )}
                              >
                                 <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm transition-all group-hover:text-primary">
                                    {theme.icon}
                                 </div>
                                 <h5 className="mb-1 text-sm font-bold text-slate-900">{theme.label}</h5>
                                 <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{theme.sub}</p>
                              </button>
                           ))}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                           {[
                              { label: "Selected theme", value: themeOptions.find((item) => item.id === selectedTheme)?.label ?? "Alpine White" },
                              { label: "Sidebar density", value: "Comfortable" },
                              { label: "Animation speed", value: "Medium" },
                              { label: "Text scaling", value: "100%" },
                           ].map((item) => (
                              <div key={item.label} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                                 <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                                 <p className="mt-2 text-lg font-black text-slate-900">{item.value}</p>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>

               <TabsContent value="project" className="m-0 focus-visible:outline-none">
                  <Card className="rounded-[2.5rem] border-none shadow-xl">
                     <CardHeader className="p-10 pb-6">
                        <CardTitle className="text-2xl font-black text-slate-900">Site-Wide Preferences</CardTitle>
                        <CardDescription className="font-medium">
                           Define default units, regional rules, and workspace behavior.
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-8 p-10 pt-0">
                        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
                           {siteDefaults.map((item) => (
                              <div key={item.label} className="space-y-2">
                                 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</Label>
                                 <Input defaultValue={item.value} readOnly className="h-11 rounded-xl border-slate-100 bg-slate-50" />
                              </div>
                           ))}
                           <div className="space-y-2 md:col-span-2">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Daily Log Auto-Draft</Label>
                              <div className="flex items-center gap-3 pt-2">
                                 <Switch defaultChecked />
                                 <span className="text-sm font-medium text-slate-600">Sync from IoT gate passes and site check-ins</span>
                              </div>
                           </div>
                        </div>

                        <Separator className="bg-slate-100" />

                        <div className="grid gap-4 xl:grid-cols-3">
                           {activityLog.map((item) => (
                              <div key={item.title} className="rounded-[2rem] border border-slate-100 bg-slate-50 p-5">
                                 <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{item.meta}</p>
                                 <h4 className="mt-2 font-bold text-slate-900">{item.title}</h4>
                                 <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">{item.detail}</p>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>
            </div>
         </Tabs>
      </div>
   );
}

