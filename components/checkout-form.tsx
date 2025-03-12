"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useBasket } from "@/components/shared/nav/basket-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useUser } from "@clerk/nextjs"

export default function CheckoutForm() {
  const { cart } = useBasket()
  const router = useRouter()
  const { isSignedIn, user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: user?.primaryEmailAddress?.emailAddress || "",
    discordId: "",
    userName: user?.fullName || "",
  })

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      console.log("Submitting checkout form with data:", { cart, formData })

      // Store email for guest users to retrieve orders later
      if (!isSignedIn) {
        localStorage.setItem("guestOrderEmail", formData.email)
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          customerInfo: formData,
        }),
      })

      console.log("Received response:", response)

      let data
      const responseText = await response.text()
      console.log("Response text:", responseText)

      try {
        data = JSON.parse(responseText)
      } catch (error) {
        console.error("Error parsing JSON:", error)
        throw new Error(`Unable to parse server response: ${responseText}`)
      }

      if (!response.ok) {
        throw new Error(data.error || "An error occurred during checkout")
      }

      if (data.url) {
        router.push(data.url)
      } else {
        throw new Error("No checkout URL returned")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast.error("Checkout failed", {
        description: error instanceof Error ? error.message : "There was a problem processing your payment.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Enter your details</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {!isSignedIn && (
                  <p className="text-sm text-muted-foreground mt-1">You'll need this email to track your order later</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordId">Discord ID</Label>
                <Input
                  id="discordId"
                  name="discordId"
                  placeholder="Your Discord ID"
                  required
                  value={formData.discordId}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userName">Full Name (Optional)</Label>
                <Input
                  id="userName"
                  name="userName"
                  placeholder="Your Name"
                  value={formData.userName}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ${total.toFixed(2)} USD`
                )}
              </Button>
              <p className="text-center w-full mt-2 text-sm text-zinc-500">
                You'll be able to choose between credit card and PayPal on the next screen
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

