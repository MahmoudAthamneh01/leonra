import React, { useState } from 'react';
import { Phone, Mail, Lock, User, Crown, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
// Using a placeholder image URL for the logo
const exampleImage = 'https://images.unsplash.com/photo-1611095564763-e4e1e0c5f54c?w=100&h=100&fit=crop';

export function AuthPage() {
  const [authStep, setAuthStep] = useState<'login' | 'register' | 'otp' | 'complete'>('login');
  const [userType, setUserType] = useState<'buyer' | 'tajira' | 'model'>('buyer');
  const [contactMethod, setContactMethod] = useState<'phone' | 'email'>('phone');
  const [otpValue, setOtpValue] = useState('');

  const userTypes = [
    {
      type: 'buyer',
      title: 'عميلة',
      description: 'للتسوق والشراء من المتاجر',
      icon: User,
      color: 'text-blue-600'
    },
    {
      type: 'tajira',
      title: 'تاجرة',
      description: 'لبيع المنتجات وإدارة المتجر',
      icon: Crown,
      color: 'text-primary'
    },
    {
      type: 'model',
      title: 'عارضة (3ardah)',
      description: 'لعرض المنتجات والتعاون مع التاجرات',
      icon: Star,
      color: 'text-secondary'
    }
  ];

  const handleSendOTP = () => {
    // Simulate sending OTP
    setAuthStep('otp');
  };

  const handleVerifyOTP = () => {
    if (otpValue.length === 4) {
      if (authStep === 'otp' && userType !== 'buyer') {
        setAuthStep('complete');
      } else {
        // Redirect to dashboard or home
        console.log('Login successful');
      }
    }
  };

  const renderUserTypeSelection = () => (
    <div className="space-y-4">
      <h3 className="text-center mb-4">اختاري نوع الحساب</h3>
      <div className="grid gap-3">
        {userTypes.map((type) => (
          <Card
            key={type.type}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              userType === type.type ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            onClick={() => setUserType(type.type as any)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${type.color} bg-opacity-10`}>
                  <type.icon className={`w-5 h-5 ${type.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{type.title}</h4>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
                {userType === type.type && (
                  <Badge className="bg-primary">مختار</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContactForm = () => (
    <div className="space-y-4">
      {/* Contact Method Toggle */}
      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        <Button
          variant={contactMethod === 'phone' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setContactMethod('phone')}
        >
          <Phone className="w-4 h-4 ml-2" />
          رقم الجوال
        </Button>
        <Button
          variant={contactMethod === 'email' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setContactMethod('email')}
        >
          <Mail className="w-4 h-4 ml-2" />
          البريد الإلكتروني
        </Button>
      </div>

      {contactMethod === 'phone' ? (
        <div className="space-y-2">
          <Label>رقم الجوال</Label>
          <div className="flex">
            <div className="bg-muted px-3 py-2 rounded-r-lg border border-l-0 flex items-center">
              +966
            </div>
            <Input
              placeholder="5xxxxxxxx"
              className="rounded-r-none"
              dir="ltr"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Label>البريد الإلكتروني</Label>
          <Input
            type="email"
            placeholder="example@domain.com"
            dir="ltr"
          />
        </div>
      )}

      {authStep === 'register' && (
        <>
          <div className="space-y-2">
            <Label>الاسم الكامل</Label>
            <Input placeholder="اكتبي اسمك الكامل" />
          </div>
          
          <div className="space-y-2">
            <Label>كلمة المرور</Label>
            <Input type="password" placeholder="اختاري كلمة مرور قوية" />
          </div>

          <div className="space-y-2">
            <Label>تأكيد كلمة المرور</Label>
            <Input type="password" placeholder="أعيدي كتابة كلمة المرور" />
          </div>
        </>
      )}
    </div>
  );

  const renderOTPVerification = () => (
    <div className="space-y-6 text-center">
      <div>
        <h3 className="text-lg font-semibold mb-2">تأكيد الهوية</h3>
        <p className="text-muted-foreground">
          تم إرسال رمز التحقق إلى {contactMethod === 'phone' ? 'رقم جوالك' : 'بريدك الإلكتروني'}
        </p>
      </div>
      
      <div className="flex justify-center">
        <InputOTP maxLength={4} value={otpValue} onChange={setOtpValue}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="space-y-2">
        <Button 
          className="w-full" 
          onClick={handleVerifyOTP}
          disabled={otpValue.length !== 4}
        >
          تأكيد الرمز
        </Button>
        <Button variant="ghost" className="w-full">
          إعادة إرسال الرمز
        </Button>
      </div>
    </div>
  );

  const renderCompletionForm = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <Crown className="w-12 h-12 mx-auto text-primary mb-2" />
        <h3 className="text-lg font-semibold">إكمال بيانات الحساب</h3>
        <p className="text-muted-foreground">
          {userType === 'tajira' ? 'أكملي بيانات متجرك' : 'أكملي بيان��ت ملفك الشخصي'}
        </p>
      </div>

      {userType === 'tajira' && (
        <>
          <div className="space-y-2">
            <Label>اسم المتجر</Label>
            <Input placeholder="اسم متجرك التجاري" />
          </div>
          
          <div className="space-y-2">
            <Label>تخصص المتجر</Label>
            <select className="w-full p-2 border rounded-lg">
              <option>الجمال ومستحضرات التجميل</option>
              <option>الأزياء والملابس</option>
              <option>الإكسسوارات والمجوهرات</option>
              <option>المنزل والديكور</option>
              <option>أخرى</option>
            </select>
          </div>
        </>
      )}

      {userType === 'model' && (
        <>
          <div className="space-y-2">
            <Label>الاسم المهني</Label>
            <Input placeholder="اسمك كعارضة" />
          </div>
          
          <div className="space-y-2">
            <Label>التخصص</Label>
            <select className="w-full p-2 border rounded-lg">
              <option>عرض أزياء</option>
              <option>مستحضرات تجميل</option>
              <option>إكسسوارات</option>
              <option>متنوع</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>رابط الانستغرام (اختياري)</Label>
            <Input placeholder="@username" dir="ltr" />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label>المدينة</Label>
        <select className="w-full p-2 border rounded-lg">
          <option>الرياض</option>
          <option>جدة</option>
          <option>الدمام</option>
          <option>مكة المكرمة</option>
          <option>المدينة المنورة</option>
          <option>أخرى</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md elegant-shadow">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={exampleImage} alt="Linora" className="w-20 h-20 object-contain" />
          </div>
          <CardTitle className="text-2xl text-primary">
            {authStep === 'login' && 'تسجيل الدخول'}
            {authStep === 'register' && 'إنشاء حساب جديد'}
            {authStep === 'otp' && 'تأكيد الهوية'}
            {authStep === 'complete' && 'إكمال البيانات'}
          </CardTitle>
          <p className="text-muted-foreground">
            {authStep === 'login' && 'مرحباً بعودتك إلى لينورا'}
            {authStep === 'register' && 'انضمي إلى مجتمع الملكات'}
            {authStep === 'otp' && 'للحفاظ على أمان حسابك'}
            {authStep === 'complete' && 'خطوة أخيرة لإكمال حسابك'}
          </p>
        </CardHeader>

        <CardContent>
          {authStep === 'login' && (
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
                <TabsTrigger value="register" onClick={() => setAuthStep('register')}>
                  حساب جديد
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                {renderContactForm()}
                <Button className="w-full" onClick={handleSendOTP}>
                  تسجيل الدخول
                </Button>
              </TabsContent>
            </Tabs>
          )}

          {authStep === 'register' && (
            <div className="space-y-6">
              {renderUserTypeSelection()}
              {renderContactForm()}
              <Button className="w-full" onClick={handleSendOTP}>
                إنشاء الحساب
              </Button>
              <div className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setAuthStep('login')}
                  className="text-sm"
                >
                  لديك حساب بالفعل؟ سجلي الدخول
                </Button>
              </div>
            </div>
          )}

          {authStep === 'otp' && renderOTPVerification()}

          {authStep === 'complete' && (
            <div className="space-y-6">
              {renderCompletionForm()}
              <Button className="w-full">
                إكمال التسجيل
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-6 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              بالمتابعة، أنت توافقين على{' '}
              <button className="text-primary hover:underline">شروط الاستخدام</button>
              {' '}و{' '}
              <button className="text-primary hover:underline">سياسة الخصوصية</button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}