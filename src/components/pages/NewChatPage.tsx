import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { FeatureBadge } from '../FeatureBadge';
import { ScrollArea } from '../ui/scroll-area';
import { Send, Mic, Sparkles, Brain } from 'lucide-react';

export function NewChatPage() {
  const [message, setMessage] = useState('');

  const chatMessages = [
    {
      type: 'ai',
      content: 'Hello Bhuvana! 👋 I\'m Nova, your AI study assistant. How can I help you today?',
      time: '10:30 AM',
    },
    {
      type: 'user',
      content: 'What\'s my next class?',
      time: '10:31 AM',
    },
    {
      type: 'ai',
      content: 'Your next class is DBMS Lecture at 10:00 AM with Dr. Sharma in room CS-301. You have about 30 minutes before it starts. Would you like me to help you prepare?',
      time: '10:31 AM',
    },
    {
      type: 'user',
      content: 'Yes, can you summarize my DBMS notes?',
      time: '10:32 AM',
    },
    {
      type: 'ai',
      content: 'I\'ve generated a summary of your DBMS Normalization notes. Here are the key concepts:\n\n• 1NF: Eliminate repeating groups\n• 2NF: Remove partial dependencies\n• 3NF: Eliminate transitive dependencies\n\nWould you like me to create flashcards from these notes?',
      time: '10:32 AM',
    },
  ];

  const quickPrompts = [
    'What\'s my schedule today?',
    'Summarize my AI notes',
    'Upcoming deadlines',
    'Create quiz from notes',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-green-600 text-white p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl mb-1">Your Assistant — Nova 🤖</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              <span className="text-green-100 text-sm">Online & Ready</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <FeatureBadge text="Hybrid Memory Chat System" />
          <FeatureBadge text="Emotion-Sensitive Replies" />
        </div>
      </div>

      <div className="p-6 md:p-8">
        <Card className="h-[calc(100vh-320px)] md:h-[600px] flex flex-col shadow-xl">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                    {msg.type === 'ai' && (
                      <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-300 rounded-xl flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-sm text-gray-600">Nova</span>
                        </div>
                    )}
                    <div
                      className={`rounded-3xl p-4 ${msg.type === 'user' ? 'lavender-bubble text-white' : 'lavender-bubble text-white'}`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    <p className={`text-xs text-gray-500 mt-1 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Quick Prompts */}
          <div className="p-4 border-t bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">Quick Prompts:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs"
                  onClick={() => setMessage(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:bg-purple-100"
              >
                <Mic className="w-5 h-5 text-purple-600" />
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything... (e.g., 'Remind me about the AI project tomorrow')"
                className="flex-1 rounded-2xl border-2 focus:border-primary"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setMessage('');
                  }
                }}
              />
              <Button
                className="flex-shrink-0 rounded-2xl bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary"
                size="icon"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* AI Capabilities */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">📅</div>
              <p className="text-sm text-gray-700">Schedule Management</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">📝</div>
              <p className="text-sm text-gray-700">Note Summarization</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-sm text-gray-700">Task Prioritization</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-white border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">💡</div>
              <p className="text-sm text-gray-700">Study Recommendations</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
