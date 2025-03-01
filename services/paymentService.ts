import { CartItem } from "@/components/shared/nav/basket";
import api from "./api";

interface PaymentIntentResponse {
  clientSecret: string;
}

export async function createPaymentIntent(userId: string, cart: CartItem[]) {
  if (!userId || !cart || cart.length === 0) {
    throw new Error("Invalid payment data");
  }

  const amount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const response = await api.post<PaymentIntentResponse>(
    "/create-payment-intent",
    {
      amount,
      userId,
      cart,
    }
  );

  return response.data;
}
