'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoStatus } from '@/types/todo';
import { getTodosFromStorage, saveTodosToStorage } from '@/utils/storage';
import { createTodo } from '@/utils/todo';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoStatus>('all');

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = getTodosFromStorage();
    setTodos(storedTodos);
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    saveTodosToStorage(todos);
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    if (!text.trim()) return;
    
    const newTodo = createTodo(text);
    setTodos(prev => [...prev, newTodo]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  const updateTodoText = useCallback((id: string, text: string) => {
    if (!text.trim()) return;
    
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: text.trim() } : todo
      )
    );
  }, []);

  const reorderTodos = useCallback((activeId: string, overId: string) => {
    setTodos(prev => {
      const activeIndex = prev.findIndex(todo => todo.id === activeId);
      const overIndex = prev.findIndex(todo => todo.id === overId);

      if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) {
        return prev;
      }

      const newTodos = [...prev];
      const [removed] = newTodos.splice(activeIndex, 1);
      newTodos.splice(overIndex, 0, removed);

      return newTodos;
    });
  }, []);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    updateTodoText,
    reorderTodos,
    activeTodosCount,
    completedTodosCount,
  };
};

