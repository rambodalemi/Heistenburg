import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import { getAllOrders } from "@/services/orders-service";
import AllOrdersData from "@/components/data/orders/all-orders-data";

export default async function AdminOrders() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
      queryKey: ["allOrders"],
      queryFn: getAllOrders,
  });

  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
          <AllOrdersData />
      </HydrationBoundary>

  );
};

