import { BadgeCheckIcon } from 'lucide-react';
import { Badge } from './ui/badge';

export default function AutoSaveBadge() {
  return (
    <Badge variant="secondary" className="opacity-80 mb-6 ">
      <BadgeCheckIcon />
      Auto-save enabled.
    </Badge>
  );
}
