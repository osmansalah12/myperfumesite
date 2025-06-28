"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Layers, 
  Plus, 
  Minus, 
  Sparkles, 
  Clock, 
  Lightbulb,
  BookOpen,
  Palette,
  Zap,
  Heart,
  Star,
  ChevronRight,
  AlertCircle,
  X
} from 'lucide-react';
import PerfumeCard from '@/components/perfume-card';
import { mockPerfumes, allFragranceNotes } from '@/data/mockData';

interface LayeringCombination {
  id: string;
  name: string;
  description: string;
  perfumes: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  season: string[];
  occasion: string[];
  tips: string[];
}

export default function LayeringGuidePage() {
  const [selectedPerfumes, setSelectedPerfumes] = useState<string[]>([]);
  const [customLayerName, setCustomLayerName] = useState('');
  const [activeTab, setActiveTab] = useState('learn');

  const layeringCombinations: LayeringCombination[] = [
    {
      id: '1',
      name: 'Fresh Citrus Boost',
      description: 'Layer a fresh citrus fragrance with a woody base for all-day freshness with depth',
      perfumes: ['1', '5'], // Sauvage + Acqua di Gio
      difficulty: 'Beginner',
      season: ['Spring', 'Summer'],
      occasion: ['Casual', 'Office'],
      tips: [
        'Apply the woody fragrance first as your base',
        'Wait 5 minutes, then apply citrus on pulse points',
        'Use lighter hand with the citrus to avoid overwhelming'
      ]
    },
    {
      id: '2',
      name: 'Romantic Evening',
      description: 'Combine floral and oriental notes for a seductive, complex evening scent',
      perfumes: ['2', '6'], // Baccarat Rouge + Flowerbomb
      difficulty: 'Advanced',
      season: ['Fall', 'Winter'],
      occasion: ['Date Night', 'Special Events'],
      tips: [
        'Apply the oriental base to your torso',
        'Layer floral on wrists and behind ears',
        'Allow each layer to dry before applying the next'
      ]
    },
    {
      id: '3',
      name: 'Office Professional',
      description: 'Subtle layering for a sophisticated workplace presence',
      perfumes: ['3', '1'], // Light Blue + Sauvage
      difficulty: 'Intermediate',
      season: ['Spring', 'Fall'],
      occasion: ['Office', 'Professional'],
      tips: [
        'Use very light application - less is more',
        'Focus on lower pulse points to avoid projection',
        'Test the combination at home first'
      ]
    }
  ];

  const layeringTips = [
    {
      title: 'Start with Complementary Notes',
      description: 'Choose fragrances that share at least one common note family',
      icon: Palette
    },
    {
      title: 'Apply Base First',
      description: 'Always apply the heavier, longer-lasting fragrance first',
      icon: Layers
    },
    {
      title: 'Wait Between Applications',
      description: 'Allow 5-10 minutes between each layer for proper development',
      icon: Clock
    },
    {
      title: 'Less is More',
      description: 'Use lighter application when layering to avoid overwhelming',
      icon: Lightbulb
    }
  ];

  const noteCompatibility = {
    'Citrus': ['Woody', 'Fresh', 'Aquatic'],
    'Floral': ['Fruity', 'Woody', 'Oriental'],
    'Woody': ['Citrus', 'Spicy', 'Oriental'],
    'Oriental': ['Floral', 'Woody', 'Spicy'],
    'Fresh': ['Citrus', 'Aquatic', 'Green'],
    'Spicy': ['Woody', 'Oriental', 'Leather']
  };

  const addPerfumeToLayer = (perfumeId: string) => {
    if (!selectedPerfumes.includes(perfumeId) && selectedPerfumes.length < 3) {
      setSelectedPerfumes([...selectedPerfumes, perfumeId]);
    }
  };

  const removePerfumeFromLayer = (perfumeId: string) => {
    setSelectedPerfumes(selectedPerfumes.filter(id => id !== perfumeId));
  };

  const analyzeLayering = () => {
    if (selectedPerfumes.length < 2) return null;

    const perfumes = selectedPerfumes.map(id => mockPerfumes.find(p => p.id === id)).filter(Boolean);
    
    // Simple compatibility analysis
    const allNotes = perfumes.flatMap(p => [...p!.notes.top, ...p!.notes.middle, ...p!.notes.base]);
    const uniqueNotes = [...new Set(allNotes)];
    const commonNotes = allNotes.filter((note, index) => allNotes.indexOf(note) !== index);
    
    const compatibility = commonNotes.length > 0 ? 'Good' : 'Experimental';
    const complexity = uniqueNotes.length > 15 ? 'High' : uniqueNotes.length > 10 ? 'Medium' : 'Low';
    
    return {
      compatibility,
      complexity,
      commonNotes: [...new Set(commonNotes)],
      totalNotes: uniqueNotes.length,
      recommendation: commonNotes.length > 0 
        ? 'These fragrances share common notes and should layer well together.'
        : 'This is an experimental combination. Test carefully before wearing out.'
    };
  };

  const analysis = analyzeLayering();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <Badge variant="secondary" className="gap-1">
              <BookOpen className="h-3 w-3" />
              Expert Guide
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Fragrance Layering Guide</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the art of fragrance layering to create unique, personalized scent combinations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="learn">Learn Basics</TabsTrigger>
            <TabsTrigger value="combinations">Combinations</TabsTrigger>
            <TabsTrigger value="builder">Layer Builder</TabsTrigger>
            <TabsTrigger value="tips">Pro Tips</TabsTrigger>
          </TabsList>

          {/* Learn Basics Tab */}
          <TabsContent value="learn" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    What is Fragrance Layering?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Fragrance layering is the art of combining multiple scents to create a unique, 
                    personalized fragrance that's entirely your own. When done correctly, layering 
                    can enhance longevity, add complexity, and create a signature scent.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Benefits of Layering:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Create a unique signature scent</li>
                      <li>• Enhance fragrance longevity</li>
                      <li>• Add complexity and depth</li>
                      <li>• Customize scents for different occasions</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    Layering Fundamentals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">Rule 1: Complementary Notes</h4>
                      <p className="text-xs text-muted-foreground">
                        Choose fragrances with at least one shared note family
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">Rule 2: Base First</h4>
                      <p className="text-xs text-muted-foreground">
                        Apply the heavier, longer-lasting fragrance as your foundation
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">Rule 3: Patience</h4>
                      <p className="text-xs text-muted-foreground">
                        Wait 5-10 minutes between applications for proper development
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Note Compatibility Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Note Family Compatibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(noteCompatibility).map(([family, compatible]) => (
                    <div key={family} className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">{family}</h4>
                      <div className="flex flex-wrap gap-1">
                        {compatible.map((note) => (
                          <Badge key={note} variant="outline" className="text-xs">
                            {note}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Combinations Tab */}
          <TabsContent value="combinations" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Expert Layering Combinations</h2>
              <p className="text-muted-foreground">
                Tried and tested combinations from fragrance experts
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {layeringCombinations.map((combination) => (
                <Card key={combination.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{combination.name}</CardTitle>
                      <Badge variant={
                        combination.difficulty === 'Beginner' ? 'secondary' :
                        combination.difficulty === 'Intermediate' ? 'default' : 'destructive'
                      }>
                        {combination.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{combination.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Perfumes in combination */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Fragrances:</h4>
                      {combination.perfumes.map((perfumeId) => {
                        const perfume = mockPerfumes.find(p => p.id === perfumeId);
                        return perfume ? (
                          <div key={perfumeId} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            {perfume.brand} {perfume.name}
                          </div>
                        ) : null;
                      })}
                    </div>

                    {/* Season and Occasion */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {combination.season.map((season) => (
                          <Badge key={season} variant="outline" className="text-xs">
                            {season}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {combination.occasion.map((occasion) => (
                          <Badge key={occasion} variant="secondary" className="text-xs">
                            {occasion}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm">Application Tips:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {combination.tips.map((tip, index) => (
                          <li key={index}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Layer Builder Tab */}
          <TabsContent value="builder" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Custom Layer Builder</h2>
              <p className="text-muted-foreground">
                Experiment with different combinations and get AI analysis
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Perfume Selection */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Fragrances to Layer</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Choose 2-3 fragrances to create your custom combination
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {mockPerfumes.slice(0, 6).map((perfume) => (
                        <div key={perfume.id} className="relative">
                          <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                              <Sparkles className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm">{perfume.name}</h4>
                              <p className="text-xs text-muted-foreground">{perfume.brand}</p>
                              <div className="flex gap-1 mt-1">
                                {perfume.notes.top.slice(0, 2).map((note, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {note}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button
                              size="icon"
                              variant={selectedPerfumes.includes(perfume.id) ? 'default' : 'outline'}
                              className="h-8 w-8"
                              onClick={() => 
                                selectedPerfumes.includes(perfume.id) 
                                  ? removePerfumeFromLayer(perfume.id)
                                  : addPerfumeToLayer(perfume.id)
                              }
                            >
                              {selectedPerfumes.includes(perfume.id) ? (
                                <Minus className="h-4 w-4" />
                              ) : (
                                <Plus className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Selected Combination */}
                {selectedPerfumes.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Layer Combination</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="layer-name">Combination Name</Label>
                        <Input
                          id="layer-name"
                          placeholder="My Custom Layer"
                          value={customLayerName}
                          onChange={(e) => setCustomLayerName(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Selected Fragrances:</h4>
                        {selectedPerfumes.map((perfumeId, index) => {
                          const perfume = mockPerfumes.find(p => p.id === perfumeId);
                          return perfume ? (
                            <div key={perfumeId} className="flex items-center gap-2 text-sm">
                              <Badge variant="outline">{index + 1}</Badge>
                              {perfume.brand} {perfume.name}
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6"
                                onClick={() => removePerfumeFromLayer(perfumeId)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Analysis Panel */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      AI Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {analysis ? (
                      <>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Compatibility:</span>
                            <Badge variant={analysis.compatibility === 'Good' ? 'default' : 'secondary'}>
                              {analysis.compatibility}
                            </Badge>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Complexity:</span>
                            <Badge variant="outline">{analysis.complexity}</Badge>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Total Notes:</span>
                            <span className="text-sm font-medium">{analysis.totalNotes}</span>
                          </div>
                        </div>

                        {analysis.commonNotes.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Shared Notes:</h4>
                            <div className="flex flex-wrap gap-1">
                              {analysis.commonNotes.map((note) => (
                                <Badge key={note} variant="secondary" className="text-xs">
                                  {note}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <p className="text-xs text-muted-foreground">
                              {analysis.recommendation}
                            </p>
                          </div>
                        </div>

                        <Button className="w-full gap-2">
                          <Heart className="h-4 w-4" />
                          Save Combination
                        </Button>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">
                          Select at least 2 fragrances to get AI analysis
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Pro Tips Tab */}
          <TabsContent value="tips" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Professional Layering Tips</h2>
              <p className="text-muted-foreground">
                Advanced techniques from fragrance experts and perfumers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {layeringTips.map((tip, index) => {
                const IconComponent = tip.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        {tip.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{tip.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Advanced Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Advanced Layering Techniques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Application Zones</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• <strong>Base layer:</strong> Apply to torso and lower pulse points</li>
                      <li>• <strong>Mid layer:</strong> Focus on wrists and inner elbows</li>
                      <li>• <strong>Top layer:</strong> Light application behind ears and neck</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Timing Guidelines</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• <strong>Morning:</strong> Start with lighter, fresher scents</li>
                      <li>• <strong>Afternoon:</strong> Add depth with woody or spicy notes</li>
                      <li>• <strong>Evening:</strong> Enhance with oriental or gourmand layers</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Pro Secret: The 60-30-10 Rule
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Use 60% of your dominant fragrance, 30% of your complementary scent, 
                    and 10% of an accent fragrance for perfectly balanced layering.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}