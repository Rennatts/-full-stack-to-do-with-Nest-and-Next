import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PriorityLevel } from './priority-level.enum';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false }) // torna obrigatório
  title: string;

  @Column({ default: false }) // fornece valor padrão
  isCompleted: boolean;

  @Column({ nullable: true }) // permite valor nulo
  category: string;

  @Column({ nullable: true }) // permite valor nulo
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: PriorityLevel,
    default: PriorityLevel.LOW, 
    nullable: true
  })
  priorityLevel: PriorityLevel;
}
