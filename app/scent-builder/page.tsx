"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { 
  Palette, 
  Sparkles, 
  Crown, 
  ChevronRight,
  Plus,
  Minus,
  RefreshCw,
  Save,
  Share
} from 'lucide-react';
import PerfumeCard from '@/components/perfume-card';
import { allFragranceNotes, mockPerfumes } from '@/data/mockData';
import { Perfume, ScentProfile } from '@/types';

interface NoteIntensity {
  note: string;
  intensity: number;
}

interface PerfumeMatch {
  perfume: Perfume;
  similarity: number;
  matchingNotes: string[];
  reason: string;
}

export default function ScentBuilderPage() {
  const [selectedProfile, setSelectedProfile] = useState<'fresh' | 'warm' | 'floral' | 'spicy' | 'custom'>('custom');
  const [topNotes, setTopNotes] = useState<NoteIntensity[]>([]);
  const [middleNotes, setMiddleNotes] = useState<NoteIntensity[]>([]);
  const [baseNotes, setBaseNotes] = useState<NoteIntensity[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [matches, setMatches] = useState<PerfumeMatch[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const presetProfiles = {
    fresh: {
      name: 'Fresh & Clean',
      top: [{ note: 'Bergamot', intensity: 8 }, { note: 'Lemon', intensity: 7 }, { note: 'Lime', intensity: 6 }],
      middle: [{ note: 'Lavender', intensity: 6 }, { note: 'Sea Notes', intensity: 7 }],
      base: [{ note: 'White Musk', intensity: 5 }, { note: 'Cedar', intensity: 4 }]
    },
    warm: {
      name: 'Warm & Cozy',
      top: [{ note: 'Orange', intensity: 6 }, { note: 'Bergamot', intensity: 5 }],
      middle: [{ note: 'Rose', intensity: 6 }, { note: 'Geranium', intensity: 5 }],
      base: [{ note: 'Vanilla', intensity: 8 }, { note: 'Sandalwood', intensity: 7 }, { note: 'Amber', intensity: 6 }]
    },
    floral: {
      name: 'Floral Garden',
      top: [{ note: 'Bergamot', intensity: 5 }, { note: 'Mandarin', intensity: 6 }],
      middle: [{ note: 'Rose', intensity: 8 }, { note: 'Jasmine', intensity: 7 }, { note: 'Ylang-Ylang', intensity: 6 }],
      base: [{ note: 'Musk', intensity: 5 }, { note: 'Sandalwood', intensity: 4 }]
    },
    spicy: {
      name: 'Spicy & Bold',
      top: [{ note: 'Pepper', intensity: 7 }, { note: 'Bergamot', intensity: 6 }],
      middle: [{ note: 'Cardamom', intensity: 7 }, { note: 'Cinnamon', intensity: 6 }, { note: 'Nutmeg', intensity: 5 }],
      base: [{ note: 'Patchouli', intensity: 7 }, { note: 'Vetiver', intensity: 6 }, { note: 'Amber', intensity: 5 }]
    }
  };

  const addNote = (category: 'top' | 'middle' | 'base', note: string) => {
    const newNote: NoteIntensity = { note, intensity: 5 };
    
    if (category === 'top') {
      if (!topNotes.find(n => n.note === note)) {
        setTopNotes([...topNotes, newNote]);
      }
    } else if (category === 'middle') {
      if (!middleNotes.find(n => n.note === note)) {
        setMiddleNotes([...middleNotes, newNote]);
      }
    } else {
      if (!baseNotes.find(n => n.note === note)) {
        setBaseNotes([...baseNotes, newNote]);
      }
    }
  };

  const removeNote = (category: 'top' | 'middle' | 'base', note: string) => {
    if (category === 'top') {
      setTopNotes(topNotes.filter(n => n.note !== note));
    } else if (category === 'middle') {
      setMiddleNotes(middleNotes.filter(n => n.note !== note));
    } else {
      setBaseNotes(baseNotes.filter(n => n.note !== note));
    }
  };

  const updateIntensity = (category: 'top' | 'middle' | 'base', note: string, intensity: number) => {
    if (category === 'top') {
      setTopNotes(topNotes.map(n => n.note === note ? { ...n, intensity } : n));
    } else if (category === 'middle') {
      setMiddleNotes(middleNotes.map(n => n.note === note ? { ...n, intensity } : n));
    } else {
      setBaseNotes(baseNotes.map(n => n.note === note ? { ...n, intensity } : n));
    }
  };

  const loadPresetProfile = (profileKey: string) => {
    if (profileKey === 'custom') {
      setTopNotes([]);
      setMiddleNotes([]);
      setBaseNotes([]);
      return;
    }

    const profile = presetProfiles[profileKey as keyof typeof presetProfiles];
    if (profile) {
      setTopNotes(profile.top);
      setMiddleNotes(profile.middle);
      setBaseNotes(profile.base);
    }
  };

  const calculateSimilarity = (perfume: Perfume, userNotes: string[], userIntensities: { [key: string]: number }) => {
    const perfumeNotes = [
      ...perfume.notes.top,
      ...perfume.notes.middle,
      ...perfume.notes.base
    ];

    // Find matching notes
    const matchingNotes = userNotes.filter(userNote => 
      perfumeNotes.some(perfumeNote => 
        perfumeNote.toLowerCase().includes(userNote.toLowerCase()) ||
        userNote.toLowerCase().includes(perfumeNote.toLowerCase())
      )
    );

    // Calculate base similarity
    let similarity = 0;
    if (userNotes.length > 0) {
      similarity = (matchingNotes.length / userNotes.length) * 100;
    }

    // Bonus points for exact matches
    const exactMatches = userNotes.filter(userNote => 
      perfumeNotes.some(perfumeNote => 
        perfumeNote.toLowerCase() === userNote.toLowerCase()
      )
    );
    similarity += exactMatches.length * 10;

    // Bonus for high-intensity matching notes
    matchingNotes.forEach(note => {
      const intensity = userIntensities[note] || 5;
      if (intensity >= 7) {
        similarity += 5;
      }
    });

    // Cap at 99%
    return Math.min(99, Math.round(similarity));
  };

  const generateMatchReason = (perfume: Perfume, matchingNotes: string[], similarity: number) => {
    if (similarity >= 80) {
      return `Excellent match! Shares ${matchingNotes.length} key notes including ${matchingNotes.slice(0, 2).join(' and ')}.`;
    } else if (similarity >= 60) {
      return `Good match with ${matchingNotes.length} shared notes. Similar fragrance family and character.`;
    } else if (similarity >= 40) {
      return `Moderate match. Some shared elements that might appeal to your taste profile.`;
    } else {
      return `Interesting alternative with a different but complementary scent profile.`;
    }
  };

  const analyzeProfile = async () => {
    if (topNotes.length === 0 && middleNotes.length === 0 && baseNotes.length === 0) {
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Collect all user notes and intensities
    const allUserNotes = [
      ...topNotes.map(n => n.note),
      ...middleNotes.map(n => n.note),
      ...baseNotes.map(n => n.note)
    ];

    const userIntensities: { [key: string]: number } = {};
    [...topNotes, ...middleNotes, ...baseNotes].forEach(note => {
      userIntensities[note.note] = note.intensity;
    });

    // Calculate matches for all perfumes
    const perfumeMatches: PerfumeMatch[] = mockPerfumes.map(perfume => {
      const perfumeNotes = [
        ...perfume.notes.top,
        ...perfume.notes.middle,
        ...perfume.notes.base
      ];

      const matchingNotes = allUserNotes.filter(userNote => 
        perfumeNotes.some(perfumeNote => 
          perfumeNote.toLowerCase().includes(userNote.toLowerCase()) ||
          userNote.toLowerCase().includes(perfumeNote.toLowerCase())
        )
      );

      const similarity = calculateSimilarity(perfume, allUserNotes, userIntensities);
      const reason = generateMatchReason(perfume, matchingNotes, similarity);

      return {
        perfume,
        similarity,
        matchingNotes,
        reason
      };
    })
    .filter(match => match.similarity > 20) // Only show matches above 20%
    .sort((a, b) => b.similarity - a.similarity) // Sort by similarity
    .slice(0, 6); // Take top 6 matches

    setMatches(perfumeMatches);
    setIsAnalyzing(false);
  };

  const clearProfile = () => {
    setTopNotes([]);
    setMiddleNotes([]);
    setBaseNotes([]);
    setMatches([]);
    setSelectedProfile('custom');
  };

  const totalNotes = topNotes.length + middleNotes.length + baseNotes.length;
  const profileCompleteness = Math.min(100, (totalNotes / 8) * 100);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Palette className="h-5 w-5 text-white" />
            </div>
            <Badge variant="secondary" className="gap-1">
              <Crown className="h-3 w-3" />
              Premium Feature
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Custom Scent Builder</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create your perfect fragrance profile and discover matching perfumes with AI-powered recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preset Profiles */}
            <Card>
              <CardHeader>
                <CardTitle>Start with a Preset</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {Object.entries(presetProfiles).map(([key, profile]) => (
                    <Button
                      key={key}
                      variant={selectedProfile === key ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setSelectedProfile(key as any);
                        loadPresetProfile(key);
                      }}
                    >
                      {profile.name}
                    </Button>
                  ))}
                  <Button
                    variant={selectedProfile === 'custom' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSelectedProfile('custom');
                      loadPresetProfile('custom');
                    }}
                  >
                    Custom
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Note Builder */}
            <div className="space-y-6">
              {/* Top Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Top Notes
                    <Badge variant="outline">{topNotes.length}</Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    The first impression - fresh and bright notes that fade quickly
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {allFragranceNotes.slice(0, 12).map((note) => (
                      <Button
                        key={note}
                        size="sm"
                        variant={topNotes.find(n => n.note === note) ? 'default' : 'outline'}
                        onClick={() => {
                          if (topNotes.find(n => n.note === note)) {
                            removeNote('top', note);
                          } else {
                            addNote('top', note);
                          }
                        }}
                      >
                        {topNotes.find(n => n.note === note) ? (
                          <Minus className="h-3 w-3 mr-1" />
                        ) : (
                          <Plus className="h-3 w-3 mr-1" />
                        )}
                        {note}
                      </Button>
                    ))}
                  </div>

                  {/* Intensity Sliders */}
                  {topNotes.map((noteIntensity) => (
                    <div key={noteIntensity.note} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm">{noteIntensity.note}</Label>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeNote('top', noteIntensity.note)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Slider
                        value={[noteIntensity.intensity]}
                        onValueChange={(value) => updateIntensity('top', noteIntensity.note, value[0])}
                        max={10}
                        min={1}
                        step={1}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Subtle</span>
                        <span>Intensity: {noteIntensity.intensity}</span>
                        <span>Prominent</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Middle Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Middle Notes (Heart)
                    <Badge variant="outline">{middleNotes.length}</Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    The core of the fragrance - floral, fruity, or spicy notes that define the character
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {allFragranceNotes.slice(12, 24).map((note) => (
                      <Button
                        key={note}
                        size="sm"
                        variant={middleNotes.find(n => n.note === note) ? 'default' : 'outline'}
                        onClick={() => {
                          if (middleNotes.find(n => n.note === note)) {
                            removeNote('middle', note);
                          } else {
                            addNote('middle', note);
                          }
                        }}
                      >
                        {middleNotes.find(n => n.note === note) ? (
                          <Minus className="h-3 w-3 mr-1" />
                        ) : (
                          <Plus className="h-3 w-3 mr-1" />
                        )}
                        {note}
                      </Button>
                    ))}
                  </div>

                  {middleNotes.map((noteIntensity) => (
                    <div key={noteIntensity.note} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm">{noteIntensity.note}</Label>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeNote('middle', noteIntensity.note)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Slider
                        value={[noteIntensity.intensity]}
                        onValueChange={(value) => updateIntensity('middle', noteIntensity.note, value[0])}
                        max={10}
                        min={1}
                        step={1}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Subtle</span>
                        <span>Intensity: {noteIntensity.intensity}</span>
                        <span>Prominent</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Base Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Base Notes
                    <Badge variant="outline">{baseNotes.length}</Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    The foundation - warm, rich notes that provide depth and longevity
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {allFragranceNotes.slice(24, 36).map((note) => (
                      <Button
                        key={note}
                        size="sm"
                        variant={baseNotes.find(n => n.note === note) ? 'default' : 'outline'}
                        onClick={() => {
                          if (baseNotes.find(n => n.note === note)) {
                            removeNote('base', note);
                          } else {
                            addNote('base', note);
                          }
                        }}
                      >
                        {baseNotes.find(n => n.note === note) ? (
                          <Minus className="h-3 w-3 mr-1" />
                        ) : (
                          <Plus className="h-3 w-3 mr-1" />
                        )}
                        {note}
                      </Button>
                    ))}
                  </div>

                  {baseNotes.map((noteIntensity) => (
                    <div key={noteIntensity.note} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm">{noteIntensity.note}</Label>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeNote('base', noteIntensity.note)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Slider
                        value={[noteIntensity.intensity]}
                        onValueChange={(value) => updateIntensity('base', noteIntensity.note, value[0])}
                        max={10}
                        min={1}
                        step={1}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Subtle</span>
                        <span>Intensity: {noteIntensity.intensity}</span>
                        <span>Prominent</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Analysis Panel */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Profile Completeness</span>
                    <span>{Math.round(profileCompleteness)}%</span>
                  </div>
                  <Progress value={profileCompleteness} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Top Notes:</span>
                    <span>{topNotes.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Middle Notes:</span>
                    <span>{middleNotes.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Base Notes:</span>
                    <span>{baseNotes.length}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={analyzeProfile}
                    disabled={totalNotes === 0 || isAnalyzing}
                    className="flex-1 gap-2"
                  >
                    {isAnalyzing ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    {isAnalyzing ? 'Analyzing...' : 'Find Matches'}
                  </Button>
                  <Button variant="outline" onClick={clearProfile}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Share className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Current Notes Preview */}
            {totalNotes > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Scent Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topNotes.length > 0 && (
                    <div>
                      <Label className="text-xs text-muted-foreground">TOP NOTES</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {topNotes.map((note) => (
                          <Badge key={note.note} variant="outline" className="text-xs">
                            {note.note} ({note.intensity})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {middleNotes.length > 0 && (
                    <div>
                      <Label className="text-xs text-muted-foreground">MIDDLE NOTES</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {middleNotes.map((note) => (
                          <Badge key={note.note} variant="outline" className="text-xs">
                            {note.note} ({note.intensity})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {baseNotes.length > 0 && (
                    <div>
                      <Label className="text-xs text-muted-foreground">BASE NOTES</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {baseNotes.map((note) => (
                          <Badge key={note.note} variant="outline" className="text-xs">
                            {note.note} ({note.intensity})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* AI Matches */}
        {matches.length > 0 && (
          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">AI-Powered Matches</h2>
              <p className="text-muted-foreground">
                Based on your custom scent profile, here are the closest matching fragrances
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match, index) => (
                <div key={match.perfume.id} className="relative">
                  <Badge 
                    className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    {match.similarity}% Match
                  </Badge>
                  <PerfumeCard perfume={match.perfume} showFullDetails />
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-2">
                      <strong>Matching Notes:</strong> {match.matchingNotes.join(', ') || 'Similar fragrance family'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <strong>AI Analysis:</strong> {match.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No matches message */}
        {!isAnalyzing && matches.length === 0 && totalNotes > 0 && (
          <div className="mt-12 text-center py-12">
            <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ready to Find Matches?</h3>
            <p className="text-muted-foreground mb-4">
              Click "Find Matches" to discover fragrances that match your custom scent profile
            </p>
            <Button onClick={analyzeProfile} className="gap-2">
              <Sparkles className="h-4 w-4" />
              Find Matches
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}