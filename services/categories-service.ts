import type { CategoryType } from "@/models/Category"
import type { CategoryFormValues } from "@/lib/validation/category"

export async function getAllCategories(): Promise<CategoryType[]> {
  const response = await fetch("/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.details || "Failed to fetch categories")
  }

  return response.json()
}

export async function getCategoryById(id: string): Promise<CategoryType> {
  const response = await fetch(`/api/categories/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.details || "Failed to fetch category")
  }

  return response.json()
}

export async function createCategory(data: CategoryFormValues): Promise<CategoryType> {
  const response = await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.details || "Failed to create category")
  }

  return response.json()
}

export async function updateCategory(id: string, data: CategoryFormValues): Promise<CategoryType> {
  const response = await fetch(`/api/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.details || "Failed to update category")
  }

  return response.json()
}

export async function deleteCategory(id: string): Promise<void> {
  const response = await fetch(`/api/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.details || "Failed to delete category")
  }
}

export async function getCategoryBySlug(slug: string): Promise<CategoryType> {
  const encodedSlug = encodeURIComponent(slug)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${encodedSlug}`, {
    cache: "no-store", // Optional: Prevent caching issues
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch category: ${response.statusText}`)
  }

  return response.json()
}
