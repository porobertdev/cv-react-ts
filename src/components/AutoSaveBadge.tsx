import { BadgeCheckIcon } from 'lucide-react';
import { Badge } from './ui/badge';

export default function AutoSaveBadge() {
  return (
    <Badge variant="secondary" className="mb-6 bg-green-100">
      <BadgeCheckIcon />
      Auto-save enabled.
    </Badge>
  );
}
