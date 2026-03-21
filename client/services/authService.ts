import api from "@/services/api";
import type { AuthSession, AuthUser, UserRole } from "@/types/auth";

interface ApiLoginRequest {
  email: string;
  password: string;
}

interface ApiRegisterRequest {
  name: string;
  email: string;
  password: string;
  role: "SUPER_ADMIN" | "PROJECT_MANAGER" | "CLIENT" | "ARCHITECT" | "CIVIL_ENGINEER";
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  token: string;
  user: AuthUser;
  rawResponse: Record<string, unknown>;
}

const ROLE_MAP: Record<string, UserRole> = {
  SUPER_ADMIN: "SUPER_ADMIN",
  SUPERADMIN: "SUPER_ADMIN",
  PROJECT_MANAGER: "PROJECT_MANAGER",
  PROJECTMANAGER: "PROJECT_MANAGER",
  CLIENT: "CLIENT",
  ARCHITECT: "ARCHITECT",
  CIVIL_ENGINEER: "ENGINEER",
  CIVILENGINEER: "ENGINEER",
  ENGINEER: "ENGINEER",
};

const normalizeRole = (role: unknown): UserRole => {
  if (typeof role !== "string") {
    return "CLIENT";
  }

  return ROLE_MAP[role] ?? "CLIENT";
};

const normalizeUser = (user: unknown): AuthUser => {
  const rawUser = typeof user === "object" && user !== null ? user : {};
  const get = (key: string) => (rawUser as Record<string, unknown>)[key];

  return {
    id: String(get("id") ?? get("_id") ?? ""),
    name: String(get("name") ?? ""),
    email: String(get("email") ?? ""),
    role: normalizeRole(get("role")),
    company: String(get("company") ?? ""),
    createdAt: String(get("created_at") ?? get("createdAt") ?? ""),
  };
};

const toPascalCaseMessage = (value: string) => {
  const sanitized = value.replace(/^error\s*[:\-]?\s*/i, "").trim();

  const pascal = sanitized
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");

  return pascal || "Error";
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response
  ) {
    const data = error.response.data;

    if (typeof data === "string") {
      return toPascalCaseMessage(data);
    }

    if (typeof data === "object" && data !== null) {
      if ("error" in data && typeof data.error === "string") {
        return toPascalCaseMessage(data.error);
      }

      if ("message" in data && typeof data.message === "string") {
        return toPascalCaseMessage(data.message);
      }
    }
  }

  return fallback;
};

export const authService = {
  async login(payload: ApiLoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post("/auth/login", {
        email: payload.email.trim().toLowerCase(),
        password: payload.password,
      });

      const data = response.data as Record<string, unknown>;
      const accessToken = String(data.access_token ?? data.accessToken ?? data.token ?? "");
      const refreshToken = String(data.refresh_token ?? data.refreshToken ?? "");
      const tokenType = String(data.token_type ?? data.tokenType ?? "Bearer");
      const expiresIn = Number(data.expires_in ?? data.expiresIn ?? 0);
      const user = normalizeUser(data.user);

      if (!accessToken || !user.email) {
        throw new Error("Invalid login response from server.");
      }

      return {
        accessToken,
        refreshToken,
        tokenType,
        expiresIn,
        token: accessToken,
        user,
        rawResponse: data,
      };
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error, "Login failed. Please try again."));
    }
  },

  async register(payload: ApiRegisterRequest): Promise<void> {
    try {
      await api.post("/auth/register", payload);
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error, "Registration failed. Please try again."));
    }
  },
};

export type { ApiLoginRequest, ApiRegisterRequest, LoginResponse, AuthSession };