import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reward } from "./reward.entity";

@Entity()
export class RewardItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Reward, (Reward) => Reward.items)
  reward: Reward;

  @Column()
  name: string;

  @Column()
  quantity: number;
}
