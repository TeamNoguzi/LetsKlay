import { Project } from "routes/projects/entities/projects.entity";
import { User } from "routes/users/entities/users.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Like as LikeType } from "@/entities";

@Entity()
export class Like implements LikeType {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  projectId: number;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Project, (project) => project.likes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "projectId" })
  project: Project;

  @CreateDateColumn()
  createdAt: Date;
}
