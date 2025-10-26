import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { 
  Plus, 
  Upload, 
  MessageSquare, 
  Clock, 
  BookOpen, 
  CheckCircle2,
  AlertCircle,
  Bell
} from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';

export function DashboardPage() {
  const todaySchedule = [
    { time: '09:00 AM', subject: 'Data Structures', type: 'Lecture', room: 'CS-301' },
    { time: '11:00 AM', subject: 'Algorithms', type: 'Lab', room: 'CS-Lab-2' },
    { time: '02:00 PM', subject: 'Database Systems', type: 'Lecture', room: 'CS-205' },
  ];

  const recentNotes = [
    { title: 'Binary Search Trees', subject: 'Data Structures', date: 'Today', aiSummary: true },
    { title: 'SQL Joins & Queries', subject: 'Database Systems', date: 'Yesterday', aiSummary: true },
    { title: 'Graph Algorithms', subject: 'Algorithms', date: '2 days ago', aiSummary: false },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-1">Welcome back, John! 👋</h1>
          <p className="text-gray-600">Here's what's happening with your studies today</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Avatar>
            <AvatarFallback className="bg-purple-100 text-purple-600">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* AI Priority Task */}
      <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-transparent">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-purple-600" />
                Next AI-Prioritized Task
              </CardTitle>
              <CardDescription>Based on your schedule and deadlines</CardDescription>
            </div>
            <Badge className="bg-purple-600">High Priority</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2">Complete Database Assignment 3 - ER Diagrams</h3>
          <p className="text-sm text-gray-600 mb-4">Due: Tomorrow, 11:59 PM • Estimated time: 2 hours</p>
          <Button className="bg-purple-600 hover:bg-purple-700">Start Working</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="text-sm text-gray-600 w-20">{item.time}</div>
                  <div className="flex-1">
                    <p>{item.subject}</p>
                    <p className="text-sm text-gray-500">{item.type} • {item.room}</p>
                  </div>
                  <Badge variant="outline">{item.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mini Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" className="rounded-md" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="w-6 h-6" />
              Add Task
            </Button>
            <Button className="h-20 flex-col gap-2 bg-green-600 hover:bg-green-700">
              <Upload className="w-6 h-6" />
              Upload Notes
            </Button>
            <Button className="h-20 flex-col gap-2 bg-purple-600 hover:bg-purple-700">
              <MessageSquare className="w-6 h-6" />
              Ask AI
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Notes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Recent Notes & Summaries
            </CardTitle>
            <Button variant="link">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentNotes.map((note, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50">
                <div className="flex-1">
                  <p className="mb-1">{note.title}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{note.subject}</span>
                    <span>•</span>
                    <span>{note.date}</span>
                  </div>
                </div>
                {note.aiSummary && (
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600">
                    AI Summary Ready
                  </Badge>
                )}
                <Button variant="outline" size="sm">View</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
