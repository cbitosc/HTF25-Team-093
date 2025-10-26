import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

type Persona = {
  id: string;
  name: string;
  title: string;
  description: string;
  emoji: string; // simple avatar fallback (kept for accessibility)
  tone: 'visionary' | 'inspirational' | 'practical' | 'encouraging';
};

const PERSONAS: Persona[] = [
  {
    id: 'sundar-pichai',
    name: 'Sundar Pichai',
    title: 'Product Visionary',
    description: 'Focuses on product simplicity, user empathy and long-term strategy.',
    emoji: '🧑‍💼',
    tone: 'visionary',
  },
  {
    id: 'abdul-kalam',
    name: 'A. P. J. Abdul Kalam',
    title: 'Inspirational Mentor',
    description: 'Encourages learning, discipline and scientific thinking.',
    emoji: '🎓',
    tone: 'inspirational',
  },
  {
    id: 'coach-motivate',
    name: 'Coach Motivate',
    title: 'Energetic Coach',
    description: 'Practical tips, motivation and small steps to build habits.',
    emoji: '⚡',
    tone: 'encouraging',
  },
  {
    id: 'prof-focus',
    name: 'Prof. Focus',
    title: 'Time Management',
    description: 'Structured, tactical advice for planning and execution.',
    emoji: '📚',
    tone: 'practical',
  },
];

function generateReply(persona: Persona, question: string) {
  // Lightweight persona emulation (client-side). Not an LLM.
  const q = question.toLowerCase();
  switch (persona.tone) {
    case 'visionary':
      return `Thinking like ${persona.name}: focus on user impact. For the problem you asked about, consider simplifying the core experience first, then iterate. A possible first step: write a one-sentence statement of value and remove anything that doesn't directly help achieve that.`;
    case 'inspirational':
      return `${persona.name} says: Dream big and work daily. Break your goal into tiny milestones and celebrate small wins. Start by listing 3 things you can learn this week toward that goal.`;
    case 'encouraging':
      return `${persona.name} advises: Keep momentum with short sprints. Set a 25-minute timer, focus on one task, then take a 5-minute break. Repeat and track progress.`;
    case 'practical':
      return `${persona.name} recommends: Create a prioritized checklist, estimate times, and block slots in your calendar. For your question, try splitting it into subtasks and schedule them this week.`;
    default:
      return `Here's a helpful suggestion: try breaking the problem into smaller steps and test the smallest piece first.`;
  }
}

