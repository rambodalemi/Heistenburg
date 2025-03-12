"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Eye, Download, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { OrderDocument } from "@/models/Order"

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/orders")
        if (!response.ok) {
          throw new Error("Failed to fetch orders")
        }
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Your Orders</h1>
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Loading your orders...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Orders</h1>

      {orders.length === 0 ? (
        <Card className="p-6 text-center bg-transparent">
          <p className="text-muted-foreground">You haven&apos;t placed any orders yet.</p>
          <Button className="mt-4" onClick={() => router.push("/")}>
            Start Shopping
          </Button>
        </Card>
      ) : (
        <Card className="bg-black/40 border-green-900/30 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-green-900/30">
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" className="text-gray-400 hover:text-white -ml-4">
                      Order ID
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" className="text-gray-400 hover:text-white -ml-4">
                      Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" className="text-gray-400 hover:text-white -ml-4">
                      Items
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Button variant="ghost" className="text-gray-400 hover:text-white -ml-4">
                      Status
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-right py-3 px-4">
                    <Button variant="ghost" className="text-gray-400 hover:text-white -mr-4">
                      Amount
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="w-[48px]" />
                </tr>
              </thead>
              <tbody>
                {orders.map((order: OrderDocument) => (
                  <tr key={order._id} className="border-b border-green-900/30">
                    <td className="py-3 px-4 text-white">
                      {typeof order._id === "string" ? order._id.substring(0, 8) : String(order._id).substring(0, 8)}
                    </td>
                    <td className="py-3 px-4 text-gray-300">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-gray-300">
                      {order.items && order.items.length > 0
                        ? `${order.items[0].name}${order.items.length > 1 ? ` + ${order.items.length - 1} more` : ""}`
                        : "No items"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-500/10 text-green-500"
                            : order.status === "Processing"
                              ? "bg-amber-500/10 text-amber-500"
                              : order.status === "Shipped"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-white">{formatCurrency(order.totalAmount)}</td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4 text-gray-400" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Download className="h-4 w-4" />
                            Download Invoice
                          </DropdownMenuItem>
                          {order.status !== "Cancelled" && (
                            <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-500">
                              <XCircle className="h-4 w-4" />
                              Cancel Order
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}

