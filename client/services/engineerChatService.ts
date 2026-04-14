import { AuthSession } from "@/types/auth";

export interface EngineerChatRequest {
  prompt: string;
}

export interface EngineerChatResponse {
  data: {
    project_scope: {
      summary: string;
      key_deliverables: string[];
      exclusions: string[];
    };
    timeline: {
      estimated_duration: string;
      phases: {
        phase: string;
        duration: string;
        description: string;
      }[];
      critical_milestones: string[];
    };
    resource_allocation: {
      team: {
        role: string;
        count: number;
        responsibility: string;
      }[];
      equipment: string[];
      materials: string[];
    };
    budget_breakdown: {
      labour: string;
      materials: string;
      equipment: string;
      contingency: string;
      notes: string;
    };
    risks: {
      risk: string;
      severity: "Low" | "Medium" | "High";
      mitigation: string;
    }[];
    recommendations: string[];
    next_steps: string[];
  };
}

export const engineerChatService = {
  async sendMessage(prompt: string, token: string): Promise<EngineerChatResponse> {
    const baseUrl = import.meta.env.VITE_API_URL || "";
    const response = await fetch(`${baseUrl}/engineer/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to communicate with Engineer AI");
    }

    return response.json();
  },
};
