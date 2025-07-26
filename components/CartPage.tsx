import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    salePrice?: number;
    images: string[];
    quantity: number;
    tajira: {
      name: string;
      tajiraProfile?: {
        shopName: string;
      };
    };
  };
  quantity: number;
  addedAt: string;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      // مثال للبيانات - في التطبيق الحقيقي سنستخدم API
      const mockCartItems: CartItem[] = [
        {
          id: 1,
          product: {
            id: 1,
            name: "فستان سهرة أنيق",
            price: 850,
            salePrice: 680,
            images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300"],
            quantity: 15,
            tajira: {
              name: "سارة أحمد",
              tajiraProfile: {
                shopName: "متجر سارة للأزياء"
              }
            }
          },
          quantity: 2,
          addedAt: "2024-01-15"
        },
        {
          id: 2,
          product: {
            id: 2,
            name: "حقيبة يد فاخرة",
            price: 450,
            images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300"],
            quantity: 8,
            tajira: {
              name: "مريم محمد",
              tajiraProfile: {
                shopName: "متجر مريم للإكسسوارات"
              }
            }
          },
          quantity: 1,
          addedAt: "2024-01-14"
        }
      ];
      
      setCartItems(mockCartItems);
      setLoading(false);
    } catch (error) {
      console.error('خطأ في جلب السلة:', error);
      setLoading(false);
    }
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId);
      return;
    }

    setCartItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, quantity: Math.min(newQuantity, item.product.quantity) }
          : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const applyPromoCode = () => {
    // مثال لتطبيق كود الخصم
    if (promoCode === 'LINORA10') {
      setPromoDiscount(10);
    } else if (promoCode === 'WELCOME20') {
      setPromoDiscount(20);
    } else {
      setPromoDiscount(0);
      alert('كود الخصم غير صحيح');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  const discount = (subtotal * promoDiscount) / 100;
  const shippingCost = subtotal >= 200 ? 0 : 25;
  const tax = (subtotal - discount) * 0.15; // ضريبة القيمة المضافة 15%
  const total = subtotal - discount + shippingCost + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            {[1,2,3].map(i => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">السلة فارغة</h2>
            <p className="text-gray-600 mb-8">لم تقومي بإضافة أي منتجات للسلة بعد</p>
            <Button 
              className="bg-[#991b1b] hover:bg-[#991b1b]/90 text-white px-8 py-3"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 ml-2" />
              متابعة التسوق
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] to-white">
      <div className="container mx-auto px-4 py-8">
        {/* العنوان */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">سلة التسوق</h1>
          <Badge className="bg-[#991b1b]">
            {cartItems.length} منتج
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* منتجات السلة */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const price = item.product.salePrice || item.product.price;
              const originalPrice = item.product.price;
              const hasDiscount = item.product.salePrice && item.product.salePrice < originalPrice;
              
              return (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* صورة المنتج */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* تفاصيل المنتج */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {item.product.tajira.tajiraProfile?.shopName}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* السعر */}
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-[#991b1b]">
                              {price} ر.س
                            </span>
                            {hasDiscount && (
                              <span className="text-sm text-gray-500 line-through">
                                {originalPrice} ر.س
                              </span>
                            )}
                          </div>

                          {/* تحكم في الكمية */}
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 min-w-[50px] text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 disabled:opacity-50"
                              disabled={item.quantity >= item.product.quantity}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* رسالة إذا كانت الكمية محدودة */}
                        {item.product.quantity <= 5 && (
                          <p className="text-xs text-red-600 mt-2">
                            متبقي {item.product.quantity} قطع فقط!
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* ملخص الطلب */}
          <div className="space-y-6">
            {/* كود الخصم */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">كود الخصم</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="أدخلي كود الخصم"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={applyPromoCode}
                    variant="outline"
                    className="border-[#991b1b] text-[#991b1b] hover:bg-[#991b1b]/5"
                  >
                    تطبيق
                  </Button>
                </div>
                {promoDiscount > 0 && (
                  <div className="text-green-600 text-sm">
                    ✓ تم تطبيق خصم {promoDiscount}%
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ملخص الطلب */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي:</span>
                    <span>{subtotal.toFixed(2)} ر.س</span>
                  </div>
                  
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>الخصم ({promoDiscount}%):</span>
                      <span>-{discount.toFixed(2)} ر.س</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>الشحن:</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600">مجاني</span>
                      ) : (
                        `${shippingCost} ر.س`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>ضريبة القيمة المضافة (15%):</span>
                    <span>{tax.toFixed(2)} ر.س</span>
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>المجموع الكلي:</span>
                      <span className="text-[#991b1b]">{total.toFixed(2)} ر.س</span>
                    </div>
                  </div>
                </div>

                {/* رسالة الشحن المجاني */}
                {subtotal < 200 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                    أضيفي {(200 - subtotal).toFixed(2)} ر.س أخرى للحصول على شحن مجاني!
                  </div>
                )}

                <Button 
                  className="w-full bg-[#991b1b] hover:bg-[#991b1b]/90 text-white h-12 text-lg"
                  onClick={() => console.log('الانتقال لصفحة الدفع')}
                >
                  <CreditCard className="w-5 h-5 ml-2" />
                  إتمام الطلب
                </Button>

                <Button 
                  variant="outline"
                  className="w-full border-[#991b1b] text-[#991b1b] hover:bg-[#991b1b]/5"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-5 h-5 ml-2" />
                  متابعة التسوق
                </Button>
              </CardContent>
            </Card>

            {/* ضمانات */}
            <Card className="bg-gradient-to-br from-[#991b1b]/5 to-[#d4af37]/5">
              <CardContent className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔒</span>
                    <span>دفع آمن ومحمي</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📦</span>
                    <span>شحن سريع وموثوق</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔄</span>
                    <span>إرجاع مجاني خلال 14 يوم</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
