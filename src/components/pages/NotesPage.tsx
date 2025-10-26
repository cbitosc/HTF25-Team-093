import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '../ui/dialog';
import { Upload, FileText, Sparkles, MessageSquare, Book, LayoutGrid, X, Download, Image, File } from 'lucide-react';

export function NotesPage() {
  type Note = {
    id: number;
    title: string;
    subject?: string;
    uploadDate: string;
    type: string;
    pages?: number;
    url?: string;
  summary?: string;
    hasSummary?: boolean;
    hasFlashcards?: boolean;
    hasQuiz?: boolean;
  };

  const [uploadedNotes, setUploadedNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Binary Search Trees - Lecture 5',
      subject: 'Data Structures',
      uploadDate: 'Oct 24, 2025',
      type: 'PDF',
      pages: 15,
      hasSummary: true,
      hasFlashcards: true,
      hasQuiz: true,
    },
    {
      id: 2,
      title: 'SQL Advanced Queries',
      subject: 'Database Systems',
      uploadDate: 'Oct 23, 2025',
      type: 'PDF',
      pages: 8,
      hasSummary: true,
      hasFlashcards: true,
      hasQuiz: false,
    },
    {
      id: 3,
      title: 'Graph Theory Fundamentals',
      subject: 'Algorithms',
      uploadDate: 'Oct 22, 2025',
      type: 'Image',
      pages: 4,
      hasSummary: false,
      hasFlashcards: false,
      hasQuiz: false,
    },
    {
      id: 4,
      title: 'Process Scheduling',
      subject: 'Operating Systems',
      uploadDate: 'Oct 21, 2025',
      type: 'Slides',
      pages: 32,
      hasSummary: true,
      hasFlashcards: false,
      hasQuiz: true,
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const nextIdRef = useRef(100);
  
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [flashcardsOpen, setFlashcardsOpen] = useState(false);
  const [flashcards, setFlashcards] = useState<{q:string;a:string}[]>([]);

  useEffect(() => {
    return () => {
      // Revoke any object URLs created for uploaded notes
      uploadedNotes.forEach((n) => {
        if (n.url && n.url.startsWith('blob:')) URL.revokeObjectURL(n.url);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    const newNotes: Note[] = arr.map((f) => {
      const ext = f.name.split('.').pop()?.toUpperCase() || 'FILE';
      const url = URL.createObjectURL(f);
      return {
        id: nextIdRef.current++,
        title: f.name,
        subject: '',
        uploadDate: new Date().toLocaleDateString(),
        type: ext,
        pages: undefined,
        url,
        hasSummary: false,
        hasFlashcards: false,
        hasQuiz: false,
      };
    });
    setUploadedNotes((s) => [...newNotes, ...s]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const generateSummaryFor = async (note: Note) => {
    setSelectedNote(note);
    setSummaryOpen(true);
    if (note.summary) return;
    // Fake summary generation (replace with API call later)
    const summary = `This is a concise summary for "${note.title}". Key points:\n- Main concept\n- Important examples\n- Suggested exercises`;
    setUploadedNotes((s) => s.map((n) => (n.id === note.id ? { ...n, hasSummary: true, summary } : n)));
  };

  const generateFlashcardsFor = async (note: Note) => {
    setSelectedNote(note);
    setFlashcardsOpen(true);
    const base = note.title.split(/\s+/).slice(0,5).join(' ');
    const cards = Array.from({ length: 5 }).map((_,i) => ({ q: `What is key idea ${i+1} from ${base}?`, a: `Answer ${i+1}: core explanation.` }));
    setFlashcards(cards);
    setUploadedNotes((s) => s.map((n) => (n.id === note.id ? { ...n, hasFlashcards: true } : n)));
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const removeNote = (id: number) => {
    setUploadedNotes((s) => {
      const toRemove = s.find((n) => n.id === id);
      if (toRemove && toRemove.url && toRemove.url.startsWith('blob:')) URL.revokeObjectURL(toRemove.url);
      return s.filter((n) => n.id !== id);
    });
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-1">Notes & Materials</h1>
        <p className="text-gray-600">Upload and organize your study materials with AI assistance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload New Material
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragEnter={onDragOver}
                onDragLeave={onDragLeave}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2">Drop files here or click to browse</h3>
                <p className="text-sm text-gray-500">Supports PDF, Images, PPT, DOCX (Max 50MB)</p>
                <div className="mt-4 flex justify-center">
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                    Select Files
                  </Button>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
              />
              <div className="flex items-center gap-2">
                <div className="h-px bg-gray-300 flex-1" />
                <span className="text-sm text-gray-500">AI will automatically process your uploads</span>
                <div className="h-px bg-gray-300 flex-1" />
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Notes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Notes Library</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uploadedNotes.map((note) => (
                  <div key={note.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        {note.type.toLowerCase().includes('pdf') ? (
                          <FileText className="w-6 h-6 text-blue-600" />
                        ) : note.type.toLowerCase().startsWith('image') ? (
                          <Image className="w-6 h-6 text-blue-600" />
                        ) : (
                          <File className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-1">{note.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <Badge variant="outline">{note.subject || 'General'}</Badge>
                          <span>•</span>
                          <span>{note.type}</span>
                          {note.pages ? (
                            <>
                              <span>•</span>
                              <span>{note.pages} pages</span>
                            </>
                          ) : null}
                          <span>•</span>
                          <span>{note.uploadDate}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          {note.hasSummary ? (
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => { setSelectedNote(note); setSummaryOpen(true); }}>
                              <Sparkles className="w-3 h-3 mr-1" />
                              View Summary
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => generateSummaryFor(note)}>
                              <Sparkles className="w-3 h-3 mr-1" />
                              Generate Summary
                            </Button>
                          )}

                          {note.hasFlashcards ? (
                            <Button size="sm" variant="outline" onClick={() => { setSelectedNote(note); setFlashcardsOpen(true); }}>
                              📇 Flashcards
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => generateFlashcardsFor(note)}>
                              Create Flashcards
                            </Button>
                          )}

                          <a href={note.url} download={note.title} target="_blank" rel="noreferrer">
                            <Button size="sm" variant="outline">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                          </a>
                          <Button size="sm" variant="ghost" onClick={() => removeNote(note.id)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Query Panel */}
        <div className="space-y-6">
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                Ask AI About Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Ask questions about your notes... e.g., 'Explain binary search trees in simple terms' or 'Create practice questions for SQL joins'"
                className="min-h-[100px]"
              />
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Sparkles className="w-4 h-4 mr-2" />
                Ask AI
              </Button>
              
              <div className="pt-4 border-t space-y-2">
                <p className="text-sm">Quick Actions:</p>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  Summarize all notes from this week
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  Create a study guide for midterms
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  Find key concepts in Database notes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="w-5 h-5" />
                Recent AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-800 mb-1">Binary Search Trees</p>
                <p className="text-sm">AI generated 24 flashcards and a 5-question quiz</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-xs text-green-800 mb-1">SQL Queries</p>
                <p className="text-sm">Summary ready with key examples highlighted</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-xs text-purple-800 mb-1">Study Tip</p>
                <p className="text-sm">Review your Data Structures notes before tomorrow's lab</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filter by Subject</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">All Subjects (12)</Button>
              <Button variant="ghost" className="w-full justify-start">Data Structures (4)</Button>
              <Button variant="ghost" className="w-full justify-start">Database Systems (3)</Button>
              <Button variant="ghost" className="w-full justify-start">Algorithms (2)</Button>
              <Button variant="ghost" className="w-full justify-start">Operating Systems (3)</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Summary Dialog */}
      <Dialog open={summaryOpen} onOpenChange={setSummaryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Summary: {selectedNote?.title}</DialogTitle>
            <DialogDescription>AI generated summary for the selected note</DialogDescription>
          </DialogHeader>
          <div className="mt-2">
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">{uploadedNotes.find(n => n.id === selectedNote?.id)?.summary || 'Generating summary...'}</pre>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSummaryOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Flashcards Dialog */}
      <Dialog open={flashcardsOpen} onOpenChange={setFlashcardsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Flashcards: {selectedNote?.title}</DialogTitle>
            <DialogDescription>Flashcards generated from the note</DialogDescription>
          </DialogHeader>
          <div className="mt-2 space-y-3">
            {flashcards.map((c, idx) => (
              <div key={idx} className="border rounded p-3">
                <div className="font-semibold">Q: {c.q}</div>
                <div className="text-sm text-gray-700 mt-2">A: {c.a}</div>
              </div>
            ))}
            {flashcards.length === 0 && <p className="text-sm text-gray-500">Generating flashcards...</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFlashcardsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
