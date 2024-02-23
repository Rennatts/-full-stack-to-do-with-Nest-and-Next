import React, { useState, useRef } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { CreateTodoDto, PriorityLevel } from '../interfaces/todo';

interface Props {
  addTodo: (todo: CreateTodoDto) => void;
}

const TodoForm: React.FC<Props> = ({ addTodo }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formValues, setFormValues] = useState({
    title: '',
    isCompleted: false,
    category: '',
    dueDate: '',
    priorityLevel: '' as PriorityLevel | '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, isCompleted, category, dueDate, priorityLevel } = formValues;
    if (!title.trim()) return;

    const newTodo = {
      title: title.trim(),
      isCompleted,
      category: category ? category.trim() : undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priorityLevel: priorityLevel as PriorityLevel | undefined,
    };

    addTodo(newTodo);

    setFormValues({
      title: '',
      isCompleted: false,
      category: '',
      dueDate: '',
      priorityLevel: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any; }; }) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form 
    ref={formRef} 
    onSubmit={handleSubmit} 
    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <TextField
        name="title"
        label="Title"
        variant="outlined"
        size="small"
        value={formValues.title}
        onChange={handleChange}
        required
      />
      <TextField
        name="category"
        label="Category"
        variant="outlined"
        size="small"
        value={formValues.category}
        onChange={handleChange}
      />
      <TextField
        name="dueDate"
        label="Due Date"
        type="date"
        variant="outlined"
        size="small"
        value={formValues.dueDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
      <FormControl size="small" variant="outlined">
        <InputLabel id="priority-level-label">Priority</InputLabel>
        <Select
          name="priorityLevel"
          labelId="priority-level-label"
          value={formValues.priorityLevel}
          onChange={handleChange}
          label="Priority"
        >
          {Object.values(PriorityLevel).map(level => (
            <MenuItem key={level} value={level}>{level}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
};

export default TodoForm;
