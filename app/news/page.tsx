"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Newspaper, 
  Search, 
  Calendar, 
  User, 
  TrendingUp,
  Clock,
  ExternalLink,
  Filter
} from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  readTime: number;
  image: string;
  tags: string[];
  trending: boolean;
}

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const newsArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'Chanel Unveils New Limited Edition Collection for 2024',
      excerpt: 'The luxury house announces an exclusive fragrance collection inspired by Gabrielle Chanel\'s travels.',
      content: 'Chanel has announced their most ambitious fragrance collection to date...',
      author: 'Sarah Mitchell',
      publishedAt: '2024-01-25',
      category: 'Luxury',
      readTime: 5,
      image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
      tags: ['Chanel', 'Limited Edition', 'Luxury'],
      trending: true
    },
    {
      id: '2',
      title: 'The Rise of Sustainable Perfumery: Eco-Friendly Fragrances',
      excerpt: 'How the fragrance industry is embracing sustainability with natural ingredients and eco-conscious packaging.',
      content: 'The perfume industry is undergoing a green revolution...',
      author: 'Michael Chen',
      publishedAt: '2024-01-24',
      category: 'Sustainability',
      readTime: 7,
      image: 'https://images.pexels.com/photos/1889946/pexels-photo-1889946.jpeg',
      tags: ['Sustainability', 'Natural', 'Eco-Friendly'],
      trending: false
    },
    {
      id: '3',
      title: 'Niche Perfume Houses Gaining Mainstream Recognition',
      excerpt: 'Independent fragrance creators are challenging traditional luxury brands with innovative scents.',
      content: 'The niche perfume market has exploded in recent years...',
      author: 'Emma Rodriguez',
      publishedAt: '2024-01-23',
      category: 'Industry',
      readTime: 6,
      image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
      tags: ['Niche', 'Independent', 'Innovation'],
      trending: true
    },
    {
      id: '4',
      title: 'AI Technology Revolutionizing Fragrance Creation',
      excerpt: 'Machine learning algorithms are helping perfumers create new scent combinations never before possible.',
      content: 'Artificial intelligence is transforming how fragrances are developed...',
      author: 'David Park',
      publishedAt: '2024-01-22',
      category: 'Technology',
      readTime: 8,
      image: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg',
      tags: ['AI', 'Technology', 'Innovation'],
      trending: false
    },
    {
      id: '5',
      title: 'Celebrity Fragrance Launches: Hits and Misses of 2024',
      excerpt: 'A comprehensive review of this year\'s celebrity perfume releases and their market performance.',
      content: 'Celebrity fragrances continue to be a major market force...',
      author: 'Lisa Thompson',
      publishedAt: '2024-01-21',
      category: 'Celebrity',
      readTime: 4,
      image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
      tags: ['Celebrity', 'Launches', 'Market'],
      trending: false
    },
    {
      id: '6',
      title: 'The Science Behind Fragrance Longevity',
      excerpt: 'Understanding the molecular chemistry that determines how long your perfume lasts on skin.',
      content: 'The longevity of a fragrance depends on several scientific factors...',
      author: 'Dr. James Wilson',
      publishedAt: '2024-01-20',
      category: 'Science',
      readTime: 10,
      image: 'https://images.pexels.com/photos/1889946/pexels-photo-1889946.jpeg',
      tags: ['Science', 'Chemistry', 'Education'],
      trending: true
    }
  ];

  const categories = ['all', 'Luxury', 'Sustainability', 'Industry', 'Technology', 'Celebrity', 'Science'];

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const trendingArticles = newsArticles.filter(article => article.trending);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <Newspaper className="h-5 w-5 text-white" />
            </div>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              Latest Updates
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Perfume News & Insights</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest trends, launches, and insights from the fragrance world
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search articles, tags, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category === 'all' ? 'All' : category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Featured Article */}
            {filteredArticles.length > 0 && (
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={filteredArticles[0].image}
                      alt={filteredArticles[0].title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{filteredArticles[0].category}</Badge>
                      {filteredArticles[0].trending && (
                        <Badge className="bg-red-500 hover:bg-red-600">Trending</Badge>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{filteredArticles[0].title}</h2>
                    <p className="text-muted-foreground mb-4">{filteredArticles[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {filteredArticles[0].author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(filteredArticles[0].publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {filteredArticles[0].readTime} min read
                      </div>
                    </div>
                    <Button className="gap-2">
                      Read Full Article
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Article Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredArticles.slice(1).map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{article.category}</Badge>
                      {article.trending && (
                        <Badge className="bg-red-500 hover:bg-red-600 text-xs">Trending</Badge>
                      )}
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime} min
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      Read More
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or category filter
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Now
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingArticles.slice(0, 3).map((article) => (
                  <div key={article.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-semibold text-sm mb-2 line-clamp-2">{article.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Get the latest perfume news and insights delivered to your inbox.
                </p>
                <div className="space-y-2">
                  <Input placeholder="Enter your email" type="email" />
                  <Button className="w-full">Subscribe</Button>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['Luxury', 'Niche', 'Celebrity', 'Sustainability', 'AI', 'Innovation', 'Reviews', 'Launches'].map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-accent">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}