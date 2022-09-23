import { Project } from "routes/projects/entities/projects.entity";
import { Fund } from "routes/funds/entities/funds.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RewardItem } from "./reward-item.entity";
import { Reward as RewardType } from "@/entities";

@Entity()
export class Reward implements RewardType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @ManyToOne(() => Project, (Project) => Project.rewards, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  project: Project;

  @OneToMany(() => RewardItem, (RewardItem) => RewardItem.reward, {
    cascade: true,
  })
  items: RewardItem[];

  @Column()
  price: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  deliveryStart: Date;

  @Column()
  deliveryEnd: Date;

  @Column()
  maxStock: number;

  @Column()
  stock: number;

  @OneToMany(() => Fund, (fund) => fund.reward, { cascade: true })
  funds: Fund[];
}
