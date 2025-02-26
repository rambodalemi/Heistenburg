"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useBasket } from "@/components/shared/nav/basket-context"

export default function PaymentConfirmationPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "cancelled">("loading")
  const { clearCart } = useBasket()

  useEffect(() => {
    const redirectStatus = searchParams.get("redirect_status")
    if (redirectStatus === "succeeded") {
      setStatus("success")
      clearCart() // Clear the cart on successful payment
    } else {
      setStatus("cancelled")
    }
  }, [searchParams, clearCart])

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      {status === "success" ? (
        <>
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-xl mb-8">Thank you for your purchase. Your order has been confirmed.</p>
        </>
      ) : (
        <>
          <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
          <p className="text-xl mb-8">
            Your payment was not completed. Please try again or contact support if you need assistance.
          </p>
        </>
      )}
      <div className="flex justify-center gap-4">
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
        {status === "cancelled" && (
          <Button asChild variant="outline">
            <Link href="/checkout">Try Again</Link>
          </Button>
        )}
      </div>
    </div>
  )
}

