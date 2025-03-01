import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getAllProducts } from "@/services/products-service";
import AllProductsData from "@/components/data/products/all-products.data";

export default async function ProductLists() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllProductsData />
    </HydrationBoundary>

  );
};

