import { Reward } from "routes/rewards/entities/reward.entity";
import { User } from "routes/users/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false, unique:true})
    txId: number;

    @ManyToOne(type=>User, user=>user.transactions)
    user: User

    @ManyToOne(type=>Reward, reward=>reward.transactions)
    reward: Reward

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
