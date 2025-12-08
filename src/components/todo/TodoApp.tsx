'use client';

import { useTodos } from '@/hooks/useTodos';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodoFilter';

export const TodoApp = () => {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    updateTodoText,
    activeTodosCount,
    completedTodosCount,
  } = useTodos();

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Todo App
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay organized and get things done
        </p>
      </div>

      <div className="space-y-6">
        <TodoForm onAddTodo={addTodo} />

        {todos.length > 0 && (
          <>
            <TodoFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              activeCount={activeTodosCount}
              completedCount={completedTodosCount}
              onClearCompleted={clearCompleted}
            />

            <TodoList
              todos={todos}
              filter={filter}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodoText}
            />
          </>
        )}
      </div>
    </div>
  );
};

