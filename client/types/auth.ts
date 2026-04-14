export type UserRole =
  | "SUPER_ADMIN"
  | "PROJECT_MANAGER"
  | "ARCHITECT"
  | "ENGINEER"
  | "CLIENT";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  createdAt?: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: AuthUser;
  rawResponse: Record<string, unknown>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  message: string;
}
