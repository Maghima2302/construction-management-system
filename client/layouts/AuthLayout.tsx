import { Building2 } from "lucide-react";
import { Outlet } from "react-router-dom";
import loginHero from "@/assets/login-hero.svg";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background grid lg:grid-cols-2">
      <div className="hidden lg:flex bg-primary text-primary-foreground p-12 flex-col justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Building2 className="text-accent" />
          Civiora AI Construction Cloud
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-3">Build smarter with role-specific intelligence.</h1>
          <p className="text-primary-foreground/80">
            Unified dashboard for Project Managers, Architects, Engineers, Clients, and Platform Admins.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden border border-white/20 bg-white/5 p-2">
          <img src={loginHero} alt="Construction analytics dashboard preview" className="w-full h-auto rounded-lg" />
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <Outlet />
      </div>
    </div>
  );
}
