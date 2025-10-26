import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Switch } from '../ui/switch';
import { FeatureBadge } from '../FeatureBadge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { CheckSquare, Plus, Mic, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export function AssignmentsPage() {
  const [smartReminder, setSmartReminder] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const assignments = [
    { 
      id: 1,
      title: 'AI Mini Project - Sentiment Analysis',
      subject: 'Artificial Intelligence',
      due: 'Tomorrow',
      priority: 'high',
      progress: 60,
      aiDetected: true,
      status: 'in-progress'
    },
    { 
      id: 2,
      title: 'DBMS Assignment 3 - ER Diagrams',
      subject: 'Database Systems',
      due: 'In 3 days',
      priority: 'high',
      progress: 40,
      aiDetected: true,
      status: 'in-progress'
    },
    { 
      id: 3,
      title: 'Operating Systems Lab Report',
      subject: 'Operating Systems',
      due: 'In 5 days',
      priority: 'medium',
      progress: 20,
      aiDetected: false,
      status: 'in-progress'
    },
    { 
      id: 4,
      title: 'Network Protocol Analysis',
      subject: 'Computer Networks',
      due: 'In 1 week',
      priority: 'low',
      progress: 10,
      aiDetected: false,
      status: 'in-progress'
    },
    { 
      id: 5,
      title: 'Data Structures Quiz Prep',
      subject: 'Data Structures',
      due: 'Completed',
      priority: 'completed',
      progress: 100,
      aiDetected: false,
      status: 'completed'
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-green-600 text-white p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl mb-2">Assignments & Deadlines</h1>
            <p className="text-green-100">Stay on top of your tasks</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-primary hover:bg-green-50 rounded-2xl shadow-lg">
                <Plus className="w-5 h-5 mr-2" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl">
              <DialogHeader>
                <DialogTitle>Add New Assignment</DialogTitle>
                <DialogDescription>Create a new assignment or use voice input</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Assignment Title</Label>
                  <Input id="title" placeholder="Enter assignment title" className="rounded-2xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="e.g., Database Systems" className="rounded-2xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due">Due Date</Label>
                  <Input id="due" type="datetime-local" className="rounded-2xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Add details..." className="rounded-2xl" />
                </div>
                <Button variant="outline" className="w-full rounded-2xl">
                  <Mic className="w-5 h-5 mr-2" />
                  Use Voice Input
                </Button>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-2xl">
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-primary to-green-600 rounded-2xl" onClick={() => setIsDialogOpen(false)}>
                  Create Assignment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Smart Reminder Toggle */}
        <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>Smart Reminder (AI-Priority Mode)</span>
          </div>
          <Switch checked={smartReminder} onCheckedChange={setSmartReminder} />
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* AI Feature Badge */}
        <div className="flex gap-2">
          <FeatureBadge text="Predictive Deadline Prioritizer" />
          <FeatureBadge text="AI Mood-Adaptive Assistant" />
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <Card 
              key={assignment.id} 
              className={`border-l-4 hover:shadow-lg transition-shadow ${
                assignment.status === 'completed' 
                  ? 'border-l-blue-500 opacity-70' 
                  : assignment.priority === 'high'
                  ? 'border-l-red-500'
                  : assignment.priority === 'medium'
                  ? 'border-l-yellow-500'
                  : 'border-l-green-500'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {assignment.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6 text-blue-500" />
                      ) : (
                        <CheckSquare className="w-6 h-6 text-gray-400" />
                      )}
                      <h3 className={assignment.status === 'completed' ? 'line-through text-gray-500' : ''}>
                        {assignment.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 ml-9">
                      <Badge variant="outline" className="text-xs">
                        {assignment.subject}
                      </Badge>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {assignment.due}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className={getPriorityColor(assignment.priority)}>
                    {assignment.priority === 'completed' ? 'Completed' : assignment.priority}
                  </Badge>
                </div>

                {assignment.status !== 'completed' && (
                  <>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-primary">{assignment.progress}%</span>
                      </div>
                      <Progress value={assignment.progress} className="h-2" />
                    </div>

                    {assignment.aiDetected && (
                      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100">
                        <AlertCircle className="w-5 h-5 text-purple-600" />
                        <p className="text-sm text-purple-700">
                          AI detects this is a high-priority task based on your schedule and deadline.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-red-50 to-white border-red-200">
            <CardContent className="p-4 text-center">
              <p className="text-3xl mb-1">2</p>
              <p className="text-sm text-gray-600">High Priority</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-white border-yellow-200">
            <CardContent className="p-4 text-center">
              <p className="text-3xl mb-1">1</p>
              <p className="text-sm text-gray-600">Medium Priority</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
            <CardContent className="p-4 text-center">
              <p className="text-3xl mb-1">1</p>
              <p className="text-sm text-gray-600">Low Priority</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
            <CardContent className="p-4 text-center">
              <p className="text-3xl mb-1">1</p>
              <p className="text-sm text-gray-600">Completed</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
