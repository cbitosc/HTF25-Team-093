import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Sun, Clock, BookOpen, Sparkles, TrendingUp, Target } from 'lucide-react';

export function DailyDigestPage() {
  const todayClasses = [
    { time: '09:00 AM', subject: 'Data Structures', room: 'CS-301', instructor: 'Dr. Smith' },
    { time: '11:00 AM', subject: 'Algorithms Lab', room: 'CS-Lab-2', instructor: 'Prof. Johnson' },
    { time: '02:00 PM', subject: 'Database Systems', room: 'CS-205', instructor: 'Dr. Williams' },
  ];

  const newNotes = [
    { title: 'Binary Search Trees - Summary', subject: 'Data Structures', type: 'AI Summary' },
    { title: 'SQL Joins - Flashcards (24 cards)', subject: 'Database Systems', type: 'Flashcards' },
    { title: 'Graph Traversal - Quiz (10 questions)', subject: 'Algorithms', type: 'Quiz' },
  ];

  const achievements = [
    { title: 'Completed 5 tasks this week', icon: '🎯', color: 'bg-blue-50' },
    { title: '3-day study streak', icon: '🔥', color: 'bg-orange-50' },
    { title: 'All assignments submitted on time', icon: '✅', color: 'bg-green-50' },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Greeting Header */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl">
        <Sun className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h1 className="text-4xl mb-2">Good Morning, John! ☀️</h1>
        <p className="text-gray-600 text-lg">Friday, October 25, 2025</p>
        <p className="text-gray-500 mt-2">You have 3 classes and 5 tasks scheduled for today</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Priority Task */}
          <Card className="border-l-4 border-l-purple-600 bg-gradient-to-r from-purple-50 to-transparent">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Next Focus Task (AI Prioritized)
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Based on urgency and impact</p>
                </div>
                <Badge className="bg-purple-600">High Priority</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl mb-2">Complete Database Assignment 3 - ER Diagrams</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Due: Tonight, 11:59 PM
                </span>
                <span>•</span>
                <span>Estimated time: 2 hours</span>
                <span>•</span>
                <span>Weight: 15% of final grade</span>
              </div>
              <div className="flex gap-3">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Start Working
                </Button>
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>

          {/* Today's Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Today's Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayClasses.map((classItem, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                    <div className="text-center w-20">
                      <p className="text-sm text-gray-500">{classItem.time}</p>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1">{classItem.subject}</h3>
                      <p className="text-sm text-gray-500">
                        {classItem.instructor} • {classItem.room}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">View Notes</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* New Notes & Summaries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                New AI-Generated Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {newNotes.map((note, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                      ✨
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1">{note.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{note.subject}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">{note.type}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Open</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, idx) => (
                <div key={idx} className={`p-3 ${achievement.color} rounded-lg border`}>
                  <p className="text-sm flex items-center gap-2">
                    <span className="text-lg">{achievement.icon}</span>
                    {achievement.title}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Motivational Tips */}
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💡 Daily Motivation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-sm italic">"Success is the sum of small efforts repeated day in and day out."</p>
                <p className="text-xs text-gray-500 mt-2">- Robert Collier</p>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <p className="text-sm">💪 You're doing great! Keep up the momentum.</p>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <p className="text-sm">📚 Study tip: Use the Pomodoro technique (25 min focus + 5 min break)</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>This Week's Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Tasks Completed</span>
                  <span className="text-blue-600">5/7</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="w-[71%] h-2 bg-blue-600 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Study Hours</span>
                  <span className="text-green-600">18/20</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="w-[90%] h-2 bg-green-600 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Classes Attended</span>
                  <span className="text-purple-600">12/12</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="w-[100%] h-2 bg-purple-600 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                📝 Review today's notes
              </Button>
              <Button variant="outline" className="w-full justify-start">
                🎯 View all tasks
              </Button>
              <Button variant="outline" className="w-full justify-start">
                💬 Ask AI a question
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📅 Check calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
