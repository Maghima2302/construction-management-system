import { useEffect, useState } from "react";
import { clientProjectService, Milestone, ListMilestonesParams } from "@/services/clientProjectService";

interface UseMilestonesResult {
  milestones: Milestone[];
  isLoading: boolean;
  error: Error | null;
}

export function useMilestones(
  projectId: string | undefined,
  params?: ListMilestonesParams,
  enabled: boolean = true,
): UseMilestonesResult {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled || !projectId) {
      setMilestones([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await clientProjectService.getMilestones(projectId, params);
        if (!cancelled) {
          setMilestones(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("Failed to fetch milestones"));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [projectId, params?.status, enabled]);

  return { milestones, isLoading, error };
}
