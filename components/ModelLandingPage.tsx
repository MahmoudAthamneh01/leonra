import React from 'react';
import {
  Star,
  Camera,
  Heart,
  DollarSign,
  TrendingUp,
  Smile,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export function ModelLandingPage() {
  const modelBenefits = [
    {
      title: 'تألقي بإطلالاتك',
      description: 'اعرضي منتجات التاجرات المميزة واحصلي على عمولات مغرية',
      icon: Camera,
      color: 'from-secondary to-yellow-500',
    },
    {
      title: 'شبكة علاقات واسعة',
      description: 'تواصلي مع أفضل التاجرات والعلامات التجارية في المملكة',
      icon: Heart,
      color: 'from-pink-500 to-red-600',
    },
    {
      title: 'دخل متنامي',
      description: 'كلما زادت مبيعاتك، ارتفعت عمولتك وأرباحك',
      icon: DollarSign,
      color: 'from-green-500 to-green-700',
    },
  ];

  const stats = [
    { number: '150+', label: 'تاجرة متعاونة', icon: Star },
    { number: '98%', label: 'رضا العميلات', icon: Smile },
    { number: '200%', label: 'نمو الأرباح', icon: TrendingUp },
  ];

  return (
    <div className="bg-background py-10">
      <div className="container mx-auto px-4 space-y-20">
        {/* Hero */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold">مرحبا بك في عالم لينورا</h1>
          <p className="text-lg text-muted-foreground">
            انطلقي في مسيرتك كعارضة محترفة وتعاوني مع أفضل التاجرات
          </p>
          <Button size="lg" variant="secondary" className="px-8">
            ابدأي الآن
          </Button>
        </section>

        {/* Benefits */}
        <section className="grid md:grid-cols-3 gap-8">
          {modelBenefits.map((benefit) => (
            <Card key={benefit.title} className="overflow-hidden text-center">
              <div className={`h-2 bg-gradient-to-r ${benefit.color}`}></div>
              <CardHeader>
                <benefit.icon className="w-8 h-8 mx-auto text-primary" />
                <CardTitle className="mt-4">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {benefit.description}
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Stats */}
        <section className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-center">
                <item.icon className="w-8 h-8 text-secondary" />
              </div>
              <p className="text-3xl font-bold text-primary">{item.number}</p>
              <p className="text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </section>

        {/* Call to action */}
        <section className="bg-primary text-white text-center py-12 rounded-xl space-y-4">
          <h2 className="text-2xl font-bold">جاهزة للتألق مع لينورا؟</h2>
          <Button variant="outline" className="bg-white text-primary px-8">
            انضمي الآن
          </Button>
        </section>
      </div>
    </div>
  );
}
