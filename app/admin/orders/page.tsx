"use client"

import { useEffect, useState } from "react"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Eye, Download, XCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { toast } from "sonner"
import Link from "next/link"

type Order = {
  _id: string
  createdAt: string
  userId: string
  email: string
  items: Array<{ name: string; quantity: number }>
  status: string
  totalAmount: number
  discordId?: string
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders")
      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast.error("Error", {
        description: "Failed to fetch orders. Please try again.",

      })
    } finally {
      setLoading(false)
    }
  }

  const markAsProcessed = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/process`, {
        method: "PUT",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to mark order as processed");
      }

      // ✅ Update local state to reflect the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Processed" } : order
        )
      );

      toast.success("Success", {
        description: "Order marked as Processed",
      });
    } catch (error) {
      console.error("Error marking order as processed:", error);
      toast.error("Error", {
        description: "Failed to mark order as processed. Please try again.",
      });
    }
  };






  const deleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete order")
      }

      setOrders(orders.filter((order) => order._id !== orderId))
      toast.success("Success", {
        description: "Order deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting order:", error)
      toast.error("Error", {
        description: "Failed to delete order. Please try again.",

      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">All Orders</h1>
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Loading orders...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Orders</h1>
        <Button onClick={fetchOrders}>Refresh Orders</Button>
      </div>

      <Card className="bg-black/40 border-green-900/30 backdrop-blur-sm overflow-hidden">
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
                <th className="text-left py-3 px-4 hidden md:table-cell">
                  <Button variant="ghost" className="text-gray-400 hover:text-white -ml-4">
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="text-left py-3 px-4 hidden lg:table-cell">
                  <Button variant="ghost" className="text-gray-400 hover:text-white -ml-4">
                    Customer
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
                <th className="text-right py-3 px-4 hidden sm:table-cell">
                  <Button variant="ghost" className="text-gray-400 hover:text-white -mr-4">
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="w-[48px]" />
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-green-900/30">
                  <td className="py-3 px-4 text-white">{order._id.substring(0, 8)}</td>
                  <td className="py-3 px-4 text-gray-300 hidden md:table-cell">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-300 hidden lg:table-cell lg:flex flex-col">
                    {order.userId ? `User: ${order.userId.substring(0, 8)}` : order.email}{order.discordId}
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    {order.items && order.items.length > 0
                      ? `${order.items[0].name}${order.items.length > 1 ? ` + ${order.items.length - 1} more` : ""}`
                      : "No items"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${order.status === "Delivered"
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
                  <td className="py-3 px-4 text-right text-white hidden sm:table-cell">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="py-3 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/orders/${order._id}`} className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={() => markAsProcessed(order._id)}>
                          <CheckCircle className="h-4 w-4" />
                          Mark as Processed
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="gap-2 text-red-500 focus:text-red-500"
                          onClick={() => deleteOrder(order._id)}
                        >
                          <XCircle className="h-4 w-4" />
                          Delete Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

