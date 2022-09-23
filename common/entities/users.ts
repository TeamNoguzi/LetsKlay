import { Like } from "./likes";
import { Project } from "./projects";
import { Fund } from "./funds";

interface User {
  id: number;
  address: string;
  email: string;
  role: "user" | "admin";
  isActive: boolean;
  projects: Project[];
  likes: Like[];
  funds: Fund[];
  createdAt: Date;
  updatedAt: Date;
}

export type { User };
