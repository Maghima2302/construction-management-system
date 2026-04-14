import { useEffect, useState } from "react";
import { clientProjectService, ListMyProjectsParams, MyProject } from "@/services/clientProjectService";

export function useMyProjects(params?: ListMyProjectsParams) {
  const [data, setData] = useState<MyProject[]>([]);
  const [meta, setMeta] = useState<{ page: number; page_size: number; total: number }>({
    page: 1,
    page_size: 20,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await clientProjectService.getMyProjects(params);
        if (!cancelled) {
          setData(result.data);
          setMeta(result.meta);
        }
      } catch (loadError: unknown) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load projects.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadProjects();

    return () => {
      cancelled = true;
    };
  }, [params?.page, params?.page_size, params?.status, params?.search]);

  return { data, meta, isLoading, error };
}
