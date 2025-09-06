// components/SortableList.tsx
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { ReactNode } from 'react';

type SortableListProps<T extends string | number> = {
  items: T[];
  onChange: (newOrder: T[]) => void;
  strategy?: 'horizontal' | 'vertical';
  children: ReactNode;
};

export function SortableList<T extends string | number>({
  items,
  onChange,
  strategy = 'horizontal',
  children,
}: SortableListProps<T>) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i === active.id);
      const newIndex = items.findIndex((i) => i === over.id);
      onChange(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={items}
        strategy={
          strategy === 'horizontal' ? horizontalListSortingStrategy : verticalListSortingStrategy
        }
      >
        {children}
      </SortableContext>
    </DndContext>
  );
}
