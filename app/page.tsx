"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  Sparkles, 
  Brain,
  Palette,
  Zap,
  Heart,
  TrendingUp,
  Users,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const quickDiscoveryOptions = [
    {
      title: "Smells Like...",
      description: "Describe familiar scents",
      icon: Brain,
      href: "/smells-like",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Mood Match",
      description: "Find scents for your vibe",
      icon: Heart,
      href: "/mood-match",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Scent Discovery",
      description: "Swipe through fragrances",
      icon: Zap,
      href: "/discover",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Community Boards",
      description: "Explore scent collections",
      icon: Users,
      href: "/community",
      color: "from-orange-500 to-red-500"
    }
  ];

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
                Find Your Scent DNA
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Discover fragrances that match your unique chemistry, mood, and lifestyle with AI-powered recommendations
              </p>
            </div>

            {/* Search CTA */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Try 'fresh rain', 'cozy vanilla', or 'confident and bold'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-32 py-4 text-lg rounded-full border-2"
                />
                <Button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6"
                >
                  Discover
                </Button>
              </div>
            </form>

            {/* Quick Discovery Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {quickDiscoveryOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <Link key={index} href={option.href}>
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <div className={`h-12 w-12 rounded-lg bg-gradient-to-r ${option.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-1">{option.title}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Discover Scents Like Never Before
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI understands your unique scent preferences and matches you with fragrances you'll love
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-8">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Smart Matching</h3>
              <p className="text-muted-foreground">
                AI analyzes your preferences, skin chemistry, and lifestyle to recommend perfect matches
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Scent DNA Mapping</h3>
              <p className="text-muted-foreground">
                Visualize your fragrance genome and discover scents in your unique scent family
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Community Insights</h3>
              <p className="text-muted-foreground">
                Learn from verified reviewers and discover trending scents in the community
              </p>
            </Card>
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
              Join thousands of fragrance lovers discovering their perfect scents with AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/discover">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Sparkles className="h-5 w-5" />
                  Start Discovering
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/smells-like">
                <Button size="lg" variant="outline" className="gap-2 text-white border-white hover:bg-white hover:text-purple-600">
                  <Search className="h-5 w-5" />
                  Try "Smells Like"
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}