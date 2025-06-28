"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Bell, 
  Check, 
  X, 
  TrendingDown, 
  Heart, 
  MessageCircle,
  Star,
  ShoppingBag,
  Sparkles
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'price_drop' | 'back_in_stock' | 'review' | 'recommendation' | 'deal';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'price_drop',
      title: 'Price Drop Alert',
      message: 'Dior Sauvage EDT is now $82 (was $110) - 25% off!',
      time: '2 hours ago',
      read: false,
      actionUrl: '/perfume/1'
    },
    {
      id: '2',
      type: 'recommendation',
      title: 'New AI Recommendation',
      message: 'Based on your recent searches, you might love Tom Ford Oud Wood',
      time: '1 day ago',
      read: false,
      actionUrl: '/ai-chat'
    },
    {
      id: '3',
      type: 'review',
      title: 'Review on Your Wishlist Item',
      message: 'Someone reviewed Baccarat Rouge 540 - 5 stars!',
      time: '2 days ago',
      read: true,
      actionUrl: '/perfume/2'
    },
    {
      id: '4',
      type: 'deal',
      title: 'Flash Sale',
      message: '24-hour flash sale: Up to 40% off luxury fragrances',
      time: '3 days ago',
      read: true,
      actionUrl: '/deals'
    }
  ]);

  const [settings, setSettings] = useState({
    priceAlerts: true,
    stockAlerts: true,
    recommendations: true,
    reviews: false,
    deals: true,
    emailNotifications: true,
    pushNotifications: false
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'price_drop':
        return <TrendingDown className="h-5 w-5 text-green-500" />;
      case 'back_in_stock':
        return <ShoppingBag className="h-5 w-5 text-blue-500" />;
      case 'review':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'recommendation':
        return <Sparkles className="h-5 w-5 text-purple-500" />;
      case 'deal':
        return <Heart className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All as Read
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Notifications List */}
          <div className="lg:col-span-2 space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Card key={notification.id} className={`transition-all ${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-sm">{notification.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <Badge variant="secondary" className="text-xs">New</Badge>
                          )}
                        </div>
                        <div className="flex gap-2 mt-3">
                          {notification.actionUrl && (
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          )}
                          {!notification.read && (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  You're all caught up! We'll notify you when something important happens.
                </p>
              </div>
            )}
          </div>

          {/* Notification Settings */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="price-alerts" className="text-sm font-medium">
                      Price Drop Alerts
                    </Label>
                    <Switch
                      id="price-alerts"
                      checked={settings.priceAlerts}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, priceAlerts: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="stock-alerts" className="text-sm font-medium">
                      Back in Stock
                    </Label>
                    <Switch
                      id="stock-alerts"
                      checked={settings.stockAlerts}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, stockAlerts: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="recommendations" className="text-sm font-medium">
                      AI Recommendations
                    </Label>
                    <Switch
                      id="recommendations"
                      checked={settings.recommendations}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, recommendations: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reviews" className="text-sm font-medium">
                      New Reviews
                    </Label>
                    <Switch
                      id="reviews"
                      checked={settings.reviews}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, reviews: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="deals" className="text-sm font-medium">
                      Special Deals
                    </Label>
                    <Switch
                      id="deals"
                      checked={settings.deals}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, deals: checked }))
                      }
                    />
                  </div>
                </div>

                <hr />

                <div className="space-y-4">
                  <h4 className="font-medium">Delivery Method</h4>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications" className="text-sm font-medium">
                      Email Notifications
                    </Label>
                    <Switch
                      id="email-notifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications" className="text-sm font-medium">
                      Push Notifications
                    </Label>
                    <Switch
                      id="push-notifications"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, pushNotifications: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}