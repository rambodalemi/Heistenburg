"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) {
      router.push("/")
      return
    }

    const verifyPaymentAndSaveOrder = async () => {
      try {
        // First verify the payment was successful
        const verifyResponse = await fetch(`/api/verify-payment?session_id=${sessionId}`)
        const verifyData = await verifyResponse.json()

        if (!verifyData.success) {
          console.error("Payment verification failed:", verifyData.error)
          setStatus("error")
          setErrorMessage(verifyData.error || "Payment verification failed")
          setErrorDetails(JSON.stringify(verifyData, null, 2))
          return
        }

        // Then save the order
        const saveOrderResponse = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stripeSessionId: sessionId,
          }),
        })

        const orderData = await saveOrderResponse.json()

        if (!saveOrderResponse.ok) {
          console.error("Error saving order:", orderData)
          setStatus("error")
          setErrorMessage(orderData.error || "Failed to save order")
          setErrorDetails(JSON.stringify(orderData, null, 2))
          return
        }

        if (orderData._id) {
          setOrderNumber(orderData._id)
          setStatus("success")
        } else {
          setStatus("error")
          setErrorMessage("Order creation failed")
          setErrorDetails(JSON.stringify(orderData, null, 2))
        }
      } catch (error) {
        console.error("Error processing order:", error)
        setStatus("error")
        setErrorMessage("An unexpected error occurred")
        setErrorDetails(error as any)
      }
    }

    verifyPaymentAndSaveOrder()
  }, [sessionId, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      {status === "loading" && (
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <h1 className="text-2xl font-bold mb-2">Processing your order...</h1>
          <p className="text-muted-foreground">Please wait while we confirm your payment.</p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2">Thank you for your order!</h1>
          <p className="mb-6 text-muted-foreground">
            Your order #{orderNumber} has been successfully placed. You will receive a confirmation email shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => router.push("/dashboard/orders")}>View your orders</Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              Continue shopping
            </Button>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="mb-6 text-muted-foreground">We couldn`&apos;`t process your order. {errorMessage}</p>
          <p className="mb-6 text-muted-foreground">Please contact our support team for assistance.</p>
          {errorDetails && (
            <details className="mb-6 text-left">
              <summary className="cursor-pointer">Error Details</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">{errorDetails}</pre>
            </details>
          )}
          <Button onClick={() => router.push("/")}>Return to homepage</Button>
        </div>
      )}
    </div>
  )
}

