import React from 'react';
import { Todo } from '../interfaces/todo';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, toggleComplete, deleteTodo }) => {
    return (
      <List>
        {todos.map((todo) => (
          <ListItem 
            key={todo.id} 
            dense 
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={(e) => {
                e.stopPropagation(); 
                deleteTodo(todo.id);
              }}>
                <DeleteIcon style={{ color: 'red' }} />
              </IconButton>
            }
          >
            <Checkbox
              checked={todo.isCompleted}
              onChange={() => toggleComplete(todo.id)}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText
              primary={`${todo.title} - ${todo.category || 'No Category'}`}
              secondary={`Due: ${todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No Due Date'} | Priority: ${todo.priorityLevel}`}
            />
          </ListItem>
        ))}
      </List>
    );
};


export default TodoList;
