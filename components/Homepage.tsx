import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingBag, Heart, User, Filter, Star, 
  Crown, ArrowRight, Play, CheckCircle, Users, 
  TrendingUp, Award, Sparkles, Target, Zap,
  MessageCircle, Shield, Gift, Camera, Palette
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ProductCard } from './ProductCard';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  seller: string;
  isSponsored?: boolean;
  modeledBy?: string;
}

export function Homepage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);

  const categories = [
    { id: 'all', name: 'الكل', count: 1250 },
    { id: 'fashion', name: 'أزياء', count: 450 },
    { id: 'beauty', name: 'جمال', count: 320 },
    { id: 'accessories', name: 'إكسسوارات', count: 280 },
    { id: 'home', name: 'منزل', count: 200 }
  ];

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to load products', err));
  }, []);

  const featuredSellers = [
    {
      name: 'بوتيك الأميرة',
      specialty: 'أزياء راقية',
      rating: 4.9,
      products: 145,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face',
      verified: true
    },
    {
      name: 'مجوهرات الملكة',
      specialty: 'مجوهرات فاخرة',
      rating: 4.8,
      products: 89,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b69906b4?w=100&h=100&fit=crop&crop=face',
      verified: true
    },
    {
      name: 'أناقة المرأة',
      specialty: 'اكسسوارات',
      rating: 4.7,
      products: 203,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      verified: true
    }
  ];

  const ourServices = [
    {
      title: 'للتاجرات الطموحات',
      description: 'منصة متكاملة لبناء متجرك الإلكتروني وإدارة أعمالك بسهولة',
      features: [
        'متجر إلكتروني مخصص بالكامل',
        'أدوات إدارة المخزون والطلبات',
        'تحليلات مبيعات متقدمة',
        'دعم فني متواصل 24/7'
      ],
      icon: Crown,
      color: 'from-primary to-red-600',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop'
    },
    {
      title: 'للعارضات المبدعات',
      description: 'اعرضي منتجات التاجرات واكسبي عمولات مجزية من كل عملية بيع',
      features: [
        'ملف شخصي احترافي',
        'أدوات تصوير وعرض متقدمة',
        'نظام عمولات مرن وشفاف',
        'مجتمع داعم من العارضات'
      ],
      icon: Star,
      color: 'from-secondary to-yellow-500',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop'
    },
    {
      title: 'للعميلات المميزات',
      description: 'تسوقي من مجموعة منتقاة بعناية مع تجربة تسوق فريدة ومخصصة',
      features: [
        'منتجات حصرية ومنتقاة',
        'تجربة تسوق مخصصة',
        'توصيل سريع وآمن',
        'ضمان الجودة والأصالة'
      ],
      icon: Gift,
      color: 'from-purple-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'التاجرة تنشئ متجرها',
      description: 'تقوم التاجرة بإنشاء متجرها الإلكتروني وإضافة منتجاتها',
      icon: Crown
    },
    {
      step: '2',
      title: 'العارضة تختار المنتجات',
      description: 'تختار العارضة المنتجات المناسبة لها وتقوم بتصويرها',
      icon: Camera
    },
    {
      step: '3',
      title: 'العرض والتسويق',
      description: 'تعرض العارضة المنتجات بطريقة جذابة لجمهورها',
      icon: Sparkles
    },
    {
      step: '4',
      title: 'البيع والربح',
      description: 'عند البيع، تحصل التاجرة على الربح والعارضة على العمولة',
      icon: TrendingUp
    }
  ];

  const stats = [
    { number: '2,456', label: 'تاجرة نشطة', icon: Crown },
    { number: '1,284', label: 'عارضة مبدعة', icon: Star },
    { number: '48,392', label: 'عميلة سعيدة', icon: Users },
    { number: '156,789', label: 'منتج متنوع', icon: Gift }
  ];

  const successStories = [
    {
      name: 'فاطمة الزهراني',
      role: 'تاجرة',
      story: 'بدأت بـ 10 منتجات والآن لدي متجر يحقق أرباحاً شهرية تفوق 50 ألف ريال',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b69906b4?w=100&h=100&fit=crop&crop=face',
      achievement: '500% نمو في الأرباح'
    },
    {
      name: 'نورا العتيبي',
      role: 'عارضة',
      story: 'أصبحت أكسب 15 ألف ريال شهرياً من عرض المنتجات التي أحبها فعلاً',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      achievement: 'أعلى عارضة مبيعاً'
    },
    {
      name: 'سارة الحربي',
      role: 'عميلة',
      story: 'وجدت كل ما أحتاجه في مكان واحد مع جودة وأسعار ممتازة',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      achievement: 'عميلة مميزة'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop"
            alt="لينورا - منصة التجارة الإلكترونية للنساء"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20 px-6 py-2">
            ✨ منصة لينورا الرائدة
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            منصة التجارة الإلكترونية 
            <br />
            للنساء الرائدات
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            اكتشفي عالماً من الأناقة والجمال، حيث تلتقي التاجرات المبدعات بالعارضات الموهوبات لتقديم تجربة تسوق فريدة
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4">
              <ShoppingBag className="w-5 h-5 ml-2" />
              ابدئي التسوق الآن
            </Button>
            <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 px-8 py-4">
              <Crown className="w-5 h-5 ml-2" />
              انضمي كتاجرة
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-4">
              <Star className="w-5 h-5 ml-2" />
              كوني عارضة
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              ما نفعله
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              منصة متكاملة تجمع بين الإبداع والتجارة
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              لينورا ليست مجرد متجر إلكتروني، بل منظومة متكاملة تربط بين التاجرات الطموحات والعارضات المبدعات والعميلات المميزات
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ourServices.map((service, index) => (
              <Card key={service.title} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute top-4 right-4 p-3 rounded-full bg-gradient-to-r ${service.color}`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    اعرفي المزيد
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              كيف نعمل
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              رحلة النجاح في أربع خطوات
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نظام بسيط وفعال يضمن النجاح للجميع
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="text-center relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform translate-x-1/2"></div>
                )}
                <div className="relative z-10 mx-auto w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  {step.step}
                </div>
                <div className="mb-4">
                  <step.icon className="w-8 h-8 mx-auto text-primary" />
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              قصص النجاح
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              نجحن معنا، وأنت التالية
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              اقرئي قصص ملهمة لنساء حققن أحلامهن من خلال لينورا
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={story.name} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-bold mb-1">{story.name}</h3>
                  <Badge variant="outline" className="mb-4">{story.role}</Badge>
                  <p className="text-muted-foreground mb-4 italic">"{story.story}"</p>
                  <Badge className="bg-green-100 text-green-800">{story.achievement}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="ابحثي عن منتجاتك المفضلة..."
                className="w-full pr-12 pl-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90">
                بحث
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.name}
                <Badge variant="secondary" className="bg-muted text-muted-foreground">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sellers */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">التاجرات المميزات</h2>
            <Button variant="outline">
              عرض الكل
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredSellers.map((seller) => (
              <Card key={seller.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <ImageWithFallback
                      src={seller.image}
                      alt={seller.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{seller.name}</h3>
                        {seller.verified && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <CheckCircle className="w-3 h-3 ml-1" />
                            موثقة
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{seller.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">{seller.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{seller.products} منتج</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">المنتجات المختارة</h2>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 ml-2" />
                تصفية
              </Button>
              <Button variant="outline" size="sm">
                ترتيب حسب: الأحدث
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8">
              عرض المزيد من المنتجات
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            مستعدة لتكوني جزءاً من مجتمع لينورا؟
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            انضمي إلى آلاف النساء اللواتي حققن أحلامهن وبنين مستقبلهن من خلال منصتنا
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="px-8 py-4">
              <Crown className="w-5 h-5 ml-2" />
              ابدئي كتاجرة
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-4">
              <Star className="w-5 h-5 ml-2" />
              اصبحي عارضة
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}