export const MentorSelector: React.FC = () => {
  const [selected, setSelected] = useState<Persona | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; text: string; time: number }>>([]);

  useEffect(() => {
    // load persisted selected persona if any
    try {
      const raw = localStorage.getItem('selectedPersona');
      if (raw) {
        const p = JSON.parse(raw) as Persona;
        setSelected(p);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const selectPersona = (p: Persona) => {
    setSelected(p);
    try {
      localStorage.setItem('selectedPersona', JSON.stringify(p));
    } catch (e) {
      // ignore storage errors
    }
    toast.success(`${p.name} selected as your AI mentor`);
  };

  const avatarFor = (p: Persona) => {
    // Prefer explicit permissive-source photos mapped below (Unsplash placeholders).
    // If you add local files to /public/images/mentors/{id}.jpg they will still be used first by the server.
    const mapped = PHOTO_MAP[p.id]?.src;
    if (mapped) return mapped;
    return `${window.location.origin}/images/mentors/${p.id}.jpg`;
  };

  // Mapping of persona id -> permissive sample photo + credit.
  // These are permissive stock placeholder images (Unsplash) and are NOT intended
  // to be the actual celebrities' official photos. Replace with your licensed images or
  // local files in public/images/mentors/ when ready.
  const PHOTO_MAP: Record<string, { src: string; credit?: string; license?: string; filePage?: string }> = {
    'sundar-pichai': {
      // Wikimedia Commons: File:Sundar_Pichai.jpg
      // Author: Maurizio Pesce / License: CC BY 2.0
      src: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Sundar_Pichai.jpg',
      credit: 'Maurizio Pesce',
      license: 'https://creativecommons.org/licenses/by/2.0/',
      filePage: 'https://commons.wikimedia.org/wiki/File:Sundar_Pichai.jpg'
    },
    'abdul-kalam': {
      // Wikimedia Commons: File:A. P. J. Abdul Kalam.jpg
      // Source: Government of India / License: Government Open Data License - India (GODL)
      src: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/A._P._J._Abdul_Kalam.jpg',
      credit: 'Government of India',
      license: 'https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf',
      filePage: 'https://commons.wikimedia.org/wiki/File:A._P._J._Abdul_Kalam.jpg'
    },
    'coach-motivate': {
      src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
      credit: 'Unsplash (placeholder)'
    },
    'prof-focus': {
      src: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
      credit: 'Unsplash (placeholder)'
    }
  };

  const loadMessages = (p: Persona) => {
    try {
      const raw = localStorage.getItem(`chat_${p.id}`);
      if (!raw) return [];
      return JSON.parse(raw) as Array<{ role: 'user' | 'bot'; text: string; time: number }>;
    } catch (e) {
      return [];
    }
  };

  const saveMessages = (p: Persona, msgs: Array<{ role: 'user' | 'bot'; text: string; time: number }>) => {
    try {
      localStorage.setItem(`chat_${p.id}`, JSON.stringify(msgs));
    } catch (e) {
      // ignore
    }
  };

  const openChat = (p: Persona) => {
    selectPersona(p);
    const msgs = loadMessages(p);
    setMessages(msgs);
    setIsChatOpen(true);
  };

  const sendQuestion = () => {
    if (!selected) return;
    if (!question.trim()) {
      toast.error('Please type a question');
      return;
    }

    const userMsg = { role: 'user' as const, text: question.trim(), time: Date.now() };
    const botText = generateReply(selected, question.trim());
    const botMsg = { role: 'bot' as const, text: botText, time: Date.now() + 1 };

    const next = [...messages, userMsg, botMsg];
    setMessages(next);
    saveMessages(selected, next);
    setQuestion('');
  };

  return (
    <div className="space-y-4 mentor-selector">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Choose Your AI Mentor</h3>
        <Badge className="bg-green-50 text-green-700">Personalities</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PERSONAS.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border card">
            <div className="flex items-center gap-4">
              <img
                src={avatarFor(p)}
                alt={`${p.name} avatar`}
                className="w-12 h-12 rounded-lg bg-green-50 object-cover"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://api.dicebear.com/6.x/pixel-art/svg?seed=${encodeURIComponent(p.id)}&size=128`;
                }}
              />
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-gray-500">{p.title}</div>
                <div className="text-sm text-gray-400 mt-1">{p.description}</div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-sm text-gray-500">{selected?.id === p.id ? 'Selected' : ''}</div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => selectPersona(p)}>Select</Button>
                <Button size="sm" onClick={() => openChat(p)}>Chat</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isChatOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsChatOpen(false)} />
          <div className="relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-hidden bg-white rounded-2xl border shadow-lg p-4 chat-modal">
            <div className="flex flex-col sm:flex-row">
              <div className="hidden sm:block sm:w-40 portrait mr-4">
                <img
                  src={avatarFor(selected)}
                  alt={`${selected.name} portrait`}
                  className="w-full h-[320px] object-cover rounded-md"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://api.dicebear.com/6.x/pixel-art/svg?seed=${encodeURIComponent(selected.id)}&size=512`;
                  }}
                />
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">{selected.name}</div>
                    <div className="text-xs text-gray-500">{selected.title}</div>
                    {PHOTO_MAP[selected.id] && (
                      <div className="text-[10px] text-gray-400 mt-1">
                        Photo: {PHOTO_MAP[selected.id].credit}
                        {PHOTO_MAP[selected.id].filePage && (
                          <>
                            {' '}&middot; <a className="underline" href={PHOTO_MAP[selected.id].filePage} target="_blank" rel="noreferrer">source</a>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setIsChatOpen(false)}>Close</Button>
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-2 space-y-3" id="mentor-chat-scroll">
                  {messages.length === 0 && (
                    <div className="text-sm text-gray-500">Say hi to {selected.name} — your previous chat (if any) will appear here.</div>
                  )}
                  {messages.map((m, i) => (
                    <div key={i} className={`max-w-[85%] ${m.role === 'user' ? 'ml-auto text-right' : 'mr-auto text-left'}`}>
                      <div className={`inline-block p-3 rounded-xl ${'lavender-bubble'} ${m.role === 'user' ? 'text-white' : 'text-white'}`}>
                        <div className="text-sm">{m.text}</div>
                        <div className="text-[10px] text-gray-200 mt-1">{new Date(m.time).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 border-t pt-3">
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={2}
                    placeholder={`Ask ${selected.name} something...`}
                    className="w-full border rounded-md p-2"
                  />
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <Button variant="outline" onClick={() => { setQuestion(''); }}>Clear</Button>
                    <Button onClick={sendQuestion}>Send</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorSelector;
