import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  task_id: number;

  @Column()
  content: string;

  @Column()
  creator: string;
}
