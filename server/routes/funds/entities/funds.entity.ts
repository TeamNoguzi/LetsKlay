import { Reward } from "routes/rewards/entities/reward.entity";
import { User } from "routes/users/entities/users.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Fund as FundType } from "@/entities";

@Entity()
export class Fund implements FundType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  hashId: string;

  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: false, default: true })
  valid: boolean;

  @Column()
  rewardId: number;

  @ManyToOne(() => User, (user) => user.funds)
  user: User;

  @ManyToOne(() => Reward, (reward) => reward.funds)
  @JoinColumn()
  reward: Reward;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
