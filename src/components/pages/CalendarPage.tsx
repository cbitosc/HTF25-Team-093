import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar as CalendarComponent } from '../ui/calendar';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';

export function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const todayTasks = [
    { time: '09:00 AM', title: 'Data Structures Lecture', type: 'class', color: 'bg-blue-500' },
    { time: '11:00 AM', title: 'Complete Lab Assignment', type: 'task', color: 'bg-purple-500' },
    { time: '02:00 PM', title: 'Database Systems Lecture', type: 'class', color: 'bg-blue-500' },
    { time: '04:00 PM', title: 'Study Group - Algorithms', type: 'meeting', color: 'bg-green-500' },
    { time: '07:00 PM', title: 'Review Notes', type: 'task', color: 'bg-purple-500' },
  ];

  const upcomingEvents = [
    { date: 'Oct 26', title: 'OS Mid-term Exam', type: 'exam', color: 'bg-red-500' },
    { date: 'Oct 28', title: 'Database Assignment Due', type: 'deadline', color: 'bg-orange-500' },
    { date: 'Oct 30', title: 'Project Presentation', type: 'presentation', color: 'bg-purple-500' },
    { date: 'Nov 1', title: 'Algorithm Quiz', type: 'quiz', color: 'bg-yellow-500' },
  ];

  const weekView = [
    { day: 'Mon', date: '21', events: 3 },
    { day: 'Tue', date: '22', events: 2 },
    { day: 'Wed', date: '23', events: 4 },
    { day: 'Thu', date: '24', events: 3 },
    { day: 'Fri', date: '25', events: 5 },
    { day: 'Sat', date: '26', events: 1 },
    { day: 'Sun', date: '27', events: 0 },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-1">Calendar & Reminders</h1>
          <p className="text-gray-600">Stay organized with your academic schedule</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2 space-y-6">
          {/* Month/Week Toggle */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  October 2025
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Month</Button>
                  <Button variant="ghost" size="sm">Week</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </CardContent>
          </Card>

          {/* Week View */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Week View</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weekView.map((day, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border text-center ${
                      day.date === '25' ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                    }`}
                  >
                    <p className="text-sm text-gray-500 mb-1">{day.day}</p>
                    <p className="text-2xl mb-2">{day.date}</p>
                    {day.events > 0 && (
                      <div className="flex justify-center gap-1">
                        {Array.from({ length: Math.min(day.events, 3) }).map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50">
                    <div className={`w-12 h-12 rounded-lg ${event.color} flex items-center justify-center text-white flex-shrink-0`}>
                      <p className="text-xs">{event.date.split(' ')[1]}</p>
                    </div>
                    <div className="flex-1">
                      <p className="mb-1">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <div className="space-y-6">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Today's Schedule
              </CardTitle>
              <p className="text-sm text-gray-500">Friday, October 25, 2025</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayTasks.map((task, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="text-xs text-gray-500 w-16 pt-1">{task.time}</div>
                    <div className="flex-1">
                      <div className="flex items-start gap-2">
                        <div className={`w-1 h-full ${task.color} rounded-full min-h-[40px]`} />
                        <div className="flex-1 pb-3">
                          <p className="text-sm mb-1">{task.title}</p>
                          <Badge variant="outline" className="text-xs capitalize">
                            {task.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Add</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                ➕ Add Class
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📝 Add Assignment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📚 Add Study Session
              </Button>
              <Button variant="outline" className="w-full justify-start">
                🎯 Add Exam/Quiz
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-transparent">
            <CardHeader>
              <CardTitle>Reminders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-3 bg-white rounded-lg border border-purple-200">
                <p className="text-sm">🔔 OS Mid-term in 1 day</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-purple-200">
                <p className="text-sm">📚 Review Database notes today</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-purple-200">
                <p className="text-sm">⏰ Project presentation prep - 5 days left</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
