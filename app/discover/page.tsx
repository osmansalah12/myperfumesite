"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  X, 
  Star, 
  Sparkles,
  RotateCcw,
  Info,
  Clock,
  Zap
} from 'lucide-react';
import { mockPerfumes } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function DiscoverPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedPerfumes, setLikedPerfumes] = useState<string[]>([]);
  const [passedPerfumes, setPassedPerfumes] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const currentPerfume = mockPerfumes[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSwipeDirection(direction);
    
    if (direction === 'right') {
      setLikedPerfumes(prev => [...prev, currentPerfume.id]);
    } else {
      setPassedPerfumes(prev => [...prev, currentPerfume.id]);
    }

    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % mockPerfumes.length);
      setIsAnimating(false);
      setSwipeDirection(null);
    }, 300);
  };

  const handleUndo = () => {
    if (currentIndex === 0) return;
    
    const previousIndex = currentIndex - 1;
    const previousPerfume = mockPerfumes[previousIndex];
    
    setLikedPerfumes(prev => prev.filter(id => id !== previousPerfume.id));
    setPassedPerfumes(prev => prev.filter(id => id !== previousPerfume.id));
    setCurrentIndex(previousIndex);
  };

  if (!currentPerfume) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">You've discovered all scents!</h2>
          <p className="text-muted-foreground mb-4">Check out your liked fragrances or start over</p>
          <Button onClick={() => setCurrentIndex(0)}>
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-indigo-950/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Your Next Favorite</h1>
          <p className="text-muted-foreground">Swipe right to like, left to pass</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="secondary">{likedPerfumes.length} Liked</Badge>
            <Badge variant="outline">{currentIndex + 1} of {mockPerfumes.length}</Badge>
          </div>
        </div>

        {/* Card Stack */}
        <div className="max-w-md mx-auto relative">
          <div className="relative h-[600px]">
            {/* Current Card */}
            <Card className={cn(
              "absolute inset-0 overflow-hidden transition-all duration-300 cursor-grab active:cursor-grabbing",
              isAnimating && swipeDirection === 'right' && "transform translate-x-full rotate-12 opacity-0",
              isAnimating && swipeDirection === 'left' && "transform -translate-x-full -rotate-12 opacity-0"
            )}>
              <div className="relative h-80 overflow-hidden">
                <img
                  src={currentPerfume.image}
                  alt={currentPerfume.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="text-2xl font-bold mb-1">{currentPerfume.name}</h2>
                  <p className="text-lg opacity-90">{currentPerfume.brand}</p>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                {/* Rating and Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{currentPerfume.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({currentPerfume.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold">${currentPerfume.price}</span>
                    {currentPerfume.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        ${currentPerfume.originalPrice}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm">{currentPerfume.description}</p>

                {/* Top Notes */}
                <div>
                  <h4 className="font-medium mb-2">Key Notes</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentPerfume.notes.top.slice(0, 4).map((note, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {note}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Performance */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Longevity</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-2 h-1 rounded-full",
                              i < currentPerfume.longevity / 2 ? "bg-primary" : "bg-muted"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Projection</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-2 h-1 rounded-full",
                              i < currentPerfume.projection / 2 ? "bg-primary" : "bg-muted"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Occasions */}
                <div>
                  <h4 className="font-medium mb-2">Perfect For</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentPerfume.occasions.slice(0, 3).map((occasion, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {occasion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Card Preview */}
            {mockPerfumes[currentIndex + 1] && (
              <Card className="absolute inset-0 -z-10 scale-95 opacity-50">
                <div className="h-80 overflow-hidden">
                  <img
                    src={mockPerfumes[currentIndex + 1].image}
                    alt={mockPerfumes[currentIndex + 1].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <Button
              size="lg"
              variant="outline"
              className="h-16 w-16 rounded-full border-2 border-red-200 hover:border-red-300 hover:bg-red-50"
              onClick={() => handleSwipe('left')}
              disabled={isAnimating}
            >
              <X className="h-6 w-6 text-red-500" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 w-12 rounded-full"
              onClick={handleUndo}
              disabled={currentIndex === 0}
            >
              <RotateCcw className="h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 w-12 rounded-full"
            >
              <Info className="h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-16 w-16 rounded-full border-2 border-green-200 hover:border-green-300 hover:bg-green-50"
              onClick={() => handleSwipe('right')}
              disabled={isAnimating}
            >
              <Heart className="h-6 w-6 text-green-500" />
            </Button>
          </div>

          {/* Instructions */}
          <div className="text-center mt-6 text-sm text-muted-foreground">
            <p>Tap the buttons or swipe the card to discover your next favorite scent</p>
          </div>
        </div>
      </div>
    </div>
  );
}