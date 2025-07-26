// store/AppContext.tsx - إدارة الحالة العامة للتطبيق

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// أنواع البيانات
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'buyer' | 'tajira' | 'model' | 'admin';
  avatar?: string;
  isVerified: boolean;
  tajiraProfile?: {
    shopName: string;
    isVerified: boolean;
  };
  modelProfile?: {
    isVerified: boolean;
    rating: number;
  };
}

export interface Product {
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
  quantity: number;
  isFeatured: boolean;
  tajira: {
    id: number;
    name: string;
    tajiraProfile?: {
      shopName: string;
      isVerified: boolean;
    };
  };
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// حالة التطبيق
export interface AppState {
  // المستخدم
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // المنتجات
  products: Product[];
  featuredProducts: Product[];
  categories: string[];
  
  // السلة
  cartItems: CartItem[];
  cartTotal: number;
  
  // المفضلة
  wishlist: Product[];
  
  // الإشعارات
  notifications: Notification[];
  unreadNotifications: number;
  
  // حالة التطبيق
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
  searchQuery: string;
  selectedCategory: string | null;
}

// الإجراءات
export type AppAction =
  // إجراءات المستخدم
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  
  // إجراءات المنتجات
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_FEATURED_PRODUCTS'; payload: Product[] }
  | { type: 'SET_CATEGORIES'; payload: string[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: number }
  
  // إجراءات السلة
  | { type: 'SET_CART_ITEMS'; payload: CartItem[] }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'UPDATE_CART_ITEM'; payload: { id: number; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'CLEAR_CART' }
  
  // إجراءات المفضلة
  | { type: 'SET_WISHLIST'; payload: Product[] }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  
  // إجراءات الإشعارات
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id'> }
  | { type: 'MARK_NOTIFICATION_READ'; payload: number }
  | { type: 'CLEAR_NOTIFICATIONS' }
  
  // إجراءات عامة
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LANGUAGE'; payload: 'ar' | 'en' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string | null };

// الحالة الأولية
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  products: [],
  featuredProducts: [],
  categories: [],
  
  cartItems: [],
  cartTotal: 0,
  
  wishlist: [],
  
  notifications: [],
  unreadNotifications: 0,
  
  theme: 'light',
  language: 'ar',
  searchQuery: '',
  selectedCategory: null,
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    // إجراءات المستخدم
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: action.payload !== null,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case 'SET_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    
    // إجراءات المنتجات
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    
    case 'SET_FEATURED_PRODUCTS':
      return {
        ...state,
        featuredProducts: action.payload,
      };
    
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      };
    
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };
    
    // إجراءات السلة
    case 'SET_CART_ITEMS':
      const cartTotal = action.payload.reduce((total, item) => {
        const price = item.product.salePrice || item.product.price;
        return total + (price * item.quantity);
      }, 0);
      
      return {
        ...state,
        cartItems: action.payload,
        cartTotal,
      };
    
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(
        item => item.product.id === action.payload.product.id
      );
      
      let newCartItems: CartItem[];
      
      if (existingItem) {
        newCartItems = state.cartItems.map(item =>
          item.product.id === action.payload.product.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: Date.now(),
          product: action.payload.product,
          quantity: action.payload.quantity,
          addedAt: new Date().toISOString(),
        };
        newCartItems = [...state.cartItems, newItem];
      }
      
      const newTotal = newCartItems.reduce((total, item) => {
        const price = item.product.salePrice || item.product.price;
        return total + (price * item.quantity);
      }, 0);
      
      return {
        ...state,
        cartItems: newCartItems,
        cartTotal: newTotal,
      };
    
    case 'UPDATE_CART_ITEM':
      const updatedItems = state.cartItems.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      const updatedTotal = updatedItems.reduce((total, item) => {
        const price = item.product.salePrice || item.product.price;
        return total + (price * item.quantity);
      }, 0);
      
      return {
        ...state,
        cartItems: updatedItems,
        cartTotal: updatedTotal,
      };
    
    case 'REMOVE_FROM_CART':
      const filteredItems = state.cartItems.filter(item => item.id !== action.payload);
      const filteredTotal = filteredItems.reduce((total, item) => {
        const price = item.product.salePrice || item.product.price;
        return total + (price * item.quantity);
      }, 0);
      
      return {
        ...state,
        cartItems: filteredItems,
        cartTotal: filteredTotal,
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
        cartTotal: 0,
      };
    
    // إجراءات المفضلة
    case 'SET_WISHLIST':
      return {
        ...state,
        wishlist: action.payload,
      };
    
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(product => product.id !== action.payload),
      };
    
    // إجراءات الإشعارات
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
        unreadNotifications: action.payload.filter(n => !n.isRead).length,
      };
    
    case 'ADD_NOTIFICATION':
      const newNotification: Notification = {
        ...action.payload,
        id: Date.now(),
      };
      
      return {
        ...state,
        notifications: [newNotification, ...state.notifications],
        unreadNotifications: state.unreadNotifications + 1,
      };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, isRead: true }
            : notification
        ),
        unreadNotifications: Math.max(0, state.unreadNotifications - 1),
      };
    
    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
        unreadNotifications: 0,
      };
    
    // إجراءات عامة
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };
    
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    
    case 'SET_SELECTED_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
      };
    
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // تحميل البيانات الأولية
  useEffect(() => {
    loadInitialData();
  }, []);

  // حفظ البيانات في localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('linora_cart', JSON.stringify(state.cartItems));
      localStorage.setItem('linora_wishlist', JSON.stringify(state.wishlist));
      localStorage.setItem('linora_theme', state.theme);
      localStorage.setItem('linora_language', state.language);
    }
  }, [state.cartItems, state.wishlist, state.theme, state.language]);

  const loadInitialData = async () => {
    try {
      // تحميل البيانات من localStorage
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('linora_cart');
        const savedWishlist = localStorage.getItem('linora_wishlist');
        const savedTheme = localStorage.getItem('linora_theme');
        const savedLanguage = localStorage.getItem('linora_language');
        
        if (savedCart) {
          dispatch({ type: 'SET_CART_ITEMS', payload: JSON.parse(savedCart) });
        }
        
        if (savedWishlist) {
          dispatch({ type: 'SET_WISHLIST', payload: JSON.parse(savedWishlist) });
        }
        
        if (savedTheme) {
          dispatch({ type: 'SET_THEME', payload: savedTheme as 'light' | 'dark' });
        }
        
        if (savedLanguage) {
          dispatch({ type: 'SET_LANGUAGE', payload: savedLanguage as 'ar' | 'en' });
        }
      }

      // تحميل المستخدم الحالي إذا كان مسجل الدخول
      const token = typeof window !== 'undefined' ? localStorage.getItem('linora_token') : null;
      if (token) {
        // هنا سنستدعي API للحصول على بيانات المستخدم
        // const userData = await user.getCurrent();
        // if (userData.data) {
        //   dispatch({ type: 'SET_USER', payload: userData.data });
        // }
      }

      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      console.error('خطأ في تحميل البيانات الأولية:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook للاستخدام
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Custom hooks للوظائف المحددة
export const useAuth = () => {
  const { state, dispatch } = useApp();
  
  const login = (user: User, token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('linora_token', token);
    }
    dispatch({ type: 'SET_USER', payload: user });
  };
  
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('linora_token');
    }
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    logout,
  };
};

