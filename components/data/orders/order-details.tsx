import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OrderDetailsProps {
  order: any
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Order #{order._id}</CardTitle>
          <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
      </CardHeader>
      <CardContent className="space-y-6">
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

        <div className="flex justify-between font-bold text-lg">
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
      </CardContent>
    </Card>
  )
}

function getStatusVariant(status: string) {
  switch (status.toLowerCase()) {
    case "processing":
      return "destructive"
    case "shipped":
      return "default"
    case "delivered":
      return "default"
    case "cancelled":
      return "destructive"
    default:
      return "secondary"
  }
}

