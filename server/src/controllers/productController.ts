import { Request, Response } from 'express';
import prisma from '../models/prisma';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
    email: string;
  };
}

export async function listProducts(req: AuthenticatedRequest, res: Response) {
  try {
    const { 
      page = 1, 
      limit = 20, 
      category, 
      minPrice, 
      maxPrice, 
      search, 
      tajiraId,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const where: any = { isActive: true };

    // فلترة حسب الفئة
    if (category) {
      where.category = category;
    }

    // فلترة حسب السعر
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    // فلترة حسب التاجرة
    if (tajiraId) {
      where.tajiraId = Number(tajiraId);
    }

    // البحث في الاسم والوصف
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    // ترتيب المنتجات
    const orderBy: any = {};
    orderBy[sortBy as string] = sortOrder;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy,
        include: {
          tajira: {
            select: {
              id: true,
              name: true,
              email: true,
              tajiraProfile: {
                select: {
                  shopName: true,
                  shopLogo: true,
                  isVerified: true
                }
              }
            }
          },
          reviews: {
            select: {
              rating: true
            }
          },
          _count: {
            select: {
              reviews: true,
              wishlistItems: true
            }
          }
        }
      }),
      prisma.product.count({ where })
    ]);

    // حساب معدل التقييم لكل منتج
    const productsWithRating = products.map(product => {
      const avgRating = product.reviews.length > 0 
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length 
        : 0;
      
      return {
        ...product,
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount: product._count.reviews,
        wishlistCount: product._count.wishlistItems
      };
    });

    res.json({
      products: productsWithRating,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('خطأ في جلب المنتجات:', error);
    res.status(500).json({ message: 'خطأ في الخادم الداخلي' });
  }
}

export async function getProduct(req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: Number(id), isActive: true },
      include: {
        tajira: {
          select: {
            id: true,
            name: true,
            email: true,
            tajiraProfile: {
              select: {
                shopName: true,
                shopLogo: true,
                shopBanner: true,
                isVerified: true,
                totalSales: true
              }
            }
          }
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        collaborations: {
          where: { status: 'ACTIVE' },
          include: {
            model: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    avatar: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ message: 'المنتج غير موجود' });
    }

    // حساب معدل التقييم
    const avgRating = product.reviews.length > 0 
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length 
      : 0;

    res.json({
      ...product,
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: product.reviews.length
    });
  } catch (error) {
    console.error('خطأ في جلب المنتج:', error);
    res.status(500).json({ message: 'خطأ في الخادم الداخلي' });
  }
}

