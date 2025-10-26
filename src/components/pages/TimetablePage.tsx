import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { FeatureBadge } from '../FeatureBadge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Calendar, Clock, User, MapPin, ExternalLink, Lightbulb } from 'lucide-react';

export function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const schedule = {
    Monday: [
      { time: '10:00 AM', subject: 'Data Structures', faculty: 'Dr. Sharma', location: 'CS-301', link: 'meet.google.com/abc', color: 'bg-blue-500' },
      { time: '2:00 PM', subject: 'Algorithm Lab', faculty: 'Prof. Kumar', location: 'Lab-2', link: '', color: 'bg-purple-500' },
    ],
    Tuesday: [
      { time: '9:00 AM', subject: 'DBMS Lecture', faculty: 'Dr. Patel', location: 'CS-205', link: 'meet.google.com/def', color: 'bg-green-500' },
      { time: '11:00 AM', subject: 'AI & ML', faculty: 'Dr. Reddy', location: 'CS-302', link: 'meet.google.com/ghi', color: 'bg-orange-500' },
    ],
    Wednesday: [
      { time: '10:00 AM', subject: 'Operating Systems', faculty: 'Prof. Singh', location: 'CS-201', link: '', color: 'bg-pink-500' },
      { time: '3:00 PM', subject: 'Project Meeting', faculty: 'Dr. Sharma', location: 'Conference Room', link: '', color: 'bg-indigo-500' },
    ],
    Thursday: [
      { time: '9:00 AM', subject: 'Computer Networks', faculty: 'Dr. Gupta', location: 'CS-303', link: 'meet.google.com/jkl', color: 'bg-teal-500' },
      { time: '2:00 PM', subject: 'DBMS Lab', faculty: 'Prof. Kumar', location: 'Lab-1', link: '', color: 'bg-cyan-500' },
    ],
    Friday: [
      { time: '10:00 AM', subject: 'Software Engineering', faculty: 'Dr. Verma', location: 'CS-401', link: 'meet.google.com/mno', color: 'bg-yellow-500' },
    ],
  };

  const getClassForSlot = (day: string, time: string) => {
    return schedule[day as keyof typeof schedule]?.find((cls: any) => cls.time === time);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-green-600 text-white p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <h1 className="text-3xl mb-2">Weekly Timetable</h1>
        <p className="text-green-100">Your class schedule at a glance</p>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* AI Suggestion Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-yellow-50 to-green-50 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                AI Suggests
              </CardTitle>
              <FeatureBadge text="Smart Slot Recommender" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Your next free slot for project work is <span className="text-primary">4:00 PM - 5:00 PM</span> today. 
              Perfect time for focused study based on your productivity patterns!
            </p>
          </CardContent>
        </Card>

        {/* Timetable Grid */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-green-50">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-4 text-left text-sm w-32">Time</th>
                    {weekDays.map((day) => (
                      <th key={day} className="p-4 text-center text-sm">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time} className="border-b hover:bg-gray-50">
                      <td className="p-4 text-sm text-gray-600 font-medium">{time}</td>
                      {weekDays.map((day) => {
                        const classItem = getClassForSlot(day, time);
                        return (
                          <td key={`${day}-${time}`} className="p-2">
                            {classItem ? (
                              <button
                                onClick={() => setSelectedClass(classItem)}
                                className={`w-full p-3 ${classItem.color} text-white rounded-xl hover:opacity-90 transition-all hover:scale-105`}
                              >
                                <p className="text-sm truncate">{classItem.subject}</p>
                                <p className="text-xs opacity-90">{classItem.location}</p>
                              </button>
                            ) : (
                              <div className="w-full h-16 bg-gray-50 rounded-xl" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="flex flex-wrap gap-3">
          <Badge className="bg-blue-500 hover:bg-blue-600">Data Structures</Badge>
          <Badge className="bg-green-500 hover:bg-green-600">DBMS</Badge>
          <Badge className="bg-orange-500 hover:bg-orange-600">AI & ML</Badge>
          <Badge className="bg-purple-500 hover:bg-purple-600">Algorithms</Badge>
          <Badge className="bg-pink-500 hover:bg-pink-600">OS</Badge>
          <Badge className="bg-teal-500 hover:bg-teal-600">Networks</Badge>
          <Badge className="bg-yellow-500 hover:bg-yellow-600">Software Eng.</Badge>
        </div>
      </div>

      {/* Class Details Dialog */}
      <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedClass?.subject}</DialogTitle>
            <DialogDescription>Class Details</DialogDescription>
          </DialogHeader>
          {selectedClass && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                <Clock className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p>{selectedClass.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                <User className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Faculty</p>
                  <p>{selectedClass.faculty}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                <MapPin className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p>{selectedClass.location}</p>
                </div>
              </div>
              {selectedClass.link && (
                <Button className="w-full bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary rounded-2xl h-12">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Join Online Class
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
