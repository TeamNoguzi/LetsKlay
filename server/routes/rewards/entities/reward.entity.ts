import { Project } from "routes/projects/entities/projects.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RewardItem } from "./reward-item.entity";

@Entity()
export class Reward {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type=>Project, Project=>Project.rewards)
    project: Project;

    @OneToMany(type=>RewardItem, RewardItem=>RewardItem.reward)
    items: RewardItem[];

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
}
