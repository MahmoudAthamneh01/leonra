import React from 'react';
import { 
  Shield, Users, Crown, Star, TrendingUp, BarChart3, 
  Settings, Zap, Award, Globe, Lock, Database,
  ArrowRight, Eye, Edit, Plus, Bell, Activity
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AdminLandingPage() {
  const platformStats = [
    {
      title: 'إجمالي المستخدمات',
      value: '2,456',
      growth: '+12.3%',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600'
    },
    {
      title: 'التاجرات النشطات',
      value: '342',
      growth: '+8.7%',
      icon: Crown,
      color: 'from-primary to-red-600',
      textColor: 'text-primary'
    },
    {
      title: 'العارضات المتميزات',
      value: '128',
      growth: '+15.2%',
      icon: Star,
      color: 'from-secondary to-yellow-500',
      textColor: 'text-secondary'
    },
    {
      title: 'إجمالي المبيعات',
      value: '1.2M ر.س',
      growth: '+24.8%',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600'
    }
  ];

  const quickActions = [
    {
      title: 'إدارة المستخدمين',
      description: 'عرض وإدارة جميع المستخدمين',
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
      action: 'مراجعة'
    },
    {
      title: 'الموافقات المعلقة',
      description: '7 طلبات تحتاج موافقة',
      icon: Shield,
      color: 'bg-orange-50 text-orange-600',
      action: 'معالجة',
      badge: '7'
    },
    {
      title: 'تحليلات الأداء',
      description: 'مراجعة إحصائيات المنصة',
      icon: BarChart3,
      color: 'bg-purple-50 text-purple-600',
      action: 'عرض'
    },
    {
      title: 'إعدادات النظام',
      description: 'تخصيص وإدارة المنصة',
      icon: Settings,
      color: 'bg-gray-50 text-gray-600',
      action: 'تخصيص'
    }
  ];

  const systemFeatures = [
    {
      title: 'أمان متقدم',
      description: 'حماية شاملة للبيانات والمعاملات',
      icon: Lock,
      stats: '99.9% أمان'
    },
    {
      title: 'أداء فائق',
      description: 'سرعة استجابة عالية وموثوقية',
      icon: Zap,
      stats: '< 200ms'
    },
    {
      title: 'تحليلات ذكية',
      description: 'رؤى عميقة وتقارير مفصلة',
      icon: Activity,
      stats: '24/7 مراقبة'
    },
    {
      title: 'قاعدة بيانات قوية',
      description: 'تخزين آمن وموثوق للبيانات',
      icon: Database,
      stats: '99.99% جهوزية'
    }
  ];

  const recentActivities = [
    {
      action: 'تم قبول تاجرة جديدة',
      user: 'ليلى الحربي - متجر الأناقة الراقية',
      time: 'منذ ساعتين',
      type: 'approval'
    },
    {
      action: 'تم حل شكوى عميلة',
      user: 'شكوى #1234 - مشكلة في التسليم',
      time: 'منذ 4 ساعات',
      type: 'resolution'
    },
    {
      action: 'عارضة جديدة انضمت',
      user: 'دانة المطيري - تخصص أزياء',
      time: 'منذ 6 ساعات',
      type: 'registration'
    },
    {
      action: 'تحديث إعدادات النظام',
      user: 'تفعيل ميزة الإشعارات الذكية',
      time: 'منذ يوم',
      type: 'system'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return <Shield className="w-4 h-4 text-green-600" />;
      case 'resolution':
        return <Award className="w-4 h-4 text-blue-600" />;
      case 'registration':
        return <Star className="w-4 h-4 text-secondary" />;
      case 'system':
        return <Settings className="w-4 h-4 text-purple-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-primary rounded-full">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-secondary/10 text-secondary border-secondary/20 px-4 py-2">
                منصة لينورا الإدارية
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              مرحباً بك في لوحة التحكم الرئيسية
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              إدارة شاملة لمنصة التجارة الإلكترونية الرائدة للنساء في المملكة
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
                <Eye className="w-5 h-5 ml-2" />
                عرض النشاط المباشر
              </Button>
              <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 px-8 py-3">
                <Settings className="w-5 h-5 ml-2" />
                إعدادات النظام
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {platformStats.map((stat, index) => (
            <Card key={stat.title} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {stat.growth}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Quick Actions */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">الإجراءات السريعة</h2>
            <p className="text-muted-foreground">أدوات الإدارة الأساسية في متناول يدك</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={action.title} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    {action.badge && (
                      <Badge className="bg-red-500 text-white">{action.badge}</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                    {action.action}
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* System Features */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">قوة النظام</h2>
            <p className="text-muted-foreground">تقنيات متقدمة لضمان أفضل أداء</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemFeatures.map((feature, index) => (
              <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                  <Badge variant="outline" className="text-primary border-primary/20">
                    {feature.stats}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Activities & Analytics */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                النشاطات الأخيرة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors">
                    <div className="p-2 bg-muted rounded-full">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground truncate">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                حالة النظام
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-semibold">خوادم التطبيق</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">متصل</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-semibold">قاعدة البيانات</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">مستقر</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-semibold">خدمات الدفع</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">نشط</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold">النسخ الاحتياطي</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">قيد التشغيل</Badge>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">الأداء العام</p>
                      <p className="text-sm text-muted-foreground">جميع الأنظمة تعمل بكفاءة</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">98.7%</p>
                      <p className="text-xs text-muted-foreground">وقت التشغيل</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <section className="text-center py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">اطلعي على التفاصيل الكاملة</h2>
            <p className="text-muted-foreground mb-8">
              استكشفي جميع إمكانيات لوحة الإدارة وتحكمي في كل جانب من جوانب المنصة
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <BarChart3 className="w-5 h-5 ml-2" />
                عرض التحليلات المتقدمة
              </Button>
              <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                <Settings className="w-5 h-5 ml-2" />
                إعدادات شاملة
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}