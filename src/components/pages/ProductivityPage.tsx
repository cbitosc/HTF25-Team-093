import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { FeatureBadge } from '../FeatureBadge';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Clock, BookOpen, Target } from 'lucide-react';

export function ProductivityPage() {
  const weeklyTasks = [
    { day: 'Mon', completed: 5, pending: 2 },
    { day: 'Tue', completed: 4, pending: 3 },
    { day: 'Wed', completed: 7, pending: 1 },
    { day: 'Thu', completed: 6, pending: 2 },
    { day: 'Fri', completed: 5, pending: 3 },
    { day: 'Sat', completed: 3, pending: 1 },
    { day: 'Sun', completed: 2, pending: 2 },
  ];

  const timeBySubject = [
    { subject: 'DBMS', hours: 8, color: '#28A745' },
    { subject: 'AI & ML', hours: 6, color: '#66BB6A' },
    { subject: 'Algorithms', hours: 5, color: '#81C784' },
    { subject: 'OS', hours: 4, color: '#A5D6A7' },
    { subject: 'Networks', hours: 3, color: '#C8E6C9' },
  ];

  const moodTrend = [
    { day: 'Mon', mood: 7 },
    { day: 'Tue', mood: 6 },
    { day: 'Wed', mood: 8 },
    { day: 'Thu', mood: 7 },
    { day: 'Fri', mood: 9 },
    { day: 'Sat', mood: 8 },
    { day: 'Sun', mood: 7 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-green-600 text-white p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <h1 className="text-3xl mb-2">Productivity Insights</h1>
        <p className="text-green-100">Track your progress and stay motivated</p>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Feature Badge */}
        <FeatureBadge text="AI Motivation Engine" />

        {/* AI Motivation Message */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-yellow-50 to-green-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                🎉
              </div>
              <div>
                <h3 className="mb-2">Great Work This Week!</h3>
                <p className="text-gray-700">
                  You're most productive on Wednesdays — great job! You've completed <span className="text-primary">32 tasks</span> this week with an average productivity score of <span className="text-primary">85%</span>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
            <CardContent className="p-6">
              <Target className="w-8 h-8 text-blue-600 mb-3" />
              <p className="text-3xl mb-1">32</p>
              <p className="text-sm text-gray-600">Tasks Completed</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
            <CardContent className="p-6">
              <Clock className="w-8 h-8 text-green-600 mb-3" />
              <p className="text-3xl mb-1">26h</p>
              <p className="text-sm text-gray-600">Study Hours</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
            <CardContent className="p-6">
              <BookOpen className="w-8 h-8 text-purple-600 mb-3" />
              <p className="text-3xl mb-1">15</p>
              <p className="text-sm text-gray-600">Notes Reviewed</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-200">
            <CardContent className="p-6">
              <TrendingUp className="w-8 h-8 text-orange-600 mb-3" />
              <p className="text-3xl mb-1">85%</p>
              <p className="text-sm text-gray-600">Productivity</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Task Completion */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Task Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyTasks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#28A745" name="Completed" radius={[8, 8, 0, 0]} />
                <Bar dataKey="pending" fill="#FFA500" name="Pending" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Time Spent Per Subject */}
          <Card>
            <CardHeader>
              <CardTitle>Time Spent Per Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={timeBySubject}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ subject, percent }) => `${subject} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="hours"
                  >
                    {timeBySubject.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {timeBySubject.map((subject, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
                      <span>{subject.subject}</span>
                    </div>
                    <span className="text-gray-600">{subject.hours}h</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mood Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Mood Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={moodTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#28A745" 
                    strokeWidth={3}
                    name="Mood Score"
                    dot={{ fill: '#28A745', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 p-3 bg-green-50 rounded-2xl border border-green-200">
                <p className="text-sm text-green-800">
                  📈 Your mood has been consistently positive this week! Keep up the great work.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle>This Week's Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-2xl shadow-sm">
                <div className="text-4xl mb-2">🏆</div>
                <h4 className="mb-1">Task Master</h4>
                <p className="text-sm text-gray-600">Completed all weekly tasks</p>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm">
                <div className="text-4xl mb-2">🔥</div>
                <h4 className="mb-1">7-Day Streak</h4>
                <p className="text-sm text-gray-600">Studied every day this week</p>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm">
                <div className="text-4xl mb-2">⚡</div>
                <h4 className="mb-1">Early Bird</h4>
                <p className="text-sm text-gray-600">Started work before 9 AM daily</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
