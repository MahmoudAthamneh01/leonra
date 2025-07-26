import React, { useState } from 'react';
import { 
  Shield, Users, AlertTriangle, CheckCircle, XCircle, 
  Eye, Edit, Trash2, Crown, Star, Package, DollarSign,
  BarChart3, Calendar, Settings, FileText, Bell, Brush
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'إجمالي المستخدمات',
      value: '2,456',
      change: '+12.3%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'التاجرات النشطات',
      value: '342',
      change: '+8.7%',
      icon: Crown,
      color: 'text-primary'
    },
    {
      title: 'العارضات المتاحات',
      value: '128',
      change: '+15.2%',
      icon: Star,
      color: 'text-secondary'
    },
    {
      title: 'البلاغات المعلقة',
      value: '7',
      change: '-2',
      icon: AlertTriangle,
      color: 'text-orange-600'
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: 'tajira',
      name: 'سارة محمد',
      shopName: 'متجر الأناقة',
      email: 'sara@example.com',
      phone: '+966501234567',
      date: '2025-01-15',
      status: 'pending'
    },
    {
      id: 2,
      type: 'model',
      name: 'نورا أحمد',
      speciality: 'مكياج وجمال',
      email: 'nora@example.com',
      instagram: '@nora_beauty',
      date: '2025-01-14',
      status: 'pending'
    },
    {
      id: 3,
      type: 'tajira',
      name: 'فاطمة علي',
      shopName: 'بوتيك الملكة',
      email: 'fatima@example.com',
      phone: '+966507654321',
      date: '2025-01-13',
      status: 'pending'
    }
  ];

  const complaints = [
    {
      id: 1,
      title: 'مشكلة في جودة المنتج',
      reporter: 'منى الزهراني',
      against: 'متجر الورد',
      type: 'product_quality',
      status: 'open',
      priority: 'high',
      date: '2025-01-15'
    },
    {
      id: 2,
      title: 'تأخير في التسليم',
      reporter: 'ريم السعدي',
      against: 'بوتيك النجمة',
      type: 'delivery',
      status: 'investigating',
      priority: 'medium',
      date: '2025-01-14'
    },
    {
      id: 3,
      title: 'مشكلة في الدفع',
      reporter: 'هند الأحمدي',
      against: 'متجر الأميرة',
      type: 'payment',
      status: 'resolved',
      priority: 'low',
      date: '2025-01-12'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'تم قبول تاجرة جديدة',
      user: 'ليلى الحربي - متجر الأناقة الراقية',
      time: 'منذ ساعتين'
    },
    {
      id: 2,
      action: 'تم حل شكوى عميلة',
      user: 'شكوى #1234 - مشكلة في التسليم',
      time: 'منذ 4 ساعات'
    },
    {
      id: 3,
      action: 'عارضة جديدة انضمت',
      user: 'دانة المطيري - تخصص أزياء',
      time: 'منذ 6 ساعات'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">في الانتظار</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">معتمد</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">مرفوض</Badge>;
      case 'open':
        return <Badge className="bg-red-100 text-red-800">مفتوح</Badge>;
      case 'investigating':
        return <Badge className="bg-blue-100 text-blue-800">قيد التحقيق</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">محلول</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500 text-white">عالية</Badge>;
      case 'medium':
        return <Badge className="bg-orange-500 text-white">متوسطة</Badge>;
      case 'low':
        return <Badge className="bg-green-500 text-white">منخفضة</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case 'tajira':
        return <Crown className="w-4 h-4 text-primary" />;
      case 'model':
        return <Star className="w-4 h-4 text-secondary" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">لوحة المشرف</h1>
            </div>
            <p className="text-muted-foreground">مرحباً أمل الإدارية، إليك نظرة عامة على النظام</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              الإشعارات
              <Badge className="mr-1">3</Badge>
            </Button>
            <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              إعدادات النظام
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
            <TabsTrigger value="approvals">الموافقات</TabsTrigger>
            <TabsTrigger value="complaints">الشكاوى</TabsTrigger>
            <TabsTrigger value="users">المستخدمين</TabsTrigger>
            <TabsTrigger value="customizer">تخصيص النظام</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Pending Approvals Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    الموافقات المعلقة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingApprovals.slice(0, 3).map((approval) => (
                      <div key={approval.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getUserTypeIcon(approval.type)}
                          <div>
                            <p className="font-semibold text-sm">{approval.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {approval.type === 'tajira' ? approval.shopName : approval.speciality}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(approval.status)}
                          <Button size="sm" variant="outline">
                            مراجعة
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    النشاطات الأخيرة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.user}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الموافقات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((approval) => (
                    <div key={approval.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        {getUserTypeIcon(approval.type)}
                        <div className="flex-1">
                          <h3 className="font-semibold">{approval.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {approval.type === 'tajira' ? `متجر: ${approval.shopName}` : `تخصص: ${approval.speciality}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            البريد: {approval.email} | 
                            {approval.type === 'tajira' ? ` الجوال: ${approval.phone}` : ` الانستغرام: ${approval.instagram}`}
                          </p>
                          <p className="text-xs text-muted-foreground">تاريخ التقديم: {approval.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(approval.status)}
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <CheckCircle className="w-4 h-4 ml-1" />
                          قبول
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="w-4 h-4 ml-1" />
                          رفض
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaints" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الشكاوى</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaints.map((complaint) => (
                    <div key={complaint.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <h3 className="font-semibold">{complaint.title}</h3>
                          {getPriorityBadge(complaint.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          المبلغة: {complaint.reporter} | ضد: {complaint.against}
                        </p>
                        <p className="text-xs text-muted-foreground">تاريخ البلاغ: {complaint.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(complaint.status)}
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 ml-1" />
                          التفاصيل
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة المستخدمين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">إدارة المستخدمين</h3>
                  <p className="text-muted-foreground mb-6">
                    عرض وإدارة جميع المستخدمين في النظام
                  </p>
                  <Button size="lg">
                    عرض جميع المستخدمين
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customizer" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    تخصيص المنصة العامة
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">تخصيص المظهر العام والإعدادات الأساسية للمنصة</p>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Settings className="w-12 h-12 mx-auto text-primary mb-4" />
                    <h4 className="font-semibold mb-2">أداة تخصيص المنصة</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      إدارة الألوان، الشعار، والتخطيط العام للمنصة
                    </p>
                    <Button className="bg-primary hover:bg-primary/90 w-full">
                      فتح أداة التخصيص
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brush className="w-5 h-5" />
                    إعدادات المظهر السريعة
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">تغييرات سريعة للمظهر العام</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">نظام الألوان الحالي</Label>
                      <div className="flex gap-2 mt-2">
                        <div className="w-8 h-8 bg-primary rounded border-2 border-white shadow-sm"></div>
                        <div className="w-8 h-8 bg-secondary rounded border-2 border-white shadow-sm"></div>
                        <div className="w-8 h-8 bg-background rounded border-2 border-white shadow-sm"></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">أحمر داكن وذهبي - كلاسيكي</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm">الإحصائيات</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                        <div className="bg-muted p-2 rounded">
                          <div className="font-semibold">المستخدمات</div>
                          <div className="text-muted-foreground">2,456 نشطة</div>
                        </div>
                        <div className="bg-muted p-2 rounded">
                          <div className="font-semibold">الثيم</div>
                          <div className="text-muted-foreground">كلاسيكي</div>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      إعدادات متقدمة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}