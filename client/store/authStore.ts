import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DASHBOARD_PATH_BY_ROLE, MODULE_PERMISSIONS } from "@/constants/rbac";
import { DEMO_USERS } from "@/constants/mockAuth";
import { AuthSession, AuthUser, LoginCredentials, LoginResult, UserRole } from "@/types/auth";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  tokenType: string | null;
  expiresIn: number | null;
  isAuthenticated: boolean;
  setSession: (session: AuthSession) => void;
  login: (credentials: LoginCredentials) => LoginResult;
  logout: () => void;
  hasModuleAccess: (moduleKey: string) => boolean;
  getDashboardPath: () => string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      tokenType: null,
      expiresIn: null,
      isAuthenticated: false,
      setSession: (session) => {
        set({
          user: session.user,
          token: session.accessToken,
          refreshToken: session.refreshToken,
          tokenType: session.tokenType,
          expiresIn: session.expiresIn,
          isAuthenticated: true,
        });

        localStorage.setItem("cms-auth-response", JSON.stringify(session.rawResponse));
      },
      login: ({ email, password }) => {
        const matched = DEMO_USERS.find(
          (record) => record.user.email === email.trim().toLowerCase() && record.password === password,
        );

        if (!matched) {
          return {
            success: false,
            message: "Invalid credentials. Use a demo role account.",
          };
        }

        set({
          user: matched.user,
          token: matched.token,
          isAuthenticated: true,
        });

        return { success: true, message: "Login successful." };
      },
      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          tokenType: null,
          expiresIn: null,
          isAuthenticated: false,
        });
        localStorage.removeItem("cms-auth-response");
      },
      hasModuleAccess: (moduleKey) => {
        const role = get().user?.role;
        if (!role) {
          return false;
        }
        return MODULE_PERMISSIONS[role].includes(moduleKey);
      },
      getDashboardPath: () => {
        const role = get().user?.role;
        if (!role) {
          return "/login";
        }
        return DASHBOARD_PATH_BY_ROLE[role as UserRole];
      },
    }),
    {
      name: "cms-auth-store",
      version: 2,
      migrate: (persistedState: unknown) => {
        const state = persistedState as Partial<AuthState> | undefined;

        if (!state?.user || !state?.token) {
          return {
            user: null,
            token: null,
            refreshToken: null,
            tokenType: null,
            expiresIn: null,
            isAuthenticated: false,
          } as AuthState;
        }

        return {
          ...state,
          isAuthenticated: true,
        } as AuthState;
      },
      onRehydrateStorage: () => (state) => {
        if (!state?.user || !state?.token) {
          state?.logout();
        }
      },
    },
  ),
);
