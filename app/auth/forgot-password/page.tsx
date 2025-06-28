"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Sparkles,
  Mail,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would make an API call to send reset email
      console.log('Sending password reset email to:', email);
      
      setIsEmailSent(true);
    } catch (error) {
      console.error('Failed to send reset email:', error);
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-indigo-950/20 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>

          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  scent.co
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                
                <div>
                  <CardTitle className="text-2xl">Check your email</CardTitle>
                  <p className="text-muted-foreground mt-2">
                    We've sent a password reset link to
                  </p>
                  <p className="font-medium text-foreground">
                    {email}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Click the link in the email to reset your password. If you don't see it, check your spam folder.
                </p>
              </div>

              <div className="space-y-3">
                <Link href="/auth/login">
                  <Button className="w-full">
                    Back to sign in
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setIsEmailSent(false)}
                >
                  Try a different email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-indigo-950/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Login */}
        <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                scent.co
              </span>
            </div>
            <div>
              <CardTitle className="text-2xl">Forgot your password?</CardTitle>
              <p className="text-muted-foreground mt-2">
                No worries! Enter your email and we'll send you a reset link.
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className={`pl-10 ${error ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending reset link...
                  </div>
                ) : (
                  'Send reset link'
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Remember your password? </span>
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}