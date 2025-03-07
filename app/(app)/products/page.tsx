import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"
import ProductListWithFilters from "@/components/products/ProductListWithFilters"

export default function ProductLists() {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListWithFilters />
    </HydrationBoundary>
  )
}
