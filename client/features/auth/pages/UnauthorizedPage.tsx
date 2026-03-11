import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="mx-auto mt-20 max-w-xl text-center">
      <h1 className="text-3xl font-semibold">Access Denied</h1>
      <p className="mt-2 text-muted-foreground">
        Your role does not have permission to access this module.
      </p>
      <Button asChild className="mt-6">
        <Link to="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
}
