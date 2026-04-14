import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMyProjectDetail } from "@/hooks/useMyProjectDetail";
import { useMilestones } from "@/hooks/useMilestones";
import { useMyProjects } from "@/hooks/useMyProjects";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock, Flag, CheckCircle2, AlertTriangle } from "lucide-react";

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function ProjectMilestonesPage() {
  const { projectId: routeProjectId } = useParams<{ projectId?: string }>();
  const navigate = useNavigate();
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError,
  } = useMyProjects({ page: 1, page_size: 100 });

  useEffect(() => {
    if (routeProjectId) {
      setSelectedProjectId(routeProjectId);
    }
  }, [routeProjectId]);

  useEffect(() => {
    if (!routeProjectId && !selectedProjectId && projects.length > 0) {
      setSelectedProjectId(projects[0].id);
    }
  }, [routeProjectId, selectedProjectId, projects]);

  const effectiveProjectId = useMemo(
    () => routeProjectId ?? selectedProjectId,
    [routeProjectId, selectedProjectId],
  );

  const { data: project, isLoading: projectLoading, error: projectError } = useMyProjectDetail(effectiveProjectId);
  const { milestones, isLoading: milestonesLoading, error: milestonesError } = useMilestones(effectiveProjectId);

  const isLoading = projectsLoading || projectLoading || milestonesLoading;
  const error = projectsError || projectError || milestonesError;

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextProjectId = event.target.value;
    setSelectedProjectId(nextProjectId);

    if (nextProjectId) {
      navigate(`/projects/${nextProjectId}/milestones`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/projects")}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Milestones</h1>
            {project && (
              <p className="text-sm text-muted-foreground mt-1">
                {project.name}
              </p>
            )}
          </div>
        </div>

        <div className="w-full md:w-80">
          <label htmlFor="project-select" className="mb-1 block text-sm font-medium text-muted-foreground">
            Project
          </label>
          <select
            id="project-select"
            value={effectiveProjectId ?? ""}
            onChange={handleProjectChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            disabled={projectsLoading || projects.length === 0}
          >
            {projects.length === 0 ? (
              <option value="">No projects available</option>
            ) : (
              projects.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="font-medium text-destructive">Failed to load milestones</p>
                <p className="text-sm text-destructive/80">
                  {typeof error === "string" ? error : error instanceof Error ? error.message : "Unknown error"}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
                className="ml-auto"
              >
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/3 mt-2" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !!effectiveProjectId && milestones.length === 0 && (
        <Card>
          <CardContent className="pt-12 text-center">
            <Flag className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium">No milestones found</p>
            <p className="text-sm text-muted-foreground">
              There are no milestones scheduled for this project yet.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Milestones Timeline */}
      {!isLoading && !!effectiveProjectId && milestones.length > 0 && (
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <Card key={milestone.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary/10 font-semibold">
                        {index + 1}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-12 bg-muted" />
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <CardTitle className="text-lg">{milestone.title}</CardTitle>
                      {milestone.description && (
                        <CardDescription className="mt-1">{milestone.description}</CardDescription>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`whitespace-nowrap ${
                      milestone.status === "COMPLETED"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : milestone.status === "IN_PROGRESS"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : milestone.status === "DELAYED"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                  >
                    {milestone.status === "COMPLETED" && (
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                    )}
                    {milestone.status === "DELAYED" && (
                      <AlertTriangle className="h-3 w-3 mr-1" />
                    )}
                    {milestone.status === "IN_PROGRESS" && (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {milestone.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Due Date</p>
                    <p className="font-medium">{formatDate(milestone.dueDate)}</p>
                  </div>
                  {milestone.completedAt && (
                    <div>
                      <p className="text-muted-foreground">Completed</p>
                      <p className="font-medium text-green-600">{formatDate(milestone.completedAt)}</p>
                    </div>
                  )}
                  <div className="ml-auto">
                    <p className="text-muted-foreground">Created</p>
                    <p className="font-medium">{formatDate(milestone.createdAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && !effectiveProjectId && (
        <Card>
          <CardContent className="pt-12 text-center">
            <p className="text-lg font-medium">Select a project to view milestones</p>
            <p className="text-sm text-muted-foreground">Choose a project from the dropdown above.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
