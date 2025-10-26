import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Star, 
  Award,
  Target,
  Zap,
  Calendar,
  TrendingUp,
  Medal,
  Flame,
  Brain,
  BookOpen,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowLeft,
  Home
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  earned: boolean;
  earnedDate?: string;
  progress: number;
  maxProgress: number;
  category: 'learning' | 'productivity' | 'social' | 'milestone';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementsPageProps {
  onNavigate?: (page: string) => void;
}

export function AchievementsPage({ onNavigate }: AchievementsPageProps) {
  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first learning capsule',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      earned: true,
      earnedDate: '2 days ago',
      progress: 1,
      maxProgress: 1,
      category: 'learning',
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: Flame,
      color: 'from-orange-500 to-red-500',
      earned: true,
      earnedDate: 'Today',
      progress: 7,
      maxProgress: 7,
      category: 'productivity',
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Knowledge Hunter',
      description: 'Complete 5 learning capsules',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      earned: false,
      progress: 3,
      maxProgress: 5,
      category: 'learning',
      rarity: 'common'
    },
    {
      id: '4',
      title: 'Master Mind',
      description: 'Achieve 90% mastery in any capsule',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      earned: true,
      earnedDate: '1 day ago',
      progress: 95,
      maxProgress: 90,
      category: 'learning',
      rarity: 'epic'
    },
    {
      id: '5',
      title: 'Lab Rat',
      description: 'Complete a full lab simulation',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      earned: false,
      progress: 0,
      maxProgress: 1,
      category: 'productivity',
      rarity: 'rare'
    },
    {
      id: '6',
      title: 'Early Bird',
      description: 'Study before 8 AM for 5 days',
      icon: Calendar,
      color: 'from-pink-500 to-rose-500',
      earned: false,
      progress: 2,
      maxProgress: 5,
      category: 'productivity',
      rarity: 'rare'
    },
    {
      id: '7',
      title: 'Legendary Scholar',
      description: 'Achieve 90% average mastery across all capsules',
      icon: Trophy,
      color: 'from-yellow-400 to-yellow-600',
      earned: false,
      progress: 61,
      maxProgress: 90,
      category: 'milestone',
      rarity: 'legendary'
    },
    {
      id: '8',
      title: 'Team Player',
      description: 'Collaborate on 3 projects',
      icon: Award,
      color: 'from-green-400 to-cyan-500',
      earned: false,
      progress: 1,
      maxProgress: 3,
      category: 'social',
      rarity: 'common'
    }
  ]);

  const [stats] = useState({
    totalAchievements: 8,
    earnedAchievements: 3,
    totalPoints: 1250,
    currentStreak: 7,
    longestStreak: 12,
    level: 8
  });

  const getRarityColor = (rarity: string): string => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityPoints = (rarity: string): number => {
    switch (rarity) {
      case 'common': return 100;
      case 'rare': return 250;
      case 'epic': return 500;
      case 'legendary': return 1000;
      default: return 0;
    }
  };

  const categoryIcons = {
    learning: BookOpen,
    productivity: Zap,
    social: Award,
    milestone: Trophy
  };

  const filterAchievements = (category?: string) => {
    if (!category) return achievements;
    return achievements.filter(a => a.category === category);
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
            <BreadcrumbPage>Achievements & Rewards</BreadcrumbPage>
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
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl">Achievements & Rewards</h1>
              <p className="text-muted-foreground">Track your progress and celebrate your wins</p>
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

      {/* Level & Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-primary to-green-600 text-white overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Level Progress */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Current Level</p>
                    <h2>Level {stats.level}</h2>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress to Level {stats.level + 1}</span>
                    <span>750 / 1000 XP</span>
                  </div>
                  <Progress value={75} className="h-3 bg-white/20" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <Trophy className="w-6 h-6 mb-2" />
                  <p className="text-2xl">{stats.earnedAchievements}/{stats.totalAchievements}</p>
                  <p className="text-sm text-white/80">Achievements</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <Sparkles className="w-6 h-6 mb-2" />
                  <p className="text-2xl">{stats.totalPoints}</p>
                  <p className="text-sm text-white/80">Total Points</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <Flame className="w-6 h-6 mb-2" />
                  <p className="text-2xl">{stats.currentStreak}</p>
                  <p className="text-sm text-white/80">Day Streak</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <TrendingUp className="w-6 h-6 mb-2" />
                  <p className="text-2xl">{stats.longestStreak}</p>
                  <p className="text-sm text-white/80">Best Streak</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Current Streak Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-orange-500/50 bg-gradient-to-r from-orange-50 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <Flame className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="mb-1">🔥 {stats.currentStreak} Day Streak!</h3>
                  <p className="text-sm text-muted-foreground">You're on fire! Keep it going to unlock rewards</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2">
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      i < stats.currentStreak 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Your Achievements</CardTitle>
          <CardDescription>Unlock badges and rewards as you progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="productivity">Productivity</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="milestone">Milestones</TabsTrigger>
            </TabsList>

            {['all', 'learning', 'productivity', 'social', 'milestone'].map(category => (
              <TabsContent key={category} value={category} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filterAchievements(category === 'all' ? undefined : category).map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
                    
                    return (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card 
                          className={`relative overflow-hidden transition-all ${
                            achievement.earned 
                              ? 'border-2 border-primary bg-primary/5' 
                              : 'opacity-75'
                          }`}
                        >
                          {achievement.earned && (
                            <div className="absolute top-2 right-2">
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                              >
                                <CheckCircle2 className="w-6 h-6 text-primary" />
                              </motion.div>
                            </div>
                          )}
                          
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              {/* Icon */}
                              <div className={`relative w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-2xl flex items-center justify-center flex-shrink-0 ${
                                !achievement.earned ? 'opacity-50' : ''
                              }`}>
                                {achievement.earned ? (
                                  <IconComponent className="w-8 h-8 text-white" />
                                ) : (
                                  <Lock className="w-8 h-8 text-white" />
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="mb-1">{achievement.title}</h3>
                                    <Badge className={`${getRarityColor(achievement.rarity)} text-white capitalize`}>
                                      {achievement.rarity}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <p className="text-sm text-muted-foreground mb-3">
                                  {achievement.description}
                                </p>

                                {/* Progress */}
                                {!achievement.earned && (
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between text-xs">
                                      <span className="text-muted-foreground">Progress</span>
                                      <span>{achievement.progress} / {achievement.maxProgress}</span>
                                    </div>
                                    <Progress value={progressPercentage} className="h-2" />
                                  </div>
                                )}

                                {/* Earned Date & Points */}
                                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                                  {achievement.earned ? (
                                    <>
                                      <span className="text-xs text-muted-foreground">
                                        Earned {achievement.earnedDate}
                                      </span>
                                      <Badge variant="secondary">
                                        +{getRarityPoints(achievement.rarity)} pts
                                      </Badge>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-xs text-muted-foreground">Not unlocked</span>
                                      <Badge variant="outline">
                                        {getRarityPoints(achievement.rarity)} pts
                                      </Badge>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Upcoming Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Close to Unlocking
          </CardTitle>
          <CardDescription>You're almost there! Keep pushing forward</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements
              .filter(a => !a.earned && a.progress > 0)
              .sort((a, b) => (b.progress / b.maxProgress) - (a.progress / a.maxProgress))
              .slice(0, 3)
              .map((achievement, index) => {
                const IconComponent = achievement.icon;
                const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
                
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${achievement.color} opacity-50 rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <Lock className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4>{achievement.title}</h4>
                              <Badge variant="outline">{achievement.progress} / {achievement.maxProgress}</Badge>
                            </div>
                            <Progress value={progressPercentage} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
