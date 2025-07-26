import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import prisma from '../models/prisma';
import { sendVerificationEmail } from '../utils/email';

export async function register(req: Request, res: Response) {
  try {
    const { email, password, role, name, phone } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!email || !password || !role || !name) {
      return res.status(400).json({ message: 'البريد الإلكتروني وكلمة المرور والدور والاسم مطلوبة' });
    }

    // التحقق من صحة الدور
    const validRoles = ['buyer', 'tajira', 'model', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'نوع الحساب غير صحيح' });
    }

    // التحقق من وجود المستخدم مسبقاً
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'هذا البريد الإلكتروني مستخدم مسبقاً' });
    }

    // تشفير كلمة المرور
    const hashed = await bcrypt.hash(password, 12);
    
    // إنشاء المستخدم
    const user = await prisma.user.create({ 
      data: { 
        email, 
        password: hashed, 
        role,
        name,
        phone: phone || null,
        isVerified: false 
      } 
    });
    
    // إنشاء token للتحقق
    const token = uuid();
    await prisma.verificationToken.create({
      data: { 
        token, 
        userId: user.id, 
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) 
      }
    });
    
    // إرسال بريد التحقق
    await sendVerificationEmail(email, token, name);
    
    res.status(201).json({ 
      id: user.id, 
      email: user.email, 
      name: user.name,
      role: user.role,
      message: 'تم إنشاء الحساب بنجاح. يرجى التحقق من بريدك الإلكتروني' 
    });
  } catch (error) {
    console.error('خطأ في إنشاء الحساب:', error);
    res.status(500).json({ message: 'خطأ في الخادم الداخلي' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'البريد الإلكتروني وكلمة المرور مطلوبان' });
    }

    // العثور على المستخدم
    const user = await prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        name: true,
        isVerified: true,
        createdAt: true
      }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'بيانات الدخول غير صحيحة' });
    }

    // التحقق من كلمة المرور
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: 'بيانات الدخول غير صحيحة' });
    }

    // التحقق من تفعيل الحساب
    if (!user.isVerified) {
      return res.status(400).json({ 
        message: 'يجب تفعيل حسابك أولاً. يرجى التحقق من بريدك الإلكتروني',
        requiresVerification: true 
      });
    }

    // إنشاء JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        role: user.role,
        email: user.email
      }, 
      process.env.JWT_SECRET || 'linora-secret-key', 
      { expiresIn: '7d' }
    );

    // إنشاء refresh token
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET || 'linora-refresh-secret',
      { expiresIn: '30d' }
    );

    res.json({ 
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt
      },
      message: 'تم تسجيل الدخول بنجاح'
    });
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    res.status(500).json({ message: 'خطأ في الخادم الداخلي' });
  }
}

export async function verifyEmail(req: Request, res: Response) {
  try {
    const { token } = req.params;
    
    if (!token) {
      return res.status(400).json({ message: 'رمز التحقق مطلوب' });
    }

    // العثور على رمز التحقق
    const record = await prisma.verificationToken.findUnique({ 
      where: { token },
      include: { user: true }
    });
    
    if (!record) {
      return res.status(400).json({ message: 'رمز التحقق غير صحيح' });
    }

    if (record.expires < new Date()) {
      return res.status(400).json({ message: 'رمز التحقق منتهي الصلاحية' });
    }

    // تفعيل الحساب
    await prisma.user.update({ 
      where: { id: record.userId }, 
      data: { isVerified: true } 
    });
    
    // حذف رمز التحقق
    await prisma.verificationToken.delete({ 
      where: { id: record.id } 
    });
    
    res.json({ 
      message: 'تم تفعيل حسابك بنجاح! يمكنك الآن تسجيل الدخول',
      user: {
        email: record.user.email,
        name: record.user.name
      }
    });
  } catch (error) {
    console.error('خطأ في تفعيل الحساب:', error);
    res.status(500).json({ message: 'خطأ في الخادم الداخلي' });
  }
}

// إضافة وظائف جديدة
export async function forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'البريد الإلكتروني مطلوب' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // لأمان إضافي، نرجع نفس الرسالة حتى لو لم يكن الحساب موجوداً
      return res.json({ message: 'إذا كان هذا البريد مسجلاً، ستتلقى رسالة إعادة تعيين كلمة المرور' });
    }

    // إنشاء رمز إعادة تعيين
    const resetToken = uuid();
    await prisma.passwordResetToken.create({
      data: {
        token: resetToken,
        userId: user.id,
        expires: new Date(Date.now() + 60 * 60 * 1000) // ساعة واحدة
      }
    });

    // إرسال بريد إعادة التعيين
    // await sendPasswordResetEmail(email, resetToken, user.name);

    res.json({ message: 'إذا كان هذا البريد مسجلاً، ستتلقى رسالة إعادة تعيين كلمة المرور' });
  } catch (error) {
    console.error('خطأ في طلب إعادة تعيين كلمة المرور:', error);
    res.status(500).json({ message: 'خطأ في الخادم الداخلي' });
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'الرمز وكلمة المرور الجديدة مطلوبان' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' });
    }

    const record = await prisma.passwordResetToken.findUnique({ 
      where: { token },
      include: { user: true }
    });
    
    if (!record || record.expires < new Date()) {
      return res.status(400).json({ message: 'رمز إعادة التعيين غير صحيح أو منتهي الصلاحية' });
    }

    // تحديث كلمة المرور
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: record.userId },
      data: { password: hashedPassword }
    });

    // حذف رمز إعادة التعيين
    await prisma.passwordResetToken.delete({
      where: { id: record.id }
    });

    res.json({ message: 'تم تحديث كلمة المرور بنجاح' });
  } catch (error) {
    console.error('خطأ في إعادة تعيين كلمة المرور:', error);
    res.status(500).json({ message: 'خطأ في الخادم الداخلي' });
  }
}

export async function refreshToken(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ message: 'رمز التحديث مطلوب' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'linora-refresh-secret') as any;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true, name: true, isVerified: true }
    });

    if (!user || !user.isVerified) {
      return res.status(401).json({ message: 'رمز تحديث غير صحيح' });
    }

    // إنشاء رمز جديد
    const newToken = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET || 'linora-secret-key',
      { expiresIn: '7d' }
    );

    res.json({ token: newToken });
  } catch (error) {
    console.error('خطأ في تحديث الرمز:', error);
    res.status(401).json({ message: 'رمز تحديث غير صحيح' });
  }
}
