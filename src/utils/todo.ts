import { Todo } from '@/types/todo';

export const generateTodoId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createTodo = (text: string): Todo => {
  return {
    id: generateTodoId(),
    text: text.trim(),
    completed: false,
    createdAt: Date.now(),
  };
};

export const filterTodos = (todos: Todo[], filter: 'all' | 'active' | 'completed'): Todo[] => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

