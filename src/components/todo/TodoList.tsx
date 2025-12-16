'use client';

import { Todo } from '@/types/todo';
import { TodoItem } from './TodoItem';
import { filterTodos } from '@/utils/todo';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface TodoListProps {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onReorder: (activeId: string, overId: string) => void;
}

export const TodoList = ({
  todos,
  filter,
  onToggle,
  onDelete,
  onUpdate,
  onReorder,
}: TodoListProps) => {
  const filteredTodos = filterTodos(todos, filter);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      onReorder(active.id as string, over.id as string);
    }
  };

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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filteredTodos.map(todo => todo.id)}
        strategy={verticalListSortingStrategy}
      >
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
      </SortableContext>
    </DndContext>
  );
};

