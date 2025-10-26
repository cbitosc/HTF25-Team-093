import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { FeatureBadge } from '../FeatureBadge';
import { Users, Calendar, AlertCircle, Plus } from 'lucide-react';

export function NewProjectsPage() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Website',
      team: 'Team Alpha',
      members: ['BH', 'AS', 'RK'],
      progress: 65,
      deadline: 'Nov 15, 2025',
      status: 'on-track',
      lastUpdate: 'Today',
    },
    {
      id: 2,
      title: 'AI Chatbot Development',
      team: 'Team Beta',
      members: ['BH', 'PK'],
      progress: 40,
      deadline: 'Nov 20, 2025',
      status: 'needs-attention',
      lastUpdate: '2 days ago',
    },
    {
      id: 3,
      title: 'Mobile App Prototype',
      team: 'Team Gamma',
      members: ['BH', 'SK', 'MN', 'DR'],
      progress: 80,
      deadline: 'Nov 10, 2025',
      status: 'on-track',
      lastUpdate: 'Yesterday',
    },
  ];

  const teamMembers = [
    { name: 'Bhuvana (You)', role: 'Team Lead', initials: 'BH', active: true },
    { name: 'Arjun Singh', role: 'Developer', initials: 'AS', active: true },
    { name: 'Raj Kumar', role: 'Designer', initials: 'RK', active: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-green-600 text-white p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl mb-2">Project & Team Collaboration</h1>
            <p className="text-green-100">Manage projects with AI insights</p>
          </div>
          <Button className="bg-white text-primary hover:bg-green-50 rounded-2xl">
            <Plus className="w-5 h-5 mr-2" />
            New
          </Button>
        </div>
        <FeatureBadge text="AI Team Coordinator" />
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className={`hover:shadow-xl transition-shadow border-l-4 ${
                project.status === 'on-track' ? 'border-l-green-500' : 'border-l-orange-500'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge 
                    variant="outline" 
                    className={
                      project.status === 'on-track' 
                        ? 'bg-green-100 text-green-700 border-green-300' 
                        : 'bg-orange-100 text-orange-700 border-orange-300'
                    }
                  >
                    {project.status === 'on-track' ? 'On Track' : 'Needs Attention'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{project.team}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-primary">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Team Members */}
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <div className="flex -space-x-2">
                    {project.members.map((member, idx) => (
                      <Avatar key={idx} className="w-8 h-8 border-2 border-white">
                        <AvatarFallback className="text-xs bg-gradient-to-br from-primary to-green-600 text-white">
                          {member}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">{project.members.length} members</span>
                </div>

                {/* Deadline */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {project.deadline}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full rounded-xl">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Suggestion */}
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-purple-600" />
              AI Team Coordinator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-3">
              Bhavadharani hasn't updated in 2 days on the E-Commerce Website project. Would you like to send a friendly reminder?
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-2xl">
              Send Reminder
            </Button>
          </CardContent>
        </Card>

        {/* Current Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>E-Commerce Website - Task Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { task: 'Design Mockups', assignee: 'Raj Kumar', status: 'completed', date: 'Oct 15' },
                  { task: 'Frontend Development', assignee: 'Arjun Singh', status: 'in-progress', date: 'Oct 25' },
                  { task: 'Backend API', assignee: 'Bhuvana', status: 'in-progress', date: 'Oct 28' },
                  { task: 'Database Setup', assignee: 'Arjun Singh', status: 'pending', date: 'Nov 5' },
                  { task: 'Testing & Deployment', assignee: 'Team', status: 'pending', date: 'Nov 12' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.status === 'completed' ? 'bg-green-100' : 
                      item.status === 'in-progress' ? 'bg-blue-100' : 'bg-gray-200'
                    }`}>
                      {item.status === 'completed' ? '✓' : 
                       item.status === 'in-progress' ? '⏳' : '○'}
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1">{item.task}</h4>
                      <p className="text-sm text-gray-600">{item.assignee} • {item.date}</p>
                    </div>
                    <Badge 
                      variant="outline"
                      className={
                        item.status === 'completed' ? 'bg-green-100 text-green-700' :
                        item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-primary to-green-600 text-white">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                    {member.active && (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Project Stats */}
            <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
              <CardHeader>
                <CardTitle>Project Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Tasks Complete</span>
                    <span className="text-sm text-primary">12/18</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Days Remaining</span>
                    <span className="text-sm text-primary">21 days</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Team Activity</p>
                  <div className="flex gap-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-6 rounded-sm ${
                          Math.random() > 0.3 ? 'bg-green-400' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
