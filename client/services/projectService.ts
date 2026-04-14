import api from "@/services/api";

export interface ProjectClient {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface ClientsResponse {
  clients?: Array<{
    id?: number;
    name?: string;
    email?: string;
    role?: string;
    created_at?: string;
    createdAt?: string;
  }>;
}

export interface CreateProjectPayload {
  name: string;
  client_id: number;
  budget: number;
  start_date: string;
  end_date: string;
  project_manager_id: number;
  priority: "LOW" | "MEDIUM" | "HIGH";
  location: string;
  description: string;
  progress_percentage: number;
}

export const projectService = {
  async fetchClients(): Promise<ProjectClient[]> {
    const response = await api.get<ClientsResponse>("/users/clients");

    return (response.data.clients ?? []).map((client) => ({
      id: Number(client.id ?? 0),
      name: String(client.name ?? ""),
      email: String(client.email ?? ""),
      role: String(client.role ?? "CLIENT"),
      createdAt: String(client.created_at ?? client.createdAt ?? ""),
    })).filter((client) => client.id > 0 && client.name.length > 0);
  },

  async createProject(payload: CreateProjectPayload): Promise<void> {
    await api.post("/projects", payload);
  },
};
