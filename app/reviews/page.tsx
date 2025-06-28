"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Crown, 
  Lock,
  Sparkles,
  ArrowRight,
  Check,
  Search,
  Filter,
  Star,
  Users,
  TrendingUp,
  Award
} from 'lucide-react';

export default function ReviewsPage() {
  const [isPremium] = useState(false); // This would come from user context

  if (!isPremium) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <Badge variant="secondary" className="gap-1">
                <Crown className="h-3 w-3" />
                Premium Feature
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Reviews & Community</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Read detailed reviews, share your experiences, and connect with fellow fragrance enthusiasts
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
                
                <h2 className="text-3xl font-bold mb-4">Unlock Premium Reviews</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Access our exclusive community of verified fragrance enthusiasts. Read in-depth reviews, 
                  share your experiences, and discover hidden gems through trusted recommendations.
                </p>

                {/* Features Preview */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Verified Community</h3>
                    <p className="text-sm text-muted-foreground">Connect with verified fragrance enthusiasts</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-3">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Expert Reviews</h3>
                    <p className="text-sm text-muted-foreground">Detailed reviews from certified perfumers</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Trending Insights</h3>
                    <p className="text-sm text-muted-foreground">Discover what's popular in the community</p>
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
                        <span>Access to premium reviews</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Verified community access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Custom scent builder</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>AI deal finder</span>
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
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search reviews and ratings..."
                    className="pl-10"
                    disabled
                  />
                </div>
                <Button variant="outline" className="gap-2" disabled>
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-muted rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-muted rounded w-24 mb-1"></div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className="h-3 w-3 text-muted-foreground" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-full"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is premium, show the actual reviews page
  return <div>Premium Reviews Content</div>;
}