import { Project } from "routes/projects/entities/projects.entity";
import { Transaction } from "routes/transactions/entities/transaction.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RewardItem } from "./reward-item.entity";
import { Reward as RewardType } from "@/entities";

@Entity()
export class Reward implements RewardType {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (Project) => Project.rewards, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
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

  // should not be cascaded
  @OneToMany(() => Transaction, (transaction) => transaction.reward, { cascade: true })
  transactions: Transaction[];
}
