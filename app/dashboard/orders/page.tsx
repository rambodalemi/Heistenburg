import { ArrowUpDown, ChevronDown, MoreHorizontal, Eye, Download, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"


export default async function OrdersPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  await dbConnect()
  const orders = await Order.find({ userId: user.id }).populate("items.productId").lean()


  return (
    <div className="space-y-6">
      {/* Orders Table */}
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
                    Product
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="text-left py-3 px-4">
                  <Button variant="ghost" className="text-gray-400 hover:text-white -ml-4">
                    Status
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Tracking</th>
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
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-green-900/30">
                  <td className="py-3 px-4 text-white">{order.id}</td>
                  <td className="py-3 px-4 text-gray-300">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-gray-300">{order.item}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${order.status === "Delivered"
                        ? "bg-green-500/10 text-green-500"
                        : order.status === "Processing"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-red-500/10 text-red-500"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{order.tracking}</td>
                  <td className="py-3 px-4 text-right text-white">{order.amount}</td>
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
    </div>
  )
}

