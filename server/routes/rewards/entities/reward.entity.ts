import { Project } from "routes/projects/entities/projects.entity";
import { Transaction } from "routes/transaction/entities/transaction.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RewardItem } from "./reward-item.entity";
import { Reward as RewardType } from "@/entities";

@Entity()
export class Reward implements RewardType {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (Project) => Project.rewards)
  project: Project;

  @OneToMany(() => RewardItem, (RewardItem) => RewardItem.reward, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
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

  // should not be cascaded
  @OneToMany(() => Transaction, (transaction) => transaction.reward)
  transactions: Transaction[];
}
