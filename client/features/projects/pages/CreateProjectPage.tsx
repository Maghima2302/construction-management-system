import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { projectService, ProjectClient } from "@/services/projectService";
import { toast } from "@/hooks/use-toast";

type ProjectPriority = "LOW" | "MEDIUM" | "HIGH";

interface CreateProjectFormState {
  name: string;
  clientId: string;
  budget: string;
  startDate: string;
  endDate: string;
  projectManagerId: string;
  priority: ProjectPriority;
  location: string;
  description: string;
  progressPercentage: string;
}

const INITIAL_FORM: CreateProjectFormState = {
  name: "",
  clientId: "",
  budget: "",
  startDate: "",
  endDate: "",
  projectManagerId: "",
  priority: "HIGH",
  location: "",
  description: "",
  progressPercentage: "0",
};

const toIso = (value: string) => new Date(value).toISOString();

export default function CreateProjectPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const canCreateProject = user?.role === "SUPER_ADMIN" || user?.role === "PROJECT_MANAGER";

  const [clients, setClients] = useState<ProjectClient[]>([]);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<CreateProjectFormState>(() => ({
    ...INITIAL_FORM,
    projectManagerId: user?.id ?? "",
  }));

  const isProjectManagerReadOnly = user?.role === "PROJECT_MANAGER";

  useEffect(() => {
    let cancelled = false;

    const loadClients = async () => {
      setIsLoadingClients(true);
      setError(null);
      try {
        const records = await projectService.fetchClients();
        if (!cancelled) {
          setClients(records);
        }
      } catch (loadError: unknown) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load clients.");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingClients(false);
        }
      }
    };

    void loadClients();

    return () => {
      cancelled = true;
    };
  }, []);

  const canSubmit = useMemo(() => {
    return (
      !isSubmitting &&
      !isLoadingClients &&
      Boolean(form.name.trim()) &&
      Boolean(form.clientId) &&
      Boolean(form.budget) &&
      Boolean(form.startDate) &&
      Boolean(form.endDate) &&
      Boolean(form.projectManagerId) &&
      Boolean(form.location.trim()) &&
      Boolean(form.description.trim())
    );
  }, [form, isLoadingClients, isSubmitting]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!canCreateProject) {
    return <Navigate to="/unauthorized" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const budget = Number(form.budget);
    const clientId = Number(form.clientId);
    const managerId = Number(form.projectManagerId);
    const progressPercentage = Number(form.progressPercentage);

    if (Number.isNaN(budget) || budget <= 0) {
      setError("Budget must be a valid positive number.");
      return;
    }

    if (Number.isNaN(clientId) || clientId <= 0) {
      setError("Please select a valid client.");
      return;
    }

    if (Number.isNaN(managerId) || managerId <= 0) {
      setError("Project manager id must be a valid number.");
      return;
    }

    if (Number.isNaN(progressPercentage) || progressPercentage < 0 || progressPercentage > 100) {
      setError("Progress percentage must be between 0 and 100.");
      return;
    }

    setIsSubmitting(true);
    try {
      await projectService.createProject({
        name: form.name.trim(),
        client_id: clientId,
        budget,
        start_date: toIso(form.startDate),
        end_date: toIso(form.endDate),
        project_manager_id: managerId,
        priority: form.priority,
        location: form.location.trim(),
        description: form.description.trim(),
        progress_percentage: progressPercentage,
      });

      toast({
        title: "Project created",
        description: "The project was created successfully.",
      });

      navigate("/projects", { replace: true });
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : "Failed to create project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Create Project</h1>
          <p className="text-sm text-muted-foreground">Only Super Admin and Project Manager can create new projects.</p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to="/projects">Back to projects</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Initialization Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Project Name</label>
              <Input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="New Construction Project"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Client</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={form.clientId}
                onChange={(event) => setForm((prev) => ({ ...prev, clientId: event.target.value }))}
                required
                disabled={isLoadingClients}
              >
                <option value="">{isLoadingClients ? "Loading clients..." : "Select client"}</option>
                {clients.map((client) => (
                  <option key={client.id} value={String(client.id)}>
                    {client.name} ({client.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Budget</label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={form.budget}
                onChange={(event) => setForm((prev) => ({ ...prev, budget: event.target.value }))}
                placeholder="500000.00"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Priority</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={form.priority}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    priority: event.target.value as ProjectPriority,
                  }))
                }
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="datetime-local"
                value={form.startDate}
                onChange={(event) => setForm((prev) => ({ ...prev, startDate: event.target.value }))}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="datetime-local"
                value={form.endDate}
                onChange={(event) => setForm((prev) => ({ ...prev, endDate: event.target.value }))}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Project Manager ID</label>
              <Input
                type="number"
                min="1"
                value={form.projectManagerId}
                onChange={(event) => setForm((prev) => ({ ...prev, projectManagerId: event.target.value }))}
                required
                disabled={isProjectManagerReadOnly}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Progress Percentage</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={form.progressPercentage}
                onChange={(event) => setForm((prev) => ({ ...prev, progressPercentage: event.target.value }))}
                required
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                value={form.location}
                onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
                placeholder="123 Main Street, City"
                required
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full min-h-28 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={form.description}
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                placeholder="A new construction project description"
                required
              />
            </div>

            {error && (
              <div className="md:col-span-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive flex items-start gap-2">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="md:col-span-2 flex items-center justify-end gap-2">
              <Button type="button" variant="outline" asChild>
                <Link to="/projects">Cancel</Link>
              </Button>
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Creating...
                  </span>
                ) : (
                  "Create Project"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
