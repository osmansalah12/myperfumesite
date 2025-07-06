"use client";

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Sparkles, 
  ArrowDown,
  Brain,
  Heart,
  Zap,
  Users
} from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const features = [
    {
      title: "Smells Like...",
      description: "Describe any scent and find your match",
      icon: Brain,
      href: "/smells-like",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Mood Match",
      description: "Find scents that match your vibe",
      icon: Heart,
      href: "/mood-match",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Discover",
      description: "Swipe through curated fragrances",
      icon: Zap,
      href: "/discover",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Community",
      description: "Explore scent collections",
      icon: Users,
      href: "/community",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10"
          style={{
            transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              transform: `translate(${mousePosition.x * 0.005 * (i % 3)}px, ${mousePosition.y * 0.005 * (i % 3)}px)`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div 
          className="text-center space-y-8 px-4 max-w-4xl mx-auto"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: Math.max(0, 1 - scrollY / 800)
          }}
        >
          {/* Logo Animation */}
          <div 
            className="flex items-center justify-center gap-3 mb-8"
            style={{
              transform: `scale(${1 + mousePosition.x * 0.00005}) rotate(${mousePosition.x * 0.01}deg)`
            }}
          >
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
              <Sparkles className="h-8 w-8 text-white animate-pulse" />
            </div>
            <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              scent.co
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-6">
            <h1 
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent leading-tight"
              style={{
                transform: `translateX(${mousePosition.x * 0.01}px) translateY(${mousePosition.y * 0.005}px)`
              }}
            >
              Find Your
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Scent DNA
              </span>
            </h1>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div 
              className="relative group"
              style={{
                transform: `translateY(${mousePosition.y * 0.01}px)`
              }}
            >
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6 group-hover:text-purple-400 transition-colors" />
              <Input
                type="text"
                placeholder="Describe your perfect scent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-16 pr-40 py-6 text-xl rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
              />
              <Button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105"
              >
                Discover
              </Button>
            </div>
          </form>

          {/* Scroll Indicator */}
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
            style={{
              opacity: Math.max(0, 1 - scrollY / 200)
            }}
          >
            <ArrowDown className="h-6 w-6 text-white/60" />
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="min-h-screen py-20 relative">
        <div className="container mx-auto px-4">
          <div 
            className="text-center mb-20"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - 400) * 0.5)}px)`,
              opacity: Math.min(1, Math.max(0, (scrollY - 300) / 300))
            }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Discover Like Never Before
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              AI-powered fragrance discovery that understands your unique taste
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const delay = index * 100;
              
              return (
                <a
                  key={index}
                  href={feature.href}
                  className="group block"
                  style={{
                    transform: `translateY(${Math.max(0, (scrollY - 600 - delay) * 0.3)}px) translateX(${mousePosition.x * 0.01 * (index % 2 === 0 ? 1 : -1)}px)`,
                    opacity: Math.min(1, Math.max(0, (scrollY - 500 - delay) / 200))
                  }}
                >
                  <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:rotate-1 group-hover:shadow-2xl">
                    {/* Animated Background */}
                    <div 
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    />
                    
                    {/* Icon */}
                    <div 
                      className={`h-16 w-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                      {feature.description}
                    </p>
                    
                    {/* Hover Effect */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div 
          className="text-center space-y-8 px-4 max-w-4xl mx-auto"
          style={{
            transform: `translateY(${Math.max(0, (scrollY - 1200) * 0.2)}px)`,
            opacity: Math.min(1, Math.max(0, (scrollY - 1000) / 400))
          }}
        >
          <h2 className="text-6xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Your Perfect Scent
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Awaits Discovery
            </span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="/discover">
              <Button 
                size="lg" 
                className="px-12 py-4 text-lg rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                style={{
                  transform: `translateX(${mousePosition.x * 0.005}px)`
                }}
              >
                Start Your Journey
              </Button>
            </a>
            
            <a href="/smells-like">
              <Button 
                size="lg" 
                variant="outline" 
                className="px-12 py-4 text-lg rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
                style={{
                  transform: `translateX(${-mousePosition.x * 0.005}px)`
                }}
              >
                Try "Smells Like"
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}