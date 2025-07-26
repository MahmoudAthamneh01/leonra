import React, { useState } from 'react';
import { Header } from './components/Header';
import { Homepage } from './components/Homepage';
import { TajiraDashboard } from './components/TajiraDashboard';
import { TajiraLandingPage } from './components/TajiraLandingPage';
import { ModelLandingPage } from './components/ModelLandingPage';
import { TajiraStore } from './components/TajiraStore';
import { ModelDashboard } from './components/ModelDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLandingPage } from './components/AdminLandingPage';
import { ShopCustomizer } from './components/ShopCustomizer';
import { AuthPage } from './components/AuthPage';

type Page = 'home' | 'auth' | 'dashboard' | 'shop' | 'store' | 'product' | 'cart' | 'customizer';
type UserType = 'buyer' | 'tajira' | 'model' | 'admin' | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userType, setUserType] = useState<UserType>('buyer');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to false to show auth page

  // Mock user data based on userType
  const getUserData = () => {
    switch (userType) {
      case 'tajira':
        return { name: 'نورا الأميرة', type: userType };
      case 'model':
        return { name: 'ريم الجوهرة', type: userType };
      case 'admin':
        return { name: 'أمل الإدارية', type: userType };
      default:
        return { name: 'عميلة كريمة', type: userType };
    }
  };

  const userData = getUserData();

  const renderPage = () => {
    if (!isAuthenticated) {
      return <AuthPage />;
    }

    switch (currentPage) {
      case 'home':
        // Different home pages for different user types
        switch (userType) {
          case 'admin':
            return <AdminLandingPage />;
          case 'tajira':
            return <TajiraLandingPage />;
          case 'model':
            return <ModelLandingPage />;
          default:
            return <Homepage />; // Regular shopping page for buyers
        }
      case 'dashboard':
        switch (userType) {
          case 'tajira':
            return <TajiraDashboard />;
          case 'model':
            return <ModelDashboard />;
          case 'admin':
            return <AdminDashboard />;
          default:
            return <Homepage />;
        }
      case 'store':
        // Show tajira's store view (how customers see it)
        if (userType === 'tajira') {
          return <TajiraStore />;
        }
        return <Homepage />;
      case 'customizer':
        // Allow tajira, model and admin to access customizer
        if (userType === 'tajira' || userType === 'model' || userType === 'admin') {
          return <ShopCustomizer userType={userType} />;
        }
        return <Homepage />;
      case 'auth':
        return <AuthPage />;
      default:
        // Default fallback based on user type
        switch (userType) {
          case 'admin':
            return <AdminLandingPage />;
          case 'tajira':
            return <TajiraLandingPage />;
          default:
            return <Homepage />;
        }
    }
  };

  const getDashboardLabel = () => {
    switch (userType) {
      case 'tajira':
        return 'لوحة التاجرة';
      case 'model':
        return 'لوحة العارضة';
      case 'admin':
        return 'لوحة المشرف';
      default:
        return 'اللوحة الشخصية';
    }
  };

  const getHomeLabel = () => {
    switch (userType) {
      case 'admin':
        return 'لوحة التحكم';
      case 'tajira':
        return 'الرئيسية';
      default:
        return 'الرئيسية';
    }
  };

  // Quick navigation for demo purposes
  const QuickNav = () => (
    <div className="fixed bottom-4 left-4 z-50 bg-white rounded-lg shadow-lg p-2 border">
      <div className="text-xs mb-2 font-semibold text-center">تنقل سريع (للعرض)</div>
      <div className="flex flex-col gap-1">
        <button
          onClick={() => setCurrentPage('home')}
          className={`px-3 py-1 text-xs rounded ${
            currentPage === 'home' ? 'bg-primary text-white' : 'hover:bg-muted'
          }`}
        >
          {getHomeLabel()}
        </button>
        <button
          onClick={() => setCurrentPage('dashboard')}
          className={`px-3 py-1 text-xs rounded ${
            currentPage === 'dashboard' ? 'bg-primary text-white' : 'hover:bg-muted'
          }`}
        >
          {getDashboardLabel()}
        </button>
        {userType === 'tajira' && (
          <button
            onClick={() => setCurrentPage('store')}
            className={`px-3 py-1 text-xs rounded ${
              currentPage === 'store' ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'
            }`}
          >
            متجري
          </button>
        )}
        {(userType === 'tajira' || userType === 'model' || userType === 'admin') && (
          <button
            onClick={() => setCurrentPage('customizer')}
            className={`px-3 py-1 text-xs rounded ${
              currentPage === 'customizer' ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'
            }`}
          >
            {userType === 'admin' ? 'تخصيص المنصة' : 'تخصيص المتجر'}
          </button>
        )}
        <button
          onClick={() => {
            setIsAuthenticated(false);
            setCurrentPage('auth');
          }}
          className="px-3 py-1 text-xs rounded hover:bg-muted"
        >
          تسجيل الدخول
        </button>
        <div className="border-t pt-1 mt-1">
          <select
            value={userType || 'buyer'}
            onChange={(e) => {
              const newUserType = e.target.value as UserType;
              setUserType(newUserType);
              // Automatically navigate to appropriate home page when switching user types
              setCurrentPage('home');
            }}
            className="text-xs w-full p-1 border rounded"
          >
            <option value="buyer">عميلة</option>
            <option value="tajira">تاجرة</option>
            <option value="model">عارضة</option>
            <option value="admin">مشرف</option>
          </select>
        </div>
        {userType && (
          <div className="text-xs text-center pt-1 border-t text-muted-foreground">
            مرحباً {userData.name}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {isAuthenticated && currentPage !== 'customizer' && (
        <Header
          userType={userType}
          userName={userData.name}
        />
      )}
      
      <main>
        {renderPage()}
      </main>

      {/* Demo Navigation */}
      <QuickNav />
      
      {/* Footer for authenticated pages - hide on customizer and specific landing pages */}
      {isAuthenticated && 
        currentPage !== 'customizer' && 
        !(currentPage === 'home' && (userType === 'admin' || userType === 'tajira')) &&
        currentPage !== 'store' && (
        <footer className="bg-muted/50 border-t mt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold mb-4 text-primary">لينورا</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  منصة التجارة الإلكترونية للنساء الملكات
                </p>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-primary rounded text-white flex items-center justify-center text-xs">
                    IG
                  </div>
                  <div className="w-8 h-8 bg-primary rounded text-white flex items-center justify-center text-xs">
                    TK
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">التسوق</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><button className="hover:text-primary">الجمال</button></li>
                  <li><button className="hover:text-primary">الأزياء</button></li>
                  <li><button className="hover:text-primary">الإكسسوارات</button></li>
                  <li><button className="hover:text-primary">المنزل</button></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">للتاجرات</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><button className="hover:text-primary">انضمي كتاجرة</button></li>
                  <li><button className="hover:text-primary">إدارة المتجر</button></li>
                  <li><button className="hover:text-primary">التعاون مع العارضات</button></li>
                  <li><button className="hover:text-primary">الدعم الفني</button></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">المساعدة</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><button className="hover:text-primary">اتصلي بنا</button></li>
                  <li><button className="hover:text-primary">الشحن والإرجاع</button></li>
                  <li><button className="hover:text-primary">الأسئلة الشائعة</button></li>
                  <li><button className="hover:text-primary">سياسة الخصوصية</button></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 لينورا. جميع الحقوق محفوظة.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}