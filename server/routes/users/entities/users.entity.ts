import { Project } from "routes/projects/entities/projects.entity";
import { Like } from "routes/likes/entities/like.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Fund } from "routes/funds/entities/funds.entity";
import { User as UserType } from "@/entities";

@Entity()
export class User implements UserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  address: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false, default: "user" })
  role: "user" | "admin";

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  profileImgUrl: string;

  @OneToMany(() => Project, (project) => project.user, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  projects: Project[];

  @OneToMany(() => Like, (like) => like.user, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  likes: Like[];

  // should not be cascaded
  @OneToMany(() => Fund, (fund) => fund.user)
  funds: Fund[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
