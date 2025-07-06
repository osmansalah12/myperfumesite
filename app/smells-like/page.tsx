"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Sparkles, 
  Brain,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import PerfumeCard from '@/components/perfume-card';
import { mockPerfumes } from '@/data/mockData';

export default function SmellsLikePage() {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const exampleQueries = [
    "fresh rain on concrete",
    "cozy vanilla cookies",
    "old leather books",
    "ocean breeze",
    "pine forest after rain",
    "grandmother's rose garden",
    "coffee shop in the morning",
    "clean laundry",
    "campfire smoke",
    "citrus peel"
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple matching logic based on keywords
    let matches = [...mockPerfumes];
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('rain') || lowerQuery.includes('fresh') || lowerQuery.includes('clean')) {
      matches = matches.filter(p => 
        p.mood.includes('Fresh') || 
        p.notes.top.some(note => ['Bergamot', 'Lemon', 'Lime'].includes(note))
      );
    } else if (lowerQuery.includes('vanilla') || lowerQuery.includes('sweet') || lowerQuery.includes('cookie')) {
      matches = matches.filter(p => 
        p.notes.base.includes('Vanilla') || 
        p.mood.includes('Sweet')
      );
    } else if (lowerQuery.includes('ocean') || lowerQuery.includes('sea') || lowerQuery.includes('breeze')) {
      matches = matches.filter(p => 
        p.notes.middle.some(note => ['Sea Notes', 'Marine Notes'].includes(note)) ||
        p.mood.includes('Fresh')
      );
    } else if (lowerQuery.includes('wood') || lowerQuery.includes('forest') || lowerQuery.includes('pine')) {
      matches = matches.filter(p => 
        p.notes.base.some(note => ['Cedar', 'Sandalwood', 'Vetiver'].includes(note))
      );
    } else if (lowerQuery.includes('rose') || lowerQuery.includes('floral') || lowerQuery.includes('garden')) {
      matches = matches.filter(p => 
        p.notes.middle.some(note => ['Rose', 'Jasmine', 'Ylang-Ylang'].includes(note))
      );
    }

    // Add AI confidence scores and reasons
    const recommendationsWithScores = matches.slice(0, 4).map(perfume => ({
      ...perfume,
      aiScore: Math.floor(Math.random() * 20) + 80, // 80-99% match
      reason: generateReason(perfume, query)
    }));

    setRecommendations(recommendationsWithScores);
    setIsAnalyzing(false);
  };

  const generateReason = (perfume: any, query: string) => {
    const reasons = [
      `The ${perfume.notes.top.join(' and ')} notes capture that "${query}" essence perfectly`,
      `This fragrance evokes the same feeling as "${query}" with its unique composition`,
      `The scent profile matches your "${query}" description through its carefully balanced notes`,
      `AI detected strong similarities between "${query}" and this fragrance's olfactory signature`
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              AI-Powered
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Smells Like...</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Describe any scent, memory, or feeling and our AI will find fragrances that match
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Search Interface */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Describe What You're Looking For
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="e.g., 'fresh rain on concrete', 'cozy vanilla cookies', 'ocean breeze'..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="text-lg py-3 pr-32"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button 
                    onClick={handleSearch}
                    disabled={!query.trim() || isAnalyzing}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4" />
                        Find Matches
                      </>
                    )}
                  </Button>
                </div>

                {/* Example Queries */}
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Try these examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {exampleQueries.map((example, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setQuery(example)}
                        className="text-xs"
                      >
                        "{example}"
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis Results */}
          {recommendations.length > 0 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">AI Found These Matches</h2>
                <p className="text-muted-foreground">
                  Based on your description: "{query}"
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {recommendations.map((perfume, index) => (
                  <div key={perfume.id} className="relative">
                    <Badge 
                      className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-blue-500 to-purple-500"
                    >
                      {perfume.aiScore}% Match
                    </Badge>
                    <PerfumeCard perfume={perfume} showFullDetails />
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        <strong>AI Analysis:</strong> {perfume.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline" className="gap-2">
                  See More Matches
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* How It Works */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How "Smells Like" Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-3">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI understands your description and maps it to fragrance notes
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-3">
                    <Search className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Smart Matching</h3>
                  <p className="text-sm text-muted-foreground">
                    We search through thousands of fragrances to find the best matches
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Perfect Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized recommendations with confidence scores
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}