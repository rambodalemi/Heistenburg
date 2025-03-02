import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"

export async function GET(req: NextRequest) {
  try {
    await dbConnect()

    const url = new URL(req.url)
    const userId = url.searchParams.get("userId")

    const query: any = {}
    if (userId) {
      query.user = userId
    }

    const orders = await Order.find(query).sort({ createdAt: -1 })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Error fetching orders" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    await dbConnect()

    const order = new Order(data)
    await order.save()

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Error creating order" }, { status: 500 })
  }
}