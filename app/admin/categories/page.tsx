import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { getAllCategories } from "@/services/categories-service"
import CategoryList from "@/components/admin/CategoryList"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manage Categories",
  description: "View and manage product categories",
}

export default async function AdminCategoriesPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  })

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage your product categories</p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/create">Create Category</Link>
        </Button>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryList />
      </HydrationBoundary>
    </div>
  )
}

