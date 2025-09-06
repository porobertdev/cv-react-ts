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
        className="flex items-center gap-1 rounded-lg border-1 border-gray-300 py-2 shadow-md"
      >
        {id}
        <Button
          type="button"
          className="hover:text-primary m-0 h-max bg-inherit p-0 text-black hover:bg-inherit"
          onClick={() => onRemove(id)}
        >
          <XIcon />
        </Button>
      </Badge>
    </div>
  );
}
