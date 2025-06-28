"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Store, 
  Crown, 
  Lock,
  Sparkles,
  ArrowRight,
  Check,
  Search,
  Filter,
  Star,
  MapPin,
  Shield,
  TrendingUp
} from 'lucide-react';

export default function MarketplacePage() {
  const [isPremium] = useState(false); // This would come from user context

  if (!isPremium) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Store className="h-5 w-5 text-white" />
              </div>
              <Badge variant="secondary" className="gap-1">
                <Crown className="h-3 w-3" />
                Premium Feature
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">P2P Marketplace</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Buy and sell rare fragrances directly with verified collectors and enthusiasts
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
                
                <h2 className="text-3xl font-bold mb-4">Unlock P2P Marketplace</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Access our exclusive peer-to-peer marketplace where fragrance collectors buy, sell, and trade 
                  rare and discontinued perfumes with verified community members.
                </p>

                {/* Features Preview */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Verified Sellers</h3>
                    <p className="text-sm text-muted-foreground">All sellers are verified with ratings and reviews</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Rare Finds</h3>
                    <p className="text-sm text-muted-foreground">Discover discontinued and hard-to-find fragrances</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-3">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Best Prices</h3>
                    <p className="text-sm text-muted-foreground">Competitive prices from fellow collectors</p>
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
                        <span>Access to P2P marketplace</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Verified seller protection</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Custom scent builder</span>
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
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search marketplace listings..."
                    className="pl-10"
                    disabled
                  />
                </div>
                <Button variant="outline" className="gap-2" disabled>
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 bg-muted rounded w-16"></div>
                          <div className="h-3 bg-muted rounded w-20"></div>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <div className="h-3 bg-muted rounded w-24"></div>
                        </div>
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

  // If user is premium, show the actual marketplace
  // (This would be the existing marketplace code)
  return <div>Premium Marketplace Content</div>;
}