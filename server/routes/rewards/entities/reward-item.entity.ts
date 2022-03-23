import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reward } from "./reward.entity";

@Entity()
export class RewardItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type=>Reward, Reward=>Reward.items, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    reward: Reward

    @Column()
    name: string

    @Column()
    quantity: number
}
