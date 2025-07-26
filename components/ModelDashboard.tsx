import React, { useState } from 'react';
import { 
  Star, Camera, TrendingUp, DollarSign, Users, Crown, 
  Eye, Heart, Share2, Calendar, BarChart3, Instagram, 
  Image as ImageIcon, Video, Award, Briefcase
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ModelDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'إجمالي الأرباح',
      value: '8,750 ر.س',
      change: '+22.5%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'التعاونات النشطة',
      value: '12',
      change: '+3',
      icon: Briefcase,
      color: 'text-blue-600'
    },
    {
      title: 'المتابعات الجديدة',
      value: '1,245',
      change: '+18.3%',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'تقييم الأداء',
      value: '4.9',
      change: '+0.3',
      icon: Star,
      color: 'text-yellow-600'
    }
  ];

  const collaborations = [
    {
      id: 1,
      brand: 'متجر الملكة',
      product: 'مجموعة مكياج صيفية',
      status: 'active',
      commission: '15%',
      earned: '650 ر.س',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop',
      deadline: '2025-02-15'
    },
    {
      id: 2,
      brand: 'بوتيك النجمات',
      product: 'فساتين سهرة راقية',
      status: 'completed',
      commission: '20%',
      earned: '1,200 ر.س',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop',
      deadline: '2025-01-30'
    },
    {
      id: 3,
      brand: 'مجوهرات الأميرة',
      product: 'إكسسوارات ذهبية',
      status: 'pending',
      commission: '12%',
      earned: '0 ر.س',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop',
      deadline: '2025-02-20'
    }
  ];

  const portfolio = [
    {
      id: 1,
      title: 'تصوير مكياج صيفي',
      brand: 'متجر الملكة',
      likes: 1247,
      views: 8934,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop',
      date: '2025-01-10'
    },
    {
      id: 2,
      title: 'عرض أزياء راقية',
      brand: 'بوتيك النجمات',
      likes: 2156,
      views: 12045,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop',
      date: '2025-01-08'
    },
    {
      id: 3,
      title: 'مجوهرات أنيقة',
      brand: 'مجوهرات الأميرة',
      likes: 987,
      views: 5642,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
      date: '2025-01-05'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800">نشط</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">مكتمل</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">في الانتظار</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-8 h-8 text-secondary" />
              <h1 className="text-3xl font-bold">لوحة العارضة</h1>
            </div>
            <p className="text-muted-foreground">مرحباً ريم الجوهرة، إليك نظرة عامة على أدائك</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              رفع محتوى جديد
            </Button>
            <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              طلب تعاون جديد
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change} من الشهر الماضي</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="collaborations">التعاونات</TabsTrigger>
            <TabsTrigger value="portfolio">المعرض</TabsTrigger>
            <TabsTrigger value="customizer">تخصيص المتجر</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Active Collaborations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    التعاونات النشطة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {collaborations.filter(c => c.status === 'active').map((collab) => (
                      <div key={collab.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <ImageWithFallback
                          src={collab.image}
                          alt={collab.product}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{collab.brand}</p>
                          <p className="text-xs text-muted-foreground">{collab.product}</p>
                          <p className="text-xs text-secondary">عمولة {collab.commission}</p>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-primary text-sm">{collab.earned}</p>
                          {getStatusBadge(collab.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Portfolio */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    أحدث الأعمال
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolio.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.brand}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3 text-red-500" />
                              <span className="text-xs">{item.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3 text-blue-500" />
                              <span className="text-xs">{item.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="collaborations" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>إدارة التعاونات</CardTitle>
                  <Button>
                    <Briefcase className="w-4 h-4 ml-2" />
                    طلب تعاون جديد
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {collaborations.map((collab) => (
                    <div key={collab.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <ImageWithFallback
                        src={collab.image}
                        alt={collab.product}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{collab.brand}</h3>
                        <p className="text-sm text-muted-foreground">{collab.product}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm">عمولة: {collab.commission}</span>
                          <span className="text-sm">الموعد النهائي: {collab.deadline}</span>
                        </div>
                        {getStatusBadge(collab.status)}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-primary text-lg">{collab.earned}</p>
                        <Button size="sm" className="mt-2">
                          عرض التفاصيل
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>معرض الأعمال</CardTitle>
                  <Button>
                    <Camera className="w-4 h-4 ml-2" />
                    رفع عمل جديد
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolio.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.brand}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span className="text-sm">{item.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4 text-blue-500" />
                              <span className="text-sm">{item.views}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Share2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customizer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  تخصيص واجهة المتجر
                </CardTitle>
                <p className="text-sm text-muted-foreground">قومي بسحب وإسقاط العناصر لتخصيص تخطيط متجرك</p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Award className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">أداة تخصيص المتجر</h3>
                  <p className="text-muted-foreground mb-6">
                    استخدمي أداة السحب والإسقاط لتخصيص تخطيط متجرك بالطريقة التي تناسبك
                  </p>
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    فتح أداة التخصيص
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}