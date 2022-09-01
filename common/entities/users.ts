import { Like } from "./likes";
import { Project } from "./projects";
import { Transaction } from "./transactions";

interface User {
  id: number;
  address: string;
  email: string;
  role: "user" | "admin";
  isActive: boolean;
  projects: Project[];
  likes: Like[];
  transactions: Transaction[];
  createdAt: Date;
  updatedAt: Date;
}

export type { User };
