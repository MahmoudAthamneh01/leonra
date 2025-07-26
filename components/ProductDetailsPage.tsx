import React, { useState, useEffect } from 'react';
import { ChevronRight, ShoppingCart, Heart, Star, Filter, Grid, List, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  brand?: string;
  avgRating: number;
  reviewCount: number;
  tajira: {
    name: string;
    tajiraProfile?: {
      shopName: string;
      isVerified: boolean;
    };
  };
  isFeatured: boolean;
  quantity: number;
}

const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // في التطبيق الحقيقي، سنجلب ID المنتج من URL
  const productId = 1;

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      // هذا مثال للبيانات - في التطبيق الحقيقي سنستخدم API
      const mockProduct: Product = {
        id: 1,
        name: "فستان سهرة أنيق",
        description: "فستان سهرة راقي مصنوع من أجود الأقمشة، مناسب للمناسبات الخاصة والحفلات. يتميز بتصميم عصري يناسب جميع الأذواق.",
        price: 850,
        salePrice: 680,
        images: [
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
          "https://images.unsplash.com/photo-1566479179817-c92c3b8c1bd6?w=500",
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500"
        ],
        category: "ملابس",
        brand: "لينورا كولكشن",
        avgRating: 4.8,
        reviewCount: 24,
        tajira: {
          name: "سارة أحمد",
          tajiraProfile: {
            shopName: "متجر سارة للأزياء",
            isVerified: true
          }
        },
        isFeatured: true,
        quantity: 15
      };
      
      setProduct(mockProduct);
      setLoading(false);
    } catch (error) {
      console.error('خطأ في جلب المنتج:', error);
      setLoading(false);
    }
  };

  const addToCart = () => {
    console.log(`إضافة ${quantity} من المنتج ${product?.id} للسلة`);
    // هنا سنضيف للسلة
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log(isWishlisted ? 'إزالة من المفضلة' : 'إضافة للمفضلة');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <div className="grid grid-cols-4 gap-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="aspect-square bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">المنتج غير موجود</h2>
          <p className="text-gray-600">عذراً، لم نتمكن من العثور على هذا المنتج.</p>
        </div>
      </div>
    );
  }

  const discount = product.salePrice ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <span>الرئيسية</span>
          <ChevronRight className="w-4 h-4" />
          <span>{product.category}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#991b1b]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* معرض الصور */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-[#991b1b] ring-2 ring-[#991b1b]/20' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* تفاصيل المنتج */}
          <div className="space-y-6">
            {/* العنوان والتقييم */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isFeatured && (
                  <Badge className="bg-[#d4af37] text-white">مميز</Badge>
                )}
                {product.quantity < 10 && (
                  <Badge variant="destructive">كمية محدودة</Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= product.avgRating
                            ? 'fill-[#d4af37] text-[#d4af37]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviewCount} تقييم)</span>
                </div>
              </div>
            </div>

            {/* السعر */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-[#991b1b]">
                {product.salePrice || product.price} ر.س
              </span>
              {product.salePrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {product.price} ر.س
                  </span>
                  <Badge className="bg-red-500">خصم {discount}%</Badge>
                </>
              )}
            </div>

            {/* معلومات التاجرة */}
            <Card className="border-[#991b1b]/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#991b1b] to-[#dc2626] rounded-full flex items-center justify-center text-white font-bold">
                      {product.tajira.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {product.tajira.tajiraProfile?.shopName}
                      </h3>
                      <p className="text-sm text-gray-600">{product.tajira.name}</p>
                    </div>
                  </div>
                  {product.tajira.tajiraProfile?.isVerified && (
                    <Badge className="bg-green-500">موثق</Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* الوصف */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">وصف المنتج</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* اختيار الكمية */}
            <div className="flex items-center gap-4">
              <label className="font-semibold text-gray-900">الكمية:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-600">
                متوفر {product.quantity} قطعة
              </span>
            </div>

            {/* أزرار الإجراءات */}
            <div className="space-y-3">
              <Button
                onClick={addToCart}
                className="w-full bg-[#991b1b] hover:bg-[#991b1b]/90 text-white h-12 text-lg"
                disabled={product.quantity === 0}
              >
                <ShoppingCart className="w-5 h-5 ml-2" />
                {product.quantity === 0 ? 'غير متوفر' : 'إضافة للسلة'}
              </Button>
              
              <Button
                onClick={toggleWishlist}
                variant="outline"
                className="w-full h-12 border-[#991b1b] text-[#991b1b] hover:bg-[#991b1b]/5"
              >
                <Heart 
                  className={`w-5 h-5 ml-2 ${isWishlisted ? 'fill-current' : ''}`} 
                />
                {isWishlisted ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
              </Button>
            </div>

            {/* معلومات إضافية */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-[#991b1b]">📦</div>
                <p className="text-sm font-semibold">شحن مجاني</p>
                <p className="text-xs text-gray-600">للطلبات أكثر من 200 ر.س</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-[#991b1b]">🔄</div>
                <p className="text-sm font-semibold">إرجاع مجاني</p>
                <p className="text-xs text-gray-600">خلال 14 يوم</p>
              </div>
            </div>
          </div>
        </div>

        {/* تبويبات إضافية */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">تفاصيل المنتج</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات</TabsTrigger>
              <TabsTrigger value="shipping">الشحن والإرجاع</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">معلومات تفصيلية</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">العلامة التجارية:</span>
                      <span className="mr-2">{product.brand}</span>
                    </div>
                    <div>
                      <span className="font-medium">الفئة:</span>
                      <span className="mr-2">{product.category}</span>
                    </div>
                    <div>
                      <span className="font-medium">الكمية المتوفرة:</span>
                      <span className="mr-2">{product.quantity} قطعة</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">تقييمات العملاء</h3>
                  <p className="text-gray-600">
                    قريباً... سيتم عرض تقييمات ومراجعات العملاء هنا
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">سياسة الشحن والإرجاع</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">الشحن:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                        <li>شحن مجاني للطلبات أكثر من 200 ر.س</li>
                        <li>التوصيل خلال 2-5 أيام عمل</li>
                        <li>إمكانية التوصيل السريع خلال 24 ساعة</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">الإرجاع:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                        <li>إرجاع مجاني خلال 14 يوم</li>
                        <li>يجب أن يكون المنتج في حالته الأصلية</li>
                        <li>استرداد كامل للمبلغ</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
