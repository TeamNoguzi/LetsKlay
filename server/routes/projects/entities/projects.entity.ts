import { Like } from "routes/likes/entities/like.entity";
import { Reward } from "routes/rewards/entities/reward.entity";
import { User } from "routes/users/users.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { ProjectStatus } from "../projects.enum";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column({ nullable: true })
  summary: string;

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({ nullable: true })
  mainPictureUrl: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  fundGoal: number;

  @Column({ nullable: false, default: 0 })
  fundNow: number;

  @Column({ nullable: false, default: ProjectStatus.preparing })
  status: ProjectStatus;

  @OneToMany(() => Reward, (Reward) => Reward.project, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  rewards: Reward[];

  @OneToMany(() => Like, (like) => like.user, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  likes: Like[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
