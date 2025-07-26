"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '../components/Header'
import { Homepage } from '../components/Homepage'
import { useAuth } from '../store/AppContext'

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-linora-primary/5 to-linora-secondary/5">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-linora-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-linora-dark font-arabic">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Homepage />
      </main>
    </div>
  )
}
