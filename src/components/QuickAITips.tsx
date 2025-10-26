import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lightbulb, RefreshCw } from 'lucide-react';

interface Tip {
  id: string;
  text: string;
  context: string;
  icon: string;
}

const tips: Tip[] = [
  {
    id: '1',
    text: 'Take a 5-minute break every 25 minutes for optimal focus (Pomodoro Technique)',
    context: 'productivity',
    icon: '⏰'
  },
  {
    id: '2',
    text: 'Review your notes within 24 hours to improve retention by 60%',
    context: 'learning',
    icon: '📝'
  },
  {
    id: '3',
    text: 'Start with the hardest task when your energy is highest - usually in the morning',
    context: 'productivity',
    icon: '🌅'
  },
  {
    id: '4',
    text: 'Use active recall instead of re-reading. Test yourself to strengthen memory',
    context: 'learning',
    icon: '🧠'
  },
  {
    id: '5',
    text: 'Break large projects into small, actionable tasks. Complete one at a time',
    context: 'productivity',
    icon: '🎯'
  },
  {
    id: '6',
    text: 'Teach someone else what you learned. Teaching reinforces understanding',
    context: 'learning',
    icon: '👥'
  },
  {
    id: '7',
    text: 'Hydrate! Even mild dehydration can impair cognitive function by 20%',
    context: 'wellness',
    icon: '💧'
  },
  {
    id: '8',
    text: 'Use the 2-minute rule: If it takes less than 2 minutes, do it now',
    context: 'productivity',
    icon: '⚡'
  },
  {
    id: '9',
    text: 'Create visual mind maps to connect concepts and see the big picture',
    context: 'learning',
    icon: '🗺️'
  },
  {
    id: '10',
    text: 'Celebrate small wins! Positive reinforcement builds momentum',
    context: 'wellness',
    icon: '🎉'
  }
];

export function QuickAITips() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentTip, setCurrentTip] = useState<Tip>(tips[0]);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Change tip every 30 seconds
    const interval = setInterval(() => {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setCurrentTip(randomTip);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleNewTip = () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setCurrentTip(randomTip);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
        }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="fixed bottom-24 md:bottom-8 right-4 z-40 max-w-sm"
      >
        <Card className="shadow-xl border-2 border-primary/20 bg-gradient-to-br from-white to-green-50">
          <CardContent className="p-4">
            {!isMinimized ? (
              <>
                <div className="flex items-start gap-3 mb-3">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                    animate={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 5
                    }}
                  >
                    {currentTip.icon}
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-primary" />
                        <h4 className="text-sm">Quick AI Tip</h4>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 -mr-2 -mt-1"
                        onClick={() => setIsVisible(false)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      {currentTip.text}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-xs text-muted-foreground capitalize">
                      {currentTip.context}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNewTip}
                    className="h-7 text-xs"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    New Tip
                  </Button>
                </div>
              </>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setIsMinimized(false)}
                className="w-full justify-start"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Show AI Tip
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
