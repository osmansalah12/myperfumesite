"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Brain, 
  Sparkles, 
  Sun, 
  Moon, 
  Cloud, 
  Heart,
  Zap,
  Coffee,
  Flower,
  Mountain,
  Waves,
  Star
} from 'lucide-react';
import PerfumeCard from '@/components/perfume-card';
import { mockPerfumes } from '@/data/mockData';

export default function MoodRecommendationsPage() {
  const [currentMood, setCurrentMood] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [weather, setWeather] = useState('');
  const [occasion, setOccasion] = useState('');
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const moods = [
    { id: 'energetic', label: 'Energetic & Vibrant', icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { id: 'calm', label: 'Calm & Relaxed', icon: Waves, color: 'from-blue-500 to-cyan-500' },
    { id: 'confident', label: 'Confident & Bold', icon: Mountain, color: 'from-purple-500 to-pink-500' },
    { id: 'romantic', label: 'Romantic & Dreamy', icon: Heart, color: 'from-pink-500 to-red-500' },
    { id: 'fresh', label: 'Fresh & Clean', icon: Cloud, color: 'from-green-500 to-blue-500' },
    { id: 'sophisticated', label: 'Sophisticated & Elegant', icon: Star, color: 'from-gray-600 to-gray-800' }
  ];

  const vibes = [
    'Mysterious', 'Playful', 'Luxurious', 'Minimalist', 'Bohemian', 
    'Classic', 'Modern', 'Vintage', 'Exotic', 'Cozy'
  ];

  const generateRecommendations = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple recommendation logic based on mood
    let filteredPerfumes = [...mockPerfumes];
    
    if (currentMood === 'fresh') {
      filteredPerfumes = filteredPerfumes.filter(p => 
        p.mood.includes('Fresh') || 
        p.seasonality.includes('Summer') ||
        p.notes.top.some(note => ['Bergamot', 'Lemon', 'Lime'].includes(note))
      );
    } else if (currentMood === 'romantic') {
      filteredPerfumes = filteredPerfumes.filter(p => 
        p.mood.includes('Romantic') || 
        p.occasions.includes('Date Night') ||
        p.notes.middle.some(note => ['Rose', 'Jasmine'].includes(note))
      );
    } else if (currentMood === 'confident') {
      filteredPerfumes = filteredPerfumes.filter(p => 
        p.mood.includes('Confident') || 
        p.mood.includes('Bold') ||
        p.projection >= 7
      );
    }

    // Add AI confidence scores
    const recommendationsWithScores = filteredPerfumes.slice(0, 4).map(perfume => ({
      ...perfume,
      aiScore: Math.floor(Math.random() * 20) + 80, // 80-99% match
      reason: generateReason(perfume, currentMood)
    }));

    setRecommendations(recommendationsWithScores);
    setIsAnalyzing(false);
  };

  const generateReason = (perfume: any, mood: string) => {
    const reasons = {
      fresh: `Perfect for your fresh mood with bright ${perfume.notes.top.join(', ')} opening`,
      romantic: `Ideal for romantic moments with sensual ${perfume.notes.middle.join(', ')} heart`,
      confident: `Matches your confident energy with bold projection and lasting power`,
      energetic: `Energizing blend that complements your vibrant mood`,
      calm: `Soothing composition perfect for relaxation`,
      sophisticated: `Elegant and refined, matching your sophisticated taste`
    };
    return reasons[mood as keyof typeof reasons] || 'AI-selected based on your preferences';
  };

  const handleVibeToggle = (vibe: string) => {
    setSelectedVibes(prev => 
      prev.includes(vibe) 
        ? prev.filter(v => v !== vibe)
        : [...prev, vibe]
    );
  };

  const canAnalyze = currentMood && timeOfDay && weather && occasion;

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
              AI-Powered
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Mood-Based Recommendations</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us how you're feeling and we'll use AI to find the perfect fragrance to match your mood
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mood Selection */}
            <div className="space-y-8">
              {/* Current Mood */}
              <Card>
                <CardHeader>
                  <CardTitle>How are you feeling today?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {moods.map((mood) => {
                      const IconComponent = mood.icon;
                      return (
                        <Button
                          key={mood.id}
                          variant={currentMood === mood.id ? 'default' : 'outline'}
                          className="h-auto p-4 flex flex-col gap-2"
                          onClick={() => setCurrentMood(mood.id)}
                        >
                          <div className={`h-8 w-8 rounded-lg bg-gradient-to-r ${mood.color} flex items-center justify-center`}>
                            <IconComponent className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-xs text-center">{mood.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Time of Day */}
              <Card>
                <CardHeader>
                  <CardTitle>Time of Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={timeOfDay} onValueChange={setTimeOfDay}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="morning" id="morning" />
                      <Label htmlFor="morning" className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Morning (6AM - 12PM)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="afternoon" id="afternoon" />
                      <Label htmlFor="afternoon" className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-yellow-500" />
                        Afternoon (12PM - 6PM)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="evening" id="evening" />
                      <Label htmlFor="evening" className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Evening (6PM - 12AM)
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Weather */}
              <Card>
                <CardHeader>
                  <CardTitle>Weather & Season</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={weather} onValueChange={setWeather}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sunny" id="sunny" />
                      <Label htmlFor="sunny">Sunny & Warm</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cool" id="cool" />
                      <Label htmlFor="cool">Cool & Crisp</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rainy" id="rainy" />
                      <Label htmlFor="rainy">Rainy & Cozy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cold" id="cold" />
                      <Label htmlFor="cold">Cold & Wintery</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Occasion */}
              <Card>
                <CardHeader>
                  <CardTitle>Occasion</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={occasion} onValueChange={setOccasion}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="work" id="work" />
                      <Label htmlFor="work">Work / Professional</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="casual" id="casual" />
                      <Label htmlFor="casual">Casual / Everyday</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="date" id="date" />
                      <Label htmlFor="date">Date Night / Romantic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="special" id="special" />
                      <Label htmlFor="special">Special Event</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Additional Preferences */}
            <div className="space-y-8">
              {/* Vibes */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Vibes (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {vibes.map((vibe) => (
                      <div key={vibe} className="flex items-center space-x-2">
                        <Checkbox
                          id={vibe}
                          checked={selectedVibes.includes(vibe)}
                          onCheckedChange={() => handleVibeToggle(vibe)}
                        />
                        <Label htmlFor={vibe} className="text-sm">{vibe}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Button */}
              <Card>
                <CardContent className="p-6">
                  <Button
                    onClick={generateRecommendations}
                    disabled={!canAnalyze || isAnalyzing}
                    className="w-full gap-2"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Analyzing Your Mood...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Get AI Recommendations
                      </>
                    )}
                  </Button>
                  
                  {!canAnalyze && (
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      Please fill in all required fields above
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Current Selection Summary */}
              {(currentMood || timeOfDay || weather || occasion) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Selection</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {currentMood && (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Mood</Badge>
                        <span className="text-sm">{moods.find(m => m.id === currentMood)?.label}</span>
                      </div>
                    )}
                    {timeOfDay && (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Time</Badge>
                        <span className="text-sm capitalize">{timeOfDay}</span>
                      </div>
                    )}
                    {weather && (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Weather</Badge>
                        <span className="text-sm capitalize">{weather}</span>
                      </div>
                    )}
                    {occasion && (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Occasion</Badge>
                        <span className="text-sm capitalize">{occasion}</span>
                      </div>
                    )}
                    {selectedVibes.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Vibes</Badge>
                        <span className="text-sm">{selectedVibes.join(', ')}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* AI Recommendations */}
          {recommendations.length > 0 && (
            <div className="mt-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Your AI-Curated Matches</h2>
                <p className="text-muted-foreground">
                  Based on your mood and preferences, here are our top recommendations
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        <strong>AI Insight:</strong> {perfume.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}