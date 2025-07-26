"use client"

import { useParams } from 'next/navigation'
import ProductDetailsPage from '../../../components/ProductDetailsPage'

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string

  return <ProductDetailsPage productId={productId} />
}
