import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Eye, Share2, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
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
  category?: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-all duration-300 group overflow-hidden">
        <CardContent className="p-0">
          <div className="flex">
            {/* Product Image */}
            <div className="relative w-48 h-48 flex-shrink-0">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onLoad={() => setImageLoaded(true)}
              />
              
              {/* Badges */}
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                {product.isSponsored && (
                  <Badge className="bg-secondary text-secondary-foreground text-xs">
                    <Crown className="w-3 h-3 ml-1" />
                    مميز
                  </Badge>
                )}
                {product.isNew && (
                  <Badge className="bg-green-600 text-white text-xs">جديد</Badge>
                )}
                {product.isBestseller && (
                  <Badge className="bg-primary text-white text-xs">الأكثر مبيعاً</Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge className="bg-red-600 text-white text-xs">
                    -{discountPercentage}%
                  </Badge>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-2 left-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-8 h-8 p-0 rounded-full"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button size="sm" variant="secondary" className="w-8 h-8 p-0 rounded-full">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="w-8 h-8 p-0 rounded-full">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="mb-3">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>بواسطة {product.seller}</span>
                    {product.modeledBy && (
                      <>
                        <span>•</span>
                        <span>عرض: {product.modeledBy}</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews} تقييم)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">{product.price} ر.س</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.originalPrice} ر.س
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 ml-1" />
                    عرض
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <ShoppingCart className="w-4 h-4 ml-1" />
                    إضافة للسلة
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid view (default)
  return (
    <Card className="hover:shadow-lg transition-all duration-300 group overflow-hidden">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {product.isSponsored && (
              <Badge className="bg-secondary text-secondary-foreground text-xs">
                <Crown className="w-3 h-3 ml-1" />
                مميز
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-green-600 text-white text-xs">جديد</Badge>
            )}
            {product.isBestseller && (
              <Badge className="bg-primary text-white text-xs">الأكثر مبيعاً</Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-red-600 text-white text-xs">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              className="w-8 h-8 p-0 rounded-full"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0 rounded-full">
              <Eye className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0 rounded-full">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Add to Cart - Hover Action */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
              <ShoppingCart className="w-4 h-4 ml-1" />
              إضافة للسلة
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-3">
            <h3 className="font-semibold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            <div className="text-sm text-muted-foreground mb-2">
              <div>بواسطة {product.seller}</div>
              {product.modeledBy && (
                <div>عرض: {product.modeledBy}</div>
              )}
            </div>

            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">{product.price} ر.س</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.originalPrice} ر.س
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}