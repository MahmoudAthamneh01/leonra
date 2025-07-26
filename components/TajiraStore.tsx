import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingCart, Heart, User, Menu, Star, 
  Filter, Grid, List, ChevronDown, Truck, Shield,
  RotateCcw, Phone, Mail, MapPin, Clock, Award,
  ChevronRight, Eye, Share2, Plus, Minus
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  category: string;
  colors: string[];
  sizes: string[];
}

export function TajiraStore() {
  const [cartItems, setCartItems] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const storeInfo = {
    name: 'بوتيك الأميرة نورا',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=face',
    phone: '+966 50 123 4567',
    email: 'info@boutiqueamira.com',
    address: 'الرياض، حي العليا، شارع الملك فهد',
    rating: 4.8,
    reviews: 1247,
    established: '2022'
  };

  const categories = [
    { id: 'all', name: 'جميع المنتجات', count: 156 },
    { id: 'dresses', name: 'فساتين', count: 45 },
    { id: 'abayas', name: 'عبايات', count: 32 },
    { id: 'bags', name: 'حقائب', count: 25 },
    { id: 'jewelry', name: 'مجوهرات', count: 26 },
    { id: 'accessories', name: 'إكسسوارات', count: 28 }
  ];

  const priceRanges = [
    { id: 'all', name: 'جميع الأسعار', min: 0, max: 10000 },
    { id: 'under100', name: 'أقل من 100 ر.س', min: 0, max: 100 },
    { id: '100-300', name: '100 - 300 ر.س', min: 100, max: 300 },
    { id: '300-500', name: '300 - 500 ر.س', min: 300, max: 500 },
    { id: '500-1000', name: '500 - 1000 ر.س', min: 500, max: 1000 },
    { id: 'over1000', name: 'أكثر من 1000 ر.س', min: 1000, max: 10000 }
  ];

  const sortOptions = [
    { id: 'newest', name: 'الأحدث' },
    { id: 'oldest', name: 'الأقدم' },
    { id: 'price-low', name: 'السعر: من الأقل للأعلى' },
    { id: 'price-high', name: 'السعر: من الأعلى للأقل' },
    { id: 'rating', name: 'الأعلى تقييماً' },
    { id: 'popular', name: 'الأكثر شعبية' }
  ];

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to load products', err));
  }, []);

  const filteredProducts = products.filter(product => {
    const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
    const priceMatch = priceRange === 'all' || (
      product.price >= priceRanges.find(r => r.id === priceRange)?.min! &&
      product.price <= priceRanges.find(r => r.id === priceRange)?.max!
    );
    return categoryMatch && priceMatch;
  });

  const ProductCard = ({ product }: { product: any }) => {
    const discountPercentage = product.originalPrice 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    return (
      <Card className="group relative hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <div className="relative">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              خصم {discountPercentage}%
            </div>
          )}

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white bg-black bg-opacity-70 px-3 py-1 rounded">نفذ من المخزن</span>
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0 rounded-full bg-white shadow-md">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0 rounded-full bg-white shadow-md">
              <Eye className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0 rounded-full bg-white shadow-md">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-3">
          <h3 className="font-medium text-sm mb-2 line-clamp-2 h-10">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[1,2,3,4,5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-lg text-primary">{product.price} ر.س</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice} ر.س
              </span>
            )}
          </div>

          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-4 h-4 ml-2" />
            {product.inStock ? 'إضافة للسلة' : 'نفذ من المخزن'}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Store Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 text-xs text-gray-600 border-b">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {storeInfo.phone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {storeInfo.email}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>شحن مجاني للطلبات أكثر من 300 ر.س</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span>{storeInfo.rating} ({storeInfo.reviews} تقييم)</span>
              </div>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <ImageWithFallback
                src={storeInfo.logo}
                alt={storeInfo.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h1 className="font-bold text-xl text-gray-900">{storeInfo.name}</h1>
                <p className="text-xs text-gray-500">متجر معتمد منذ {storeInfo.established}</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ابحث في المتجر..."
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Button className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 h-10">
                  بحث
                </Button>
              </div>
            </div>

            {/* Cart & User */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="relative">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </Button>
              <Button variant="ghost">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-8 py-3">
            <Button variant="ghost" className="flex items-center gap-2">
              <Menu className="w-4 h-4" />
              الفئات
            </Button>
            {categories.slice(1, 6).map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className="text-gray-700 hover:text-primary"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
            <div className="flex-1"></div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Truck className="w-4 h-4" />
                شحن سريع
              </div>
              <div className="flex items-center gap-1">
                <RotateCcw className="w-4 h-4" />
                إرجاع مجاني
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                دفع آمن
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Promotional Banner */}
      <section className="bg-gradient-to-r from-primary to-red-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">عرض خاص - خصم 30% على جميع المنتجات</h2>
          <p className="text-lg opacity-90">استخدمي كود: SAVE30 - ينتهي العرض خلال 48 ساعة</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">تصفية المنتجات</h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">الفئات</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-between"
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <span>{category.name}</span>
                      <span className="text-xs">({category.count})</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">نطاق السعر</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <Button
                      key={range.id}
                      variant={priceRange === range.id ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setPriceRange(range.id)}
                    >
                      {range.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Brand Info */}
              <div className="border-t pt-6">
                <h4 className="font-medium mb-3">عن المتجر</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {storeInfo.address}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    خدمة العملاء: 9 ص - 10 م
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    متجر موثق ومعتمد
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">المنتجات</h2>
                <p className="text-gray-600">عرض {filteredProducts.length} منتج</p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">ترتيب حسب:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-4 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">لا توجد منتجات</h3>
                <p className="text-gray-600 mb-4">جرب تغيير المرشحات أو البحث عن شيء آخر</p>
                <Button onClick={() => {
                  setActiveCategory('all');
                  setPriceRange('all');
                }}>
                  إعادة تعيين المرشحات
                </Button>
              </div>
            )}

            {/* Load More */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  عرض المزيد من المنتجات
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-white py-12 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">شحن سريع</h3>
              <p className="text-sm text-gray-600">توصيل خلال 24-48 ساعة</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <RotateCcw className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">إرجاع مجاني</h3>
              <p className="text-sm text-gray-600">إرجاع خلال 14 يوم</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">دفع آمن</h3>
              <p className="text-sm text-gray-600">حماية كاملة للبيانات</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">دعم العملاء</h3>
              <p className="text-sm text-gray-600">خدمة 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">{storeInfo.name}</h3>
              <p className="text-gray-400 mb-4">
                متجر متخصص في أزياء النساء العصرية والأنيقة
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {storeInfo.address}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {storeInfo.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {storeInfo.email}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">عن المتجر</a></li>
                <li><a href="#" className="hover:text-white">اتصل بنا</a></li>
                <li><a href="#" className="hover:text-white">الأسئلة الشائعة</a></li>
                <li><a href="#" className="hover:text-white">سياسة الإرجاع</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">خدمة العملاء</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">تتبع الطلب</a></li>
                <li><a href="#" className="hover:text-white">الشحن والتوصيل</a></li>
                <li><a href="#" className="hover:text-white">طرق الدفع</a></li>
                <li><a href="#" className="hover:text-white">الضمان</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">تابعينا</h4>
              <p className="text-sm text-gray-400 mb-4">
                اشتركي للحصول على آخر العروض والمنتجات الجديدة
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-3 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="bg-primary hover:bg-primary/90">
                  اشتراك
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 {storeInfo.name}. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}