import React, { useState } from 'react';
import { 
  Package, Plus, TrendingUp, DollarSign, Users, Star, 
  Eye, Edit, Trash2, Crown, Calendar, BarChart3, Brush
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShopCustomizer } from './ShopCustomizer';

export function TajiraDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'إجمالي المبيعات',
      value: '24,500 ر.س',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'المنتجات المباعة',
      value: '156',
      change: '+8.2%',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'العملاء الجدد',
      value: '42',
      change: '+15.3%',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'التقييم العام',
      value: '4.8',
      change: '+0.2',
      icon: Star,
      color: 'text-yellow-600'
    }
  ];

  const products = [
    {
      id: 1,
      name: 'أحمر شفاه مخملي فاخر',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=100&h=100&fit=crop',
      price: 89,
      stock: 25,
      sold: 145,
      status: 'active',
      rating: 4.8
    },
    {
      id: 2,
      name: 'كريم العيناية بالبشرة',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100&h=100&fit=crop',
      price: 120,
      stock: 12,
      sold: 89,
      status: 'low_stock',
      rating: 4.6
    },
    {
      id: 3,
      name: 'عطر نسائي راقي',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=100&h=100&fit=crop',
      price: 200,
      stock: 0,
      sold: 67,
      status: 'out_of_stock',
      rating: 4.9
    },
    {
      id: 4,
      name: 'مجموعة مكياج كاملة',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop',
      price: 350,
      stock: 8,
      sold: 34,
      status: 'active',
      rating: 4.7
    }
  ];

  const recentOrders = [
    {
      id: '#12345',
      customer: 'نورا أحمد',
      product: 'أحمر شفاه مخملي فاخر',
      amount: 89,
      status: 'completed',
      date: '2025-01-15'
    },
    {
      id: '#12346',
      customer: 'سارة محمد',
      product: 'عطر نسائي راقي',
      amount: 200,
      status: 'processing',
      date: '2025-01-14'
    },
    {
      id: '#12347',
      customer: 'ريم علي',
      product: 'كريم العناية بالبشرة',
      amount: 120,
      status: 'shipped',
      date: '2025-01-13'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>;
      case 'low_stock':
        return <Badge className="bg-yellow-100 text-yellow-800">مخزون منخفض</Badge>;
      case 'out_of_stock':
        return <Badge className="bg-red-100 text-red-800">نفد المخزون</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">مكتمل</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">قيد المعالجة</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-100 text-purple-800">تم الشحن</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // If customize tab is selected, render the ShopCustomizer
  if (activeTab === 'customize') {
    return <ShopCustomizer userType="tajira" />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Crown className="w-8 h-8 text-secondary" />
              <h1 className="text-3xl font-bold">لوحة التاجرة</h1>
            </div>
            <p className="text-muted-foreground">مرحباً بك نورا الأميرة، إليك نظرة عامة على متجرك</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline"
              onClick={() => setActiveTab('customize')}
              className="flex items-center gap-2"
            >
              <Brush className="w-4 h-4" />
              تخصيص المتجر
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 ml-2" />
              إضافة منتج جديد
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            <TabsTrigger value="customize">تخصيص المتجر</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    الطلبات الأخيرة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                          <p className="text-sm">{order.product}</p>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-primary">{order.amount} ر.س</p>
                          {getStatusBadge(order.status)}
                          <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    المنتجات الأكثر مبيعاً
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 3).map((product, index) => (
                      <div key={product.id} className="flex items-center gap-3">
                        <div className="relative">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                            {index + 1}
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.sold} مبيعة</p>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-primary">{product.price} ر.س</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>إدارة المنتجات</CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة منتج
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-muted-foreground">السعر: {product.price} ر.س</span>
                          <span className="text-sm text-muted-foreground">المخزون: {product.stock}</span>
                          <span className="text-sm text-muted-foreground">المبيعات: {product.sold}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusBadge(product.status)}
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div>
                        <h3 className="font-semibold">{order.id}</h3>
                        <p className="text-sm text-muted-foreground">العميلة: {order.customer}</p>
                        <p className="text-sm">المنتج: {order.product}</p>
                        <p className="text-xs text-muted-foreground mt-1">تاريخ الطلب: {order.date}</p>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-primary text-lg">{order.amount} ر.س</p>
                        {getStatusBadge(order.status)}
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">عرض التفاصيل</Button>
                          <Button size="sm">تحديث الحالة</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    إحصائيات المبيعات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">سيتم عرض الرسوم البيانية هنا</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    الأداء الشهري
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>يناير 2025</span>
                      <span className="font-bold text-primary">12,500 ر.س</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>ديسمبر 2024</span>
                      <span className="font-bold">11,200 ر.س</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>نوفمبر 2024</span>
                      <span className="font-bold">9,800 ر.س</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customize" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brush className="w-5 h-5" />
                  تخصيص متجرك
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  صممي واجهة متجرك بالطريقة التي تعبر عن هويتك التجارية
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Brush className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">أداة تخصيص المتجر</h3>
                  <p className="text-muted-foreground mb-6">
                    استخدمي أداة السحب والإسقاط لتخصيص تخطيط متجرك، الألوان، والعلامة التجارية
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    onClick={() => setActiveTab('customize')}
                  >
                    بدء التخصيص
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