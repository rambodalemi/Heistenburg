import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"
import stripe from "@/lib/stripe"
import { getAuth } from "@clerk/nextjs/server"

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req)
    const { stripeSessionId } = await req.json()

    if (!stripeSessionId) {
      return NextResponse.json({ error: "Missing Stripe session ID" }, { status: 400 })
    }

    await dbConnect()

    // Check if order already exists
    const existingOrder = await Order.findOne({ stripeSessionId })
    if (existingOrder) {
      return NextResponse.json(existingOrder)
    }

    // Fetch session data from Stripe
    let session: any
    try {
      session = await stripe.checkout.sessions.retrieve(stripeSessionId, {
        expand: ["line_items", "customer_details"],
      })
    } catch (stripeError) {
      console.error("Error fetching Stripe session:", stripeError)
      return NextResponse.json({ error: "Error fetching Stripe session" }, { status: 500 })
    }

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 })
    }

    // Parse items from metadata or line items
    let items = []
    if (session.metadata?.items) {
      try {
        items = JSON.parse(session.metadata.items)
      } catch (e) {
        console.error("Error parsing items from metadata:", e)
      }
    } else if (session.line_items?.data) {
      items = session.line_items.data.map((item: any) => ({
        productId: item.price?.product || "unknown",
        name: item.description || "Product",
        price: item.amount_total / 100 / (item.quantity || 1),
        quantity: item.quantity || 1,
      }))
    }

    // Create order
    const orderData = {
      stripeSessionId,
      userId: userId || session.metadata?.userId || null,
      email: session.customer_details?.email || session.metadata?.email,
      discordId: session.metadata?.discordId || null,
      userName: session.metadata?.userName || null,
      items,
      totalAmount: session.amount_total
        ? session.amount_total / 100
        : Number.parseFloat(session.metadata?.totalAmount || "0"),
      status: "Processing",
      shippingAddress: session.customer_details?.address
        ? {
            name: session.customer_details.name,
            address: session.customer_details.address.line1,
            city: session.customer_details.address.city,
            state: session.customer_details.address.state,
            postalCode: session.customer_details.address.postal_code,
            country: session.customer_details.address.country,
          }
        : undefined,
    }

    const order = new Order(orderData)
    await order.save()

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      {
        error: "Error creating order",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

