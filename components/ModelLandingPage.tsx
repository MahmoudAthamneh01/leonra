import React from 'react';
import { Star, Camera, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export function ModelLandingPage() {
  const features = [
    {
      title: 'أنشئي ملفك الشخصي',
      description: 'قدمي نفسك للتاجرات والعميلات',
      icon: Star,
    },
    {
      title: 'تعاوني مع التاجرات',
      description: 'شاركي في تصوير المنتجات وعرضها',
      icon: Camera,
    },
    {
      title: 'احصلي على عمولات مجزية',
      description: 'اكسبي دخلاً إضافياً مقابل عملك',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-primary/5"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <Badge className="bg-secondary/10 text-secondary mb-6 px-6 py-2">
            مرحباً بالعارضات المبدعات
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            انطلقي بإبداعك مع لينورا
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            منصة متكاملة لعرض مواهبك والتعاون مع أفضل التاجرات في المملكة
          </p>
          <Button size="lg" className="bg-secondary text-secondary-foreground px-8 py-4">
            ابدئي الآن
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardHeader>
                <feature.icon className="w-8 h-8 mx-auto text-secondary mb-3" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
