"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Check, 
  Sparkles, 
  Palette,
  ShoppingBag,
  TrendingUp,
  Zap,
  Star,
  ArrowRight
} from 'lucide-react';

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const features = [
    {
      icon: Palette,
      title: 'Custom Scent Builder',
      description: 'Create unlimited custom fragrance profiles with AI-powered matching'
    },
    {
      icon: ShoppingBag,
      title: 'P2P Marketplace Access',
      description: 'Buy and sell rare fragrances with verified collectors'
    },
    {
      icon: TrendingUp,
      title: 'AI Deal Finder',
      description: 'Get notified of the best fragrance deals across the web'
    },
    {
      icon: Zap,
      title: 'Advanced AI Recommendations',
      description: 'Powered by GPT-4 for the most accurate scent matching'
    },
    {
      icon: Star,
      title: 'Priority Support',
      description: '24/7 premium customer support and early access to new features'
    }
  ];

  const plans = {
    monthly: {
      price: 9.99,
      period: 'month',
      savings: null
    },
    yearly: {
      price: 79.99,
      period: 'year',
      savings: '33% off'
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0">
              Premium Features
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Unlock the Full Power of scent.co
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get access to advanced AI features, exclusive marketplace, and premium tools to enhance your fragrance journey
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Features */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Premium Features</h2>
                <div className="space-y-6">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* What you get */}
              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    'Unlimited custom scent profiles',
                    'AI-powered fragrance matching',
                    'Access to P2P marketplace',
                    'Real-time deal notifications',
                    'Advanced search filters',
                    'Priority customer support',
                    'Early access to new features',
                    'Ad-free experience'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Pricing */}
            <div className="space-y-6">
              <Card className="border-2 border-primary">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Crown className="h-6 w-6 text-yellow-500" />
                    <CardTitle className="text-2xl">Premium Plan</CardTitle>
                  </div>
                  <p className="text-muted-foreground">
                    Everything you need for the ultimate fragrance experience
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Plan Toggle */}
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant={selectedPlan === 'monthly' ? 'default' : 'outline'}
                      onClick={() => setSelectedPlan('monthly')}
                      className="flex-1"
                    >
                      Monthly
                    </Button>
                    <Button
                      variant={selectedPlan === 'yearly' ? 'default' : 'outline'}
                      onClick={() => setSelectedPlan('yearly')}
                      className="flex-1 relative"
                    >
                      Yearly
                      {plans.yearly.savings && (
                        <Badge className="absolute -top-2 -right-2 bg-green-500 text-xs">
                          {plans.yearly.savings}
                        </Badge>
                      )}
                    </Button>
                  </div>

                  {/* Pricing */}
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      ${plans[selectedPlan].price}
                      <span className="text-lg font-normal text-muted-foreground">
                        /{plans[selectedPlan].period}
                      </span>
                    </div>
                    {selectedPlan === 'yearly' && (
                      <p className="text-sm text-green-600">
                        Save $40 compared to monthly billing
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <Button size="lg" className="w-full gap-2">
                    <Sparkles className="h-5 w-5" />
                    Upgrade to Premium
                    <ArrowRight className="h-5 w-5" />
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Cancel anytime. No hidden fees. 7-day free trial.
                  </p>
                </CardContent>
              </Card>

              {/* Money Back Guarantee */}
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">30-Day Money Back Guarantee</h3>
                  <p className="text-sm text-muted-foreground">
                    Not satisfied? Get a full refund within 30 days, no questions asked.
                  </p>
                </CardContent>
              </Card>

              {/* Testimonial */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-sm mb-3">
                    "The custom scent builder completely changed how I discover fragrances. 
                    The AI recommendations are incredibly accurate!"
                  </blockquote>
                  <div className="text-xs text-muted-foreground">
                    — Sarah M., Premium Member
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}