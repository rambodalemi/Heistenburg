import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentOrders = [
  {
    id: "ORD001",
    customer: "Alex Brown",
    product: "Discord Boost Tool V3",
    status: "completed",
    date: "2024-02-25",
    amount: "$29.99",
  },
  {
    id: "ORD002",
    customer: "Sarah Wilson",
    product: "Discord Nitro",
    status: "pending",
    date: "2024-02-25",
    amount: "$9.99",
  },
  {
    id: "ORD003",
    customer: "Mike Johnson",
    product: "Server Setup",
    status: "processing",
    date: "2024-02-24",
    amount: "$49.99",
  },
]

export function RecentOrders() {
  return (
    <div className="space-y-8">
      {recentOrders.map((order) => (
        <div key={order.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-zinc-800">{order.customer[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{order.customer}</p>
            <p className="text-sm text-zinc-400">{order.product}</p>
          </div>
          <div className="ml-auto font-medium">
            <Badge
              variant={order.status === "completed" ? "default" : order.status === "pending" ? "secondary" : "outline"}
              className={
                order.status === "completed"
                  ? "bg-green-500/10 text-green-500"
                  : order.status === "pending"
                    ? "bg-yellow-500/10 text-yellow-500"
                    : ""
              }
            >
              {order.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

