"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "@/components/checkout-form";
import type { CartItem } from "@/components/shared/nav/basket";
import { useUser } from "@clerk/nextjs";
import { createPaymentIntent } from "@/services/paymentService";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);

      if (parsedCart.length > 0 && user?.id) {
        createPaymentIntent(user.id, parsedCart)
          .then((data) => setClientSecret(data.clientSecret))
          .catch((error) => console.error("Error creating PaymentIntent:", error));
      }
    }
  }, [user]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm cart={cart} />
        </Elements>
      )}
      {!clientSecret && <div>Loading...</div>}
    </div>
  );
}
