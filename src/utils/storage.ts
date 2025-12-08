import { Todo } from '@/types/todo';

const STORAGE_KEY = 'todos';

export const getTodosFromStorage = (): Todo[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading todos from storage:', error);
    return [];
  }
};

export const saveTodosToStorage = (todos: Todo[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to storage:', error);
  }
};