export const useCart = () => {
  const { state, dispatch } = useApp();
  
  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        type: 'success',
        title: 'تم إضافة المنتج',
        message: `تم إضافة ${product.name} إلى السلة`,
        isRead: false,
        createdAt: new Date().toISOString(),
      },
    });
  };
  
  const updateCartItem = (id: number, quantity: number) => {
    if (quantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_CART_ITEM', payload: { id, quantity } });
    }
  };
  
  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return {
    cartItems: state.cartItems,
    cartTotal: state.cartTotal,
    cartCount: state.cartItems.reduce((count, item) => count + item.quantity, 0),
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
  };
};

export const useWishlist = () => {
  const { state, dispatch } = useApp();
  
  const addToWishlist = (product: Product) => {
    const isInWishlist = state.wishlist.some(p => p.id === product.id);
    
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          type: 'info',
          title: 'تم إزالة المنتج',
          message: `تم إزالة ${product.name} من المفضلة`,
          isRead: false,
          createdAt: new Date().toISOString(),
        },
      });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          type: 'success',
          title: 'تم إضافة المنتج',
          message: `تم إضافة ${product.name} إلى المفضلة`,
          isRead: false,
          createdAt: new Date().toISOString(),
        },
      });
    }
  };
  
  const isInWishlist = (productId: number) => {
    return state.wishlist.some(product => product.id === productId);
  };
  
  return {
    wishlist: state.wishlist,
    addToWishlist,
    isInWishlist,
  };
};

export const useNotifications = () => {
  const { state, dispatch } = useApp();
  
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };
  
  const markAsRead = (id: number) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  };
  
  const clearAll = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  };
  
  return {
    notifications: state.notifications,
    unreadCount: state.unreadNotifications,
    addNotification,
    markAsRead,
    clearAll,
  };
};
