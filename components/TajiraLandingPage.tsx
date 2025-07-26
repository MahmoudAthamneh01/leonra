import React from 'react';
import { 
  Crown, Store, TrendingUp, Users, Palette, Camera, 
  BarChart3, Zap, Shield, Award, ArrowRight, CheckCircle,
  Package, DollarSign, Star, Heart, Settings, Gift
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function TajiraLandingPage() {
  const tajiraFeatures = [
    {
      title: 'متجرك الإلكتروني المخصص',
      description: 'أنشئي متجراً فريداً يعكس شخصيتك وأسلوبك',
      icon: Store,
      color: 'from-primary to-red-600',
      features: [
        'تصميم قابل للتخصيص بالكامل',
        'رفع منتجات بلا حدود',
        'معرض صور احترافي',
        'صفحة متجر مخصصة'
      ]
    },
    {
      title: 'شراكة مع العارضات',
      description: 'تعاوني مع أفضل العارضات لعرض منتجاتك',
      icon: Camera,
      color: 'from-secondary to-yellow-500',
      features: [
        'شبكة عارضات موهوبات',
        'تصوير احترافي مجاني',
        'زيادة المبيعات بـ 300%',
        'تسويق مؤثر فعال'
      ]
    },
    {
      title: 'أدوات إدارة متقدمة',
      description: 'كل ما تحتاجينه لإدارة أعمالك بكفاءة',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
      features: [
        'تحليلات مبيعات مفصلة',
        'إدارة المخزون الذكية',
        'تتبع الطلبات المباشر',
        'تقارير مالية شاملة'
      ]
    }
  ];

  const successMetrics = [
    {
      number: '300%',
      label: 'زيادة في المبيعات',
      sublabel: 'مع العارضات',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      number: '50+',
      label: 'عارضة مميزة',
      sublabel: 'جاهزة للتعاون',
      icon: Star,
      color: 'text-secondary'
    },
    {
      number: '24/7',
      label: 'دعم فني',
      sublabel: 'مستمر ومتخصص',
      icon: Shield,
      color: 'text-blue-600'
    },
    {
      number: '15%',
      label: 'عمولة التطبيق فقط',
      sublabel: 'بدون رسوم خفية',
      icon: DollarSign,
      color: 'text-primary'
    }
  ];

  const quickActions = [
    {
      title: 'أنشئي متجرك',
      description: 'ابدئي ببناء متجرك الإلكتروني المخصص',
      icon: Store,
      action: 'إنشاء متجر',
      color: 'bg-primary text-white',
      popular: true
    },
    {
      title: 'أضيفي منتجاتك',
      description: 'ارفعي منتجاتك وابدئي البيع فوراً',
      icon: Package,
      action: 'إضافة منتج',
      color: 'bg-secondary text-secondary-foreground'
    },
    {
      title: 'اطلبي عارضة',
      description: 'احصلي على تصوير احترافي لمنتجاتك',
      icon: Camera,
      action: 'طلب عارضة',
      color: 'bg-purple-600 text-white'
    },
    {
      title: 'خصصي متجرك',
      description: 'اجعلي متجرك يعكس شخصيتك الفريدة',
      icon: Palette,
      action: 'التخصيص',
      color: 'bg-pink-600 text-white'
    }
  ];

  const stepsToSuccess = [
    {
      step: '1',
      title: 'أنشئي حسابك',
      description: 'سجلي بياناتك وأكملي ملف التاجرة',
      icon: Crown,
      status: 'completed'
    },
    {
      step: '2',
      title: 'صممي متجرك',
      description: 'اختاري التصميم والألوان التي تناسبك',
      icon: Palette,
      status: 'current'
    },
    {
      step: '3',
      title: 'أضيفي منتجاتك',
      description: 'ارفعي صور منتجاتك مع الوصف والأسعار',
      icon: Package,
      status: 'upcoming'
    },
    {
      step: '4',
      title: 'تعاوني مع العارضات',
      description: 'اطلبي عارضة لتصوير منتجاتك احترافياً',
      icon: Camera,
      status: 'upcoming'
    },
    {
      step: '5',
      title: 'ابدئي البيع',
      description: 'انشري متجرك واستقبلي أول طلباتك',
      icon: TrendingUp,
      status: 'upcoming'
    }
  ];

  const testimonials = [
    {
      name: 'فاطمة الزهراني',
      business: 'بوتيك الأميرة',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b69906b4?w=100&h=100&fit=crop&crop=face',
      quote: 'لينورا غيرت حياتي! من متجر صغير إلى علامة تجارية معروفة في 6 أشهر فقط',
      revenue: '85,000 ر.س/شهر',
      growth: '+400%'
    },
    {
      name: 'نورا العتيبي',
      business: 'عطور الملكة',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      quote: 'العارضات ساعدوني أوصل لعميلات جدد، والمبيعات زادت بشكل لا يصدق',
      revenue: '125,000 ر.س/شهر',
      growth: '+600%'
    },
    {
      name: 'ريم الحربي',
      business: 'أزياء ريم',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      quote: 'أدوات التحليل ساعدتني أفهم عميلاتي أكثر وأطور منتجاتي',
      revenue: '67,000 ر.س/شهر',
      growth: '+250%'
    }
  ];

  const getStepStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600 text-white';
      case 'current':
        return 'bg-primary text-white';
      case 'upcoming':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-primary rounded-full">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-secondary/10 text-secondary border-secondary/20 px-6 py-2">
                ✨ مرحباً نورا الأميرة
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              متجرك الإلكتروني المميز
              <br />
              في انتظارك الآن
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              ابني إمبراطوريتك التجارية مع أقوى منصة للتاجرات في المملكة. 
              تعاوني مع أفضل العارضات واحصلي على أدوات إدارة احترافية
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4">
                <Store className="w-5 h-5 ml-2" />
                ابدئي متجرك الآن
              </Button>
              <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 px-8 py-4">
                <BarChart3 className="w-5 h-5 ml-2" />
                شاهدي لوحة التحكم
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {successMetrics.map((metric, index) => (
            <Card key={metric.label} className="text-center hover:shadow-xl transition-shadow group">
              <CardContent className="p-6">
                <div className="mb-4">
                  <metric.icon className={`w-8 h-8 mx-auto ${metric.color}`} />
                </div>
                <h3 className="text-3xl font-bold mb-1">{metric.number}</h3>
                <p className="font-semibold mb-1">{metric.label}</p>
                <p className="text-sm text-muted-foreground">{metric.sublabel}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 space-y-20">
        {/* Quick Actions */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">ابدئي رحلتك الآن</h2>
            <p className="text-xl text-muted-foreground">كل ما تحتاجينه لبناء متجر ناجح في مكان واحد</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={action.title} className="group hover:shadow-lg transition-all duration-300 cursor-pointer relative">
                {action.popular && (
                  <Badge className="absolute -top-2 right-4 bg-primary text-white">الأكثر شيوعاً</Badge>
                )}
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                    {action.action}
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">لماذا تختار لينورا؟</h2>
            <p className="text-xl text-muted-foreground">أدوات قوية ومميزات فريدة لنجاح متجرك</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {tajiraFeatures.map((feature, index) => (
              <Card key={feature.title} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${feature.color} inline-block`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Steps to Success */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">خطوات بسيطة للنجاح</h2>
            <p className="text-xl text-muted-foreground">رحلتك من البداية إلى النجاح في 5 خطوات واضحة</p>
          </div>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-8 right-8 left-8 h-0.5 bg-muted hidden lg:block">
              <div className="h-full bg-gradient-to-r from-primary to-secondary w-2/5"></div>
            </div>
            
            <div className="grid md:grid-cols-5 gap-6">
              {stepsToSuccess.map((step, index) => (
                <div key={step.step} className="text-center relative">
                  <div className={`w-16 h-16 rounded-full ${getStepStatus(step.status)} flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10`}>
                    {step.status === 'completed' ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : (
                      step.step
                    )}
                  </div>
                  <div className="mb-3">
                    <step.icon className="w-6 h-6 mx-auto text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">قصص نجاح ملهمة</h2>
            <p className="text-xl text-muted-foreground">تاجرات حققن أحلامهن مع لينورا</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-muted-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-primary">{testimonial.revenue}</p>
                      <p className="text-xs text-muted-foreground">الإيرادات الشهرية</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{testimonial.growth}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-20 bg-gradient-to-r from-primary to-secondary rounded-3xl text-white">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              مستعدة لتحويل حلمك إلى حقيقة؟
            </h2>
            <p className="text-xl mb-8 opacity-90">
              انضمي إلى مئات التاجرات الناجحات وابدئي رحلتك نحو الاستقلال المالي
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="px-8 py-4">
                <Store className="w-5 h-5 ml-2" />
                أنشئي متجرك الآن
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-4">
                <Camera className="w-5 h-5 ml-2" />
                اطلبي عارضة
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}