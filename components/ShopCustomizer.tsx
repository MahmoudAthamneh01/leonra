import React, { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  Layout, Palette, Type, Image as ImageIcon, 
  Square, Circle, Triangle, Save, RotateCcw,
  Eye, Settings, Layers, Move, Crown, Star, 
  Shield, Store, Brush, Upload, Download
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { PlatformCustomizer } from './PlatformCustomizer';

interface DragItem {
  id: string;
  type: string;
  component: string;
}

interface DroppableAreaProps {
  onDrop: (item: DragItem) => void;
  children: React.ReactNode;
}

interface DraggableComponentProps {
  id: string;
  type: string;
  component: string;
  children: React.ReactNode;
}

interface ShopCustomizerProps {
  userType?: 'tajira' | 'model' | 'admin';
}

// Draggable Component
const DraggableComponent: React.FC<DraggableComponentProps> = ({ id, type, component, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { id, type, component },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`cursor-move p-2 border-2 border-dashed border-muted rounded-lg hover:border-primary transition-colors ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {children}
    </div>
  );
};

// Droppable Area
const DroppableArea: React.FC<DroppableAreaProps> = ({ onDrop, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item: DragItem) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`min-h-96 p-4 border-2 border-dashed rounded-lg transition-colors ${
        isOver ? 'border-primary bg-primary/5' : 'border-muted'
      }`}
    >
      {children}
    </div>
  );
};

export function ShopCustomizer({ userType = 'tajira' }: ShopCustomizerProps) {
  // If admin, render the PlatformCustomizer instead
  if (userType === 'admin') {
    return <PlatformCustomizer />;
  }

  const [droppedComponents, setDroppedComponents] = useState<DragItem[]>([]);
  const [selectedTheme, setSelectedTheme] = useState('elegant');
  const [activeTab, setActiveTab] = useState('layout');
  const [brandSettings, setBrandSettings] = useState({
    shopName: '',
    primaryColor: '#991b1b',
    secondaryColor: '#d4af37',
    logo: '',
    banner: '',
    description: ''
  });

  const handleDrop = useCallback((item: DragItem) => {
    setDroppedComponents(prev => [...prev, { ...item, id: `${item.id}-${Date.now()}` }]);
  }, []);

  const clearLayout = () => {
    setDroppedComponents([]);
  };

  const saveLayout = () => {
    console.log('Layout saved:', droppedComponents);
    console.log('Brand settings:', brandSettings);
    // Here you would save the layout to your backend
  };

  const getPageTitle = () => {
    switch (userType) {
      case 'tajira':
        return 'تخصيص متجري';
      case 'model':
        return 'تخصيص ملفي الشخصي';
      case 'admin':
        return 'تخصيص النظام';
      default:
        return 'أداة التخصيص';
    }
  };

  const getPageDescription = () => {
    switch (userType) {
      case 'tajira':
        return 'صممي واجهة متجرك بالطريقة التي تعبر عن هويتك التجارية';
      case 'model':
        return 'خصصي ملفك الشخصي لإبراز أعمالك بأفضل شكل';
      case 'admin':
        return 'قمي بتخصيص المظهر العام للمنصة';
      default:
        return 'اسحبي وأسقطي العناصر لتخصيص التخطيط';
    }
  };

  const getPageIcon = () => {
    switch (userType) {
      case 'tajira':
        return Crown;
      case 'model':
        return Star;
      case 'admin':
        return Shield;
      default:
        return Layers;
    }
  };

  const components = [
    { id: 'header', type: 'layout', component: 'header', name: 'رأس الصفحة', icon: Layout },
    { id: 'banner', type: 'layout', component: 'banner', name: 'البانر الرئيسي', icon: ImageIcon },
    { id: 'products', type: 'content', component: 'products', name: 'عرض المنتجات', icon: Square },
    { id: 'categories', type: 'content', component: 'categories', name: 'الفئات', icon: Circle },
    { id: 'testimonials', type: 'content', component: 'testimonials', name: 'آراء العملاء', icon: Type },
    { id: 'about', type: 'content', component: 'about', name: 'نبذة عن المتجر', icon: Type },
    { id: 'contact', type: 'content', component: 'contact', name: 'معلومات التواصل', icon: Type },
    { id: 'footer', type: 'layout', component: 'footer', name: 'تذييل الصفحة', icon: Layout },
  ];

  const themes = [
    { id: 'elegant', name: 'أنيق', colors: ['#991b1b', '#d4af37', '#ffffff'] },
    { id: 'modern', name: 'عصري', colors: ['#1f2937', '#3b82f6', '#f3f4f6'] },
    { id: 'soft', name: 'ناعم', colors: ['#fdf2f8', '#ec4899', '#ffffff'] },
    { id: 'luxury', name: 'فاخر', colors: ['#0f172a', '#fbbf24', '#f8fafc'] },
    { id: 'natural', name: 'طبيعي', colors: ['#065f46', '#10b981', '#f0fdf4'] },
    { id: 'royal', name: 'ملكي', colors: ['#4c1d95', '#8b5cf6', '#faf5ff'] },
  ];

  const renderComponent = (item: DragItem) => {
    const baseStyles = {
      backgroundColor: brandSettings.primaryColor,
      color: '#ffffff'
    };

    switch (item.component) {
      case 'header':
        return (
          <div className="text-white p-4 rounded" style={baseStyles}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded"></div>
                <h2>{brandSettings.shopName || 'اسم المتجر'}</h2>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-white/20 rounded"></div>
                <div className="w-6 h-6 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
        );
      case 'banner':
        return (
          <div className="text-white p-8 rounded text-center" style={{ backgroundColor: brandSettings.secondaryColor }}>
            <h3 className="text-xl mb-2">{brandSettings.shopName || 'اسم المتجر'}</h3>
            <p>{brandSettings.description || 'وصف المتج�� والعروض الخاصة'}</p>
          </div>
        );
      case 'products':
        return (
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-2 rounded aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 bg-gray-200 rounded mb-1 mx-auto"></div>
                  <div className="text-xs">منتج {i}</div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'categories':
        return (
          <div className="flex gap-4 p-4 bg-muted rounded">
            {['الجمال', 'الأزياء', 'الإكسسوارات'].map(cat => (
              <div key={cat} className="bg-white p-3 rounded flex-1 text-center">
                <div className="w-6 h-6 bg-gray-200 rounded mb-1 mx-auto"></div>
                <div className="text-xs">{cat}</div>
              </div>
            ))}
          </div>
        );
      case 'about':
        return (
          <div className="bg-muted p-4 rounded">
            <h4 className="mb-2">نبذة عن {brandSettings.shopName || 'المتجر'}</h4>
            <p className="text-sm text-muted-foreground">
              {brandSettings.description || 'هنا يمكنك كتابة نبذة عن متجرك وما يميزه عن غيره من المتاجر'}
            </p>
          </div>
        );
      case 'contact':
        return (
          <div className="bg-muted p-4 rounded">
            <h4 className="mb-2">تواصلي معنا</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>📧 البريد الإلكتروني</p>
              <p>📱 رقم الواتساب</p>
              <p>📍 العنوان</p>
            </div>
          </div>
        );
      case 'testimonials':
        return (
          <div className="bg-accent text-accent-foreground p-4 rounded">
            <h4 className="mb-2">آراء العملاء</h4>
            <div className="space-y-2">
              <div className="bg-white/50 p-2 rounded text-sm">
                <p>"منتجات رائعة وخدمة ممتازة"</p>
                <p className="text-xs text-muted-foreground">- سارة أحمد</p>
              </div>
            </div>
          </div>
        );
      case 'footer':
        return (
          <div className="bg-muted p-4 rounded">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <h5 className="font-semibold mb-1">{brandSettings.shopName || 'اسم المتجر'}</h5>
                <p className="text-xs text-muted-foreground">جميع الحقوق محفوظة</p>
              </div>
              <div>
                <h5 className="font-semibold mb-1">التواصل</h5>
                <p className="text-xs text-muted-foreground">Instagram | WhatsApp</p>
              </div>
              <div>
                <h5 className="font-semibold mb-1">الدعم</h5>
                <p className="text-xs text-muted-foreground">المساعدة | الشحن</p>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-4 bg-muted rounded">مكون غير معروف</div>;
    }
  };

  const PageIcon = getPageIcon();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <PageIcon className="w-8 h-8 text-primary" />
                {getPageTitle()}
              </h1>
              <p className="text-muted-foreground">{getPageDescription()}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={clearLayout}>
                <RotateCcw className="w-4 h-4 ml-2" />
                إعادة تعيين
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 ml-2" />
                معاينة
              </Button>
              <Button onClick={saveLayout}>
                <Save className="w-4 h-4 ml-2" />
                حفظ التصميم
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar - Components */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-lg">أدوات التخصيص</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="components" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="components">المكونات</TabsTrigger>
                      <TabsTrigger value="themes">الثيمات</TabsTrigger>
                      <TabsTrigger value="brand">العلامة التجارية</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="components" className="space-y-3">
                      {components.map((comp) => (
                        <DraggableComponent
                          key={comp.id}
                          id={comp.id}
                          type={comp.type}
                          component={comp.component}
                        >
                          <div className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-muted/50 transition-colors">
                            <comp.icon className="w-5 h-5 text-primary" />
                            <div className="flex-1">
                              <p className="font-semibold text-sm">{comp.name}</p>
                              <Badge variant="outline" className="text-xs">
                                {comp.type === 'layout' ? 'تخطيط' : 'محتوى'}
                              </Badge>
                            </div>
                            <Move className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </DraggableComponent>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="themes" className="space-y-3">
                      {themes.map((theme) => (
                        <div
                          key={theme.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            selectedTheme === theme.id ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedTheme(theme.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-sm">{theme.name}</span>
                            {selectedTheme === theme.id && (
                              <Badge className="bg-primary">مختار</Badge>
                            )}
                          </div>
                          <div className="flex gap-1">
                            {theme.colors.map((color, i) => (
                              <div
                                key={i}
                                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="brand" className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="shopName">اسم المتجر</Label>
                          <Input
                            id="shopName"
                            value={brandSettings.shopName}
                            onChange={(e) => setBrandSettings(prev => ({ ...prev, shopName: e.target.value }))}
                            placeholder="اسم متجرك"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="description">وصف المتجر</Label>
                          <textarea
                            id="description"
                            value={brandSettings.description}
                            onChange={(e) => setBrandSettings(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="وصف مختصر عن متجرك"
                            className="w-full p-2 border rounded-lg resize-none h-20"
                          />
                        </div>

                        <div>
                          <Label htmlFor="primaryColor">اللون الأساسي</Label>
                          <div className="flex gap-2">
                            <Input
                              id="primaryColor"
                              type="color"
                              value={brandSettings.primaryColor}
                              onChange={(e) => setBrandSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              value={brandSettings.primaryColor}
                              onChange={(e) => setBrandSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                              placeholder="#991b1b"
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="secondaryColor">اللون الثانوي</Label>
                          <div className="flex gap-2">
                            <Input
                              id="secondaryColor"
                              type="color"
                              value={brandSettings.secondaryColor}
                              onChange={(e) => setBrandSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              value={brandSettings.secondaryColor}
                              onChange={(e) => setBrandSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                              placeholder="#d4af37"
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>الشعار</Label>
                          <Button variant="outline" className="w-full">
                            <Upload className="w-4 h-4 ml-2" />
                            رفع الشعار
                          </Button>
                        </div>

                        <div>
                          <Label>البانر الرئيسي</Label>
                          <Button variant="outline" className="w-full">
                            <Upload className="w-4 h-4 ml-2" />
                            رفع البانر
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Main Canvas */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Store className="w-5 h-5" />
                      {userType === 'tajira' ? 'تخطيط المتجر' : 'التخطيط'}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {droppedComponents.length} عنصر
                      </Badge>
                      {brandSettings.shopName && (
                        <Badge className="bg-secondary text-secondary-foreground">
                          {brandSettings.shopName}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <DroppableArea onDrop={handleDrop}>
                    {droppedComponents.length === 0 ? (
                      <div className="text-center py-16">
                        <Layout className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          {userType === 'tajira' ? 'ابدئي ببناء متجرك' : 'ابدئي بالتخصيص'}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          اسحبي المكونات من الشريط الجانبي وأسقطيها هنا لبناء التخطيط المطلوب
                        </p>
                        <div className="text-sm text-muted-foreground">
                          💡 نصيحة: ابدئي بالعناصر الأساسية مثل الرأس والبانر الرئيسي
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {droppedComponents.map((item, index) => (
                          <div key={item.id} className="relative group">
                            {renderComponent(item)}
                            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 w-6 p-0"
                                onClick={() => {
                                  // Move up
                                  if (index > 0) {
                                    const newComponents = [...droppedComponents];
                                    [newComponents[index - 1], newComponents[index]] = [newComponents[index], newComponents[index - 1]];
                                    setDroppedComponents(newComponents);
                                  }
                                }}
                              >
                                ↑
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 w-6 p-0"
                                onClick={() => {
                                  // Move down
                                  if (index < droppedComponents.length - 1) {
                                    const newComponents = [...droppedComponents];
                                    [newComponents[index], newComponents[index + 1]] = [newComponents[index + 1], newComponents[index]];
                                    setDroppedComponents(newComponents);
                                  }
                                }}
                              >
                                ↓
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="h-6 w-6 p-0"
                                onClick={() => {
                                  setDroppedComponents(prev => prev.filter((_, i) => i !== index));
                                }}
                              >
                                ×
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </DroppableArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}