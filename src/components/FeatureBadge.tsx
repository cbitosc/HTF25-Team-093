import { Badge } from './ui/badge';
import { Sparkles } from 'lucide-react';

interface FeatureBadgeProps {
  text: string;
}

export function FeatureBadge({ text }: FeatureBadgeProps) {
  return (
    <Badge className="bg-gradient-to-r from-primary/10 to-green-100 text-primary border-primary/20 hover:bg-primary/20">
      <Sparkles className="w-3 h-3 mr-1" />
      {text}
    </Badge>
  );
}
