"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useBasket } from "@/components/shared/nav/basket-context"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"

export default function PaymentConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "cancelled">("loading")
  const [order, setOrder] = useState<any>(null)
  const { clearCart } = useBasket()
  const { isSignedIn } = useUser()
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (!sessionId) {
      router.push("/")
      return
    }

    const verifyPayment = async () => {
      try {
        // First verify the payment with Stripe
        const verifyResponse = await fetch(`/api/verify-payment?session_id=${sessionId}`)
        const verifyData = await verifyResponse.json()

        if (verifyData.success) {
          setStatus("success")

          // Then create/fetch the order in our database
          const orderResponse = await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ stripeSessionId: sessionId }),
          })

          const orderData = await orderResponse.json()
          setOrder(orderData)
          clearCart()
        } else {
          setStatus("cancelled")
        }
      } catch (error) {
        console.error("Error processing payment confirmation:", error)
        setStatus("cancelled")
        toast.error("Error processing payment", {
          description: "There was a problem confirming your payment.",
        })
      }
    }

    verifyPayment()
  }, [sessionId, clearCart, router])

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen">Processing your order...</div>
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {status === "success" ? (
        <div className="space-y-8">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-xl mb-2">Thank you for your purchase. Your order has been confirmed.</p>
            {!isSignedIn && order && (
              <div className="p-4 rounded-lg max-w-md mx-auto mt-4 mb-8">
                <p className="font-medium mb-2">Important: Save your order information</p>
                <p className="text-sm mb-2">
                  Your order ID is: <span className="font-bold">{order._id}</span>
                </p>
                <p className="text-sm">You'll need this ID and your email to track your order status.</p>
              </div>
            )}
          </div>

          {order && (
            <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Order Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Items</h3>
                  <div className="space-y-2 divide-y">
                    {order.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between py-2">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center gap-4 mt-8">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
            {!isSignedIn && (
              <Button asChild variant="outline">
                <Link href="/orders/track">Track Your Order</Link>
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
          <p className="text-xl mb-8">
            Your payment was not completed. Please try again or contact support if you need assistance.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/checkout">Try Again</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

