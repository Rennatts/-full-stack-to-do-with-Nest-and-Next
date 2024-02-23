import { PriorityLevel } from "../entities/priority-level.enum";

export class CreateTodoDto {
    title: string;
    isCompleted?: boolean;
    category?: string;
    priorityLevel?: PriorityLevel;
    dueDate?: Date;
}