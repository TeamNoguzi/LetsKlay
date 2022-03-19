import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false})
  address: string;

  @Column({nullable:false})
  email: string;

  @Column({nullable:false, default:'user'})
  role: 'user'|'admin';

  @Column({ default: true })
  isActive: boolean;
}