import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { ProductTable } from "@/components/admin/ProductTable"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin - Product List",
  description: "Manage your product inventory",
}

export default async function AdminProductLists() {
  const queryClient = new QueryClient()
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Product Inventory</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductTable />
      </HydrationBoundary>
    </div>
  )
}

