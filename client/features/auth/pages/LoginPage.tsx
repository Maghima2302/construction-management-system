import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Building2, Mail, Lock, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { DASHBOARD_PATH_BY_ROLE } from "@/constants/rbac";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { authService } from "@/services/authService";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSession, isAuthenticated, user, token, getDashboardPath } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const fromPath = (location.state as { from?: { pathname?: string } } | undefined)?.from?.pathname;

  if (isAuthenticated && user && token) {
    return <Navigate to={fromPath || getDashboardPath()} replace />;
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await authService.login({ email, password });
      setSession(result);
      navigate(fromPath || DASHBOARD_PATH_BY_ROLE[result.user.role], { replace: true });
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
        {/* Header / Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/20">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <div className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight">
            Civiora 
            <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-slate-400">Sign in to continue</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
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

          {/* Password Field */}
          <div className="space-y-2">
            <div className="relative group/input">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/input:text-blue-500">
                <Lock size={18} />
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-white/10 bg-white/5 pl-12 pr-12 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="border-white/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
              <label htmlFor="remember" className="text-sm font-medium text-slate-400 cursor-pointer hover:text-slate-300">
                Remember me
              </label>
            </div>
            <Link to="#" className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors">
              Forgot password?
            </Link>
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
              {isSubmitting ? "Signing in..." : "Sign In"}
              {!isSubmitting && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
            </span>
          </Button>

          {/* Register Link */}
          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-500 hover:text-blue-400 hover:underline transition-colors">
              Register
            </Link>
          </p>
        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-[10px] text-slate-600 uppercase tracking-widest">
          Copyright © MH Cognition 2026 | Privacy Policy | Support
        </div>
      </div>
    </motion.div>
  );
}
