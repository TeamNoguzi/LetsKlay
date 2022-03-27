import { Project } from 'routes/projects/entities/projects.entity';
import { Like } from 'routes/likes/entities/like.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false, unique:true})
  address: string;

  @Column({nullable:false})
  email: string;

  @Column({nullable:false, default:'user'})
  role: 'user'|'admin';

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(type=>Project, project=>project.user)
  projects: Project[]

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToMany(type=>Like, like=>like.user, {
    cascade: true, onDelete:'CASCADE', onUpdate:'CASCADE'
  })
  likes:Like[]
}