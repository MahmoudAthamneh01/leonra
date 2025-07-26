"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ModelDashboard } from '../../../components/ModelDashboard'
import { useAuth } from '../../../store/AppContext'

export default function ModelDashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'model')) {
      router.push('/auth')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-linora-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-linora-dark font-arabic">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'model') {
    return null
  }

  return <ModelDashboard />
}
