import { AuthUser } from "@/types/auth";

interface DemoUserRecord {
  user: AuthUser;
  password: string;
  token: string;
}

export const DEMO_USERS: DemoUserRecord[] = [
  {
    user: {
      id: "u-1001",
      name: "Aanya Mehra",
      email: "superadmin@cms.com",
      role: "SUPER_ADMIN",
      company: "Civiora HQ",
    },
    password: "SuperAdmin@123",
    token: "demo-token-super-admin",
  },
  {
    user: {
      id: "u-1002",
      name: "Rahul Khanna",
      email: "pm@cms.com",
      role: "PROJECT_MANAGER",
      company: "Skyline Infra",
    },
    password: "ProjectManager@123",
    token: "demo-token-project-manager",
  },
  {
    user: {
      id: "u-1003",
      name: "Neha Kapoor",
      email: "architect@cms.com",
      role: "ARCHITECT",
      company: "ArchiForm Studio",
    },
    password: "Architect@123",
    token: "demo-token-architect",
  },
  {
    user: {
      id: "u-1004",
      name: "Vikram Sethi",
      email: "engineer@cms.com",
      role: "ENGINEER",
      company: "Metro BuildTech",
    },
    password: "Engineer@123",
    token: "demo-token-engineer",
  },
  {
    user: {
      id: "u-1005",
      name: "Ira Nair",
      email: "client@cms.com",
      role: "CLIENT",
      company: "UrbanNest Developments",
    },
    password: "Client@123",
    token: "demo-token-client",
  },
];
