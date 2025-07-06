"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  User, 
  Heart, 
  Menu,
  X,
  Sparkles,
  Brain,
  LogIn,
  UserPlus,
  Settings,
  LogOut,
  Zap,
  Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login initiated');
    setIsLoggedIn(true);
  };

  const handleAppleLogin = () => {
    console.log('Apple login initiated');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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
              scent.co
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/discover" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <Zap className="h-4 w-4" />
              Discover
            </Link>
            <Link href="/smells-like" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <Brain className="h-4 w-4" />
              Smells Like
            </Link>
            <Link href="/mood-match" className="text-sm font-medium hover:text-primary transition-colors">
              Mood Match
            </Link>
            <Link href="/community" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <Users className="h-4 w-4" />
              Community
            </Link>
            <Link href="/search" className="text-sm font-medium hover:text-primary transition-colors">
              Browse All
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search or describe a scent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            <Link href="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isLoggedIn ? (
                  <>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Wishlist</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={handleGoogleLogin}>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Continue with Google</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleAppleLogin}>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Continue with Apple</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/auth/signup">
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Sign up with Email</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

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
                  placeholder="Search or describe a scent..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
              </form>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <Link href="/discover" className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  <span className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Discover Scents
                  </span>
                </Link>
                <Link href="/smells-like" className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  <span className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Smells Like...
                  </span>
                </Link>
                <Link href="/mood-match" className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  Mood Match
                </Link>
                <Link href="/community" className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Community
                  </span>
                </Link>
                <Link href="/search" className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  Browse All
                </Link>
                <Link href="/wishlist" className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  Wishlist
                </Link>
                
                {/* Mobile Auth */}
                <div className="border-t pt-2 mt-2">
                  {isLoggedIn ? (
                    <>
                      <Link href="/profile" className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                        Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 text-sm font-medium hover:bg-accent rounded-md"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={handleGoogleLogin}
                        className="block w-full text-left px-3 py-2 text-sm font-medium hover:bg-accent rounded-md"
                      >
                        Continue with Google
                      </button>
                      <button 
                        onClick={handleAppleLogin}
                        className="block w-full text-left px-3 py-2 text-sm font-medium hover:bg-accent rounded-md"
                      >
                        Continue with Apple
                      </button>
                      <Link href="/auth/signup" className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                        Sign up with Email
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}