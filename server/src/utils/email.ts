export async function sendVerificationEmail(email: string, token: string, name?: string) {
  const from = process.env.EMAIL_FROM || 'no-reply@linora.sa';
  const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;
  
  // في الإنتاج، استخدم مزود بريد إلكتروني حقيقي مثل SendGrid أو AWS SES
  console.log(`
    📧 إرسال بريد تحقق:
    من: ${from}
    إلى: ${email}
    الاسم: ${name || 'عزيزي المستخدم'}
    رابط التحقق: ${verificationUrl}
    
    موضوع البريد: مرحباً بك في منصة لينورا - تحقق من بريدك الإلكتروني
    
    المحتوى:
    مرحباً ${name || 'عزيزي المستخدم'},
    
    مرحباً بك في منصة لينورا! 🌟
    
    لإكمال إنشاء حسابك، يرجى النقر على الرابط التالي للتحقق من بريدك الإلكتروني:
    ${verificationUrl}
    
    هذا الرابط صالح لمدة 24 ساعة فقط.
    
    إذا لم تقم بإنشاء هذا الحساب، يرجى تجاهل هذا البريد.
    
    مع تحيات فريق لينورا 👑
  `);
  
  // TODO: استبدل هذا بمزود بريد إلكتروني حقيقي
  return true;
}

export async function sendPasswordResetEmail(email: string, token: string, name?: string) {
  const from = process.env.EMAIL_FROM || 'no-reply@linora.sa';
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
  
  console.log(`
    📧 إرسال بريد إعادة تعيين كلمة المرور:
    من: ${from}
    إلى: ${email}
    الاسم: ${name || 'عزيزي المستخدم'}
    رابط الإعادة: ${resetUrl}
    
    موضوع البريد: إعادة تعيين كلمة المرور - منصة لينورا
    
    المحتوى:
    مرحباً ${name || 'عزيزي المستخدم'},
    
    تلقينا طلباً لإعادة تعيين كلمة المرور لحسابك في منصة لينورا.
    
    للمتابعة، يرجى النقر على الرابط التالي:
    ${resetUrl}
    
    هذا الرابط صالح لمدة ساعة واحدة فقط.
    
    إذا لم تطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا البريد.
    
    مع تحيات فريق لينورا 👑
  `);
  
  return true;
}
