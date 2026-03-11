import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function RoleDashboardRedirect() {
  const getDashboardPath = useAuthStore((state) => state.getDashboardPath);
  return <Navigate to={getDashboardPath()} replace />;
}
