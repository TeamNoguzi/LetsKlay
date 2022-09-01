import { User } from "./users";
import { Project } from "./projects";

interface Like {
  userId: number;
  projectId: number;
  user?: User;
  project?: Project;
  createdAt: Date;
}

export { Like };
