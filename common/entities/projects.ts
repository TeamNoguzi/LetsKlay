import { Like } from "./likes";
import { User } from "./users";
import { Reward } from "./rewards";
import { ProjectStatus } from "../enums";

interface Project {
  id: number;
  user?: User;
  title: string;
  subtitle: string;
  summary: string;
  thumbnailUrl: string;
  mainPictureUrl: string;
  description: string;
  fundGoal: number;
  fundNow: number;
  status: ProjectStatus;
  rewards: Reward[];
  likes: Like[];
  createdAt: Date;
  updatedAt: Date;
}

export type { Project };
