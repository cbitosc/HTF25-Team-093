import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Plus, Users, Upload, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';

export function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Database Design',
      course: 'Database Systems',
      dueDate: 'Nov 15, 2025',
      progress: 65,
      members: ['JD', 'AS', 'MK'],
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'TCP/IP Protocol Simulation',
      course: 'Computer Networks',
      dueDate: 'Nov 20, 2025',
      progress: 40,
      members: ['JD', 'RS'],
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'Operating System Scheduler',
      course: 'Operating Systems',
      dueDate: 'Dec 1, 2025',
      progress: 20,
      members: ['JD', 'AS', 'MK', 'PL'],
      status: 'Planning',
    },
  ];

  const taskAllocation = [
    { task: 'ER Diagram Design', assignedTo: 'John Doe', status: 'Completed', dueDate: 'Oct 20' },
    { task: 'Schema Implementation', assignedTo: 'Alex Smith', status: 'In Progress', dueDate: 'Oct 28' },
    { task: 'Query Optimization', assignedTo: 'Mike Kumar', status: 'Not Started', dueDate: 'Nov 5' },
    { task: 'Testing & Documentation', assignedTo: 'John Doe', status: 'Not Started', dueDate: 'Nov 12' },
  ];

  const chatMessages = [
    { user: 'Alex Smith', message: 'I\'ve finished the schema tables. Ready for review.', time: '10:45 AM' },
    { user: 'Mike Kumar', message: 'Great! I\'ll start on the queries tomorrow.', time: '11:20 AM' },
    { user: 'You', message: 'Perfect. Let\'s have a sync meeting at 3 PM today.', time: '11:25 AM' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Planning': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-1">Projects & Collaboration</h1>
          <p className="text-gray-600">Manage team projects with AI-powered task allocation</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Projects Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{project.course}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.members.map((member, idx) => (
                      <Avatar key={idx} className="border-2 border-white w-8 h-8">
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                          {member}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">Due: {project.dueDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>E-Commerce Database Design</CardTitle>
              <p className="text-sm text-gray-500">Database Systems Project</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tasks">
                <TabsList>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                  <TabsTrigger value="chat">Team Chat</TabsTrigger>
                </TabsList>

                <TabsContent value="tasks" className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3>AI-Suggested Task Allocation</h3>
                    <Button size="sm" variant="outline">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {taskAllocation.map((task, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="mb-1">{task.task}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Users className="w-4 h-4" />
                            <span>{task.assignedTo}</span>
                            <span>•</span>
                            <span>Due: {task.dueDate}</span>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            task.status === 'Completed'
                              ? 'bg-green-50 text-green-700'
                              : task.status === 'In Progress'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-gray-50 text-gray-700'
                          }
                        >
                          {task.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="files" className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Files
                  </Button>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                      <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
                        📄
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">ER_Diagram_v2.pdf</p>
                        <p className="text-xs text-gray-500">Uploaded by John • Oct 20</p>
                      </div>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                      <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center">
                        📊
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Schema_Design.xlsx</p>
                        <p className="text-xs text-gray-500">Uploaded by Alex • Oct 24</p>
                      </div>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                      <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center">
                        💻
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">create_tables.sql</p>
                        <p className="text-xs text-gray-500">Uploaded by Alex • Today</p>
                      </div>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="chat">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {chatMessages.map((msg, idx) => (
                        <div key={idx} className="flex gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                              {msg.user.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm">{msg.user}</span>
                              <span className="text-xs text-gray-500">{msg.time}</span>
                            </div>
                            <div className="bg-gray-100 rounded-lg p-3">
                              <p className="text-sm">{msg.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2 mt-4">
                    <Input placeholder="Type a message..." />
                    <Button>
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Progress & AI Insights */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Avatar>
                  <AvatarFallback className="bg-blue-500 text-white">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">John Doe (You)</p>
                  <p className="text-xs text-gray-500">Team Lead</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <Avatar>
                  <AvatarFallback className="bg-green-500 text-white">AS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">Alex Smith</p>
                  <p className="text-xs text-gray-500">Developer</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <Avatar>
                  <AvatarFallback className="bg-purple-500 text-white">MK</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">Mike Kumar</p>
                  <p className="text-xs text-gray-500">Developer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-white rounded-lg border">
                <p className="text-sm">📊 Project is 15% ahead of similar projects</p>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <p className="text-sm">💡 Suggest scheduling code review for Schema Implementation</p>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <p className="text-sm">⚠️ Query Optimization task may need more time - consider starting early</p>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <p className="text-sm">✅ All team members are actively contributing</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
