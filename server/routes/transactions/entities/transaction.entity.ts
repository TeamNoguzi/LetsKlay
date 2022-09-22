import { Reward } from "routes/rewards/entities/reward.entity";
import { User } from "routes/users/entities/users.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Transaction as TransactionType } from "@/entities";

@Entity()
export class Transaction implements TransactionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  amount: number;

  // should not be cascaded in real project
  @ManyToOne(() => User, (user) => user.transactions, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  user: User;

  // should not be cascaded in real project
  @ManyToOne(() => Reward, (reward) => reward.transactions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  reward: Reward;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
