import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { XIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface SortableBadgeProps {
  id: string;
  onRemove: (id: string) => void;
}

export function SortableBadge({ id, onRemove }: SortableBadgeProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Badge
        variant="secondary"
        className="py-2 rounded-lg shadow-md border-1 border-gray-300 flex items-center gap-1"
      >
        {id}
        <Button
          type="button"
          className="p-0 m-0 bg-inherit text-black hover:bg-inherit hover:text-primary h-max"
          onClick={() => onRemove(id)}
        >
          <XIcon />
        </Button>
      </Badge>
    </div>
  );
}
