"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Star, 
  ShoppingCart, 
  Clock, 
  Zap,
  Info
} from 'lucide-react';
import { Perfume } from '@/types';
import { cn } from '@/lib/utils';

interface PerfumeCardProps {
  perfume: Perfume;
  className?: string;
  showFullDetails?: boolean;
}

export default function PerfumeCard({ 
  perfume, 
  className,
  showFullDetails = false 
}: PerfumeCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const discountPercentage = perfume.originalPrice 
    ? Math.round(((perfume.originalPrice - perfume.price) / perfume.originalPrice) * 100)
    : 0;

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
      className
    )}>
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={perfume.image}
          alt={perfume.name}
          fill
          className={cn(
            "object-cover transition-all duration-300 group-hover:scale-105",
            imageLoading && "blur-sm"
          )}
          onLoad={() => setImageLoading(false)}
        />
        
        {/* Overlay with quick actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
          <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8"
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Heart className={cn(
                "h-4 w-4",
                isFavorited && "text-red-500 fill-red-500"
              )} />
            </Button>
            <Link href={`/perfume/${perfume.id}`}>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Discount badge */}
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            -{discountPercentage}%
          </Badge>
        )}

        {/* Premium badge for high-end fragrances */}
        {perfume.price > 150 && (
          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
            Premium
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          {/* Brand and Name */}
          <div>
            <p className="text-sm text-muted-foreground font-medium">{perfume.brand}</p>
            <Link href={`/perfume/${perfume.id}`}>
              <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                {perfume.name}
              </h3>
            </Link>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium">{perfume.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({perfume.reviewCount} reviews)
            </span>
            <Badge variant="outline" className="text-xs">
              {perfume.concentration}
            </Badge>
          </div>

          {/* Notes preview */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">Top Notes:</p>
            <div className="flex flex-wrap gap-1">
              {perfume.notes.top.slice(0, 3).map((note, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {note}
                </Badge>
              ))}
              {perfume.notes.top.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{perfume.notes.top.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {showFullDetails && (
            <>
              {/* Performance indicators */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Longevity</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "w-2 h-1 rounded-full",
                            i < perfume.longevity / 2 ? "bg-primary" : "bg-muted"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Projection</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "w-2 h-1 rounded-full",
                            i < perfume.projection / 2 ? "bg-primary" : "bg-muted"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Suitable occasions */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">Perfect for:</p>
                <div className="flex flex-wrap gap-1">
                  {perfume.occasions.slice(0, 2).map((occasion, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {occasion}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">${perfume.price}</span>
              {perfume.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${perfume.originalPrice}
                </span>
              )}
            </div>
          </div>
          <Button size="sm" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}