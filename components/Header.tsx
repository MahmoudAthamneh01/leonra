import React, { useState } from 'react';
import { Search, ShoppingBag, User, Heart, Menu, Crown, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
// Using a placeholder image URL for the logo
const exampleImage = 'https://images.unsplash.com/photo-1611095564763-e4e1e0c5f54c?w=100&h=100&fit=crop';

interface HeaderProps {
  userType?: 'buyer' | 'tajira' | 'model' | 'admin';
  userName?: string;
}

export function Header({ userType = 'buyer', userName }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'الرئيسية', href: '/', icon: null },
    { name: 'الجمال', href: '/beauty', icon: null },
    { name: 'الأزياء', href: '/fashion', icon: null },
    { name: 'الإكسسوارات', href: '/accessories', icon: null },
    { name: 'المنزل', href: '/home', icon: null },
  ];

  const getUserTypeIcon = () => {
    switch (userType) {
      case 'tajira':
        return <Crown className="w-4 h-4 text-secondary" />;
      case 'model':
        return <Star className="w-4 h-4 text-secondary" />;
      case 'admin':
        return <Crown className="w-4 h-4 text-primary" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  return (
    <header className="bg-white elegant-shadow sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="hidden md:block">
              شحن مجاني للطلبات فوق 200 ريال
            </div>
            <div className="flex items-center gap-4">
              <span>تابعينا على:</span>
              <div className="flex gap-2">
                <button className="hover:text-secondary transition-colors">Instagram</button>
                <button className="hover:text-secondary transition-colors">TikTok</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <img src={exampleImage} alt="Linora" className="w-12 h-12 object-contain" />
                  <div>
                    <h3>مرحباً {userName || 'بك'}</h3>
                    <p className="text-sm text-muted-foreground">
                      {userType === 'tajira' && 'تاجرة'}
                      {userType === 'model' && 'عارضة'}
                      {userType === 'admin' && 'مشرف'}
                      {userType === 'buyer' && 'عميلة'}
                    </p>
                  </div>
                </div>
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    className="text-right py-3 px-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={exampleImage} alt="Linora" className="w-16 h-16 object-contain" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary">لينورا</h1>
              <p className="text-xs text-muted-foreground">للنساء الملكات</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="ابحثي عن منتجاتك المفضلة..."
                className="pr-10 bg-muted/50 border-none"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                className="hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="w-5 h-5" />
              <Badge className="absolute -top-1 -left-1 w-5 h-5 flex items-center justify-center p-0 bg-secondary text-secondary-foreground">
                3
              </Badge>
            </Button>
            
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingBag className="w-5 h-5" />
              <Badge className="absolute -top-1 -left-1 w-5 h-5 flex items-center justify-center p-0 bg-primary">
                2
              </Badge>
            </Button>

            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              {getUserTypeIcon()}
              <span className="hidden sm:inline">{userName || 'حسابي'}</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="ابحثي عن منتجاتك المفضلة..."
              className="pr-10 bg-muted/50 border-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
}