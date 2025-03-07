import type { ProductType } from "@/models/Product"
import type { ProductFormValues } from "@/lib/validation/product"

export async function getAllProducts(): Promise<ProductType[]> {
  const response = await fetch("/api/products")
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  const products = await response.json()
  console.log("Fetched products:", products)
  return products
}

export async function getProductById(id: string): Promise<ProductType> {
  const response = await fetch(`/api/products/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }
  return response.json()
}

export async function createProduct(data: ProductFormValues): Promise<ProductType> {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to create product")
  }
  return response.json()
}

export async function updateProduct(id: string, data: ProductFormValues): Promise<ProductType> {
  const response = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to update product")
  }
  return response.json()
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete product")
  }
}
