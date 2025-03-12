"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useBasket } from "@/components/shared/nav/basket-context"
import CheckoutForm from "@/components/checkout-form"

export default function CheckoutPage() {
  const { cart } = useBasket()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Give the cart context time to initialize
    const timer = setTimeout(() => {
      // Only redirect if cart is definitely empty after initialization
      if (cart.length === 0) {
        router.push("/") // Redirect to home page if cart is empty
      }
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [cart, router])

  // Show loading state while checking cart
  if (isLoading) {
    return <div className="container mx-auto py-10 px-4 text-center">Loading...</div>
  }

  // If cart has items, show the checkout form
  if (cart.length > 0) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <CheckoutForm />
      </div>
    )
  }

  // This is a fallback, but should rarely be seen due to the redirect
  return null
}

