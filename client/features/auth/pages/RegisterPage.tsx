import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Briefcase, ArrowRight, Building2 } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";
import { cn } from "@/lib/utils";

const REGISTER_ROLES = [
  "SUPER_ADMIN",
  "PROJECT_MANAGER",
  "CLIENT",
  "ARCHITECT",
  "CIVIL_ENGINEER",
] as const;

type RegisterRole = (typeof REGISTER_ROLES)[number];

const toPascalCaseRole = (role: RegisterRole) =>
  role
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const toBackendRole = (role: RegisterRole) => role;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<RegisterRole>("SUPER_ADMIN");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const roles = useMemo(
    () =>
      REGISTER_ROLES.map((item) => ({
        uiValue: item,
        label: toPascalCaseRole(item),
        backendValue: toBackendRole(item),
      })),
    [],
  );

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await authService.register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role: toBackendRole(role),
      });

      toast({
        title: "Registration successful",
        description: "Your account has been created. Please sign in.",
      });
      navigate("/login", { replace: true });
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-md group"
    >
      <div 
        className={cn(
          "relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300",
          "before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-blue-500/10 before:to-transparent before:opacity-50"
        )}
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/20">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
          <p className="mt-2 text-slate-400">Join Civiora Intelligence</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2 text-left">
            <div className="relative group/input">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/input:text-blue-500">
                <User size={18} />
              </div>
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 border-white/10 bg-white/5 pl-12 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                required
              />
            </div>
          </div>

          <div className="space-y-2 text-left">
            <div className="relative group/input">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/input:text-blue-500">
                <Mail size={18} />
              </div>
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-white/10 bg-white/5 pl-12 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                required
              />
            </div>
          </div>

          <div className="space-y-2 text-left">
            <div className="relative group/input">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/input:text-blue-500">
                <Lock size={18} />
              </div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-white/10 bg-white/5 pl-12 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                minLength={6}
                required
              />
            </div>
          </div>

          <div className="space-y-2 text-left">
            <div className="relative group/input">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/input:text-blue-500">
                <Briefcase size={18} />
              </div>
              <select
                className="flex h-12 w-full rounded-md border border-white/10 bg-white/5 pl-12 pr-4 text-sm text-white focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={role}
                onChange={(e) => setRole(e.target.value as RegisterRole)}
                required
              >
                {roles.map((item) => (
                  <option key={item.uiValue} value={item.uiValue} className="bg-[#1e293b] text-white">
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-sm font-medium text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20"
            >
              {error}
            </motion.p>
          )}

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="group relative h-12 w-full overflow-hidden rounded-xl bg-blue-600 font-bold text-white transition-all hover:bg-blue-500 active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? "Processing..." : "Register"}
              {!isSubmitting && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
            </span>
          </Button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-500 hover:text-blue-400 hover:underline transition-colors">
              Login
            </Link>
          </p>
        </form>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-[10px] text-slate-600 uppercase tracking-widest">
          Copyright © MH Cognition 2026 | Privacy Policy | Support
        </div>
      </div>
    </motion.div>
  );
}
