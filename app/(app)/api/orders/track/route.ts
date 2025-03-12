import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const email = url.searchParams.get("email")
    const orderId = url.searchParams.get("orderId")

    if (!email || !orderId) {
      return NextResponse.json({ error: "Email and order ID are required" }, { status: 400 })
    }

    await dbConnect()

    // Find the order by ID and email
    const order = await Order.findOne({
      _id: orderId,
      email: email,
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error tracking order:", error)
    return NextResponse.json(
      {
        error: "An error occurred while tracking the order",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

