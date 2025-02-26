"use client"

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { CheckoutForm } from "@/components/checkout-form"
import type { CartItem } from "@/components/shared/nav/basket"

// Make sure this is your publishable key, not the secret key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    // Retrieve cart from localStorage
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart)
      setCart(parsedCart)

      // Create PaymentIntent only if cart is not empty
      if (parsedCart.length > 0) {
        const amount = parsedCart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
        fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret))
          .catch((error) => console.error("Error creating PaymentIntent:", error))
      }
    }
  }, [])

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
  )
}

