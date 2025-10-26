import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { User, Bell, Moon, Calendar, LogOut, Settings } from 'lucide-react';

interface ProfilePageProps {
  onLogout: () => void;
}

export function ProfilePage({ onLogout }: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-green-600 text-white p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <h1 className="text-3xl mb-2">Profile & Settings</h1>
        <p className="text-green-100">Manage your account and preferences</p>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-gradient-to-br from-primary to-green-600 text-white text-3xl">
                  BH
                </AvatarFallback>
              </Avatar>
              <div>
                <Button className="bg-primary hover:bg-green-700 rounded-2xl mb-2">
                  Change Photo
                </Button>
                <p className="text-sm text-gray-500">JPG, PNG or GIF. Max 5MB.</p>
              </div>
            </div>

            <Separator />

            {/* Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Bhuvana" className="rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="bhuvana@university.edu" className="rounded-2xl" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Input id="course" defaultValue="Computer Science Engineering" className="rounded-2xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Academic Year</Label>
                <Input id="year" defaultValue="3rd Year" className="rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Input id="university" defaultValue="SIET" className="rounded-2xl" />
              </div>
            </div>

            <Button className="bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary rounded-2xl h-12">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p>Assignment Reminders</p>
                <p className="text-sm text-gray-500">Get notified about upcoming deadlines</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p>Class Notifications</p>
                <p className="text-sm text-gray-500">Alerts 15 minutes before each class</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p>AI Suggestions</p>
                <p className="text-sm text-gray-500">Receive AI-powered study recommendations</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p>Mood Check-ins</p>
                <p className="text-sm text-gray-500">Daily mental wellness reminders</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              App Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Moon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p>Dark Mode</p>
                  <p className="text-sm text-gray-500">Switch to dark theme</p>
                </div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p>Connect Google Calendar</p>
                  <p className="text-sm text-gray-500">Sync your academic schedule</p>
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-green-50 border-primary/20">
          <CardContent className="p-6">
            <h3 className="mb-4">Your Journey</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl text-primary mb-1">32</p>
                <p className="text-sm text-gray-600">Tasks Done</p>
              </div>
              <div>
                <p className="text-3xl text-primary mb-1">26h</p>
                <p className="text-sm text-gray-600">Study Time</p>
              </div>
              <div>
                <p className="text-3xl text-primary mb-1">15</p>
                <p className="text-sm text-gray-600">Notes Created</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card>
          <CardContent className="p-6">
            <Button 
              variant="outline" 
              className="w-full rounded-2xl h-12 text-red-600 border-red-200 hover:bg-red-50"
              onClick={onLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 pt-6">
          <p>Made by Bhuvana and Team • SIET Hackathon 2025</p>
          <p className="mt-2">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
