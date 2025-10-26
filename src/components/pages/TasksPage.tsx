import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CheckCircle2, Circle, Plus, Trash2, Edit, Sparkles } from 'lucide-react';

export function TasksPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const tasks = {
    today: [
      { id: 1, title: 'Complete Database Assignment 3', subject: 'Database Systems', priority: 'high', dueTime: '11:59 PM' },
      { id: 2, title: 'Review Sorting Algorithms', subject: 'Algorithms', priority: 'medium', dueTime: '05:00 PM' },
    ],
    upcoming: [
      { id: 3, title: 'Prepare for OS Mid-term', subject: 'Operating Systems', priority: 'high', dueDate: 'Oct 28' },
      { id: 4, title: 'Submit Project Proposal', subject: 'Software Engineering', priority: 'high', dueDate: 'Oct 30' },
      { id: 5, title: 'Read Chapter 5 - Networking', subject: 'Computer Networks', priority: 'low', dueDate: 'Nov 2' },
    ],
    completed: [
      { id: 6, title: 'Data Structures Lab 4', subject: 'Data Structures', completedDate: 'Oct 23' },
      { id: 7, title: 'Math Assignment 2', subject: 'Mathematics', completedDate: 'Oct 22' },
    ],
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const TaskItem = ({ task, showCheckbox = true }: any) => (
    <div className="flex items-start gap-3 p-4 rounded-lg border hover:bg-gray-50 group">
      {showCheckbox && (
        <button className="mt-1">
          <Circle className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
        </button>
      )}
      <div className="flex-1">
        <h3 className="mb-1">{task.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{task.subject}</span>
          {task.dueTime && (
            <>
              <span>•</span>
              <span>Due: {task.dueTime}</span>
            </>
          )}
          {task.dueDate && (
            <>
              <span>•</span>
              <span>Due: {task.dueDate}</span>
            </>
          )}
          {task.completedDate && (
            <>
              <span>•</span>
              <span>Completed: {task.completedDate}</span>
            </>
          )}
        </div>
      </div>
      {task.priority && (
        <Badge variant="outline" className={getPriorityColor(task.priority)}>
          {task.priority}
        </Badge>
      )}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon">
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-1">Tasks & Assignments</h1>
          <p className="text-gray-600">Manage your academic workload efficiently</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>Add a new task or assignment to your schedule</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task-title">Task Title</Label>
                <Input id="task-title" placeholder="Enter task title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-subject">Subject</Label>
                <Select>
                  <SelectTrigger id="task-subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ds">Data Structures</SelectItem>
                    <SelectItem value="algo">Algorithms</SelectItem>
                    <SelectItem value="db">Database Systems</SelectItem>
                    <SelectItem value="os">Operating Systems</SelectItem>
                    <SelectItem value="cn">Computer Networks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-priority">Priority</Label>
                <Select>
                  <SelectTrigger id="task-priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-due">Due Date</Label>
                <Input id="task-due" type="datetime-local" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-description">Description</Label>
                <Textarea id="task-description" placeholder="Add task details..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsDialogOpen(false)}>
                Create Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="today">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="today">Today ({tasks.today.length})</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming ({tasks.upcoming.length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({tasks.completed.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="today" className="space-y-3">
                  {tasks.today.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </TabsContent>
                
                <TabsContent value="upcoming" className="space-y-3">
                  {tasks.upcoming.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </TabsContent>
                
                <TabsContent value="completed" className="space-y-3">
                  {tasks.completed.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-4 rounded-lg border bg-gray-50">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
                      <div className="flex-1">
                        <h3 className="mb-1 line-through text-gray-500">{task.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{task.subject}</span>
                          <span>•</span>
                          <span>Completed: {task.completedDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* AI Suggestions Panel */}
        <div className="space-y-6">
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-white rounded-lg border">
                <p className="text-sm mb-2">📌 Focus on Database Assignment first - it's due tonight and has the highest impact on your grade.</p>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <p className="text-sm mb-2">⏰ Suggested time block: 3:00 PM - 5:00 PM for uninterrupted work.</p>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <p className="text-sm mb-2">💡 Break down OS Mid-term prep into smaller daily tasks starting tomorrow.</p>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <p className="text-sm mb-2">🎯 You've completed 85% of this week's tasks - great progress!</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filter by Subject</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">All Subjects</Button>
              <Button variant="ghost" className="w-full justify-start">Data Structures</Button>
              <Button variant="ghost" className="w-full justify-start">Algorithms</Button>
              <Button variant="ghost" className="w-full justify-start">Database Systems</Button>
              <Button variant="ghost" className="w-full justify-start">Operating Systems</Button>
              <Button variant="ghost" className="w-full justify-start">Computer Networks</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
