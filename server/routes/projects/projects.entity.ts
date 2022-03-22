import { User } from 'routes/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type=>User, user=>user.projects)
  @JoinColumn({name: 'userId'})
  user: User;

  @Column({nullable:true})
  title: string;

  @Column({nullable:true})
  subtitle: string;

  @Column({nullable:true})
  summary: string;

  @Column({nullable:true})
  thumbnailUrl: string;

  @Column({nullable:true})
  description: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}