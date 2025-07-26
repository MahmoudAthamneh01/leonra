#!/usr/bin/env node

/**
 * سكريبت النشر للإنتاج
 * يقوم بتجهيز وتحميل المشروع للخادم
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 بدء عملية النشر...\n')

// 1. فحص البيئة
console.log('🔍 فحص البيئة...')
if (process.env.NODE_ENV !== 'production') {
  console.log('⚠️  تحذير: NODE_ENV ليس production')
  console.log('تعيين NODE_ENV=production...')
  process.env.NODE_ENV = 'production'
}

// 2. فحص Git status
console.log('\n📝 فحص حالة Git...')
try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' })
  if (gitStatus.trim()) {
    console.log('⚠️  يوجد تغييرات غير محفوظة في Git:')
    console.log(gitStatus)
    
    if (!process.argv.includes('--force')) {
      console.log('💡 استخدم --force للمتابعة بدون commit')
      process.exit(1)
    }
  } else {
    console.log('✅ Git نظيف')
  }
} catch (error) {
  console.log('⚠️  Git غير متوفر أو ليس مستودع Git')
}

// 3. تشغيل الاختبارات
console.log('\n🧪 تشغيل الاختبارات...')
try {
  execSync('npm test', { stdio: 'inherit' })
  console.log('✅ جميع الاختبارات نجحت')
} catch (error) {
  if (!process.argv.includes('--skip-tests')) {
    console.error('❌ فشلت الاختبارات')
    console.log('💡 استخدم --skip-tests لتخطي الاختبارات')
    process.exit(1)
  } else {
    console.log('⚠️  تم تخطي الاختبارات')
  }
}

// 4. بناء المشروع
console.log('\n🏗️  بناء المشروع...')
try {
  // تنظيف بناءات سابقة
  if (fs.existsSync('.next')) {
    execSync('rm -rf .next', { stdio: 'inherit' })
  }
  
  // بناء Frontend
  execSync('npm run build', { stdio: 'inherit' })
  console.log('✅ تم بناء Frontend')
  
  // بناء Backend إذا كان موجود
  const serverPath = path.join(__dirname, '..', 'server')
  if (fs.existsSync(serverPath)) {
    execSync('npm run build', { stdio: 'inherit', cwd: serverPath })
    console.log('✅ تم بناء Backend')
  }
} catch (error) {
  console.error('❌ فشل البناء')
  process.exit(1)
}

// 5. تحسين الملفات
console.log('\n⚡ تحسين الملفات...')
try {
  // ضغط الصور (إذا كان imagemin متوفر)
  if (fs.existsSync('node_modules/imagemin')) {
    console.log('🖼️  ضغط الصور...')
    execSync('npm run optimize:images', { stdio: 'inherit' })
  }
  
  // تحليل Bundle
  if (process.argv.includes('--analyze')) {
    console.log('📊 تحليل Bundle...')
    execSync('npm run analyze', { stdio: 'inherit' })
  }
  
  console.log('✅ تم تحسين الملفات')
} catch (error) {
  console.log('⚠️  تعذر تحسين الملفات')
}

// 6. إنشاء أرشيف للنشر
console.log('\n📦 إنشاء أرشيف النشر...')
const deployDir = path.join(__dirname, '..', 'deploy')
const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
const archiveName = `linora-${timestamp}.tar.gz`

try {
  // إنشاء مجلد النشر
  if (!fs.existsSync(deployDir)) {
    fs.mkdirSync(deployDir)
  }
  
  // إنشاء الأرشيف
  const filesToInclude = [
    '.next',
    'public',
    'package.json',
    'package-lock.json',
    'next.config.js',
    'server/dist',
    'server/package.json',
    'server/prisma/schema.prisma',
    '.env.production'
  ].filter(file => fs.existsSync(file))
  
  const tarCommand = `tar -czf ${path.join(deployDir, archiveName)} ${filesToInclude.join(' ')}`
  execSync(tarCommand, { stdio: 'inherit' })
  
  console.log(`✅ تم إنشاء أرشيف: ${archiveName}`)
} catch (error) {
  console.error('❌ فشل إنشاء الأرشيف')
  process.exit(1)
}

// 7. النشر (حسب البيئة)
const deployTarget = process.argv.find(arg => arg.startsWith('--target='))?.split('=')[1]

if (deployTarget) {
  console.log(`\n🌐 النشر إلى: ${deployTarget}`)
  
  switch (deployTarget) {
    case 'vercel':
      try {
        execSync('vercel --prod', { stdio: 'inherit' })
        console.log('✅ تم النشر على Vercel')
      } catch (error) {
        console.error('❌ فشل النشر على Vercel')
      }
      break
      
    case 'aws':
      try {
        execSync('aws s3 sync .next s3://linora-frontend/', { stdio: 'inherit' })
        console.log('✅ تم النشر على AWS')
      } catch (error) {
        console.error('❌ فشل النشر على AWS')
      }
      break
      
    case 'docker':
      try {
        execSync('docker build -t linora:latest .', { stdio: 'inherit' })
        execSync('docker push linora:latest', { stdio: 'inherit' })
        console.log('✅ تم النشر على Docker')
      } catch (error) {
        console.error('❌ فشل النشر على Docker')
      }
      break
      
    default:
      console.log('⚠️  هدف النشر غير مدعوم')
  }
}

// 8. تقرير النشر
console.log('\n' + '='.repeat(50))
console.log('🎉 اكتملت عملية النشر!')
console.log('='.repeat(50))

// إحصائيات البناء
const buildStats = {
  buildTime: new Date().toISOString(),
  nodeVersion: process.version,
  npmVersion: execSync('npm --version', { encoding: 'utf8' }).trim(),
  archiveSize: fs.existsSync(path.join(deployDir, archiveName)) 
    ? (fs.statSync(path.join(deployDir, archiveName)).size / 1024 / 1024).toFixed(2) + ' MB'
    : 'غير متوفر'
}

console.log('\n📊 إحصائيات البناء:')
Object.entries(buildStats).forEach(([key, value]) => {
  console.log(`  ${key}: ${value}`)
})

console.log('\n📋 الخطوات التالية:')
console.log('1. تحميل الأرشيف إلى الخادم')
console.log('2. فك الضغط وتثبيت التبعيات')
console.log('3. تشغيل المشروع')
console.log('4. مراقبة الأداء والأخطاء')

console.log('\n🔗 روابط مفيدة:')
console.log('📈 Analytics: https://analytics.linora.sa')
console.log('🐛 Monitoring: https://monitoring.linora.sa')
console.log('📝 Logs: https://logs.linora.sa')
console.log('')
