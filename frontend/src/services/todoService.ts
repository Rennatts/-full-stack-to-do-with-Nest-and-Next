import axios from 'axios';
import { Todo, CreateTodoDto } from '../interfaces/todo';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/todos',
});

export const getTodos = async (): Promise<Todo[]> => {
  const response = await apiClient.get('');
  return response.data;
};

export const addTodo = async (todoData: CreateTodoDto): Promise<Todo> => {
  const response = await apiClient.post('', todoData);
  return response.data;
};

export const updateTodo = async (id: number, todoData: Partial<CreateTodoDto>): Promise<Todo> => {
  const response = await apiClient.patch(`/${id}`, todoData);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await apiClient.delete(`/${id}`);
};
