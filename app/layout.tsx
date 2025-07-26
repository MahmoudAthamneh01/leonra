import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from '../store/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'منصة لينورا - Linora Platform',
  description: 'منصة التجارة الإلكترونية الرائدة للنساء في المملكة العربية السعودية',
  keywords: ['ecommerce', 'saudi arabia', 'women', 'تجارة إلكترونية', 'السعودية', 'نساء'],
  authors: [{ name: 'فريق لينورا التقني' }],
  creator: 'Linora Team',
  publisher: 'Linora Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://linora.sa',
    languages: {
      'ar-SA': 'https://linora.sa',
      'en-US': 'https://linora.sa/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://linora.sa',
    title: 'منصة لينورا - Linora Platform',
    description: 'منصة التجارة الإلكترونية الرائدة للنساء في المملكة العربية السعودية',
    siteName: 'Linora Platform',
    images: [
      {
        url: 'https://linora.sa/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'منصة لينورا',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'منصة لينورا - Linora Platform',
    description: 'منصة التجارة الإلكترونية الرائدة للنساء في المملكة العربية السعودية',
    images: ['https://linora.sa/og-image.jpg'],
    creator: '@LinoraPlatform',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${inter.className} font-arabic bg-background text-foreground antialiased`}>
        <AppProvider>
          <div className="relative min-h-screen">
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  )
}
