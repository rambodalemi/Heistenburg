"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useBasket } from "@/components/shared/nav/basket-context"
import CheckoutForm from "@/components/checkout-form"

export default function CheckoutPage() {
  const { cart } = useBasket()
  const router = useRouter()

  useEffect(() => {
    // Check if cart is empty
    const savedCart = localStorage.getItem("cart")
    if (!savedCart || JSON.parse(savedCart).length === 0) {
      router.push("/") // Redirect to home page if cart is empty
    }
  }, [router])

  if (cart.length === 0) {
    return null // Return null to prevent flash of content before redirect
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <CheckoutForm />
    </div>
  )
}