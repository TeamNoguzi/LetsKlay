import { Like } from "routes/likes/entities/like.entity";
import { Reward } from "routes/rewards/entities/reward.entity";
import { User } from "routes/users/entities/users.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Project as ProjectType } from "@/entities";
import { ProjectStatus } from "@/enums";

@Entity()
export class Project implements ProjectType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column({ nullable: true, type: "longtext" })
  summary: string;

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({ nullable: true })
  mainPictureUrl: string;

  @Column({ nullable: true, type: "longtext" })
  description: string;

  @Column({ nullable: true })
  fundGoal: number;

  @Column({ nullable: false, default: 0 })
  fundNow: number;

  @Column({ nullable: false, default: ProjectStatus.preparing })
  status: ProjectStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(() => Reward, (Reward) => Reward.project, {
    cascade: true,
  })
  rewards: Reward[];

  @OneToMany(() => Like, (like) => like.project, {
    cascade: true,
  })
  likes: Like[];
}
