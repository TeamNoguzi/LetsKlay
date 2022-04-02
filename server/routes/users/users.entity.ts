import { Project } from 'routes/projects/entities/projects.entity';
import { Like } from 'routes/likes/entities/like.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Transaction } from 'routes/transaction/entities/transaction.entity';

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

  @OneToMany(type=>Project, project=>project.user, {
    cascade: true, onDelete:'CASCADE', onUpdate:'CASCADE'
  })
  projects: Project[]

  @OneToMany(type=>Like, like=>like.user, {
    cascade: true, onDelete:'CASCADE', onUpdate:'CASCADE'
  })
  likes:Like[]

  // should not be cascaded
  @OneToMany(type=>Transaction, transaction=>transaction.user)
  transactions:Transaction[]

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}