import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Brain, Sparkles } from 'lucide-react';

interface SplashPageProps {
  onLogin: () => void;
}

export function SplashPage({ onLogin }: SplashPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Setting up your dashboard');

  useEffect(() => {
    if (isLoading) {
      const texts = [
        'Setting up your dashboard',
        'Loading AI assistant',
        'Preparing your schedule',
        'Almost ready'
      ];
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % texts.length;
        setLoadingText(texts[index]);
      }, 800);

      setTimeout(() => {
        onLogin();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isLoading, onLogin]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-green-600 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
            </div>
          </div>
          <p className="text-xl text-gray-700 mb-2">{loadingText}</p>
          <div className="flex gap-2 justify-center">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="relative inline-block mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-primary to-green-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <Brain className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -top-3 -right-3">
            <Sparkles className="w-12 h-12 text-yellow-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl mb-3 bg-gradient-to-r from-primary to-green-700 bg-clip-text text-transparent">
          Welcome to AI Student Assistant
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Organize your academic life with intelligence.
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          <Button 
            className="w-full h-14 bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50 shadow-md text-lg rounded-2xl"
            onClick={() => setIsLoading(true)}
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </Button>
          
          <Button 
            className="w-full h-14 bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary text-white shadow-lg text-lg rounded-2xl"
            onClick={() => setIsLoading(true)}
          >
            Continue as Guest (Demo)
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="mt-12 grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-white rounded-xl border border-green-100 shadow-sm">
            <p className="text-primary">🎯</p>
            <p className="text-gray-600 mt-1">AI Prioritizer</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-green-100 shadow-sm">
            <p className="text-primary">📚</p>
            <p className="text-gray-600 mt-1">Smart Study</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-green-100 shadow-sm">
            <p className="text-primary">🤖</p>
            <p className="text-gray-600 mt-1">AI Assistant</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-green-100 shadow-sm">
            <p className="text-primary">📊</p>
            <p className="text-gray-600 mt-1">Analytics</p>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-8">
          Made by Bhuvana and Team • SIET Hackathon 2025
        </p>
      </div>
    </div>
  );
}
