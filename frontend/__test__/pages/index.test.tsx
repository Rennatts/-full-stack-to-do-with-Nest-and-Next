import { Todo } from '@/interfaces/todo';
import HomePage from '@/pages';
import { addTodo, deleteTodo, getTodos, updateTodo } from '@/services/todoService';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';


// Mock the todoService module
jest.mock('../services/todoService', () => ({
  getTodos: jest.fn(),
  addTodo: jest.fn(),
  updateTodo: jest.fn(),
  deleteTodo: jest.fn(),
}));

// Sample todo data
const todos: Todo[] = [
  { id: 1, title: 'First todo', isCompleted: false },
  { id: 2, title: 'Second todo', isCompleted: true },
];

describe('HomePage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('fetches and displays todos on mount', async () => {
    // Mock the getTodos function to return the sample todos
    (getTodos as jest.Mock).mockResolvedValue(todos);

    render(<HomePage />);

    // Wait for the todos to be fetched and rendered
    const todoItems = await waitFor(() => screen.findAllByTestId('todo-item'));
    expect(todoItems).toHaveLength(todos.length);
  });

  it('adds a new todo', async () => {
    const newTodo = { id: 3, title: 'Third todo', isCompleted: false };
    (getTodos as jest.Mock).mockResolvedValue(todos);
    (addTodo as jest.Mock).mockResolvedValue(newTodo);

    render(<HomePage />);

    // Simulate adding a new todo
    fireEvent.change(screen.getByPlaceholderText('Add new todo...'), { target: { value: newTodo.title } });
    fireEvent.click(screen.getByText('Add'));

    // Wait for the new todo to be added to the list
    const todoItem = await waitFor(() => screen.findByText(newTodo.title));
    expect(todoItem).toBeInTheDocument();
  });

  it('handles todo toggle', async () => {
    (getTodos as jest.Mock).mockResolvedValue(todos);
    const updatedTodo = { ...todos[0], isCompleted: true };
    (updateTodo as jest.Mock).mockResolvedValue(updatedTodo);

    render(<HomePage />);

    // Simulate toggling a todo's completion status
    fireEvent.click(screen.getByTestId(`toggle-${todos[0].id}`));

    // Check if the todo's completion status was updated
    await waitFor(() => expect(screen.getByTestId(`todo-${todos[0].id}-completed`)).toBeInTheDocument());
  });

  it('deletes a todo', async () => {
    (getTodos as jest.Mock).mockResolvedValue(todos);
    (deleteTodo as jest.Mock).mockResolvedValue({});

    render(<HomePage />);

    // Simulate deleting a todo
    fireEvent.click(screen.getByTestId(`delete-${todos[0].id}`));

    // Wait for the todo to be removed from the list
    await waitFor(() => expect(screen.queryByText(todos[0].title)).not.toBeInTheDocument());
  });
});
