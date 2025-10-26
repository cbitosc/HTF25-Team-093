import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface FloatingAIButtonProps {
  onClick: () => void;
}

export function FloatingAIButton({ onClick }: FloatingAIButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-20 right-6 md:bottom-8 md:right-8 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 z-40"
      size="icon"
    >
      <Sparkles className="w-6 h-6 text-white animate-pulse" />
    </Button>
  );
}
