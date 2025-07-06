"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Zap, 
  Sun, 
  Moon, 
  Cloud, 
  Coffee,
  Sparkles,
  Brain,
  ArrowRight
} from 'lucide-react';
import PerfumeCard from '@/components/perfume-card';
import { mockPerfumes } from '@/data/mockData';

export default function MoodMatchPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const moods = [
    { 
      id: 'energetic', 
      label: 'Energetic & Vibrant', 
      icon: Zap, 
      color: 'from-yellow-500 to-orange-500',
      description: 'Ready to conquer the day'
    },
    { 
      id: 'romantic', 
      label: 'Romantic & Dreamy', 
      icon: Heart, 
      color: 'from-pink-500 to-red-500',
      description: 'Feeling love and connection'
    },
    { 
      id: 'calm', 
      label: 'Calm & Peaceful', 
      icon: Cloud, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Seeking tranquility and balance'
    },
    { 
      id: 'confident', 
      label: 'Confident & Bold', 
      icon: Sun, 
      color: 'from-purple-500 to-pink-500',
      description: 'Ready to make a statement'
    },
    { 
      id: 'cozy', 
      label: 'Cozy & Comfortable', 
      icon: Coffee, 
      color: 'from-amber-500 to-orange-600',
      description: 'Embracing warmth and comfort'
    },
    { 
      id: 'mysterious', 
      label: 'Mysterious & Alluring', 
      icon: Moon, 
      color: 'from-indigo-500 to-purple-600',
      description: 'Channeling intrigue and depth'
    }
  ];

  const generateRecommendations = async (moodId: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple recommendation logic based on mood
    let filteredPerfumes = [...mockPerfumes];
    
    switch (moodId) {
      case 'energetic':
        filteredPerfumes = filteredPerfumes.filter(p => 
          p.notes.top.some(note => ['Bergamot', 'Lemon', 'Lime', 'Orange'].includes(note)) ||
          p.mood.includes('Fresh')
        );
        break;
      case 'romantic':
        filteredPerfumes = filteredPerfumes.filter(p => 
          p.notes.middle.some(note => ['Rose', 'Jasmine', 'Ylang-Ylang'].includes(note)) ||
          p.mood.includes('Romantic')
        );
        break;
      case 'calm':
        filteredPerfumes = filteredPerfumes.filter(p => 
          p.notes.base.some(note => ['Sandalwood', 'Cedar', 'Vanilla'].includes(note)) ||
          p.mood.includes('Calm')
        );
        break;
      case 'confident':
        filteredPerfumes = filteredPerfumes.filter(p => 
          p.projection >= 7 || p.mood.includes('Confident')
        );
        break;
      case 'cozy':
        filteredPerfumes = filteredPerfumes.filter(p => 
          p.notes.base.some(note => ['Vanilla', 'Amber', 'Musk'].includes(note))
        );
        break;
      case 'mysterious':
        filteredPerfumes = filteredPerfumes.filter(p => 
          p.notes.base.some(note => ['Patchouli', 'Oud', 'Incense'].includes(note)) ||
          p.mood.includes('Mysterious')
        );
        break;
    }

    // Add AI confidence scores
    const recommendationsWithScores = filteredPerfumes.slice(0, 3).map(perfume => ({
      ...perfume,
      aiScore: Math.floor(Math.random() * 15) + 85, // 85-99% match
      moodReason: generateMoodReason(perfume, moodId)
    }));

    setRecommendations(recommendationsWithScores);
    setIsAnalyzing(false);
  };

  const generateMoodReason = (perfume: any, moodId: string) => {
    const reasons = {
      energetic: `The bright ${perfume.notes.top.join(' and ')} opening energizes and uplifts your spirit`,
      romantic: `Sensual ${perfume.notes.middle.join(' and ')} creates an intimate, romantic aura`,
      calm: `Soothing ${perfume.notes.base.join(' and ')} base notes promote tranquility and peace`,
      confident: `Bold projection and sophisticated composition commands attention and respect`,
      cozy: `Warm, comforting notes wrap you in a cozy embrace like your favorite sweater`,
      mysterious: `Deep, complex composition creates an air of intrigue and sophistication`
    };
    return reasons[moodId as keyof typeof reasons] || 'Perfect match for your current mood';
  };

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    generateRecommendations(moodId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              Mood-Based AI
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Mood Match</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us how you're feeling and we'll find the perfect fragrance to match your mood
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Mood Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How are you feeling today?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {moods.map((mood) => {
                  const IconComponent = mood.icon;
                  return (
                    <Button
                      key={mood.id}
                      variant={selectedMood === mood.id ? 'default' : 'outline'}
                      className="h-auto p-6 flex flex-col gap-3 text-left"
                      onClick={() => handleMoodSelect(mood.id)}
                      disabled={isAnalyzing}
                    >
                      <div className={`h-12 w-12 rounded-lg bg-gradient-to-r ${mood.color} flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">{mood.label}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{mood.description}</p>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isAnalyzing && (
            <Card className="mb-8">
              <CardContent className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Analyzing Your Mood...</h3>
                <p className="text-muted-foreground">
                  Our AI is finding the perfect fragrances to match how you're feeling
                </p>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && !isAnalyzing && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Perfect Matches for Your Mood</h2>
                <p className="text-muted-foreground">
                  Fragrances that complement your {moods.find(m => m.id === selectedMood)?.label.toLowerCase()} energy
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((perfume, index) => (
                  <div key={perfume.id} className="relative">
                    <Badge 
                      className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-purple-500 to-pink-500"
                    >
                      {perfume.aiScore}% Match
                    </Badge>
                    <PerfumeCard perfume={perfume} showFullDetails />
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        <strong>Mood Match:</strong> {perfume.moodReason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button className="gap-2">
                  Explore More Matches
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* How It Works */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How Mood Matching Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-3">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Mood Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    AI analyzes your emotional state and energy level
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Scent Psychology</h3>
                  <p className="text-sm text-muted-foreground">
                    Matches fragrances based on aromatherapy and scent psychology
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-3">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Perfect Harmony</h3>
                  <p className="text-sm text-muted-foreground">
                    Find scents that enhance and complement your current mood
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