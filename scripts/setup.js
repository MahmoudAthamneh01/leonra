#!/usr/bin/env node

/**
 * سكريبت إعداد المشروع للبيئة الإنتاجية
 * يقوم بالتحضير اللازم للنشر
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 بدء إعداد مشروع لينورا للإنتاج...\n')

// 1. فحص متطلبات النظام
console.log('📋 فحص متطلبات النظام...')
try {
  execSync('node --version', { stdio: 'inherit' })
  execSync('npm --version', { stdio: 'inherit' })
  console.log('✅ Node.js و npm متوفران\n')
} catch (error) {
  console.error('❌ Node.js أو npm غير متوفر')
  process.exit(1)
}

// 2. التحقق من متغيرات البيئة
console.log('🔐 فحص متغيرات البيئة...')
const envPath = path.join(__dirname, '..', '.env.local')
if (!fs.existsSync(envPath)) {
  console.log('⚠️  .env.local غير موجود، نسخ من .env.example...')
  const examplePath = path.join(__dirname, '..', '.env.example')
  if (fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, envPath)
    console.log('✅ تم إنشاء .env.local')
  } else {
    console.error('❌ .env.example غير موجود')
  }
} else {
  console.log('✅ .env.local موجود')
}

// 3. تثبيت التبعيات
console.log('\n📦 تثبيت تبعيات Frontend...')
try {
  execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
  console.log('✅ تم تثبيت تبعيات Frontend')
} catch (error) {
  console.error('❌ فشل تثبيت تبعيات Frontend')
  process.exit(1)
}

// 4. تثبيت تبعيات Backend
console.log('\n📦 تثبيت تبعيات Backend...')
const serverPath = path.join(__dirname, '..', 'server')
if (fs.existsSync(serverPath)) {
  try {
    execSync('npm install', { stdio: 'inherit', cwd: serverPath })
    console.log('✅ تم تثبيت تبعيات Backend')
  } catch (error) {
    console.error('❌ فشل تثبيت تبعيات Backend')
    process.exit(1)
  }
} else {
  console.log('⚠️  مجلد server غير موجود، تخطي...')
}

// 5. إنشاء مجلدات مطلوبة
console.log('\n📁 إنشاء مجلدات مطلوبة...')
const requiredDirs = [
  'public/uploads',
  'public/images',
  'public/icons',
  'logs',
  'backup'
]

requiredDirs.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`✅ تم إنشاء ${dir}`)
  }
})

// 6. إنشاء ملفات .gitkeep للمجلدات الفارغة
const gitkeepDirs = [
  'public/uploads',
  'logs',
  'backup'
]

gitkeepDirs.forEach(dir => {
  const gitkeepPath = path.join(__dirname, '..', dir, '.gitkeep')
  if (!fs.existsSync(gitkeepPath)) {
    fs.writeFileSync(gitkeepPath, '')
    console.log(`✅ تم إنشاء .gitkeep في ${dir}`)
  }
})

// 7. تجهيز قاعدة البيانات (إذا كان Prisma موجود)
console.log('\n🗄️  تجهيز قاعدة البيانات...')
if (fs.existsSync(path.join(serverPath, 'prisma'))) {
  try {
    execSync('npx prisma generate', { stdio: 'inherit', cwd: serverPath })
    console.log('✅ تم إنشاء Prisma Client')
    
    // فقط في بيئة التطوير
    if (process.env.NODE_ENV !== 'production') {
      try {
        execSync('npx prisma db push', { stdio: 'inherit', cwd: serverPath })
        console.log('✅ تم تحديث قاعدة البيانات')
      } catch (error) {
        console.log('⚠️  تعذر تحديث قاعدة البيانات - تأكد من الاتصال')
      }
    }
  } catch (error) {
    console.log('⚠️  تعذر تجهيز Prisma')
  }
} else {
  console.log('⚠️  Prisma غير موجود، تخطي...')
}

// 8. بناء المشروع للإنتاج
if (process.env.NODE_ENV === 'production' || process.argv.includes('--build')) {
  console.log('\n🏗️  بناء المشروع للإنتاج...')
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
    console.log('✅ تم بناء المشروع بنجاح')
  } catch (error) {
    console.error('❌ فشل بناء المشروع')
    process.exit(1)
  }
}

// 9. إنشاء تقرير الأمان
console.log('\n🔒 فحص الأمان...')
try {
  execSync('npm audit --audit-level high', { stdio: 'inherit' })
  console.log('✅ فحص الأمان مكتمل')
} catch (error) {
  console.log('⚠️  تم العثور على ثغرات أمنية، يرجى المراجعة')
}

// 10. ملخص الإعداد
console.log('\n' + '='.repeat(50))
console.log('🎉 تم إعداد مشروع لينورا بنجاح!')
console.log('='.repeat(50))
console.log('\n📋 الخطوات التالية:')
console.log('1. تعديل متغيرات البيئة في .env.local')
console.log('2. إعداد قاعدة البيانات')
console.log('3. تشغيل المشروع بـ: npm run dev')
console.log('4. زيارة: http://localhost:3000')
console.log('\n📚 للمساعدة: راجع README.md')
console.log('🐛 للإبلاغ عن الأخطاء: https://github.com/MahmoudAthamneh01/leonra/issues')
console.log('')
