import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { FeatureBadge } from '../FeatureBadge';
import { Heart, Mic, Calendar, Music, TrendingUp, Smile, Meh, Frown } from 'lucide-react';

export function MindWellPage() {
  const [journal, setJournal] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moodOptions = [
    { id: 'happy', label: 'Happy', icon: Smile, color: 'bg-green-100 text-green-700 border-green-300' },
    { id: 'neutral', label: 'Neutral', icon: Meh, color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    { id: 'stressed', label: 'Stressed', icon: Frown, color: 'bg-red-100 text-red-700 border-red-300' },
  ];

  const moodHistory = [
    { date: 'Oct 25', mood: 'happy', entry: 'Completed all assignments on time!' },
    { date: 'Oct 24', mood: 'neutral', entry: 'Regular study day' },
    { date: 'Oct 23', mood: 'stressed', entry: 'Lot of pending work' },
  ];

  const focusMusic = [
    { title: 'Lo-fi Study Beats', artist: 'Chill Vibes', duration: '2:34:12' },
    { title: 'Classical Focus', artist: 'Mozart Collection', duration: '1:45:30' },
    { title: 'Nature Sounds', artist: 'Ambient World', duration: '3:00:00' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-green-600 text-white p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <h1 className="text-3xl mb-2">MindWell Section</h1>
        <p className="text-green-100">Take care of your mental wellness</p>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Feature Badge */}
        <FeatureBadge text="AI Mood Tracker" />

        {/* Inspirational Quote */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-2xl mb-4 text-gray-800">Take a deep breath, you're doing great.</h2>
            <p className="text-gray-600 italic">"Your mental health is a priority. Your happiness is essential. Your self-care is a necessity."</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reflection Journal */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Reflection Journal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mood Selector */}
              <div>
                <p className="text-sm text-gray-600 mb-3">How are you feeling today?</p>
                <div className="flex gap-3">
                  {moodOptions.map((mood) => {
                    const Icon = mood.icon;
                    return (
                      <button
                        key={mood.id}
                        onClick={() => setSelectedMood(mood.id)}
                        className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                          selectedMood === mood.id 
                            ? mood.color 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">{mood.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Journal Input */}
              <div>
                <Textarea
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                  placeholder="How was your day? Write your thoughts here..."
                  className="min-h-[150px] rounded-2xl"
                />
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary rounded-2xl h-12">
                  <Calendar className="w-5 h-5 mr-2" />
                  Add Entry
                </Button>
                <Button variant="outline" className="rounded-2xl h-12">
                  <Mic className="w-5 h-5" />
                </Button>
              </div>

              {/* AI Feedback */}
              {selectedMood === 'stressed' && (
                <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      💜
                    </div>
                    <div>
                      <h4 className="mb-2">AI Mood Tracker Suggestion</h4>
                      <p className="text-sm text-gray-700">
                        You seem stressed. Let's do a 5-min focus break. I recommend trying a breathing exercise or listening to calming music.
                      </p>
                      <Button size="sm" variant="outline" className="mt-3 rounded-xl">
                        Start 5-Minute Break
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mood Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5" />
                  Mood Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full mb-4 rounded-2xl">
                  View Detailed Analytics
                </Button>
                <div className="space-y-2">
                  {moodHistory.map((item, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{item.date}</span>
                        <Badge 
                          variant="outline"
                          className={
                            item.mood === 'happy' ? 'bg-green-100 text-green-700 border-green-300' :
                            item.mood === 'neutral' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                            'bg-red-100 text-red-700 border-red-300'
                          }
                        >
                          {item.mood}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700">{item.entry}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Mood Summary */}
            <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-3">This Week</p>
                <div className="flex gap-1 mb-4">
                  {['😊', '😊', '😐', '😊', '😊', '😟', '😊'].map((emoji, i) => (
                    <div key={i} className="flex-1 text-center text-2xl">
                      {emoji}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-center text-gray-600">
                  You had 5 happy days this week! 🎉
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Focus Music Player */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5 text-purple-600" />
              Focus Music Player
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {focusMusic.map((track, idx) => (
                <div key={idx} className="p-4 bg-white rounded-2xl border border-purple-100 hover:shadow-md transition-shadow">
                  <div className="w-full aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl mb-3 flex items-center justify-center">
                    <Music className="w-12 h-12 text-white" />
                  </div>
                  <h4 className="mb-1">{track.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{track.artist}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{track.duration}</span>
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl">
                      Play
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wellness Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">🧘</div>
              <h4 className="mb-2">Take Breaks</h4>
              <p className="text-sm text-gray-600">Rest for 5 minutes every hour to stay focused</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">💧</div>
              <h4 className="mb-2">Stay Hydrated</h4>
              <p className="text-sm text-gray-600">Drink water regularly throughout the day</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">😴</div>
              <h4 className="mb-2">Sleep Well</h4>
              <p className="text-sm text-gray-600">Aim for 7-8 hours of quality sleep</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
