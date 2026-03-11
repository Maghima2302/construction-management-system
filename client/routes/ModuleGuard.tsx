import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface ModuleGuardProps {
  moduleKey: string;
  children: React.ReactNode;
}

export default function ModuleGuard({ moduleKey, children }: ModuleGuardProps) {
  const hasModuleAccess = useAuthStore((state) => state.hasModuleAccess);

  if (!hasModuleAccess(moduleKey)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
