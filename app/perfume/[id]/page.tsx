"use client";

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Star, 
  Clock, 
  Zap,
  ShoppingCart,
  Share,
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  ThumbsUp,
  MessageCircle,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { mockPerfumes, mockReviews } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface PerfumeDetailPageProps {
  params: {
    id: string;
  };
}

export default function PerfumeDetailPage({ params }: PerfumeDetailPageProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedSize, setSelectedSize] = useState('100ml');
  
  const perfume = mockPerfumes.find(p => p.id === params.id);
  
  if (!perfume) {
    notFound();
  }

  const perfumeReviews = mockReviews.filter(r => r.perfumeId === params.id);
  
  const sizes = [
    { size: '30ml', price: Math.round(perfume.price * 0.6) },
    { size: '50ml', price: Math.round(perfume.price * 0.8) },
    { size: '100ml', price: perfume.price },
    { size: '200ml', price: Math.round(perfume.price * 1.6) }
  ];

  const selectedPrice = sizes.find(s => s.size === selectedSize)?.price || perfume.price;
  const discountPercentage = perfume.originalPrice 
    ? Math.round(((perfume.originalPrice - perfume.price) / perfume.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/search">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={perfume.image}
                alt={perfume.name}
                fill
                className="object-cover"
              />
              {discountPercentage > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                  -{discountPercentage}% OFF
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-lg text-muted-foreground font-medium">{perfume.brand}</p>
              <h1 className="text-4xl font-bold mb-2">{perfume.name}</h1>
              <p className="text-muted-foreground">{perfume.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.floor(perfume.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="font-semibold">{perfume.rating}</span>
                <span className="text-muted-foreground">({perfume.reviewCount} reviews)</span>
              </div>
              <Badge variant="outline">{perfume.concentration}</Badge>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">${selectedPrice}</span>
                {perfume.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${Math.round(perfume.originalPrice * (selectedPrice / perfume.price))}
                  </span>
                )}
              </div>
              {discountPercentage > 0 && (
                <p className="text-green-600 font-medium">
                  Save ${Math.round((perfume.originalPrice! - perfume.price) * (selectedPrice / perfume.price))}
                </p>
              )}
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold">Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size.size}
                    variant={selectedSize === size.size ? 'default' : 'outline'}
                    className="flex flex-col h-auto py-3"
                    onClick={() => setSelectedSize(size.size)}
                  >
                    <span className="text-sm font-medium">{size.size}</span>
                    <span className="text-xs">${size.price}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button size="lg" className="flex-1 gap-2">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsFavorited(!isFavorited)}
                className="gap-2"
              >
                <Heart className={cn(
                  "h-5 w-5",
                  isFavorited && "text-red-500 fill-red-500"
                )} />
                {isFavorited ? 'Saved' : 'Save'}
              </Button>
              <Button size="lg" variant="outline">
                <Share className="h-5 w-5" />
              </Button>
            </div>

            {/* Performance Indicators */}
            <div className="grid grid-cols-2 gap-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Longevity</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-3 h-2 rounded-full",
                          i < perfume.longevity / 2 ? "bg-primary" : "bg-muted"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{perfume.longevity}/10</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Projection</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-3 h-2 rounded-full",
                          i < perfume.projection / 2 ? "bg-primary" : "bg-muted"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{perfume.projection}/10</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="mt-12">
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="notes">Fragrance Notes</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({perfumeReviews.length})</TabsTrigger>
              <TabsTrigger value="similar">Similar Fragrances</TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="mt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Notes</CardTitle>
                    <p className="text-sm text-muted-foreground">First impression (0-15 minutes)</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {perfume.notes.top.map((note, index) => (
                        <Badge key={index} variant="secondary">
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Middle Notes</CardTitle>
                    <p className="text-sm text-muted-foreground">Heart of the fragrance (15 minutes - 4 hours)</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {perfume.notes.middle.map((note, index) => (
                        <Badge key={index} variant="secondary">
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Base Notes</CardTitle>
                    <p className="text-sm text-muted-foreground">Foundation (4+ hours)</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {perfume.notes.base.map((note, index) => (
                        <Badge key={index} variant="secondary">
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Brand</span>
                      <span className="font-medium">{perfume.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Concentration</span>
                      <span className="font-medium">{perfume.concentration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Longevity</span>
                      <span className="font-medium">{perfume.longevity}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projection</span>
                      <span className="font-medium">{perfume.projection}/10</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Best For</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Seasons</h4>
                      <div className="flex flex-wrap gap-2">
                        {perfume.seasonality.map((season, index) => (
                          <Badge key={index} variant="outline">
                            {season}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Occasions</h4>
                      <div className="flex flex-wrap gap-2">
                        {perfume.occasions.map((occasion, index) => (
                          <Badge key={index} variant="outline">
                            {occasion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Mood</h4>
                      <div className="flex flex-wrap gap-2">
                        {perfume.mood.map((mood, index) => (
                          <Badge key={index} variant="outline">
                            {mood}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {perfumeReviews.length > 0 ? (
                  perfumeReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                              <User className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{review.userName}</span>
                                {review.verified && (
                                  <Badge variant="secondary" className="text-xs">
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {new Date(review.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <h4 className="font-semibold mb-2">{review.title}</h4>
                        <p className="text-muted-foreground mb-4">{review.content}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex gap-4 text-sm">
                            <span>Longevity: {review.longevity}/10</span>
                            <span>Projection: {review.projection}/10</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              {review.helpful}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageCircle className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">No reviews yet</h3>
                    <p className="text-muted-foreground">Be the first to review this fragrance!</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="similar" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPerfumes
                  .filter(p => p.id !== perfume.id && p.brand === perfume.brand)
                  .slice(0, 3)
                  .map((similarPerfume) => (
                    <Card key={similarPerfume.id} className="hover:shadow-lg transition-shadow">
                      <div className="aspect-square relative overflow-hidden rounded-t-lg">
                        <Image
                          src={similarPerfume.image}
                          alt={similarPerfume.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">{similarPerfume.brand}</p>
                        <h3 className="font-semibold mb-2">{similarPerfume.name}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-3 w-3",
                                  i < Math.floor(similarPerfume.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-sm">{similarPerfume.rating}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">${similarPerfume.price}</span>
                          <Link href={`/perfume/${similarPerfume.id}`}>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}