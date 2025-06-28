"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Sparkles, 
  ChevronRight,
  Brain,
  Palette
} from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

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

            {/* Main Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <Link href="/scent-builder" className="flex-1">
                <Button size="lg" className="w-full gap-2 rounded-full">
                  <Palette className="h-5 w-5" />
                  Build Custom Scent
                </Button>
              </Link>
              <Link href="/mood-recommendations" className="flex-1">
                <Button size="lg" variant="outline" className="w-full gap-2 rounded-full">
                  <Brain className="h-5 w-5" />
                  Mood Recommendations
                </Button>
              </Link>
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
              Join thousands of fragrance lovers who trust scent.co for their scent discovery journey
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