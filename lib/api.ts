// lib/api.ts - طبقة API للتواصل مع Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // جلب التوكن من localStorage
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('linora_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('linora_token', token);
    }
  }

  removeToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('linora_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'حدث خطأ في الطلب');
      }

      return { data };
    } catch (error) {
      console.error('API Error:', error);
      return { 
        error: error instanceof Error ? error.message : 'خطأ غير معروف' 
      };
    }
  }

  // Auth APIs
  async register(userData: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    role: 'buyer' | 'tajira' | 'model';
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request<{
      token: string;
      refreshToken: string;
      user: any;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async logout() {
    this.removeToken();
    return { data: { message: 'تم تسجيل الخروج بنجاح' } };
  }

  async verifyEmail(token: string) {
    return this.request('/auth/verify/' + token);
  }

  async forgotPassword(email: string) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, newPassword: string) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  }

  // User APIs
  async getCurrentUser() {
    return this.request('/users/me');
  }

  async updateProfile(profileData: any) {
    return this.request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Product APIs
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    tajiraId?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    return this.request(`/products?${searchParams.toString()}`);
  }

  async getProduct(id: number) {
    return this.request(`/products/${id}`);
  }

  async createProduct(productData: any) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id: number, productData: any) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: number) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Cart APIs
  async getCart() {
    return this.request('/cart');
  }

  async addToCart(productId: number, quantity: number) {
    return this.request('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async updateCartItem(itemId: number, quantity: number) {
    return this.request(`/cart/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(itemId: number) {
    return this.request(`/cart/${itemId}`, {
      method: 'DELETE',
    });
  }

  async clearCart() {
    return this.request('/cart', {
      method: 'DELETE',
    });
  }

  // Wishlist APIs
  async getWishlist() {
    return this.request('/products/wishlist');
  }

  async addToWishlist(productId: number) {
    return this.request('/products/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  }

  // Order APIs
  async getOrders() {
    return this.request('/orders');
  }

  async getOrder(id: number) {
    return this.request(`/orders/${id}`);
  }

  async createOrder(orderData: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  // Categories APIs
  async getCategories() {
    return this.request('/products/categories');
  }

  // Admin APIs
  async getUsers() {
    return this.request('/admin/users');
  }

  async getComplaints() {
    return this.request('/admin/complaints');
  }

  async updateComplaint(id: number, updateData: any) {
    return this.request(`/admin/complaints/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  // Model/Collaboration APIs
  async getCollaborations() {
    return this.request('/collaborations');
  }

  async createCollaboration(data: any) {
    return this.request('/collaborations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCollaboration(id: number, data: any) {
    return this.request(`/collaborations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

// إنشاء instance واحد للاستخدام في التطبيق
export const apiClient = new ApiClient(API_BASE_URL);

// Helper functions للاستخدام السريع
export const auth = {
  register: apiClient.register.bind(apiClient),
  login: apiClient.login.bind(apiClient),
  logout: apiClient.logout.bind(apiClient),
  verifyEmail: apiClient.verifyEmail.bind(apiClient),
  forgotPassword: apiClient.forgotPassword.bind(apiClient),
  resetPassword: apiClient.resetPassword.bind(apiClient),
};

export const products = {
  getAll: apiClient.getProducts.bind(apiClient),
  getById: apiClient.getProduct.bind(apiClient),
  create: apiClient.createProduct.bind(apiClient),
  update: apiClient.updateProduct.bind(apiClient),
  delete: apiClient.deleteProduct.bind(apiClient),
  getCategories: apiClient.getCategories.bind(apiClient),
  addToWishlist: apiClient.addToWishlist.bind(apiClient),
  getWishlist: apiClient.getWishlist.bind(apiClient),
};

export const cart = {
  get: apiClient.getCart.bind(apiClient),
  add: apiClient.addToCart.bind(apiClient),
  update: apiClient.updateCartItem.bind(apiClient),
  remove: apiClient.removeFromCart.bind(apiClient),
  clear: apiClient.clearCart.bind(apiClient),
};

export const orders = {
  getAll: apiClient.getOrders.bind(apiClient),
  getById: apiClient.getOrder.bind(apiClient),
  create: apiClient.createOrder.bind(apiClient),
};

export const user = {
  getCurrent: apiClient.getCurrentUser.bind(apiClient),
  updateProfile: apiClient.updateProfile.bind(apiClient),
};

export default apiClient;
