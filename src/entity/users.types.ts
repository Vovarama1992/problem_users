import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('problem_users')
export class ProblemUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column({ default: false })
  has_problems: boolean;
}
