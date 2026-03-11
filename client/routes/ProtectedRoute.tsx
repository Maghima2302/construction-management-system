import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserRole } from "@/types/auth";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const location = useLocation();
  const { isAuthenticated, user, token } = useAuthStore();
  const hasValidSession = isAuthenticated && !!user && !!token;

  if (!hasValidSession) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role as UserRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
