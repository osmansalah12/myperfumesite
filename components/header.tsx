"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  User, 
  ShoppingBag, 
  Heart, 
  Bell,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ScentAI
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <NavigationMenuLink asChild>
                      <Link href="/search" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Search Perfumes</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Find perfumes by notes, brand, or mood
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/mood-recommendations" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Mood Recommendations</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Get AI recommendations based on your mood
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/reviews" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Reviews & Ratings</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Read and write detailed perfume reviews
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Create</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <NavigationMenuLink asChild>
                      <Link href="/scent-builder" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none flex items-center gap-2">
                          Custom Scent Builder 
                          <Badge variant="secondary" className="text-xs">Premium</Badge>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Build your ideal scent profile with AI matching
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/layering-guide" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Layering Guide</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Learn to layer fragrances for unique combinations
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <NavigationMenuLink asChild>
                      <Link href="/marketplace" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none flex items-center gap-2">
                          P2P Marketplace 
                          <Badge variant="secondary" className="text-xs">Premium</Badge>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Buy and sell perfumes with other collectors
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/deals" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none flex items-center gap-2">
                          Best Deals 
                          <Badge variant="secondary" className="text-xs">Premium</Badge>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          AI-powered discount finder with live deals
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by notes, brand, or mood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-background/95 backdrop-blur">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search perfumes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
              </form>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <Link href="/search" className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  Search Perfumes
                </Link>
                <Link href="/scent-builder" className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  <span className="flex items-center gap-2">
                    Scent Builder 
                    <Badge variant="secondary" className="text-xs">Premium</Badge>
                  </span>
                </Link>
                <Link href="/mood-recommendations" className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  Mood Recommendations
                </Link>
                <Link href="/reviews" className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  Reviews & Ratings
                </Link>
                <Link href="/marketplace" className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  <span className="flex items-center gap-2">
                    Marketplace 
                    <Badge variant="secondary" className="text-xs">Premium</Badge>
                  </span>
                </Link>
                <Link href="/deals" className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  <span className="flex items-center gap-2">
                    Best Deals 
                    <Badge variant="secondary" className="text-xs">Premium</Badge>
                  </span>
                </Link>
                <Link href="/layering-guide" className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  Layering Guide
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}