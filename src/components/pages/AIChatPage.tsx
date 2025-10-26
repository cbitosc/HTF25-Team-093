import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { MessageSquare, Mic, Send, Sparkles, BookOpen, Calculator, Code, Lightbulb } from 'lucide-react';

export function AIChatPage() {
  const [message, setMessage] = useState('');

  const chatHistory = [
    {
      type: 'user',
      message: 'Can you explain how quicksort works?',
      time: '2:30 PM',
    },
    {
      type: 'ai',
      message: 'Quicksort is a divide-and-conquer sorting algorithm. Here\'s how it works:\n\n1. Choose a pivot element from the array\n2. Partition the array so elements smaller than pivot are on the left, larger on the right\n3. Recursively apply quicksort to the sub-arrays\n\nTime Complexity: O(n log n) average case, O(n²) worst case\nSpace Complexity: O(log n)\n\nWould you like me to show you a code example?',
      time: '2:30 PM',
    },
    {
      type: 'user',
      message: 'Yes, show me Python code please',
      time: '2:31 PM',
    },
    {
      type: 'ai',
      message: 'Here\'s a Python implementation of quicksort:\n\n```python\ndef quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    \n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    \n    return quicksort(left) + middle + quicksort(right)\n\n# Example usage\narr = [3, 6, 8, 10, 1, 2, 1]\nprint(quicksort(arr))  # [1, 1, 2, 3, 6, 8, 10]\n```\n\nWould you like me to explain any part of this code?',
      time: '2:31 PM',
    },
  ];

  const quickActions = [
    { icon: BookOpen, label: 'Explain a Concept', color: 'bg-blue-500' },
    { icon: Calculator, label: 'Solve a Problem', color: 'bg-green-500' },
    { icon: Code, label: 'Debug Code', color: 'bg-purple-500' },
    { icon: Lightbulb, label: 'Study Tips', color: 'bg-yellow-500' },
  ];

  return (
    <div className="p-8 h-[calc(100vh-2rem)]">
      <div className="h-full grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Chat History & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Your intelligent study companion, available 24/7 to help with your engineering coursework.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    {action.label}
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-sm">
                Quicksort Algorithm
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                SQL JOIN Operations
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                Binary Search Trees
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                Process Scheduling
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Area */}
        <Card className="lg:col-span-3 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Chat with AI
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">Ask anything about your coursework</p>
              </div>
              <Badge className="bg-green-500">Online</Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {chatHistory.map((chat, idx) => (
                  <div
                    key={idx}
                    className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        chat.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{chat.message}</div>
                      <div
                        className={`text-xs mt-2 ${
                          chat.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {chat.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="flex-shrink-0">
                  <Mic className="w-5 h-5" />
                </Button>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your question here... (e.g., 'Explain merge sort')"
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setMessage('');
                    }
                  }}
                />
                <Button className="bg-blue-600 hover:bg-blue-700 flex-shrink-0">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Button variant="outline" size="sm">💡 Explain this concept</Button>
                <Button variant="outline" size="sm">📝 Create practice questions</Button>
                <Button variant="outline" size="sm">🔍 Find similar problems</Button>
                <Button variant="outline" size="sm">📊 Compare algorithms</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
