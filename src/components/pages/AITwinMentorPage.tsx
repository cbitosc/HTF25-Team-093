import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Mic, 
  User, 
  Zap, 
  Heart, 
  Brain,
  Sparkles,
  TrendingUp,
  BookOpen,
  Target,
  ArrowLeft,
  Home
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
}

interface Mentor {
  id: string;
  name: string;
  personality: string;
  expertise: string;
  avatar: string;
  color: string;
  trait: string;
  icon: any;
}

interface AITwinMentorPageProps {
  onNavigate?: (page: string) => void;
}

export function AITwinMentorPage({ onNavigate }: AITwinMentorPageProps) {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Dr. Innovation',
      personality: 'Creative & Visionary',
      expertise: 'Problem Solving & Innovation',
      avatar: '🚀',
      color: 'from-purple-500 to-pink-500',
      trait: 'Encourages creative thinking',
      icon: Sparkles
    },
    {
      id: '2',
      name: 'Prof. Focus',
      personality: 'Disciplined & Strategic',
      expertise: 'Time Management & Productivity',
      avatar: '🎯',
      color: 'from-blue-500 to-cyan-500',
      trait: 'Builds strong work habits',
      icon: Target
    },
    {
      id: '3',
      name: 'Coach Motivate',
      personality: 'Energetic & Supportive',
      expertise: 'Motivation & Growth Mindset',
      avatar: '⚡',
      color: 'from-orange-500 to-yellow-500',
      trait: 'Boosts confidence & drive',
      icon: TrendingUp
    },
    {
      id: '4',
      name: 'Mentor Wisdom',
      personality: 'Calm & Insightful',
      expertise: 'Deep Learning & Reflection',
      avatar: '🧠',
      color: 'from-green-500 to-emerald-500',
      trait: 'Provides thoughtful guidance',
      icon: Brain
    }
  ];

  const motivationalQuotes = [
    "Every expert was once a beginner.",
    "Progress, not perfection.",
    "Small steps lead to big achievements.",
    "Your potential is limitless."
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedMentor) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'mentor',
        text: generateMentorResponse(selectedMentor, inputMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateMentorResponse = (mentor: Mentor, userMessage: string): string => {
    const responses: { [key: string]: string[] } = {
      '1': [
        "That's an interesting challenge! Let's think outside the box. Have you considered approaching this from a completely different angle?",
        "Innovation happens when we combine existing ideas in new ways. What if we reimagined this problem entirely?",
        "Great question! The most creative solutions often come from asking 'What if?' repeatedly."
      ],
      '2': [
        "Excellent! Let's break this down into manageable chunks. First, prioritize the most critical tasks.",
        "Time management is about focused execution. Block out dedicated time for this and eliminate distractions.",
        "Strategic thinking here: What's the minimum viable outcome that delivers maximum value?"
      ],
      '3': [
        "You've got this! Remember, every challenge is an opportunity to grow stronger and smarter.",
        "I believe in you! The fact that you're asking means you're already on the path to success.",
        "Amazing progress! Keep that momentum going. Small wins add up to big victories!"
      ],
      '4': [
        "Let's pause and reflect on this deeply. What patterns do you notice? Understanding is the foundation of mastery.",
        "Wisdom comes from connecting concepts. How does this relate to what you've learned before?",
        "Take a moment to consider the deeper implications. True learning happens when we see the bigger picture."
      ]
    };

    const mentorResponses = responses[mentor.id] || responses['1'];
    return mentorResponses[Math.floor(Math.random() * mentorResponses.length)];
  };

  const selectMentor = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setMessages([
      {
        id: '0',
        sender: 'mentor',
        text: `Hi! I'm ${mentor.name}. ${mentor.trait}. How can I help you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
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
            <BreadcrumbPage>AI Twin Mentor</BreadcrumbPage>
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
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl">AI Twin Mentors</h1>
              <p className="text-muted-foreground">Connect with personalized AI mentors for guidance</p>
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

      {/* Motivational Quote Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-primary/10 to-green-600/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              <div>
                <p className="text-lg italic">"{motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}"</p>
                <p className="text-sm text-muted-foreground mt-1">Daily Inspiration</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Mentor Selection */}
      {!selectedMentor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Choose Your AI Mentor</CardTitle>
              <CardDescription>Select a mentor personality that matches your learning style</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mentors.map((mentor, index) => {
                  const IconComponent = mentor.icon;
                  return (
                    <motion.div
                      key={mentor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary"
                        onClick={() => selectMentor(mentor)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-16 h-16 bg-gradient-to-br ${mentor.color} rounded-2xl flex items-center justify-center text-3xl`}>
                              {mentor.avatar}
                            </div>
                            <div className="flex-1">
                              <h3 className="mb-1 flex items-center gap-2">
                                {mentor.name}
                                <IconComponent className="w-4 h-4 text-primary" />
                              </h3>
                              <Badge variant="secondary" className="mb-2">{mentor.personality}</Badge>
                              <p className="text-sm text-muted-foreground mb-2">{mentor.expertise}</p>
                              <p className="text-sm text-primary italic">✨ {mentor.trait}</p>
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
      )}

      {/* Chat Interface */}
      {selectedMentor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {/* Chat Area */}
          <Card className="lg:col-span-3">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${selectedMentor.color} rounded-2xl flex items-center justify-center text-2xl`}>
                    {selectedMentor.avatar}
                  </div>
                  <div>
                    <CardTitle>{selectedMentor.name}</CardTitle>
                    <CardDescription>{selectedMentor.expertise}</CardDescription>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedMentor(null);
                    setMessages([]);
                  }}
                >
                  Change Mentor
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px] p-6">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className="flex items-start gap-2">
                          {message.sender === 'mentor' && (
                            <div className={`w-8 h-8 bg-gradient-to-br ${selectedMentor.color} rounded-xl flex items-center justify-center text-sm flex-shrink-0`}>
                              {selectedMentor.avatar}
                            </div>
                          )}
                          <div>
                            <div className={`rounded-2xl p-4 ${
                              message.sender === 'user' 
                                ? 'bg-primary text-white' 
                                : 'bg-secondary text-foreground'
                            }`}>
                              <p>{message.text}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 px-2">{message.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 mb-4"
                  >
                    <div className={`w-8 h-8 bg-gradient-to-br ${selectedMentor.color} rounded-xl flex items-center justify-center text-sm`}>
                      {selectedMentor.avatar}
                    </div>
                    <div className="bg-secondary rounded-2xl p-4">
                      <div className="flex gap-1">
                        <motion.div
                          className="w-2 h-2 bg-primary rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-primary rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-primary rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, delay: 0.4, repeat: Infinity }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <Mic className="w-5 h-5" />
                  </Button>
                  <Input
                    placeholder="Ask your mentor anything..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-primary hover:bg-green-700 flex-shrink-0"
                    disabled={!inputMessage.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 px-2">
                  💡 Tip: Be specific about your challenges for personalized guidance
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mentor Info Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Mentor Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={`w-24 h-24 bg-gradient-to-br ${selectedMentor.color} rounded-3xl flex items-center justify-center text-5xl mx-auto mb-3`}>
                  {selectedMentor.avatar}
                </div>
                <h3 className="mb-1">{selectedMentor.name}</h3>
                <Badge variant="secondary">{selectedMentor.personality}</Badge>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Expertise</p>
                  <p className="text-sm">{selectedMentor.expertise}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Approach</p>
                  <p className="text-sm">{selectedMentor.trait}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm mb-3">Quick Actions</p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Study Tips
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Target className="w-4 h-4 mr-2" />
                    Set Goals
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Motivation Boost
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
