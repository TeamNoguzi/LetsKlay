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

  @Column({ nullable: false, unique: true })
  txId: number;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @ManyToOne(() => Reward, (reward) => reward.transactions)
  reward: Reward;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
