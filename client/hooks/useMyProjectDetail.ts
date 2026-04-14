import { useEffect, useState } from "react";
import { clientProjectService, MyProjectDetail } from "@/services/clientProjectService";

export function useMyProjectDetail(id: string | undefined) {
  const [data, setData] = useState<MyProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const loadProjectDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const project = await clientProjectService.getMyProjectById(id);
        if (!cancelled) {
          setData(project);
        }
      } catch (loadError: unknown) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load project details.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadProjectDetail();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { data, isLoading, error };
}
