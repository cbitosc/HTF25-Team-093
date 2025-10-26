import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { FeatureBadge } from '../FeatureBadge';
import MentorSelector from '../MentorSelector';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  Calendar, 
  CheckSquare, 
  Briefcase, 
  Sun, 
  CloudRain, 
  Bell,
  ArrowRight,
  Clock,
  MapPin,
  User,
  Sparkles,
  Zap,
  Brain,
  Trophy,
  Loader2
} from 'lucide-react';

interface NewDashboardPageProps {
  onNavigate?: (page: string) => void;
}

export function NewDashboardPage({ onNavigate }: NewDashboardPageProps) {
  const [loadingFeature, setLoadingFeature] = useState<string | null>(null);
  const todayClasses = [
    { time: '10:00 AM', subject: 'DBMS Lecture', faculty: 'Dr. Sharma', location: 'CS-301', color: 'bg-blue-500' },
    { time: '02:00 PM', subject: 'Algorithm Lab', faculty: 'Prof. Kumar', location: 'Lab-2', color: 'bg-purple-500' },
  ];

  const pendingAssignments = [
    { title: 'AI Mini Project', due: 'Tomorrow', priority: 'high', subject: 'Artificial Intelligence' },
    { title: 'DBMS Assignment 3', due: 'In 3 days', priority: 'medium', subject: 'Database Systems' },
  ];

  const upcomingProjects = [
    { title: 'E-Commerce Website', progress: 65, team: 'Team Alpha', deadline: 'Nov 15' },
  ];

  const getHourGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleFeatureClick = async (feature: string, page: string) => {
    setLoadingFeature(feature);
    
    // Simulate loading/authentication check
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (onNavigate) {
      onNavigate(page);
      toast.success(`Loading ${feature}...`, {
        duration: 2000,
      });
    }
    
    setLoadingFeature(null);
  };

  const handleQuickNavigation = (page: string, name: string) => {
    if (onNavigate) {
      onNavigate(page);
      toast.success(`Opening ${name}...`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-green-600 text-white rounded-b-3xl shadow-lg">
  <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl mb-1">{getHourGreeting()}, Bhuvana 👋</h1>
              <p className="text-green-100">Friday, October 25, 2025</p>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Bell className="w-6 h-6" />
            </Button>
          </div>

          {/* Weather Widget */}
          <div className="flex items-center gap-4 text-green-50 mt-4">
            <Sun className="w-5 h-5" />
            <span>28°C • Sunny</span>
          </div>

          {/* Motivational Quote */}
          <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <p className="text-sm italic">"Success is the sum of small efforts repeated day in and day out."</p>
            <p className="text-xs text-green-100 mt-1">- Robert Collier</p>
          </div>
        </div>
      </div>

  <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-6">
        {/* AI Daily Summary */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-green-50 to-white shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center">
                  🤖
                </div>
                AI Daily Summary
              </CardTitle>
              <FeatureBadge text="AI Powered" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              You have <span className="text-primary">2 classes</span>, <span className="text-primary">1 assignment</span>, and <span className="text-primary">1 meeting</span> today. Your AI assistant has prioritized your tasks for optimal productivity.
            </p>
          </CardContent>
        </Card>

        {/* Mentor selector - persona cards and simple chat */}
        <MentorSelector />

        {/* Main Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Today's Classes */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5 text-blue-500" />
                Today's Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayClasses.map((cls, idx) => (
                <div key={idx} className="p-3 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {cls.time}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${cls.color}`} />
                  </div>
                  <h4 className="mb-1">{cls.subject}</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {cls.faculty}
                    </p>
                    <p className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {cls.location}
                    </p>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full rounded-xl"
                onClick={() => handleQuickNavigation('timetable', 'Timetable')}
              >
                View Full Schedule
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Pending Assignments */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckSquare className="w-5 h-5 text-orange-500" />
                Pending Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingAssignments.map((assignment, idx) => (
                <div key={idx} className="p-3 bg-gradient-to-r from-orange-50 to-transparent rounded-xl border border-orange-100">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="flex-1">{assignment.title}</h4>
                    <Badge 
                      className={`${
                        assignment.priority === 'high' 
                          ? 'bg-red-100 text-red-700 border-red-300' 
                          : 'bg-yellow-100 text-yellow-700 border-yellow-300'
                      }`}
                      variant="outline"
                    >
                      {assignment.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{assignment.subject}</p>
                  <p className="text-sm text-orange-600">Due: {assignment.due}</p>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full rounded-xl"
                onClick={() => handleQuickNavigation('assignments', 'Assignments')}
              >
                View All Tasks
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Projects */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Briefcase className="w-5 h-5 text-purple-500" />
                Upcoming Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingProjects.map((project, idx) => (
                <div key={idx} className="p-3 bg-gradient-to-r from-purple-50 to-transparent rounded-xl border border-purple-100">
                  <h4 className="mb-2">{project.title}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-purple-600">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">{project.team} • Due: {project.deadline}</p>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full rounded-xl"
                onClick={() => handleQuickNavigation('projects', 'Projects')}
              >
                View All Projects
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* New AI Features - Enhanced Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Explore AI-Powered Features
              </CardTitle>
              <FeatureBadge text="NEW" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="cursor-pointer border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      {loadingFeature === 'mentor' ? (
                        <Loader2 className="w-7 h-7 text-white animate-spin" />
                      ) : (
                        <Sparkles className="w-7 h-7 text-white" />
                      )}
                    </div>
                    <h4 className="mb-2">AI Twin Mentor</h4>
                    <p className="text-sm text-gray-600 mb-3">Get personalized guidance from AI mentors</p>
                    <Button 
                      size="sm" 
                      className="bg-purple-600 hover:bg-purple-700 w-full"
                      onClick={() => handleFeatureClick('AI Twin Mentor', 'mentor')}
                      disabled={loadingFeature !== null}
                    >
                      {loadingFeature === 'mentor' ? 'Loading...' : 'Start Chat'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="cursor-pointer border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      {loadingFeature === 'lab' ? (
                        <Loader2 className="w-7 h-7 text-white animate-spin" />
                      ) : (
                        <Zap className="w-7 h-7 text-white" />
                      )}
                    </div>
                    <h4 className="mb-2">Lab Simulation</h4>
                    <p className="text-sm text-gray-600 mb-3">Practice tech roles in virtual sandbox</p>
                    <Button 
                      size="sm" 
                      className="bg-orange-600 hover:bg-orange-700 w-full"
                      onClick={() => handleFeatureClick('Lab Simulation', 'lab')}
                      disabled={loadingFeature !== null}
                    >
                      {loadingFeature === 'lab' ? 'Loading...' : 'Try Labs'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="cursor-pointer border-2 border-green-200 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      {loadingFeature === 'capsules' ? (
                        <Loader2 className="w-7 h-7 text-white animate-spin" />
                      ) : (
                        <Brain className="w-7 h-7 text-white" />
                      )}
                    </div>
                    <h4 className="mb-2">Learning Capsules</h4>
                    <p className="text-sm text-gray-600 mb-3">Adaptive micro-learning modules</p>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 w-full"
                      onClick={() => handleFeatureClick('Learning Capsules', 'capsules')}
                      disabled={loadingFeature !== null}
                    >
                      {loadingFeature === 'capsules' ? 'Loading...' : 'Learn Now'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="cursor-pointer border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-white hover:shadow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      {loadingFeature === 'achievements' ? (
                        <Loader2 className="w-7 h-7 text-white animate-spin" />
                      ) : (
                        <Trophy className="w-7 h-7 text-white" />
                      )}
                    </div>
                    <h4 className="mb-2">Achievements</h4>
                    <p className="text-sm text-gray-600 mb-3">Track progress & earn rewards</p>
                    <Button 
                      size="sm" 
                      className="bg-yellow-600 hover:bg-yellow-700 w-full"
                      onClick={() => handleFeatureClick('Achievements', 'achievements')}
                      disabled={loadingFeature !== null}
                    >
                      {loadingFeature === 'achievements' ? 'Loading...' : 'View Rewards'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-green-100 shadow-sm text-center">
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-sm text-gray-700">Predictive Deadline Prioritizer</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-green-100 shadow-sm text-center">
            <div className="text-2xl mb-2">🧠</div>
            <p className="text-sm text-gray-700">AI Mood-Adaptive Assistant</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-green-100 shadow-sm text-center">
            <div className="text-2xl mb-2">📚</div>
            <p className="text-sm text-gray-700">Auto Summarize + Flashcards</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-green-100 shadow-sm text-center">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-sm text-gray-700">Smart Slot Recommender</p>
          </div>
        </div>
      </div>
    </div>
  );
}
