"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import OrderDetails from "@/components/data/orders/order-details"

export default function OrdersPage() {
  const { user, isSignedIn, isLoaded } = useUser()
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn) {
      // Redirect to track order page for guest users
      window.location.href = "/orders/track"
      return
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders")
        if (!response.ok) throw new Error("Failed to fetch orders")

        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [isSignedIn, isLoaded])

  if (!isLoaded || (isLoaded && !isSignedIn)) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

      {isLoading ? (
        <div className="text-center py-10">Loading your orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg mb-4">You haven't placed any orders yet.</p>
          <Button asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <OrderDetails key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}

