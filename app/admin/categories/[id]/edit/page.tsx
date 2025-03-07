import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { getCategoryById } from "@/services/categories-service"
import CategoryEditForm from "@/components/admin/CategoryEditForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Edit Category",
  description: "Update an existing product category",
}

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient()
  const { id } = params
  await queryClient.prefetchQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
  })

  return (
    <div className="container">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
          <p className="text-muted-foreground">Update the details of this category</p>
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CategoryEditForm id={id} />
        </HydrationBoundary>
      </div>
    </div>
  )
}

