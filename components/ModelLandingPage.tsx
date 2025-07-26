import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Sparkles, Camera, ShoppingBag } from 'lucide-react';

export function ModelLandingPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-primary">مرحبا بك في مجتمع لينورا للعارضات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground">
            انضمي إلينا واكتشفي فرصا للتعاون مع أفضل التاجرات وتمتعي بإدارة عروضك بكل سهولة.
          </p>
          <div className="grid grid-cols-3 gap-4 text-primary">
            <div className="flex flex-col items-center">
              <Sparkles className="w-8 h-8 mb-2" />
              <span>إبراز منتجات التاجرات</span>
            </div>
            <div className="flex flex-col items-center">
              <Camera className="w-8 h-8 mb-2" />
              <span>ملف شخصي احترافي</span>
            </div>
            <div className="flex flex-col items-center">
              <ShoppingBag className="w-8 h-8 mb-2" />
              <span>عمولات مجزية</span>
            </div>
          </div>
          <Button className="w-full mt-4">ابدأي الآن</Button>
        </CardContent>
      </Card>
    </div>
  );
}
