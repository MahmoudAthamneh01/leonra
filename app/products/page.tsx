"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '../../components/Header'
import ProductCard from '../../components/ProductCard'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Card, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Slider } from '../../components/ui/slider'
import { useProducts } from '../../store/AppContext'
import { Search, Filter, SlidersHorizontal, Grid, List } from 'lucide-react'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const { products, isLoading, fetchProducts } = useProducts()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    
    if (category) setCategoryFilter(category)
    if (search) setSearchQuery(search)
    
    fetchProducts({
      category: category || '',
      search: search || '',
      sortBy: sortBy,
      priceMin: priceRange[0],
      priceMax: priceRange[1]
    })
  }, [searchParams, sortBy, priceRange])

  const handleSearch = () => {
    fetchProducts({
      search: searchQuery,
      category: categoryFilter,
      sortBy: sortBy,
      priceMin: priceRange[0],
      priceMax: priceRange[1]
    })
  }

  const categories = [
    'ملابس',
    'مجوهرات',
    'حقائب',
    'أحذية',
    'عطور',
    'مكياج',
    'إكسسوارات',
    'رياضة',
    'منزل',
    'إلكترونيات'
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-t-lg" />
                <CardContent className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-6 bg-gray-200 rounded w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters Header */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="ابحث عن المنتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pr-10 font-arabic"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2">
              <Button onClick={handleSearch} className="bg-linora-primary hover:bg-linora-primary/90">
                <Search className="w-4 h-4 ml-2" />
                بحث
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-linora-primary text-linora-primary hover:bg-linora-primary/10"
              >
                <SlidersHorizontal className="w-4 h-4 ml-2" />
                فلترة
              </Button>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-l-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-r-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2 font-arabic">الفئة</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">جميع الفئات</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2 font-arabic">ترتيب حسب</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">الأحدث</SelectItem>
                      <SelectItem value="price_low">السعر: من الأقل للأعلى</SelectItem>
                      <SelectItem value="price_high">السعر: من الأعلى للأقل</SelectItem>
                      <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                      <SelectItem value="popular">الأكثر شعبية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 font-arabic">
                    نطاق السعر: {priceRange[0]} - {priceRange[1]} ريال
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    min={0}
                    step={50}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button onClick={handleSearch} className="bg-linora-primary hover:bg-linora-primary/90">
                  تطبيق الفلاتر
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setCategoryFilter('')
                    setPriceRange([0, 10000])
                    setSortBy('newest')
                    fetchProducts({})
                  }}
                >
                  إعادة تعيين
                </Button>
              </div>
            </Card>
          )}

          {/* Active Filters */}
          {(categoryFilter || searchQuery || priceRange[0] > 0 || priceRange[1] < 10000) && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium font-arabic">الفلاتر النشطة:</span>
              {categoryFilter && (
                <Badge variant="secondary" className="font-arabic">
                  الفئة: {categoryFilter}
                  <button
                    onClick={() => setCategoryFilter('')}
                    className="mr-1 hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="font-arabic">
                  البحث: {searchQuery}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mr-1 hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 10000) && (
                <Badge variant="secondary" className="font-arabic">
                  السعر: {priceRange[0]} - {priceRange[1]} ريال
                  <button
                    onClick={() => setPriceRange([0, 10000])}
                    className="mr-1 hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-gray-600 font-arabic">
            تم العثور على {products.length} منتج
          </p>
        </div>

        {/* Products Grid/List */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2 font-arabic">لم يتم العثور على منتجات</h3>
            <p className="text-gray-500 font-arabic">جرب البحث بكلمات مختلفة أو تعديل الفلاتر</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
