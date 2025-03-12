"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Package } from "lucide-react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"

interface TrackOrderPromptProps {
  className?: string
  variant?: "default" | "compact"
}

export default function TrackOrderPrompt({ className = "", variant = "default" }: TrackOrderPromptProps) {
  const [guestOrderId, setGuestOrderId] = useState<string | null>(null)
  const [guestOrderEmail, setGuestOrderEmail] = useState<string | null>(null)
  const { isSignedIn } = useUser()

  useEffect(() => {
    // Only check for guest order info if user is not signed in
    if (typeof window !== "undefined" && !isSignedIn) {
      const storedOrderId = localStorage.getItem("guestOrderId")
      const storedEmail = localStorage.getItem("guestOrderEmail")

      if (storedOrderId) setGuestOrderId(storedOrderId)
      if (storedEmail) setGuestOrderEmail(storedEmail)
    }
  }, [isSignedIn])

  // Don't show anything if there's no guest order info
  if (isSignedIn || (!guestOrderId && !guestOrderEmail)) {
    return null
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-3 p-3 rounded-lg ${className}`}>
        <Package className="h-5 w-5 text-green-600 flex-shrink-0" />
        <div className="flex-grow">
          <p className="text-sm font-medium">Have a recent order to track?</p>
        </div>
        <Button asChild size="sm" variant="outline">
          <Link href="/orders/track">Track Order</Link>
        </Button>
      </div>
    )
  }

  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="rounded-full bg-green-100 p-3">
            <Package className="h-6 w-6 text-green-600" />
          </div>

          <div className="flex-grow">
            <h3 className="font-medium text-lg mb-1">Track your recent order</h3>
            <p className="text-muted-foreground text-sm">
              {guestOrderId
                ? `You have an order with ID: ${guestOrderId.substring(0, 8)}...`
                : "You have a recent order you can track"}
            </p>
          </div>

          <Button
            asChild
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            <Link
              href={
                guestOrderId
                  ? `/orders/track?orderId=${guestOrderId}&email=${encodeURIComponent(guestOrderEmail || "")}`
                  : "/orders/track"
              }
            >
              Track Order
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

