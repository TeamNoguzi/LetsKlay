import { Project } from 'routes/projects/projects.entity';
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
}