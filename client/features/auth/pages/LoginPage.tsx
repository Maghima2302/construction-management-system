import { FormEvent, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { DEMO_USERS } from "@/constants/mockAuth";
import { ROLE_LABELS } from "@/constants/rbac";
import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, isAuthenticated, user, token, getDashboardPath } = useAuthStore();
  const [email, setEmail] = useState(DEMO_USERS[0].user.email);
  const [password, setPassword] = useState(DEMO_USERS[0].password);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const fromPath = (location.state as { from?: { pathname?: string } } | undefined)?.from?.pathname;

  const roleCredentials = useMemo(() => DEMO_USERS, []);

  if (isAuthenticated && user && token) {
    return <Navigate to={fromPath || getDashboardPath()} replace />;
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const result = login({ email, password });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate(fromPath || "/dashboard", { replace: true });
  };

  const fillCredentials = (selectedEmail: string, selectedPassword: string) => {
    setEmail(selectedEmail);
    setPassword(selectedPassword);
    setError(null);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound size={18} /> Sign in to Civiora
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              className="w-full rounded-md border border-input px-3 py-2"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                className="w-full rounded-md border border-input px-3 py-2 pr-10"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <div className="mt-5 rounded-md border border-border p-3">
          <p className="text-xs font-semibold mb-3">Credentials for each user</p>
          <div className="grid gap-2 md:grid-cols-2">
            {roleCredentials.map((record) => (
              <button
                key={record.user.id}
                type="button"
                onClick={() => fillCredentials(record.user.email, record.password)}
                className="rounded-md border border-border p-2 text-left hover:bg-muted/40 transition-colors"
              >
                <p className="text-xs font-semibold">{ROLE_LABELS[record.user.role]}</p>
                <p className="text-xs text-muted-foreground mt-1">{record.user.email}</p>
                <p className="text-xs text-muted-foreground">{record.password}</p>
              </button>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">Tap any role card to auto-fill login form.</p>
        </div>
      </CardContent>
    </Card>
  );
}