export async function createProduct(req: AuthenticatedRequest, res: Response) {
  try {
    const { 
      name, 
      description, 
      price, 
      salePrice,
      category, 
      subcategory,
      brand,
      quantity,
      weight,
      dimensions,
      isFeatured = false
    } = req.body;

    // التحقق من صلاحية المستخدم (تاجرة أو مشرف)
    if (!req.user || (req.user.role !== 'tajira' && req.user.role !== 'admin')) {
      return res.status(403).json({ message: 'غير مصرح لك بإضافة منتجات' });
    }

    // التحقق من البيانات المطلوبة
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).json({ 
        message: 'الاسم والوصف والسعر والفئة والكمية مطلوبة' 
      });
    }

    // إنشاء SKU تلقائي
    const sku = `LNR-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    // معالجة الصور المرفوعة
    let images: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      images = req.files.map((file: any) => `/uploads/products/${file.filename}`);
    } else if (req.file) {
      images = [`/uploads/products/${req.file.filename}`];
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        salePrice: salePrice ? Number(salePrice) : null,
        images,
        category,
        subcategory,
        brand,
        sku,
        quantity: Number(quantity),
        weight: weight ? Number(weight) : null,
        dimensions,
        isFeatured: Boolean(isFeatured),
        tajiraId: req.user.id
      },
      include: {
        tajira: {
          select: {
            id: true,
            name: true,
            tajiraProfile: {
              select: {
                shopName: true,
                isVerified: true
              }
            }
          }
        }
      }
    });

    // إرسال إشعار للمشرفين (في التطبيق الحقيقي)
    console.log(`منتج جديد تم إضافته: ${product.name} بواسطة ${req.user.email}`);

    res.status(201).json({
      ...product,
      message: 'تم إضافة المنتج بنجاح'
    });
  } catch (error) {
    console.error('خطأ في إضافة المنتج:', error);
    res.status(500).json({ message: 'خطأ في الخادم الداخلي' });
  }
}

export async function updateProduct(req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // التحقق من وجود المنتج والصلاحية
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { tajira: true }
    });

    if (!existingProduct) {
      return res.status(404).json({ message: 'المنتج غير موجود' });
    }

    // التحقق من الصلاحية (صاحب المنتج أو مشرف)
    if (!req.user || 
        (req.user.role !== 'admin' && existingProduct.tajiraId !== req.user.id)) {
      return res.status(403).json({ message: 'غير مصرح لك بتعديل هذا المنتج' });
    }

    // معالجة الصور الجديدة
    if (req.files && Array.isArray(req.files)) {
      updateData.images = req.files.map((file: any) => `/uploads/products/${file.filename}`);
    } else if (req.file) {
      updateData.images = [`/uploads/products/${req.file.filename}`];
    }

    // تحديث البيانات الرقمية
    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.salePrice) updateData.salePrice = Number(updateData.salePrice);
    if (updateData.quantity) updateData.quantity = Number(updateData.quantity);
    if (updateData.weight) updateData.weight = Number(updateData.weight);

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        tajira: {
          select: {
            id: true,
            name: true,
            tajiraProfile: {
              select: {
                shopName: true,
                isVerified: true
              }
            }
          }
        }
      }
    });

    res.json({
      ...product,
      message: 'تم تحديث المنتج بنجاح'
    });
  } catch (error) {
    console.error('خطأ في تحديث المنتج:', error);
    res.status(500).json({ message: 'خطأ في الخادم الداخلي' });
  }
}

export async function deleteProduct(req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = req.params;

    // التحقق من وجود المنتج والصلاحية
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { tajira: true }
    });

    if (!existingProduct) {
      return res.status(404).json({ message: 'المنتج غير موجود' });
    }

    // التحقق من الصلاحية
    if (!req.user || 
        (req.user.role !== 'admin' && existingProduct.tajiraId !== req.user.id)) {
      return res.status(403).json({ message: 'غير مصرح لك بحذف هذا المنتج' });
    }

    // حذف المنتج (soft delete)
    await prisma.product.update({
      where: { id: Number(id) },
      data: { isActive: false }
    });

    res.json({ 
      message: 'تم حذف المنتج بنجاح',
      id: Number(id)
    });
  } catch (error) {
    console.error('خطأ في حذف المنتج:', error);
    res.status(500).json({ message: 'خطأ في الخادم الداخلي' });
  }
}

// وظائف إضافية للمنتجات
export async function getCategories(req: Request, res: Response) {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        children: {
          where: { isActive: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    res.json(categories);
  } catch (error) {
    console.error('خطأ في جلب الفئات:', error);
    res.status(500).json({ message: 'خطأ في الخادم الداخلي' });
  }
}

export async function addToWishlist(req: AuthenticatedRequest, res: Response) {
  try {
    const { productId } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'يجب تسجيل الدخول أولاً' });
    }

    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId: Number(productId)
        }
      }
    });

    if (existingItem) {
      // إزالة من المفضلة
      await prisma.wishlistItem.delete({
        where: { id: existingItem.id }
      });
      return res.json({ message: 'تم إزالة المنتج من المفضلة', action: 'removed' });
    } else {
      // إضافة للمفضلة
      await prisma.wishlistItem.create({
        data: {
          userId: req.user.id,
          productId: Number(productId)
        }
      });
      return res.json({ message: 'تم إضافة المنتج للمفضلة', action: 'added' });
    }
  } catch (error) {
    console.error('خطأ في إدارة المفضلة:', error);
    res.status(500).json({ message: 'خطأ في الخادم الداخلي' });
  }
}

export async function getWishlist(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'يجب تسجيل الدخول أولاً' });
    }

    const wishlist = await prisma.wishlistItem.findMany({
      where: { userId: req.user.id },
      include: {
        product: {
          include: {
            tajira: {
              select: {
                name: true,
                tajiraProfile: {
                  select: { shopName: true }
                }
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(wishlist);
  } catch (error) {
    console.error('خطأ في جلب المفضلة:', error);
    res.status(500).json({ message: 'خطأ في الخادم الداخلي' });
  }
}
