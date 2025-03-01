import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Package, Clock, ArrowUpRight, ArrowDownRight, Package2 } from "lucide-react"

const stats = [
  {
    name: "Total Orders",
    value: "125",
    change: "+12.5%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    name: "Processing",
    value: "8",
    change: "+2.1%",
    trend: "up",
    icon: Package,
  },
  {
    name: "Delivered",
    value: "116",
    change: "+8.2%",
    trend: "up",
    icon: Package2,
  },
  {
    name: "Pending",
    value: "1",
    change: "-0.5%",
    trend: "down",
    icon: Clock,
  },
]
const recentOrders = [
  {
    id: "#12345",
    product: "Tech Backpack Pro",
    date: "2024-02-27",
    status: "Delivered",
    amount: "$79.99",
  },
  {
    id: "#12344",
    product: "Urban Pulse Sneakers",
    date: "2024-02-26",
    status: "Processing",
    amount: "$129.99",
  },
  {
    id: "#12343",
    product: "Neon Nights Hoodie",
    date: "2024-02-25",
    status: "Delivered",
    amount: "$89.99",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="bg-black/40 border-green-900/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className={`flex items-center text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                {stat.trend === "up" ? (
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                )}
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>


      {/* Recent Orders */}
      <Card className="bg-black/40 border-green-900/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-green-900/30">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Order ID</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Product</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-green-900/30">
                    <td className="py-3 px-4 text-white">{order.id}</td>
                    <td className="py-3 px-4 text-gray-300">{order.product}</td>
                    <td className="py-3 px-4 text-gray-300">{order.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-amber-500/10 text-amber-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-white">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

