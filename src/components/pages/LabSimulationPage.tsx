import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Palette, 
  Server, 
  Cloud,
  CheckCircle2,
  Circle,
  Trophy,
  Zap,
  Target,
  BookOpen,
  Play,
  Award,
  TrendingUp,
  ArrowLeft,
  Home
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface Role {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  tasks: Task[];
  completionScore: number;
  totalPoints: number;
}

interface LabSimulationPageProps {
  onNavigate?: (page: string) => void;
}

export function LabSimulationPage({ onNavigate }: LabSimulationPageProps) {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'fullstack',
      name: 'Full Stack Developer',
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      description: 'Master both frontend and backend development',
      completionScore: 0,
      totalPoints: 500,
      tasks: [
        { id: '1', title: 'Set up React Project', description: 'Initialize a new React application with TypeScript', completed: false, difficulty: 'Easy' },
        { id: '2', title: 'Create REST API', description: 'Build a Node.js Express API with CRUD operations', completed: false, difficulty: 'Medium' },
        { id: '3', title: 'Connect Frontend to Backend', description: 'Integrate React app with your API endpoints', completed: false, difficulty: 'Medium' },
        { id: '4', title: 'Add Authentication', description: 'Implement JWT-based user authentication', completed: false, difficulty: 'Hard' },
        { id: '5', title: 'Deploy to Production', description: 'Deploy full stack app to cloud platform', completed: false, difficulty: 'Hard' }
      ]
    },
    {
      id: 'frontend',
      name: 'Frontend Developer',
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      description: 'Create stunning user interfaces and experiences',
      completionScore: 0,
      totalPoints: 400,
      tasks: [
        { id: '1', title: 'Design Component Library', description: 'Build reusable UI components with Tailwind CSS', completed: false, difficulty: 'Easy' },
        { id: '2', title: 'Implement Responsive Design', description: 'Make layouts work perfectly on all screen sizes', completed: false, difficulty: 'Medium' },
        { id: '3', title: 'Add Animations', description: 'Enhance UX with smooth transitions and micro-interactions', completed: false, difficulty: 'Medium' },
        { id: '4', title: 'Optimize Performance', description: 'Improve load times and runtime performance', completed: false, difficulty: 'Hard' }
      ]
    },
    {
      id: 'backend',
      name: 'Backend Developer',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      description: 'Build robust and scalable server-side systems',
      completionScore: 0,
      totalPoints: 450,
      tasks: [
        { id: '1', title: 'Database Design', description: 'Create efficient database schemas and relationships', completed: false, difficulty: 'Easy' },
        { id: '2', title: 'API Development', description: 'Build RESTful APIs with proper error handling', completed: false, difficulty: 'Medium' },
        { id: '3', title: 'Implement Caching', description: 'Add Redis caching for improved performance', completed: false, difficulty: 'Medium' },
        { id: '4', title: 'Write Unit Tests', description: 'Create comprehensive test coverage for your APIs', completed: false, difficulty: 'Hard' }
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud Engineer',
      icon: Cloud,
      color: 'from-orange-500 to-yellow-500',
      description: 'Deploy and manage applications in the cloud',
      completionScore: 0,
      totalPoints: 550,
      tasks: [
        { id: '1', title: 'Setup Cloud Account', description: 'Configure AWS/Azure account and basic services', completed: false, difficulty: 'Easy' },
        { id: '2', title: 'Deploy Container', description: 'Containerize app with Docker and deploy to cloud', completed: false, difficulty: 'Medium' },
        { id: '3', title: 'Configure CI/CD', description: 'Set up automated deployment pipeline', completed: false, difficulty: 'Hard' },
        { id: '4', title: 'Implement Monitoring', description: 'Add logging and monitoring solutions', completed: false, difficulty: 'Hard' },
        { id: '5', title: 'Scale Application', description: 'Configure auto-scaling and load balancing', completed: false, difficulty: 'Hard' }
      ]
    }
  ]);

  const toggleTask = (roleId: string, taskId: string) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const updatedTasks = role.tasks.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        const completedCount = updatedTasks.filter(t => t.completed).length;
        const totalTasks = updatedTasks.length;
        const newScore = Math.round((completedCount / totalTasks) * 100);
        
        return {
          ...role,
          tasks: updatedTasks,
          completionScore: newScore
        };
      }
      return role;
    }));
  };

  const getTaskPoints = (difficulty: string): number => {
    switch (difficulty) {
      case 'Easy': return 50;
      case 'Medium': return 100;
      case 'Hard': return 150;
      default: return 0;
    }
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const selectedRole = roles.find(r => r.id === activeRole);

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
            <BreadcrumbPage>Lab Simulation</BreadcrumbPage>
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
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl">Virtual Lab Simulation</h1>
              <p className="text-muted-foreground">Explore tech roles through hands-on guided experiences</p>
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

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl">{roles.reduce((sum, role) => sum + role.tasks.filter(t => t.completed).length, 0)}</p>
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl">{roles.reduce((sum, role) => sum + role.tasks.filter(t => t.completed).reduce((pts, task) => pts + getTaskPoints(task.difficulty), 0), 0)}</p>
                  <p className="text-sm text-muted-foreground">Points Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl">{roles.filter(r => r.completionScore === 100).length}/4</p>
                  <p className="text-sm text-muted-foreground">Roles Mastered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl">{Math.round(roles.reduce((sum, role) => sum + role.completionScore, 0) / roles.length)}%</p>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Role Selection or Active Lab */}
      <AnimatePresence mode="wait">
        {!activeRole ? (
          <motion.div
            key="role-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Tech Role</CardTitle>
                <CardDescription>Select a role to start your virtual lab experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roles.map((role, index) => {
                    const IconComponent = role.icon;
                    const completedTasks = role.tasks.filter(t => t.completed).length;
                    const totalTasks = role.tasks.length;
                    
                    return (
                      <motion.div
                        key={role.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card 
                          className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary h-full"
                          onClick={() => setActiveRole(role.id)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                              <div className={`w-14 h-14 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                                <IconComponent className="w-7 h-7 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="mb-1">{role.name}</h3>
                                <p className="text-sm text-muted-foreground">{role.description}</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span>{completedTasks}/{totalTasks} tasks</span>
                              </div>
                              <Progress value={role.completionScore} className="h-2" />
                              
                              <div className="flex items-center justify-between text-sm pt-2">
                                <Badge variant="secondary">{role.completionScore}% Complete</Badge>
                                <span className="text-primary">{role.totalPoints} pts max</span>
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
          </motion.div>
        ) : selectedRole && (
          <motion.div
            key="active-lab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Active Role Header */}
            <Card className={`bg-gradient-to-r ${selectedRole.color} text-white`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                      {(() => {
                        const IconComponent = selectedRole.icon;
                        return <IconComponent className="w-8 h-8 text-white" />;
                      })()}
                    </div>
                    <div>
                      <h2 className="mb-1">{selectedRole.name}</h2>
                      <p className="text-white/90">{selectedRole.description}</p>
                    </div>
                  </div>
                  <Button 
                    variant="secondary"
                    onClick={() => setActiveRole(null)}
                  >
                    Exit Lab
                  </Button>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span>Overall Progress</span>
                    <span>{selectedRole.completionScore}%</span>
                  </div>
                  <Progress value={selectedRole.completionScore} className="h-3 bg-white/20" />
                </div>
              </CardContent>
            </Card>

            {/* AI Guidance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2">AI Guidance</h3>
                      <p className="text-sm text-muted-foreground">
                        Complete each task in order to build your skills progressively. I'll provide hints and resources as you work through each challenge. Mark tasks as complete when you finish them!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tasks List */}
            <Card>
              <CardHeader>
                <CardTitle>Lab Tasks</CardTitle>
                <CardDescription>Complete these hands-on challenges to master this role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedRole.tasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          task.completed ? 'bg-green-50 border-green-200' : ''
                        }`}
                        onClick={() => toggleTask(selectedRole.id, task.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 flex-shrink-0">
                              {task.completed ? (
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                              ) : (
                                <Circle className="w-6 h-6 text-gray-300" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className={task.completed ? 'line-through text-muted-foreground' : ''}>
                                    {task.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                                </div>
                                <Badge className={getDifficultyColor(task.difficulty)}>
                                  {task.difficulty}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between mt-3">
                                <span className="text-sm text-primary">+{getTaskPoints(task.difficulty)} points</span>
                                {!task.completed && (
                                  <Button size="sm" variant="outline">
                                    <Play className="w-4 h-4 mr-2" />
                                    Start Task
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Completion Celebration */}
            {selectedRole.completionScore === 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  <CardContent className="p-8 text-center">
                    <Trophy className="w-16 h-16 mx-auto mb-4" />
                    <h2 className="mb-2">🎉 Congratulations!</h2>
                    <p className="text-lg mb-4">You've mastered the {selectedRole.name} role!</p>
                    <div className="flex items-center justify-center gap-4">
                      <Badge variant="secondary" className="text-lg px-4 py-2">
                        <Award className="w-5 h-5 mr-2" />
                        {selectedRole.totalPoints} Points Earned
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
