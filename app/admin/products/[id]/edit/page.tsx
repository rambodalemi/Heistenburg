import type { Metadata } from "next"
import { ProductEditForm } from "@/components/admin/ProductEditForm"
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { getProductById } from "@/services/products-service"
import { getAllCategories } from "@/services/categories-service"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  // You might want to fetch the product here to get its name
  // const product = await getProductById(id)
  return {
    title: `Edit Product ${id}`,
    description: "Edit an existing product in your inventory",
  }
}

export default async function EditProductPage({ params }: Props) {
  const queryClient = new QueryClient()
  const { id } = await params

  await queryClient.prefetchQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  })

  await queryClient.prefetchQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  })

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductEditForm productId={id} />
      </HydrationBoundary>
    </div>
  )
}
