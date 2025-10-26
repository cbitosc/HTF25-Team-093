import { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { FloatingAIButton } from './components/FloatingAIButton';
import { QuickAITips } from './components/QuickAITips';
import { SplashPage } from './components/pages/SplashPage';
import { HomePage } from './components/pages/HomePage';
import { NewDashboardPage } from './components/pages/NewDashboardPage';
import { TimetablePage } from './components/pages/TimetablePage';
import { AssignmentsPage } from './components/pages/AssignmentsPage';
import { NewNotesPage } from './components/pages/NewNotesPage';
import { NewChatPage } from './components/pages/NewChatPage';
import { ProductivityPage } from './components/pages/ProductivityPage';
import { NewProjectsPage } from './components/pages/NewProjectsPage';
import { MindWellPage } from './components/pages/MindWellPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { AITwinMentorPage } from './components/pages/AITwinMentorPage';
import { LabSimulationPage } from './components/pages/LabSimulationPage';
import { LearningCapsulesPage } from './components/pages/LearningCapsulesPage';
import { AchievementsPage } from './components/pages/AchievementsPage';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { Menu, X, User, BarChart3, Heart, Trophy, Sparkles, Zap, Brain } from 'lucide-react';

// ✅ New imports for login/signup pages
import { LoginPage } from './components/pages/LoginPage';
import { SignupPage } from './components/pages/SignupPage';

export default function App() {
  // ✅ States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // ✅ Auth handlers
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  // ✅ Conditional rendering before login
  if (!isLoggedIn) {
    if (showLogin) {
      return (
        <LoginPage
          onLogin={handleLogin}
          onNavigateSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      );
    }

    if (showSignup) {
      return (
        <SignupPage
          onNavigateLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      );
    }

    // Show new HomePage by default (before login)
    return (
      <HomePage
        onNavigateLogin={() => setShowLogin(true)}
        onNavigateSignup={() => setShowSignup(true)}
      />
    );
  }

  // ✅ After login — dashboard UI
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <NewDashboardPage onNavigate={handleNavigate} />;
      case 'timetable': return <TimetablePage />;
      case 'assignments': return <AssignmentsPage />;
      case 'notes': return <NewNotesPage />;
      case 'chat': return <NewChatPage />;
      case 'productivity': return <ProductivityPage />;
      case 'projects': return <NewProjectsPage />;
      case 'mindwell': return <MindWellPage />;
      case 'profile': return <ProfilePage onLogout={handleLogout} />;
      case 'mentor': return <AITwinMentorPage onNavigate={handleNavigate} />;
      case 'lab': return <LabSimulationPage onNavigate={handleNavigate} />;
      case 'capsules': return <LearningCapsulesPage onNavigate={handleNavigate} />;
      case 'achievements': return <AchievementsPage onNavigate={handleNavigate} />;
      default: return <NewDashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Top Nav */}
      <div className="hidden md:block sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center">
              <span className="text-white">🧠</span>
            </div>
            <h1 className="text-xl">AI Student Assistant</h1>
          </div>

          <nav className="flex items-center gap-2">
            {['dashboard', 'timetable', 'assignments', 'notes', 'projects', 'productivity', 'mindwell', 'mentor', 'lab', 'capsules', 'achievements', 'profile'].map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'ghost'}
                className={currentPage === page ? 'bg-primary hover:bg-green-700' : ''}
                onClick={() => handleNavigate(page)}
              >
                {page === 'productivity' && <BarChart3 className="w-4 h-4 mr-2" />}
                {page === 'mindwell' && <Heart className="w-4 h-4 mr-2" />}
                {page === 'mentor' && <Sparkles className="w-4 h-4 mr-2" />}
                {page === 'lab' && <Zap className="w-4 h-4 mr-2" />}
                {page === 'capsules' && <Brain className="w-4 h-4 mr-2" />}
                {page === 'achievements' && <Trophy className="w-4 h-4 mr-2" />}
                {page === 'profile' && <User className="w-4 h-4 mr-2" />}
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </Button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Top Nav */}
      <div className="md:hidden sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center">
              <span className="text-white">🧠</span>
            </div>
            <h1 className="text-lg">AI Assistant</h1>
          </div>

          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b shadow-lg p-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {[
              { icon: <BarChart3 className="w-5 h-5 mr-3" />, label: 'Productivity Insights', page: 'productivity' },
              { icon: <Heart className="w-5 h-5 mr-3" />, label: 'MindWell Section', page: 'mindwell' },
              { icon: <Sparkles className="w-5 h-5 mr-3" />, label: 'AI Twin Mentor', page: 'mentor' },
              { icon: <Zap className="w-5 h-5 mr-3" />, label: 'Lab Simulation', page: 'lab' },
              { icon: <Brain className="w-5 h-5 mr-3" />, label: 'Learning Capsules', page: 'capsules' },
              { icon: <Trophy className="w-5 h-5 mr-3" />, label: 'Achievements & Rewards', page: 'achievements' },
              { icon: <User className="w-5 h-5 mr-3" />, label: 'Profile & Settings', page: 'profile' },
            ].map(({ icon, label, page }) => (
              <Button key={page} variant="ghost" className="w-full justify-start" onClick={() => handleNavigate(page)}>
                {icon}
                {label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
  <main className="max-w-6xl mx-auto px-4">{renderPage()}</main>

      {/* Bottom Navigation (Mobile) */}
      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Floating AI Button */}
      <FloatingAIButton onClick={() => handleNavigate('chat')} />

      {/* Quick AI Tips Widget */}
      <QuickAITips />

      {/* Toast Notifications */}
      <Toaster position="top-center" richColors />
    </div>
  );
}
