"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "@/services/products-service"
import { getAllCategories } from "@/services/categories-service"
import { ProductCard } from "@/components/products/product-card"
import { ProductFilters, type ProductFilters as ProductFiltersType } from "@/components/products/ProductFilters"
import type { ProductType } from "@/models/Product"
import IsLoading from "@/components/loading/loading"
import { IsError } from "@/components/error/error"
import { NotFound } from "@/components/notfound/not-found"

export default function ProductListWithFilters() {
  const [filters, setFilters] = useState<ProductFiltersType>({
    name: "",
    minPrice: 0,
    maxPrice: 1000,
    category: "all",
  })

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
    staleTime: 60 * 1000,
  })

  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
    staleTime: 60 * 1000,
  })

  useEffect(() => {
    console.log("Products:", products)
    console.log("Categories:", categories)
    console.log("Current filters:", filters)
  }, [products, categories, filters])

  if (productsLoading || categoriesLoading) {
    return <IsLoading />
  }

  if (productsError || categoriesError) {
    return <IsError />
  }

  if (!products || products.length === 0 || !categories) {
    return <NotFound />
  }

  const filteredProducts = products.filter((product: ProductType) => {
    const productCategory = typeof product.category === "object" ? product.category?._id : product.category
    const categoryMatch = filters.category === "all" || productCategory === filters.category
    console.log(
      `Product ${product.name} - Category: ${productCategory}, Filter: ${filters.category}, Match: ${categoryMatch}`,
    )
    return (
      product.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      product.price >= filters.minPrice &&
      product.price <= filters.maxPrice &&
      categoryMatch
    )
  })

  console.log("Filtered products:", filteredProducts)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Our Products</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <ProductFilters categories={categories} onFilterChange={setFilters} />
        </div>
        <div className="w-full md:w-3/4">
          {filteredProducts.length === 0 ? (
            <p>No products found matching your criteria.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product: ProductType) => (
                <ProductCard key={product._id} {...product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

