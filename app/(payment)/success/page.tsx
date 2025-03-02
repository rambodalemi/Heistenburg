"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useBasket } from "@/components/shared/nav/basket-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"

export default function SuccessPage() {
  const { clearCart } = useBasket()
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [isVerifying, setIsVerifying] = useState(true)
  const [isPaymentVerified, setIsPaymentVerified] = useState(false)

  useEffect(() => {
    async function verifyPayment() {
      if (!sessionId) {
        setIsVerifying(false)
        return
      }

      try {
        // Verify the payment was successful by checking the session status
        const response = await fetch(`/api/verify-payment?session_id=${sessionId}`)
        const data = await response.json()

        if (data.success) {
          setIsPaymentVerified(true)
          // Only clear the cart after confirming payment was successful
          clearCart()
        }
      } catch (error) {
        console.error("Error verifying payment:", error)
      } finally {
        setIsVerifying(false)
      }
    }

    verifyPayment()
  }, [sessionId, clearCart])

  if (isVerifying) {
    return (
      <div className="container mx-auto py-20 px-4 flex justify-center items-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-green-500" />
          <h2 className="text-xl font-semibold">Verifying your payment...</h2>
          <p className="text-zinc-500 mt-2">Please wait while we confirm your payment.</p>
        </div>
      </div>
    )
  }

  if (!isPaymentVerified && !isVerifying) {
    return (
      <div className="container mx-auto py-20 px-4 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Payment Verification Failed</CardTitle>
            <CardDescription>We couldn't verify your payment. Please contact customer support.</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-20 px-4 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>Thank you for your purchase. Your order has been processed successfully.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-zinc-600">
            We've sent a confirmation email with your order details. Your order will be shipped soon.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            Continue Shopping
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}