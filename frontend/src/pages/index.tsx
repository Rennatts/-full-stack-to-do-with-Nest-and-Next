import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { Todo, CreateTodoDto } from '../interfaces/todo'; 
import { getTodos, addTodo as addTodoService, updateTodo, deleteTodo as deleteTodoService } from '../services/todoService';

const HomePage: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    };

    fetchTodos();
  }, []);

  const addTodo = async (todoData: CreateTodoDto) => {
    try {
      const newTodo = await addTodoService(todoData);
      setTodos(prevTodos => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoService(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const toggleComplete = async (id: number) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      const updatedIsCompleted = !todo.isCompleted;
      try {
        await updateTodo(id, { isCompleted: updatedIsCompleted });
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isCompleted: updatedIsCompleted } : todo));
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };
  

  return (
    <Container maxWidth="sm">
      <h1>ToDo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
    </Container>
  );
};

export default HomePage;
