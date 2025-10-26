import { useState, useEffect } from 'react';
import { useGamification } from '../gamification/GamificationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { motion, AnimatePresence } from 'motion/react';
import XpBar from '../gamification/XpBar';
import { 
  BookOpen, 
  Brain, 
  Zap,
  ChevronRight,
  ChevronDown,
  Star,
  Trophy,
  TrendingUp,
  Lightbulb,
  Target,
  Award,
  Sparkles,
  ArrowLeft,
  Home
} from 'lucide-react';

interface Capsule {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  progress: number;
  mastery: number;
  isExpanded: boolean;
  color: string;
  icon: string;
  topics: string[];
  nextSuggestion?: boolean;
}

interface LearningCapsulesPageProps {
  onNavigate?: (page: string) => void;
}

export function LearningCapsulesPage({ onNavigate }: LearningCapsulesPageProps) {
  // Gamification hook is imported at top-level. We use it below.

  const [capsules, setCapsules] = useState<Capsule[]>([
    {
      id: '1',
      title: 'Data Structures Fundamentals',
      category: 'Computer Science',
      difficulty: 'Beginner',
      duration: '15 min',
      progress: 100,
      mastery: 95,
      isExpanded: false,
      color: 'from-blue-500 to-cyan-500',
      icon: '📊',
      topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues']
    },
    {
      id: '2',
      title: 'Algorithm Complexity (Big O)',
      category: 'Computer Science',
      difficulty: 'Intermediate',
      duration: '20 min',
      progress: 65,
      mastery: 70,
      isExpanded: false,
      color: 'from-purple-500 to-pink-500',
      icon: '⚡',
      topics: ['Time Complexity', 'Space Complexity', 'Analysis Techniques'],
      nextSuggestion: true
    },
    {
      id: '3',
      title: 'Database Normalization',
      category: 'Databases',
      difficulty: 'Intermediate',
      duration: '18 min',
      progress: 30,
      mastery: 40,
      isExpanded: false,
      color: 'from-green-500 to-emerald-500',
      icon: '🗄️',
      topics: ['1NF', '2NF', '3NF', 'BCNF', 'Denormalization']
    },
    {
      id: '4',
      title: 'React Hooks Deep Dive',
      category: 'Web Development',
      difficulty: 'Advanced',
      duration: '25 min',
      progress: 0,
      mastery: 0,
      isExpanded: false,
      color: 'from-orange-500 to-yellow-500',
      icon: '⚛️',
      topics: ['useState', 'useEffect', 'useContext', 'Custom Hooks', 'Performance']
    },
    {
      id: '5',
      title: 'Machine Learning Basics',
      category: 'AI & ML',
      difficulty: 'Beginner',
      duration: '22 min',
      progress: 0,
      mastery: 0,
      isExpanded: false,
      color: 'from-red-500 to-pink-500',
      icon: '🤖',
      topics: ['Supervised Learning', 'Unsupervised Learning', 'Training Models', 'Evaluation']
    }
  ]);

  const [overallStats, setOverallStats] = useState({
    completedCapsules: 1,
    totalCapsules: 5,
    averageMastery: 61,
    streakDays: 7
  });

  const { awardXP, grantBadge } = useGamification();

  useEffect(() => {
    const handler = (e: any) => {
      const { capsuleId, title } = e?.detail || {};
      try {
        awardXP?.(50, `Completed ${title}`);
        grantBadge?.({ id: `capsule_${capsuleId}`, title: `Completed: ${title}` });

        // lightweight confetti: create a few colored pieces and animate
        const root = document.createElement('div');
        root.className = 'confetti';
        root.style.left = '50%';
        root.style.top = '20%';
        root.style.width = '0';
        root.style.height = '0';
        for (let i = 0; i < 12; i++) {
          const piece = document.createElement('div');
          piece.className = 'confetti-piece';
          piece.style.background = ['#ef4444','#f97316','#f59e0b','#fb7185','#60a5fa'][i%5];
          piece.style.transform = `translateX(${(Math.random()-0.5)*200}px)`;
          root.appendChild(piece);
        }
        document.body.appendChild(root);
        setTimeout(() => { try { document.body.removeChild(root); } catch(e) {} }, 1100);
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener('capsuleCompleted', handler as EventListener);
    return () => window.removeEventListener('capsuleCompleted', handler as EventListener);
  }, [awardXP, grantBadge]);

  const toggleCapsule = (id: string) => {
    setCapsules(capsules.map(capsule =>
      capsule.id === id ? { ...capsule, isExpanded: !capsule.isExpanded } : capsule
    ));
  };

  const updateProgress = (id: string, increment: number) => {
    // Award gamification XP when a capsule reaches completion (we dispatch an event handled by the hook)
    setCapsules(capsules.map(capsule => {
      if (capsule.id === id) {
        const prev = capsule.progress;
        const newProgress = Math.min(100, capsule.progress + increment);
        const newMastery = Math.min(100, capsule.mastery + Math.round(increment * 0.8));
        const updated = { ...capsule, progress: newProgress, mastery: newMastery };
        // if user just completed it (crossed 100)
        if (prev < 100 && newProgress === 100) {
          // award XP and badge using DOM-friendly approach: dispatch a custom event
          try {
            const ev = new CustomEvent('capsuleCompleted', { detail: { capsuleId: capsule.id, title: capsule.title } });
            window.dispatchEvent(ev);
          } catch (e) {
            // ignore
          }
        }
        return updated;
      }
      return capsule;
    }));
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getMasteryLevel = (mastery: number): { label: string; color: string } => {
    if (mastery >= 90) return { label: 'Expert', color: 'text-purple-600' };
    if (mastery >= 70) return { label: 'Proficient', color: 'text-blue-600' };
    if (mastery >= 50) return { label: 'Competent', color: 'text-green-600' };
    if (mastery >= 30) return { label: 'Learning', color: 'text-yellow-600' };
    return { label: 'Beginner', color: 'text-gray-600' };
  };

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-6 pb-24 md:pb-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink 
              onClick={() => onNavigate?.('dashboard')}
              className="flex items-center gap-1 cursor-pointer hover:text-primary"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Learning Capsules</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl">Learning Capsules</h1>
              <p className="text-muted-foreground">Adaptive micro-learning that grows with your knowledge</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => onNavigate?.('dashboard')}
            className="hidden md:flex"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </motion.div>

  {/* XP Bar */}
  <XpBar />

  {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl">{overallStats.completedCapsules}/{overallStats.totalCapsules}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl">{overallStats.averageMastery}%</p>
                <p className="text-xs md:text-sm text-muted-foreground">Avg Mastery</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl">{overallStats.streakDays}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Day Streak</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl">+12%</p>
                <p className="text-xs md:text-sm text-muted-foreground">This Week</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* AI Suggestion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-primary/50 bg-gradient-to-r from-primary/10 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 flex items-center gap-2">
                  AI Recommended Next Capsule
                  <Badge className="bg-primary">Smart Pick</Badge>
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on your 95% mastery of Data Structures, you're ready for Algorithm Complexity! 
                  This builds perfectly on your foundation.
                </p>
                <Button className="bg-primary hover:bg-green-700">
                  <Target className="w-4 h-4 mr-2" />
                  Start Learning
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Learning Capsules List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Learning Path</CardTitle>
          <CardDescription>Click on a capsule to expand and view details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {capsules.map((capsule, index) => {
              const masteryLevel = getMasteryLevel(capsule.mastery);
              // alternate capsule pill colors: red and yellow
              const pillClass = index % 2 === 0
                ? 'w-36 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold bg-gradient-to-br from-red-500 to-pink-400'
                : 'w-36 h-10 rounded-full flex items-center justify-center text-black text-sm font-semibold bg-gradient-to-br from-yellow-400 to-yellow-600';
              
              return (
                <motion.div
                  key={capsule.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card 
                    className={`overflow-hidden transition-all cursor-pointer hover:shadow-md ${
                      capsule.nextSuggestion ? 'border-2 border-primary shadow-lg' : ''
                    } ${capsule.progress === 100 ? 'bg-green-50' : ''}`}
                  >
                    {/* Main Capsule Header */}
                    <CardContent 
                      className="p-4"
                      onClick={() => toggleCapsule(capsule.id)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Capsule pill (red / yellow) */}
                        <div className={`${pillClass} flex-shrink-0`}>
                          <span className="mr-2 text-lg">{capsule.icon}</span>
                          <span className="truncate max-w-[60%]">{capsule.title}</span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="truncate">{capsule.title}</h3>
                                {capsule.nextSuggestion && (
                                  <Badge className="bg-primary flex-shrink-0">
                                    <Lightbulb className="w-3 h-3 mr-1" />
                                    Next
                                  </Badge>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <span>{capsule.category}</span>
                                <span>•</span>
                                <span>{capsule.duration}</span>
                                <Badge className={getDifficultyColor(capsule.difficulty)} variant="secondary">
                                  {capsule.difficulty}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                              {capsule.isExpanded ? (
                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                          </div>

                          {/* Progress Bars */}
                          <div className="space-y-2 mb-3">
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Progress</span>
                                <span>{capsule.progress}%</span>
                              </div>
                              <Progress value={capsule.progress} className="h-2" />
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Mastery</span>
                                <span className={masteryLevel.color}>{capsule.mastery}% - {masteryLevel.label}</span>
                              </div>
                              <Progress 
                                value={capsule.mastery} 
                                className="h-2"
                              />
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            {capsule.progress === 0 && (
                              <Button 
                                size="sm" 
                                className="bg-primary hover:bg-green-700"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateProgress(capsule.id, 25);
                                }}
                              >
                                <BookOpen className="w-4 h-4 mr-2" />
                                Start Learning
                              </Button>
                            )}
                            {capsule.progress > 0 && capsule.progress < 100 && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateProgress(capsule.id, 25);
                                }}
                              >
                                Continue
                              </Button>
                            )}
                            {capsule.progress === 100 && (
                              <div className="flex items-center gap-2">
                                <Badge className="bg-green-600">
                                  <Award className="w-3 h-3 mr-1" />
                                  Completed
                                </Badge>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Review
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {capsule.isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="border-t px-4 py-4 bg-secondary/20">
                            <h4 className="mb-3">Topics Covered:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {capsule.topics.map((topic, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <div className="w-6 h-6 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs text-primary">{idx + 1}</span>
                                  </div>
                                  <span>{topic}</span>
                                </motion.div>
                              ))}
                            </div>

                            {capsule.mastery < 100 && (
                              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                                <div className="flex items-start gap-2">
                                  <Brain className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-sm">
                                      <span>AI Insight: </span>
                                      {capsule.mastery >= 70 ? (
                                        "You're doing great! Focus on practice problems to reach expert level."
                                      ) : capsule.mastery >= 40 ? (
                                        "Good progress! Review the examples and try the interactive exercises."
                                      ) : (
                                        "Take it step by step. Start with the fundamentals and build from there."
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Milestone */}
      {overallStats.averageMastery >= 60 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 mx-auto mb-3" />
              <h3 className="mb-2">🎉 Milestone Reached!</h3>
              <p className="mb-4">You've achieved {overallStats.averageMastery}% average mastery across all capsules!</p>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Star className="w-5 h-5 mr-2" />
                Learning Champion
              </Badge>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
