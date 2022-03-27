import { Project } from "routes/projects/entities/projects.entity";
import { User } from "routes/users/users.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    projectId: number;

    @ManyToOne(type=>User, user=>user.likes)
    @JoinColumn({name:'userId'})
    user: User;

    @ManyToOne(type=>Project, project=>project.likes)
    @JoinColumn({name:'projectId'})
    project: Project;

    @CreateDateColumn()
    createdAt: Date;
}
