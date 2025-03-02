"use client"

import Link from "next/link"
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  LineChart,
  BarChart3,
  PieChart,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data - replace with your actual data
const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 5500 },
]

const ordersByCategory = [
  { name: "Electronics", value: 40 },
  { name: "Clothing", value: 30 },
  { name: "Accessories", value: 20 },
  { name: "Other", value: 10 },
]

const stats = [
  {
    name: "Total Revenue",
    value: "$12,345",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    name: "Total Products",
    value: "125",
    change: "+5.2%",
    trend: "up",
    icon: Package,
  },
  {
    name: "Total Orders",
    value: "85",
    change: "-2.5%",
    trend: "down",
    icon: ShoppingCart,
  },
  {
    name: "Active Customers",
    value: "1,234",
    change: "+8.4%",
    trend: "up",
    icon: Users,
  },
]

const recentOrders = [
  {
    id: "#12345",
    customer: "John Doe",
    product: "Tech Backpack Pro",
    date: "2024-02-27",
    amount: "$79.99",
    status: "Completed",
  },
  {
    id: "#12344",
    customer: "Jane Smith",
    product: "Wireless Earbuds",
    date: "2024-02-27",
    amount: "$49.99",
    status: "Processing",
  },
  {
    id: "#12343",
    customer: "Mike Johnson",
    product: "Smart Watch",
    date: "2024-02-26",
    amount: "$199.99",
    status: "Processing",
  },
]

export default function AdminDashboard() {
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

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Chart */}
        {/* <Card className="bg-black/40 border-green-900/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              Sales Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#000",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card> */}

        {/* Orders by Category */}
        {/* <Card className="bg-black/40 border-green-900/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Orders by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersByCategory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#000",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Recent Orders */}
      {/* <Card className="bg-black/40 border-green-900/30 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Recent Orders</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/orders" className="text-gray-400 hover:text-white">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-green-900/30 hover:bg-green-900/10">
                <TableHead className="text-gray-400 font-medium">Order ID</TableHead>
                <TableHead className="text-gray-400 font-medium">Customer</TableHead>
                <TableHead className="text-gray-400 font-medium">Product</TableHead>
                <TableHead className="text-gray-400 font-medium">Date</TableHead>
                <TableHead className="text-right text-gray-400 font-medium">Amount</TableHead>
                <TableHead className="text-gray-400 font-medium">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id} className="border-green-900/30 hover:bg-green-900/10">
                  <TableCell className="text-white">{order.id}</TableCell>
                  <TableCell className="text-gray-300">{order.customer}</TableCell>
                  <TableCell className="text-gray-300">{order.product}</TableCell>
                  <TableCell className="text-gray-300">{order.date}</TableCell>
                  <TableCell className="text-right text-white">{order.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        order.status === "Completed"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-amber-500/10 text-amber-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}

      {/* Quick Actions */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/products/new">
          <Card className="bg-black/40 border-green-900/30 backdrop-blur-sm hover:bg-green-900/10 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-full bg-green-500/10 p-3">
                <Package className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium text-white">Add Product</h3>
                <p className="text-sm text-gray-400">Create a new product</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/orders">
          <Card className="bg-black/40 border-green-900/30 backdrop-blur-sm hover:bg-green-900/10 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-full bg-amber-500/10 p-3">
                <ShoppingCart className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-medium text-white">View Orders</h3>
                <p className="text-sm text-gray-400">Manage orders</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/customers">
          <Card className="bg-black/40 border-green-900/30 backdrop-blur-sm hover:bg-green-900/10 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-full bg-green-500/10 p-3">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium text-white">Customers</h3>
                <p className="text-sm text-gray-400">View customer list</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/analytics">
          <Card className="bg-black/40 border-green-900/30 backdrop-blur-sm hover:bg-green-900/10 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-full bg-amber-500/10 p-3">
                <PieChart className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-medium text-white">Analytics</h3>
                <p className="text-sm text-gray-400">View insights</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

