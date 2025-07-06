"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  TrendingUp, 
  Heart, 
  MessageCircle,
  Search,
  Plus,
  Star,
  Eye,
  Bookmark
} from 'lucide-react';
import PerfumeCard from '@/components/perfume-card';
import { mockPerfumes } from '@/data/mockData';

interface ScentBoard {
  id: string;
  title: string;
  description: string;
  creator: string;
  creatorAvatar: string;
  perfumes: string[];
  likes: number;
  views: number;
  isPublic: boolean;
  tags: string[];
  createdAt: string;
}

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trending');

  const scentBoards: ScentBoard[] = [
    {
      id: '1',
      title: 'Cozy Winter Evenings',
      description: 'Warm, comforting scents perfect for cold nights by the fireplace',
      creator: 'ScentLover92',
      creatorAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      perfumes: ['2', '4', '6'],
      likes: 234,
      views: 1847,
      isPublic: true,
      tags: ['Winter', 'Cozy', 'Warm', 'Evening'],
      createdAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Fresh Summer Vibes',
      description: 'Light, airy fragrances that capture the essence of summer',
      creator: 'FragranceExpert',
      creatorAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      perfumes: ['1', '3', '5'],
      likes: 189,
      views: 1203,
      isPublic: true,
      tags: ['Summer', 'Fresh', 'Citrus', 'Light'],
      createdAt: '2024-01-18'
    },
    {
      id: '3',
      title: 'Date Night Essentials',
      description: 'Seductive and romantic fragrances for special occasions',
      creator: 'PerfumeCollector',
      creatorAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      perfumes: ['2', '4'],
      likes: 156,
      views: 892,
      isPublic: true,
      tags: ['Romantic', 'Evening', 'Seductive', 'Special'],
      createdAt: '2024-01-15'
    }
  ];

  const trendingPerfumes = mockPerfumes.slice(0, 4);

  const filteredBoards = scentBoards.filter(board =>
    board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    board.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    board.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              Community Driven
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Scent Community</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover curated collections, share your favorites, and connect with fellow fragrance enthusiasts
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <TabsList className="grid w-full md:w-auto grid-cols-3">
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="boards">Scent Boards</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search community..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Board
                </Button>
              </div>
            </div>

            <TabsContent value="trending" className="space-y-8">
              {/* Trending Fragrances */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Trending This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trendingPerfumes.map((perfume) => (
                      <PerfumeCard key={perfume.id} perfume={perfume} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Boards */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Scent Boards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scentBoards.slice(0, 3).map((board) => (
                      <Card key={board.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <img
                              src={board.creatorAvatar}
                              alt={board.creator}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <h4 className="font-semibold text-sm">{board.title}</h4>
                              <p className="text-xs text-muted-foreground">by {board.creator}</p>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {board.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {board.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                {board.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {board.views}
                              </span>
                            </div>
                            <span>{board.perfumes.length} scents</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="boards" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBoards.map((board) => (
                  <Card key={board.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={board.creatorAvatar}
                            alt={board.creator}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <h3 className="font-semibold">{board.title}</h3>
                            <p className="text-sm text-muted-foreground">by {board.creator}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {board.description}
                      </p>
                      
                      {/* Preview of perfumes in board */}
                      <div className="flex -space-x-2 mb-4">
                        {board.perfumes.slice(0, 3).map((perfumeId, index) => {
                          const perfume = mockPerfumes.find(p => p.id === perfumeId);
                          return perfume ? (
                            <img
                              key={index}
                              src={perfume.image}
                              alt={perfume.name}
                              className="w-8 h-8 rounded-full border-2 border-background object-cover"
                            />
                          ) : null;
                        })}
                        {board.perfumes.length > 3 && (
                          <div className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
                            +{board.perfumes.length - 3}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {board.tags.slice(0, 4).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {board.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {board.views}
                          </span>
                        </div>
                        <span>{board.perfumes.length} scents</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Community Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b last:border-b-0 pb-6 last:pb-0">
                      <div className="flex items-start gap-4">
                        <img
                          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                          alt="Reviewer"
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">FragranceLover</span>
                            <div className="flex">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">2 days ago</span>
                          </div>
                          <h4 className="font-medium mb-1">Amazing longevity and projection</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            This fragrance exceeded my expectations. The opening is fresh and invigorating, 
                            and it develops beautifully throughout the day. Perfect for office wear.
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button className="flex items-center gap-1 hover:text-foreground">
                              <Heart className="h-3 w-3" />
                              12
                            </button>
                            <button className="flex items-center gap-1 hover:text-foreground">
                              <MessageCircle className="h-3 w-3" />
                              3
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}