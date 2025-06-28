"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Crown, 
  Lock,
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';

export default function ScentBuilderPage() {
  const [isPremium] = useState(false); // This would come from user context

  if (!isPremium) {
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

          <div className="max-w-4xl mx-auto">
            {/* Premium Upgrade Card */}
            <Card className="border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold mb-4">Unlock Custom Scent Builder</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Create unlimited custom fragrance profiles with our advanced AI-powered scent builder. 
                  Get personalized matches and discover your perfect signature scent.
                </p>

                {/* Features Preview */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-3">
                      <Palette className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Custom Profiles</h3>
                    <p className="text-sm text-muted-foreground">Build unlimited scent profiles with detailed note selection</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">AI Matching</h3>
                    <p className="text-sm text-muted-foreground">Get AI-powered fragrance recommendations based on your profile</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-3">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Perfect Matches</h3>
                    <p className="text-sm text-muted-foreground">Discover fragrances with similarity scores and detailed analysis</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 mb-8 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      $9.99
                      <span className="text-lg font-normal text-muted-foreground">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Or $79.99/year (save 33%)
                    </p>
                    <div className="space-y-2 text-sm text-left">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Unlimited custom scent profiles</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>AI-powered fragrance matching</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Access to P2P marketplace</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Advanced deal finder</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/premium">
                    <Button size="lg" className="gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black">
                      <Crown className="h-5 w-5" />
                      Upgrade to Premium
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/premium">
                    <Button size="lg" variant="outline" className="gap-2">
                      Learn More About Premium
                    </Button>
                  </Link>
                </div>

                <p className="text-xs text-muted-foreground mt-6">
                  7-day free trial • Cancel anytime • 30-day money back guarantee
                </p>
              </CardContent>
            </Card>

            {/* Preview of what they're missing */}
            <div className="mt-12 opacity-50 pointer-events-none">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Scent Builder Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold">Top Notes</h3>
                      <div className="space-y-2">
                        <div className="h-8 bg-muted rounded"></div>
                        <div className="h-8 bg-muted rounded"></div>
                        <div className="h-8 bg-muted rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold">Middle Notes</h3>
                      <div className="space-y-2">
                        <div className="h-8 bg-muted rounded"></div>
                        <div className="h-8 bg-muted rounded"></div>
                        <div className="h-8 bg-muted rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold">Base Notes</h3>
                      <div className="space-y-2">
                        <div className="h-8 bg-muted rounded"></div>
                        <div className="h-8 bg-muted rounded"></div>
                        <div className="h-8 bg-muted rounded"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is premium, show the actual scent builder
  // (This would be the existing scent builder code)
  return <div>Premium Scent Builder Content</div>;
}