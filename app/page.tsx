"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Sparkles, 
  Heart, 
  Users, 
  ShoppingBag, 
  Zap,
  Star,
  TrendingUp,
  ChevronRight,
  Brain,
  Palette,
  Shield,
  Award
} from 'lucide-react';
import PerfumeCard from '@/components/perfume-card';
import { mockPerfumes } from '@/data/mockData';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const featuredPerfumes = mockPerfumes.slice(0, 4);
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fragrance Enthusiast",
      content: "ScentAI helped me discover my signature scent! The AI recommendations were spot-on.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Perfume Collector",
      content: "The marketplace feature is amazing. I've found rare fragrances I've been hunting for years.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Beauty Blogger",
      content: "The scent builder is revolutionary. I created my perfect custom fragrance profile in minutes.",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-indigo-950/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-sm px-4 py-1">
                AI-Powered Fragrance Discovery
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Discover Your Perfect Scent with AI
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Build custom fragrance profiles, find perfect matches, and connect with a community of scent enthusiasts
              </p>
            </div>

            {/* Search CTA */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by notes, mood, or occasion (e.g., 'vanilla sandalwood romantic')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-32 py-4 text-lg rounded-full border-2"
                />
                <Button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/scent-builder">
                <Button variant="outline" className="gap-2 rounded-full">
                  <Palette className="h-4 w-4" />
                  Build Custom Scent
                </Button>
              </Link>
              <Link href="/mood-recommendations">
                <Button variant="outline" className="gap-2 rounded-full">
                  <Brain className="h-4 w-4" />
                  Mood Recommendations
                </Button>
              </Link>
              <Link href="/deals">
                <Button variant="outline" className="gap-2 rounded-full">
                  <TrendingUp className="h-4 w-4" />
                  Best Deals
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-600">10K+</div>
                <div className="text-sm text-muted-foreground">Fragrances</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-pink-600">50K+</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-indigo-600">25K+</div>
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-orange-600">99%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sm px-4 py-1">
              Powerful Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything You Need for Fragrance Discovery
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From AI-powered recommendations to community marketplace - we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader className="p-0 pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Smart Search</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <p className="text-muted-foreground">
                  Search by notes, mood, occasion, or even describe what you're looking for in natural language.
                </p>
                <Link href="/search">
                  <Button variant="outline" size="sm" className="gap-2">
                    Try Search <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader className="p-0 pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Custom Scent Builder
                  <Badge variant="secondary" className="text-xs">Premium</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <p className="text-muted-foreground">
                  Build your perfect fragrance profile with our interactive tool and get AI-powered matches.
                </p>
                <Link href="/scent-builder">
                  <Button variant="outline" size="sm" className="gap-2">
                    Build Scent <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader className="p-0 pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Mood Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <p className="text-muted-foreground">
                  Get personalized fragrance recommendations based on your mood, setting, and preferences.
                </p>
                <Link href="/mood-recommendations">
                  <Button variant="outline" size="sm" className="gap-2">
                    Get Recommendations <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader className="p-0 pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Community Reviews</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <p className="text-muted-foreground">
                  Read detailed reviews from our community and share your own experiences with AI analysis.
                </p>
                <Link href="/reviews">
                  <Button variant="outline" size="sm" className="gap-2">
                    Browse Reviews <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader className="p-0 pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-4">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  P2P Marketplace
                  <Badge variant="secondary" className="text-xs">Premium</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <p className="text-muted-foreground">
                  Buy and sell rare fragrances with fellow collectors in our secure marketplace.
                </p>
                <Link href="/marketplace">
                  <Button variant="outline" size="sm" className="gap-2">
                    Browse Marketplace <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader className="p-0 pb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Deal Finder
                  <Badge variant="secondary" className="text-xs">Premium</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <p className="text-muted-foreground">
                  AI-powered deal finder that scans the web for the best fragrance discounts and coupon codes.
                </p>
                <Link href="/deals">
                  <Button variant="outline" size="sm" className="gap-2">
                    Find Deals <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Perfumes */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Trending Fragrances</h2>
              <p className="text-muted-foreground">Most popular perfumes this month</p>
            </div>
            <Link href="/search">
              <Button variant="outline" className="gap-2">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPerfumes.map((perfume) => (
              <PerfumeCard key={perfume.id} perfume={perfume} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sm px-4 py-1">
              What Users Say
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Loved by Fragrance Enthusiasts
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center">
              <CardContent className="space-y-6">
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl font-medium">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div>
                  <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
                  <div className="text-muted-foreground">{testimonials[currentTestimonial].role}</div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Find Your Signature Scent?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of fragrance lovers who trust ScentAI for their scent discovery journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/scent-builder">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Sparkles className="h-5 w-5" />
                  Start Building Your Scent
                </Button>
              </Link>
              <Link href="/search">
                <Button size="lg" variant="outline" className="gap-2 text-white border-white hover:bg-white hover:text-purple-600">
                  <Search className="h-5 w-5" />
                  Explore Perfumes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}