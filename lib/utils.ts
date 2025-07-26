import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * دالة للجمع بين class names مع Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * تنسيق العملة السعودية
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * تنسيق التاريخ باللغة العربية
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)
}

/**
 * تنسيق التاريخ المختصر
 */
export function formatDateShort(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj)
}

/**
 * تحويل الرقم إلى كلمات عربية مختصرة
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + ' مليون'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + ' ألف'
  }
  return num.toString()
}

/**
 * اختصار النص
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * التحقق من صحة البريد الإلكتروني
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * التحقق من صحة رقم الجوال السعودي
 */
export function isValidSaudiPhone(phone: string): boolean {
  const saudiPhoneRegex = /^(\+966|966|0)?5[0-9]{8}$/
  return saudiPhoneRegex.test(phone.replace(/\s+/g, ''))
}

/**
 * تنسيق رقم الجوال السعودي
 */
export function formatSaudiPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.startsWith('966')) {
    return `+${cleaned}`
  }
  
  if (cleaned.startsWith('05')) {
    return `+966${cleaned.slice(1)}`
  }
  
  if (cleaned.startsWith('5') && cleaned.length === 9) {
    return `+966${cleaned}`
  }
  
  return phone
}

/**
 * إنشاء slug من النص العربي
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\u0600-\u06FF]+/g, '-') // استبدال المسافات والأحرف العربية بشرطة
    .replace(/[^\w\-]+/g, '') // إزالة الأحرف غير المسموحة
    .replace(/\-\-+/g, '-') // استبدال الشرطات المتعددة بشرطة واحدة
    .replace(/^-+/, '') // إزالة الشرطات من البداية
    .replace(/-+$/, '') // إزالة الشرطات من النهاية
}

/**
 * تحديد لون النص بناء على لون الخلفية
 */
export function getContrastColor(hexColor: string): string {
  // إزالة # إذا كانت موجودة
  const color = hexColor.replace('#', '')
  
  // تحويل إلى RGB
  const r = parseInt(color.substr(0, 2), 16)
  const g = parseInt(color.substr(2, 2), 16)
  const b = parseInt(color.substr(4, 2), 16)
  
  // حساب السطوع
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  
  return brightness > 128 ? '#000000' : '#FFFFFF'
}

/**
 * تأخير التنفيذ
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * إنشاء ID عشوائي
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * نسخ النص إلى الحافظة
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy text: ', err)
    return false
  }
}

/**
 * تحميل ملف
 */
export function downloadFile(url: string, filename: string): void {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * التحقق من نوع الملف
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/')
}

/**
 * تحويل حجم الملف إلى نص قابل للقراءة
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 بايت'
  
  const k = 1024
  const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * ضغط الصورة
 */
export function compressImage(file: File, quality: number = 0.8): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      const { width, height } = img
      canvas.width = width
      canvas.height = height
      
      ctx?.drawImage(img, 0, 0, width, height)
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            })
            resolve(compressedFile)
          } else {
            resolve(file)
          }
        },
        file.type,
        quality
      )
    }
    
    img.src = URL.createObjectURL(file)
  })
}

/**
 * تصدير الأدوات المساعدة للألوان
 */
export const colors = {
  linora: {
    primary: '#E91E63',
    secondary: '#9C27B0',
    accent: '#F06292',
    dark: '#2D1B69',
    light: '#FFF0F3',
    gold: '#FFD700',
    rose: '#FFCCCB'
  }
}

/**
 * رسائل النظام
 */
export const messages = {
  success: {
    login: 'تم تسجيل الدخول بنجاح',
    register: 'تم إنشاء الحساب بنجاح',
    logout: 'تم تسجيل الخروج بنجاح',
    update: 'تم التحديث بنجاح',
    delete: 'تم الحذف بنجاح',
    create: 'تم الإنشاء بنجاح',
    save: 'تم الحفظ بنجاح',
    addToCart: 'تم إضافة المنتج إلى السلة',
    addToWishlist: 'تم إضافة المنتج إلى المفضلة',
    orderPlaced: 'تم إرسال الطلب بنجاح',
  },
  error: {
    general: 'حدث خطأ ما، يرجى المحاولة مرة أخرى',
    network: 'خطأ في الاتصال، تحقق من الإنترنت',
    unauthorized: 'غير مخول، يرجى تسجيل الدخول',
    forbidden: 'ليس لديك صلاحية للوصول',
    notFound: 'العنصر المطلوب غير موجود',
    validation: 'يرجى التحقق من البيانات المدخلة',
    fileSize: 'حجم الملف كبير جداً',
    fileType: 'نوع الملف غير مدعوم',
  },
  validation: {
    required: 'هذا الحقل مطلوب',
    email: 'يرجى إدخال بريد إلكتروني صحيح',
    phone: 'يرجى إدخال رقم جوال صحيح',
    password: 'كلمة المرور يجب أن تكون على الأقل 8 أحرف',
    confirmPassword: 'كلمات المرور غير متطابقة',
    minLength: (min: number) => `يجب أن يكون على الأقل ${min} أحرف`,
    maxLength: (max: number) => `يجب أن يكون أقل من ${max} حرف`,
  }
}
