import { QueryClient } from "@tanstack/react-query";
import { getProductById } from "@/services/products-service";
import OneProductData from "@/components/data/products/one-product-data";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["oneProduct", id],
    queryFn: () => getProductById(id),
  });

  return <OneProductData id={id} />;
};

export default ProductPage;
