import React, { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  Settings, Palette, Type, Monitor, Globe, Shield, 
  Save, RotateCcw, Eye, Upload, Download, Layers,
  Brush, Database, Users, Mail, Bell, Lock
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

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

export function PlatformCustomizer() {
  const [droppedComponents, setDroppedComponents] = useState<DragItem[]>([]);
  const [activeTab, setActiveTab] = useState('appearance');
  const [platformSettings, setPlatformSettings] = useState({
    platformName: 'لينورا',
    primaryColor: '#991b1b',
    secondaryColor: '#d4af37',
    backgroundColor: '#faf9f7',
    accentColor: '#f59e0b',
    fontFamily: 'Cairo',
    logo: '',
    favicon: '',
    darkMode: false,
    rtlSupport: true,
    multiLanguage: false,
    maintenanceMode: false,
    registrationOpen: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const handleDrop = useCallback((item: DragItem) => {
    setDroppedComponents(prev => [...prev, { ...item, id: `${item.id}-${Date.now()}` }]);
  }, []);

  const clearLayout = () => {
    setDroppedComponents([]);
  };

  const saveSettings = () => {
    console.log('Platform settings saved:', platformSettings);
    console.log('Layout components:', droppedComponents);
    // Here you would save the settings to your backend
  };

  const layoutComponents = [
    { id: 'header', type: 'layout', component: 'header', name: 'رأس الصفحة العام', icon: Monitor },
    { id: 'navigation', type: 'layout', component: 'navigation', name: 'شريط التنقل الرئيسي', icon: Globe },
    { id: 'hero', type: 'content', component: 'hero', name: 'القسم الرئيسي', icon: Layers },
    { id: 'features', type: 'content', component: 'features', name: 'عرض الميزات', icon: Settings },
    { id: 'stats', type: 'content', component: 'stats', name: 'الإحصائيات العامة', icon: Database },
    { id: 'footer', type: 'layout', component: 'footer', name: 'التذييل العام', icon: Monitor },
  ];

  const colorSchemes = [
    { 
      id: 'classic', 
      name: 'كلاسيكي', 
      colors: ['#991b1b', '#d4af37', '#faf9f7', '#2c2c2c'],
      description: 'النظام الحالي - أحمر داكن وذهبي'
    },
    { 
      id: 'royal', 
      name: 'ملكي', 
      colors: ['#4c1d95', '#8b5cf6', '#faf5ff', '#1f2937'],
      description: 'بنفسجي ملكي مع أبيض ناعم'
    },
    { 
      id: 'ocean', 
      name: 'محيطي', 
      colors: ['#0c4a6e', '#0ea5e9', '#f0f9ff', '#1e293b'],
      description: 'أزرق محيطي هادئ'
    },
    { 
      id: 'forest', 
      name: 'طبيعي', 
      colors: ['#065f46', '#10b981', '#f0fdf4', '#374151'],
      description: 'أخضر طبيعي منعش'
    },
    { 
      id: 'sunset', 
      name: 'غروب', 
      colors: ['#dc2626', '#f97316', '#fef2f2', '#1f2937'],
      description: 'ألوان الغروب الدافئة'
    },
    { 
      id: 'monochrome', 
      name: 'أحادي اللون', 
      colors: ['#374151', '#6b7280', '#f9fafb', '#111827'],
      description: 'رمادي أنيق ومتطور'
    }
  ];

  const renderComponent = (item: DragItem) => {
    const baseStyles = {
      backgroundColor: platformSettings.primaryColor,
      color: '#ffffff'
    };

    switch (item.component) {
      case 'header':
        return (
          <div className="text-white p-4 rounded" style={baseStyles}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded"></div>
                <h2>{platformSettings.platformName}</h2>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-white/20 rounded"></div>
                <div className="w-6 h-6 bg-white/20 rounded"></div>
                <div className="w-6 h-6 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
        );
      case 'navigation':
        return (
          <div className="text-white p-3 rounded" style={{ backgroundColor: platformSettings.secondaryColor }}>
            <div className="flex items-center justify-center gap-6">
              <span className="text-sm">الرئيسية</span>
              <span className="text-sm">التسوق</span>
              <span className="text-sm">التاجرات</span>
              <span className="text-sm">العارضات</span>
              <span className="text-sm">تواصل معنا</span>
            </div>
          </div>
        );
      case 'hero':
        return (
          <div className="p-8 rounded text-center" style={{ backgroundColor: platformSettings.backgroundColor, color: platformSettings.primaryColor }}>
            <h3 className="text-xl mb-2">مرحباً بكم في {platformSettings.platformName}</h3>
            <p>منصة التجارة الإلكترونية للنساء الملكات</p>
            <div className="mt-4">
              <button className="px-4 py-2 rounded text-white" style={{ backgroundColor: platformSettings.primaryColor }}>
                ابدئي التسوق
              </button>
            </div>
          </div>
        );
      case 'features':
        return (
          <div className="p-4 bg-muted rounded">
            <h4 className="mb-3 text-center">ميزات المنصة</h4>
            <div className="grid grid-cols-3 gap-3">
              {['تسوق آمن', 'شحن سريع', 'جودة عالية'].map(feature => (
                <div key={feature} className="bg-white p-2 rounded text-center text-sm">
                  <div className="w-8 h-8 bg-gray-200 rounded mb-1 mx-auto"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        );
      case 'stats':
        return (
          <div className="p-4 bg-accent text-accent-foreground rounded">
            <h4 className="mb-2 text-center">إحصائيات المنصة</h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="font-bold">2,456</div>
                <div className="text-xs">مستخدمة</div>
              </div>
              <div>
                <div className="font-bold">342</div>
                <div className="text-xs">تاجرة</div>
              </div>
              <div>
                <div className="font-bold">128</div>
                <div className="text-xs">عارضة</div>
              </div>
            </div>
          </div>
        );
      case 'footer':
        return (
          <div className="bg-muted p-4 rounded">
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <h5 className="font-semibold mb-1">{platformSettings.platformName}</h5>
                <p className="text-xs text-muted-foreground">جميع الحقوق محفوظة</p>
              </div>
              <div>
                <h5 className="font-semibold mb-1">عن المنصة</h5>
                <p className="text-xs text-muted-foreground">من نحن | الرؤية</p>
              </div>
              <div>
                <h5 className="font-semibold mb-1">الخدمات</h5>
                <p className="text-xs text-muted-foreground">للتاجرات | للعارضات</p>
              </div>
              <div>
                <h5 className="font-semibold mb-1">الدعم</h5>
                <p className="text-xs text-muted-foreground">المساعدة | التواصل</p>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-4 bg-muted rounded">مكون النظام</div>;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                تخصيص المنصة
              </h1>
              <p className="text-muted-foreground">إدارة المظهر العام والإعدادات الأساسية للمنصة</p>
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
              <Button onClick={saveSettings}>
                <Save className="w-4 h-4 ml-2" />
                حفظ الإعدادات
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar - Settings */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-lg">إعدادات المنصة</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="appearance" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="appearance">المظهر</TabsTrigger>
                      <TabsTrigger value="system">النظام</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="appearance" className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="platformName">اسم المنصة</Label>
                          <Input
                            id="platformName"
                            value={platformSettings.platformName}
                            onChange={(e) => setPlatformSettings(prev => ({ ...prev, platformName: e.target.value }))}
                            placeholder="اسم المنصة"
                          />
                        </div>

                        <div>
                          <Label>نظام الألوان</Label>
                          <div className="space-y-2 mt-2">
                            {colorSchemes.map((scheme) => (
                              <div
                                key={scheme.id}
                                className="p-3 border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                                onClick={() => {
                                  setPlatformSettings(prev => ({
                                    ...prev,
                                    primaryColor: scheme.colors[0],
                                    secondaryColor: scheme.colors[1],
                                    backgroundColor: scheme.colors[2],
                                    accentColor: scheme.colors[0]
                                  }));
                                }}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-semibold text-sm">{scheme.name}</span>
                                </div>
                                <div className="flex gap-1 mb-1">
                                  {scheme.colors.map((color, i) => (
                                    <div
                                      key={i}
                                      className="w-6 h-6 rounded border-2 border-white shadow-sm"
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                                </div>
                                <p className="text-xs text-muted-foreground">{scheme.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="primaryColor">اللون الأساسي</Label>
                          <div className="flex gap-2">
                            <Input
                              id="primaryColor"
                              type="color"
                              value={platformSettings.primaryColor}
                              onChange={(e) => setPlatformSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              value={platformSettings.primaryColor}
                              onChange={(e) => setPlatformSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
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
                              value={platformSettings.secondaryColor}
                              onChange={(e) => setPlatformSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              value={platformSettings.secondaryColor}
                              onChange={(e) => setPlatformSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>شعار المنصة</Label>
                          <Button variant="outline" className="w-full mt-2">
                            <Upload className="w-4 h-4 ml-2" />
                            رفع الشعار
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="system" className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>الوضع المظلم</Label>
                            <p className="text-xs text-muted-foreground">تفعيل الثيم المظلم</p>
                          </div>
                          <Switch
                            checked={platformSettings.darkMode}
                            onCheckedChange={(checked) => setPlatformSettings(prev => ({ ...prev, darkMode: checked }))}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>دعم العربية (RTL)</Label>
                            <p className="text-xs text-muted-foreground">قراءة من اليمين لليسار</p>
                          </div>
                          <Switch
                            checked={platformSettings.rtlSupport}
                            onCheckedChange={(checked) => setPlatformSettings(prev => ({ ...prev, rtlSupport: checked }))}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>التسجيل مفتوح</Label>
                            <p className="text-xs text-muted-foreground">السماح بتسجيل مستخدمين جدد</p>
                          </div>
                          <Switch
                            checked={platformSettings.registrationOpen}
                            onCheckedChange={(checked) => setPlatformSettings(prev => ({ ...prev, registrationOpen: checked }))}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>وضع الصيانة</Label>
                            <p className="text-xs text-muted-foreground">إيقاف المنصة مؤقتاً</p>
                          </div>
                          <Switch
                            checked={platformSettings.maintenanceMode}
                            onCheckedChange={(checked) => setPlatformSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>إشعارات البريد</Label>
                            <p className="text-xs text-muted-foreground">إرسال إشعارات عبر البريد</p>
                          </div>
                          <Switch
                            checked={platformSettings.emailNotifications}
                            onCheckedChange={(checked) => setPlatformSettings(prev => ({ ...prev, emailNotifications: checked }))}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>إشعارات SMS</Label>
                            <p className="text-xs text-muted-foreground">إرسال رسائل نصية</p>
                          </div>
                          <Switch
                            checked={platformSettings.smsNotifications}
                            onCheckedChange={(checked) => setPlatformSettings(prev => ({ ...prev, smsNotifications: checked }))}
                          />
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
                      <Monitor className="w-5 h-5" />
                      تخطيط المنصة العام
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {droppedComponents.length} عنصر
                      </Badge>
                      <Badge className="bg-secondary text-secondary-foreground">
                        {platformSettings.platformName}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    <div className="text-sm text-muted-foreground">العناصر المتاحة:</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {layoutComponents.map((comp) => (
                        <DraggableComponent
                          key={comp.id}
                          id={comp.id}
                          type={comp.type}
                          component={comp.component}
                        >
                          <div className="flex items-center gap-2 p-2 bg-white rounded hover:bg-muted/50 transition-colors">
                            <comp.icon className="w-4 h-4 text-primary" />
                            <span className="text-xs">{comp.name}</span>
                          </div>
                        </DraggableComponent>
                      ))}
                    </div>
                  </div>

                  <DroppableArea onDrop={handleDrop}>
                    {droppedComponents.length === 0 ? (
                      <div className="text-center py-16">
                        <Monitor className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">صممي واجهة المنصة</h3>
                        <p className="text-muted-foreground mb-6">
                          اسحبي العناصر من الأعلى وأسقطيها هنا لبناء تخطيط المنصة العام
                        </p>
                        <div className="text-sm text-muted-foreground">
                          💡 نصيحة: ابدئي بالرأس العام ثم أضيفي العناصر تدريجياً
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