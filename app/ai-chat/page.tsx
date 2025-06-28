"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  MessageCircle,
  Lightbulb,
  Search,
  Palette
} from 'lucide-react';
import PerfumeCard from '@/components/perfume-card';
import { mockPerfumes } from '@/data/mockData';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  perfumeRecommendations?: any[];
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI fragrance assistant powered by advanced language models. I can help you find the perfect scent, analyze your preferences, recommend fragrances based on your mood, or answer any questions about perfumes. What would you like to explore today?",
      timestamp: new Date(),
      suggestions: [
        "Find me a fresh summer fragrance",
        "What's trending in luxury perfumes?",
        "Help me build a scent profile",
        "Recommend something for date night"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callOpenAI = async (userMessage: string): Promise<string> => {
    try {
      // In a real implementation, you would call your backend API that interfaces with OpenAI
      // For demo purposes, we'll simulate an AI response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: 'fragrance_assistant'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      // Fallback to simulated response
      return generateFallbackResponse(userMessage);
    }
  };

  const generateFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('fresh') || lowerMessage.includes('summer') || lowerMessage.includes('citrus')) {
      return "For fresh summer fragrances, I recommend looking for scents with bright citrus top notes like bergamot, lemon, or grapefruit. These create an invigorating opening that's perfect for warm weather. Consider fragrances with aquatic or marine notes for that clean, refreshing feel. Some excellent options include Acqua di Gio by Giorgio Armani or Light Blue by Dolce & Gabbana.";
    }

    if (lowerMessage.includes('luxury') || lowerMessage.includes('expensive') || lowerMessage.includes('premium')) {
      return "Luxury fragrances often feature rare and expensive ingredients like oud, ambergris, or natural rose absolute. Brands like Tom Ford, Creed, and Maison Francis Kurkdjian are known for their premium offerings. These fragrances typically have exceptional longevity and complexity. Would you like me to recommend some specific luxury options based on your preferences?";
    }

    if (lowerMessage.includes('date') || lowerMessage.includes('romantic') || lowerMessage.includes('seductive')) {
      return "For romantic occasions, I suggest fragrances with warm, sensual notes. Look for scents featuring vanilla, amber, sandalwood, or floral notes like jasmine and rose. These create an intimate, alluring aura. Tom Ford Black Orchid or Yves Saint Laurent Black Opium are excellent choices for evening romance.";
    }

    if (lowerMessage.includes('profile') || lowerMessage.includes('build') || lowerMessage.includes('custom')) {
      return "Building a scent profile is exciting! I'd recommend starting with our Custom Scent Builder tool. Think about what moods you want to evoke, what occasions you'll wear it for, and which note families appeal to you. Do you prefer fresh and clean scents, or are you drawn to warm and spicy fragrances? I can help guide you through the process.";
    }

    // Default AI-powered response
    return "I understand you're looking for fragrance guidance. As an AI trained on extensive perfume knowledge, I can help you discover scents that match your personality and preferences. Could you tell me more about what type of fragrance experience you're seeking? For example, are you looking for something for daily wear, special occasions, or perhaps exploring a completely new scent family?";
  };

  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get AI response
    const aiContent = await callOpenAI(userMessage);
    
    const lowerMessage = userMessage.toLowerCase();
    let perfumeRecommendations: any[] = [];
    let suggestions: string[] = [];

    // Generate perfume recommendations based on context
    if (lowerMessage.includes('fresh') || lowerMessage.includes('summer') || lowerMessage.includes('citrus')) {
      perfumeRecommendations = mockPerfumes.filter(p => 
        p.seasonality.includes('Summer') || 
        p.mood.includes('Fresh') ||
        p.notes.top.some(note => ['Bergamot', 'Lemon', 'Lime', 'Orange'].includes(note))
      ).slice(0, 3);
      
      suggestions = [
        "Tell me more about longevity",
        "What about winter alternatives?",
        "Show me similar scents",
        "Help me compare these options"
      ];
    } else if (lowerMessage.includes('luxury') || lowerMessage.includes('expensive') || lowerMessage.includes('premium')) {
      perfumeRecommendations = mockPerfumes.filter(p => p.price > 120).slice(0, 3);
      
      suggestions = [
        "What makes these so special?",
        "Are there affordable alternatives?",
        "Show me niche brands",
        "Help me justify the cost"
      ];
    } else if (lowerMessage.includes('date') || lowerMessage.includes('romantic') || lowerMessage.includes('seductive')) {
      perfumeRecommendations = mockPerfumes.filter(p => 
        p.occasions.includes('Date Night') || 
        p.mood.includes('Seductive') ||
        p.mood.includes('Romantic')
      ).slice(0, 3);
      
      suggestions = [
        "How do I apply for best effect?",
        "What about seasonal variations?",
        "Show me unisex options",
        "Help me layer fragrances"
      ];
    } else {
      suggestions = [
        "Help me find my signature scent",
        "Explain fragrance notes to me",
        "What's popular right now?",
        "Recommend based on my mood"
      ];
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: aiContent,
      timestamp: new Date(),
      perfumeRecommendations,
      suggestions
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const aiResponse = await generateAIResponse(inputValue);
    setIsTyping(false);
    setMessages(prev => [...prev, aiResponse]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              AI-Powered by OpenAI
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">AI Fragrance Assistant</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized recommendations, expert insights, and discover your perfect scent with our advanced AI powered by OpenAI's language models
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Chat Container */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Chat with AI Assistant
                <Badge variant="outline" className="text-xs">Powered by OpenAI</Badge>
              </CardTitle>
            </CardHeader>
            
            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  <div className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.type === 'ai' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                      <div className={`rounded-lg p-3 ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 px-3">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>

                    {message.type === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>

                  {/* AI Suggestions */}
                  {message.type === 'ai' && message.suggestions && (
                    <div className="ml-11 space-y-2">
                      <p className="text-xs text-muted-foreground">Suggested questions:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Perfume Recommendations */}
                  {message.type === 'ai' && message.perfumeRecommendations && message.perfumeRecommendations.length > 0 && (
                    <div className="ml-11 space-y-3">
                      <p className="text-sm font-medium">AI Recommendations:</p>
                      <div className="grid md:grid-cols-3 gap-4">
                        {message.perfumeRecommendations.map((perfume) => (
                          <PerfumeCard key={perfume.id} perfume={perfume} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about fragrances..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleSuggestionClick("Help me find my signature scent")}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Find My Signature</h3>
                  <p className="text-sm text-muted-foreground">Discover your perfect scent</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleSuggestionClick("Help me build a custom scent profile")}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Palette className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Build Custom Profile</h3>
                  <p className="text-sm text-muted-foreground">Create your scent DNA</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleSuggestionClick("What fragrance trends are popular right now?")}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Trending Insights</h3>
                  <p className="text-sm text-muted-foreground">Latest fragrance trends</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}