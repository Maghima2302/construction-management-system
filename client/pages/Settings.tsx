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
  Monitor,
  Moon,
  Sun,
  Laptop
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/authStore";

export default function SettingsPage() {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-primary/10 text-primary">
              <Settings size={28} />
            </span>
            System Settings
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Manage your profile, platform experience, and security protocols.</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="gap-2 bg-slate-900 border-none rounded-xl h-12 px-6 font-bold shadow-lg shadow-slate-200"
        >
          {isSaving ? <Save size={18} className="animate-spin" /> : <Save size={18} />}
          {isSaving ? "Saving Changes..." : "Global Save"}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="flex flex-col lg:flex-row gap-8">
        <TabsList className="flex lg:flex-col items-start bg-transparent h-auto p-0 gap-2 lg:w-64">
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
               className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm text-slate-500 font-bold transition-all"
             >
                {tab.icon}
                {tab.label}
             </TabsTrigger>
           ))}
        </TabsList>

        <div className="flex-1">
          {/* Profile Section */}
          <TabsContent value="profile" className="m-0 focus-visible:outline-none">
             <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden">
                <div className="h-32 bg-primary relative" />
                <CardContent className="p-10 pt-0 -mt-12 relative z-10">
                   <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                      <div className="flex items-end gap-6">
                         <div className="h-32 w-32 rounded-[2rem] bg-white p-1 border-4 border-white shadow-xl overflow-hidden group cursor-pointer relative">
                            <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff&size=128`} className="h-full w-full object-cover rounded-[1.8rem]" alt="avatar" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                               <Camera size={32} className="text-white" />
                            </div>
                         </div>
                         <div className="mb-2">
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">{user?.name}</h2>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{user?.role?.replace('_', ' ')} &bull; Site-ID #4412</p>
                         </div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-4 py-1.5 font-bold mb-2">Verified Profile</Badge>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-12 pb-4">
                      <div className="space-y-2">
                         <Label className="text-xs font-black uppercase text-slate-400 tracking-widest">Full Name</Label>
                         <Input defaultValue={user?.name} className="h-12 border-slate-100 bg-slate-50 rounded-xl font-medium focus:ring-primary/20" />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-black uppercase text-slate-400 tracking-widest">Email Address</Label>
                         <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <Input defaultValue={user?.email} className="pl-10 h-12 border-slate-100 bg-slate-50 rounded-xl font-medium focus:ring-primary/20" />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-black uppercase text-slate-400 tracking-widest">Phone Number</Label>
                         <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <Input defaultValue="+91 98XXX XXXXX" className="pl-10 h-12 border-slate-100 bg-slate-50 rounded-xl font-medium focus:ring-primary/20" />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-black uppercase text-slate-400 tracking-widest">User Group</Label>
                         <Input defaultValue="Internal Operations" readOnly className="h-12 border-slate-100 bg-slate-100 rounded-xl font-bold text-slate-400" />
                      </div>
                   </div>
                </CardContent>
             </Card>
          </TabsContent>

          {/* Notifications Section */}
          <TabsContent value="notifications" className="m-0 focus-visible:outline-none">
             <Card className="border-none shadow-xl rounded-[2.5rem]">
                <CardHeader className="p-10">
                   <CardTitle className="text-2xl font-black">Notification Channels</CardTitle>
                   <CardDescription className="font-medium">Define how and when you want to be alerted.</CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-0 space-y-10">
                   {[
                     { title: "Project Milestones", desc: "Alert me when a major construction phase is started or completed.", icon: <HardHat size={20} /> },
                     { title: "Financial Approvals", desc: "Get notified for pending payments or budget variance alerts.", icon: <Globe size={20} /> },
                     { title: "Direct Messages", desc: "Instant push notifications when a team member contacts you.", icon: <Mail size={20} /> },
                     { title: "Weekly Site Summaries", desc: "A detailed PDF digest of site progress and asset utilisation.", icon: <FileText size={20} /> },
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between gap-8 group">
                        <div className="flex gap-4">
                           <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                              {item.icon}
                           </div>
                           <div className="space-y-1">
                              <h4 className="font-bold text-slate-800">{item.title}</h4>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                           </div>
                        </div>
                        <Switch defaultChecked />
                     </div>
                   ))}
                </CardContent>
             </Card>
          </TabsContent>

          {/* Security Section */}
          <TabsContent value="security" className="m-0 focus-visible:outline-none">
             <Card className="border-none shadow-xl rounded-[2.5rem]">
                <CardHeader className="p-10">
                   <CardTitle className="text-2xl font-black text-slate-800">Operational Security</CardTitle>
                   <CardDescription className="font-medium">Mandatory safety protocols and account protection.</CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-0 space-y-10">
                   <div className="space-y-6">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Change Credentials</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500">Current Security Key</Label>
                            <div className="relative">
                               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                               <Input type={showPassword ? "text" : "password"} defaultValue="••••••••••••" className="pl-10 h-11 border-slate-100 bg-slate-50 rounded-xl" />
                               <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                               </button>
                            </div>
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-500">New Password</Label>
                            <Input type="password" placeholder="Min. 12 characters" className="h-11 border-slate-100 bg-slate-50 rounded-xl" />
                         </div>
                      </div>
                   </div>

                   <Separator className="bg-slate-100" />

                   <div className="flex items-center justify-between p-6 rounded-[2rem] bg-indigo-50/50 border border-indigo-100">
                      <div className="flex gap-4">
                         <div className="h-12 w-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <ShieldCheck size={24} />
                         </div>
                         <div>
                            <h4 className="font-bold text-indigo-900">Multi-Factor Authentication (MFA)</h4>
                            <p className="text-xs text-indigo-700/60 font-medium">Add an extra layer of security to your site-ID.</p>
                         </div>
                      </div>
                      <Button variant="outline" className="rounded-xl border-indigo-200 text-indigo-600 hover:bg-indigo-100">Configure</Button>
                   </div>
                </CardContent>
             </Card>
          </TabsContent>

          {/* Appearance Section */}
          <TabsContent value="appearance" className="m-0 focus-visible:outline-none">
             <Card className="border-none shadow-xl rounded-[2.5rem]">
                <CardHeader className="p-10">
                   <CardTitle className="text-2xl font-black">Visual Experience</CardTitle>
                   <CardDescription className="font-medium">Personalise how ConstructAI appears on your workstation.</CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-0">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-4">
                      {[
                        { id: "light", icon: <Sun size={24} />, label: "Alpine White", sub: "Standard Light Mode" },
                        { id: "dark", icon: <Moon size={24} />, label: "Midnight Construction", sub: "Optimised Dark Mode" },
                        { id: "system", icon: <Laptop size={24} />, label: "Dynamic OS", sub: "Follows Device Settings" },
                      ].map((theme) => (
                        <div key={theme.id} className={cn(
                          "p-6 rounded-[2rem] border-2 cursor-pointer transition-all flex flex-col items-center text-center group",
                          theme.id === "light" ? "border-primary bg-primary/5" : "border-slate-100 hover:border-primary/20 hover:bg-slate-50"
                        )}>
                           <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary transition-all mb-4">
                              {theme.icon}
                           </div>
                           <h5 className="font-bold text-slate-800 text-sm mb-1">{theme.label}</h5>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{theme.sub}</p>
                        </div>
                      ))}
                   </div>
                </CardContent>
             </Card>
          </TabsContent>

          {/* Project Preferences Section */}
          <TabsContent value="project" className="m-0 focus-visible:outline-none">
             <Card className="border-none shadow-xl rounded-[2.5rem]">
                <CardHeader className="p-10">
                   <CardTitle className="text-2xl font-black text-slate-800">Site-Wide Preferences</CardTitle>
                   <CardDescription className="font-medium">Define default units and regional protocols for your projects.</CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-0 space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                      <div className="space-y-2">
                         <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Measure System</Label>
                         <Input defaultValue="Metric (m, kg, m³)" readOnly className="h-11 border-slate-100 bg-slate-50 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Base Currency</Label>
                         <Input defaultValue="INR (₹)" readOnly className="h-11 border-slate-100 bg-slate-50 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Daily Log Auto-Draft</Label>
                         <div className="flex items-center gap-3 pt-2">
                            <Switch defaultChecked />
                            <span className="text-sm font-medium text-slate-600">Sync from IoT gate passes</span>
                         </div>
                      </div>
                   </div>
                </CardContent>
             </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

