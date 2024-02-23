export enum PriorityLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export interface CreateTodoDto {
    title: string;
    isCompleted?: boolean;
    category?: string;
    dueDate?: Date;
    priorityLevel?: PriorityLevel;
}
  
export interface Todo {
    id: number;
    title: string;
    isCompleted?: boolean;
    category?: string;
    dueDate?: Date;
    priorityLevel?: PriorityLevel;
}
