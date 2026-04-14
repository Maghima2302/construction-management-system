import api from "@/services/api";

export type ProjectStatus =
  | "DRAFT"
  | "APPROVED"
  | "PLANNING"
  | "EXECUTION"
  | "ON_HOLD"
  | "COMPLETED"
  | "CANCELLED";

export type ProjectPriority = "LOW" | "MEDIUM" | "HIGH";

export interface MyProject {
  id: string;
  name: string;
  status: ProjectStatus;
  budget: number;
  progressPercentage: number;
  startDate: string;
  endDate: string;
  priority: ProjectPriority;
  location: string;
}

export interface MyProjectDetail extends MyProject {
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListMyProjectsParams {
  page?: number;
  page_size?: number;
  status?: ProjectStatus;
  search?: string;
}

export type MilestoneStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "DELAYED";

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  dueDate: string;
  completedAt: string | null;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface ListMilestonesParams {
  status?: MilestoneStatus;
}

interface MyProjectsResponse {
  data?: Array<{
    id?: string;
    name?: string;
    status?: string;
    budget?: number;
    progress_percentage?: number;
    start_date?: string;
    end_date?: string;
    priority?: string;
    location?: string;
  }>;
  meta?: {
    page?: number;
    page_size?: number;
    total?: number;
  };
}

interface MyProjectDetailResponse {
  data?: {
    id?: string;
    name?: string;
    status?: string;
    budget?: number;
    progress_percentage?: number;
    start_date?: string;
    end_date?: string;
    priority?: string;
    location?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
  };
}

interface MilestonesResponse {
  data?: Array<{
    id?: string;
    project_id?: string;
    title?: string;
    description?: string;
    status?: string;
    due_date?: string;
    completed_at?: string | null;
    order_index?: number;
    created_at?: string;
    updated_at?: string;
  }>;
}

export const clientProjectService = {
  async getMyProjects(
    params?: ListMyProjectsParams
  ): Promise<{ data: MyProject[]; meta: { page: number; page_size: number; total: number } }> {
    const response = await api.get<MyProjectsResponse>("/client/projects", { params });

    const data = (response.data.data ?? []).map((project) => ({
      id: String(project.id ?? ""),
      name: String(project.name ?? ""),
      status: (project.status ?? "DRAFT") as ProjectStatus,
      budget: Number(project.budget ?? 0),
      progressPercentage: Number(project.progress_percentage ?? 0),
      startDate: String(project.start_date ?? ""),
      endDate: String(project.end_date ?? ""),
      priority: (project.priority ?? "LOW") as ProjectPriority,
      location: String(project.location ?? ""),
    }));

    const meta = {
      page: Number(response.data.meta?.page ?? 1),
      page_size: Number(response.data.meta?.page_size ?? 20),
      total: Number(response.data.meta?.total ?? 0),
    };

    return { data, meta };
  },

  async getMyProjectById(id: string): Promise<MyProjectDetail> {
    const response = await api.get<MyProjectDetailResponse>(`/client/projects/${id}`);
    const project = response.data.data;

    if (!project) {
      throw new Error("Project not found in response payload.");
    }

    return {
      id: String(project.id ?? ""),
      name: String(project.name ?? ""),
      status: (project.status ?? "DRAFT") as ProjectStatus,
      budget: Number(project.budget ?? 0),
      progressPercentage: Number(project.progress_percentage ?? 0),
      startDate: String(project.start_date ?? ""),
      endDate: String(project.end_date ?? ""),
      priority: (project.priority ?? "LOW") as ProjectPriority,
      location: String(project.location ?? ""),
      description: String(project.description ?? ""),
      createdAt: String(project.created_at ?? ""),
      updatedAt: String(project.updated_at ?? ""),
    };
  },

  async getMilestones(projectId: string, params?: ListMilestonesParams): Promise<Milestone[]> {
    const response = await api.get<MilestonesResponse>(`/client/projects/${projectId}/milestones`, {
      params,
    });

    const milestones = (response.data.data ?? []).map((milestone) => ({
      id: String(milestone.id ?? ""),
      projectId: String(milestone.project_id ?? ""),
      title: String(milestone.title ?? ""),
      description: String(milestone.description ?? ""),
      status: (milestone.status ?? "PENDING") as MilestoneStatus,
      dueDate: String(milestone.due_date ?? ""),
      completedAt: milestone.completed_at ? String(milestone.completed_at) : null,
      orderIndex: Number(milestone.order_index ?? 0),
      createdAt: String(milestone.created_at ?? ""),
      updatedAt: String(milestone.updated_at ?? ""),
    }));

    return milestones;
  },
};
