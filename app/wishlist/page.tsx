"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Heart, 
  Search, 
  Filter, 
  Share, 
  ShoppingCart,
  Trash2,
  Star,
  TrendingUp,
  Bell
} from 'lucide-react';
import PerfumeCard from '@/components/perfume-card';
import { mockPerfumes } from '@/data/mockData';

export default function WishlistPage() {
  const [wishlistItems] = useState(mockPerfumes.slice(0, 4));
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('added');

  const filteredItems = wishlistItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">
              {wishlistItems.length} fragrances saved for later
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" className="gap-2">
              <Share className="h-4 w-4" />
              Share Wishlist
            </Button>
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              Price Alerts
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search your wishlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Wishlist Items */}
        {filteredItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((perfume) => (
              <div key={perfume.id} className="relative">
                <PerfumeCard perfume={perfume} showFullDetails />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-4">
              Start adding fragrances you love to keep track of them
            </p>
            <Button>Browse Fragrances</Button>
          </div>
        )}
      </div>
    </div>
  );
}