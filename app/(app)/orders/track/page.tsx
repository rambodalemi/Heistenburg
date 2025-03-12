"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import Link from "next/link"

export default function TrackOrderPage() {
    const [email, setEmail] = useState(() => {
        // Try to get the email from localStorage if available
        if (typeof window !== "undefined") {
            return localStorage.getItem("guestOrderEmail") || ""
        }
        return ""
    })
    const [orderId, setOrderId] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [order, setOrder] = useState<any>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch(
                `/api/orders/track?email=${encodeURIComponent(email)}&orderId=${encodeURIComponent(orderId)}`,
            )

            if (!response.ok) {
                throw new Error("Failed to find order")
            }

            const data = await response.json()
            setOrder(data)
        } catch (error) {
            toast.error("Order not found", {
                description: "We couldn't find your order. Please check your email and order ID.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>

            {!order ? (
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Find Your Order</CardTitle>
                        <CardDescription>Enter your email and order ID to track your order</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="The email you used during checkout"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="orderId">Order ID</Label>
                                <Input
                                    id="orderId"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    required
                                    placeholder="Your order ID from the confirmation page"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                                disabled={isLoading}
                            >
                                {isLoading ? "Searching..." : "Track Order"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            ) : (
                <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-sm border">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Order #{order._id}</h2>
                        <div className="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">{order.status}</div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>

                    <div className="space-y-6">
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

                        {order.shippingAddress && (
                            <div>
                                <h3 className="font-medium mb-2">Shipping Address</h3>
                                <p>{order.shippingAddress.name}</p>
                                <p>{order.shippingAddress.address}</p>
                                <p>
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                                </p>
                                <p>{order.shippingAddress.country}</p>
                            </div>
                        )}

                        <div>
                            <h3 className="font-medium mb-2">Contact Information</h3>
                            <p>Email: {order.email}</p>
                            {order.userName && <p>Name: {order.userName}</p>}
                            {order.discordId && <p>Discord ID: {order.discordId}</p>}
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button asChild>
                            <Link href="/" className="w-full">
                                Return to Home
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

