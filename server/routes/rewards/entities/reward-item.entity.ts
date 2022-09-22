import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reward } from "./reward.entity";
import { RewardItem as RewardItemType } from "@/entities";

@Entity()
export class RewardItem implements RewardItemType {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Reward, (Reward) => Reward.items, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  reward: Reward;

  @Column()
  name: string;

  @Column()
  quantity: number;
}
