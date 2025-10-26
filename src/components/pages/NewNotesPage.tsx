import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { FeatureBadge } from '../FeatureBadge';
import { Upload, FileText, Sparkles, MessageSquare, Brain, Layers } from 'lucide-react';

export function NewNotesPage() {
  const uploadedNotes = [
    {
      id: 1,
      title: 'DBMS Normalization Concepts',
      type: 'PDF',
      uploadDate: 'Today',
      hasSummary: true,
      hasFlashcards: true,
    },
    {
      id: 2,
      title: 'Binary Search Tree Algorithms',
      type: 'PDF',
      uploadDate: 'Yesterday',
      hasSummary: true,
      hasFlashcards: false,
    },
    {
      id: 3,
      title: 'Operating Systems Lecture Notes',
      type: 'Image',
      uploadDate: '2 days ago',
      hasSummary: false,
      hasFlashcards: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-green-600 text-white p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <h1 className="text-3xl mb-2">Notes & Study Materials</h1>
        <p className="text-green-100">Transform your notes with AI intelligence</p>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Feature Badges */}
        <div className="flex flex-wrap gap-2">
          <FeatureBadge text="Auto Summarize + Flashcards" />
          <FeatureBadge text="Simplify Concept Mode" />
        </div>

        {/* Upload Area */}
        <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-green-600 rounded-3xl flex items-center justify-center">
              <Upload className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl mb-2">Upload Your Notes</h3>
            <p className="text-gray-600 mb-6">Support for PDF, Text, Images, and Documents</p>
            <Button className="bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary rounded-2xl h-12 px-8">
              <Upload className="w-5 h-5 mr-2" />
              Choose File
            </Button>
            <p className="text-sm text-gray-500 mt-4">Or drag and drop files here</p>
          </CardContent>
        </Card>

        {/* AI Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2">Summarize Notes</h3>
              <p className="text-sm text-gray-600 mb-4">Get AI-powered summaries of your study materials</p>
              <Button variant="outline" className="w-full rounded-2xl">
                Summarize
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2">Convert to Flashcards</h3>
              <p className="text-sm text-gray-600 mb-4">Create interactive flashcards automatically</p>
              <Button variant="outline" className="w-full rounded-2xl">
                Generate
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-white border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2">Explain Like I'm 10</h3>
              <p className="text-sm text-gray-600 mb-4">Simplify complex concepts for easy understanding</p>
              <Button variant="outline" className="w-full rounded-2xl">
                Simplify
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Uploaded Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Your Notes Library
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadedNotes.map((note) => (
              <div key={note.id} className="p-4 border border-gray-200 rounded-2xl hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-2">{note.title}</h4>
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                      <Badge variant="outline" className="text-xs">{note.type}</Badge>
                      <span>•</span>
                      <span>{note.uploadDate}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {note.hasSummary ? (
                        <Button size="sm" className="bg-primary hover:bg-green-700 rounded-xl">
                          <Sparkles className="w-4 h-4 mr-1" />
                          View Summary
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="rounded-xl">
                          <Sparkles className="w-4 h-4 mr-1" />
                          Generate Summary
                        </Button>
                      )}
                      {note.hasFlashcards ? (
                        <Button size="sm" variant="outline" className="rounded-xl">
                          📇 View Flashcards (24)
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="rounded-xl">
                          Create Flashcards
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="rounded-xl">
                        <Brain className="w-4 h-4 mr-1" />
                        Simplify
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Generated Summary Example */}
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              AI Generated Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-white rounded-2xl border border-purple-100">
              <h4 className="mb-3">DBMS Normalization Concepts</h4>
              <p className="text-gray-700 mb-4">
                Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. Key normal forms include:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>1NF:</strong> Eliminate repeating groups, ensure atomic values</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>2NF:</strong> Remove partial dependencies on composite keys</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>3NF:</strong> Eliminate transitive dependencies</span>
                </li>
              </ul>
              <div className="flex gap-2 mt-4">
                <Badge className="bg-green-100 text-green-700">Key Points: 8</Badge>
                <Badge className="bg-blue-100 text-blue-700">Flashcards: 24</Badge>
                <Badge className="bg-purple-100 text-purple-700">Reading Time: 3 min</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
