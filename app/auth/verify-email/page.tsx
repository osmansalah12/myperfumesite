"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Sparkles,
  Mail,
  ArrowLeft,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [email] = useState('user@example.com'); // This would come from the signup flow

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResendEmail = async () => {
    setIsResending(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would make an API call to resend verification email
      console.log('Resending verification email to:', email);
      
      setResendCooldown(60); // 60 second cooldown
    } catch (error) {
      console.error('Failed to resend email:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-indigo-950/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to scent.co
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
              <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              
              <div>
                <CardTitle className="text-2xl">Check your email</CardTitle>
                <p className="text-muted-foreground mt-2">
                  We've sent a verification link to
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
                Click the link in the email to verify your account. If you don't see it, check your spam folder.
              </p>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Email sent successfully</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleResendEmail}
                variant="outline"
                className="w-full gap-2"
                disabled={isResending || resendCooldown > 0}
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : resendCooldown > 0 ? (
                  `Resend in ${resendCooldown}s`
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Resend verification email
                  </>
                )}
              </Button>

              <Link href="/auth/login">
                <Button variant="ghost" className="w-full">
                  Back to sign in
                </Button>
              </Link>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>
                Wrong email address?{' '}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  Sign up again
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            Need help?{' '}
            <Link href="/support" className="hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}