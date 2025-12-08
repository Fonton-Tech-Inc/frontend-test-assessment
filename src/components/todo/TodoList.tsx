'use client';

import { Todo } from '@/types/todo';
import { TodoItem } from './TodoItem';
import { filterTodos } from '@/utils/todo';

interface TodoListProps {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export const TodoList = ({
  todos,
  filter,
  onToggle,
  onDelete,
  onUpdate,
}: TodoListProps) => {
  const filteredTodos = filterTodos(todos, filter);

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p className="text-lg">
          {filter === 'completed'
            ? 'No completed todos yet'
            : filter === 'active'
            ? 'No active todos. Great job!'
            : 'No todos yet. Add one to get started!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

