import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import type Stripe from "stripe"
import stripe from "@/lib/stripe"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"

export const config = {
  api: {
    bodyParser: false,
  },
}

async function getRawBody(req: NextRequest): Promise<string> {
  const chunks = []
  const reader = req.body?.getReader()

  if (!reader) {
    throw new Error("Request body is empty")
  }

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
  }

  return Buffer.concat(chunks).toString("utf8")
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await getRawBody(req)

    const headersList = await headers()
    const signature = headersList.get("stripe-signature")

    if (!signature) {
      console.error("Missing stripe-signature header")
      return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("Missing STRIPE_WEBHOOK_SECRET")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err: any) {
      console.error(`❌ Webhook signature verification failed: ${err.message}`)
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      if (session.payment_status !== "paid") {
        console.log(`⚠️ Payment not completed for session ${session.id}`)
        return NextResponse.json({ received: true })
      }

      try {
        const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ["line_items", "line_items.data.price.product"],
        })

        const lineItems = expandedSession.line_items?.data || []

        await dbConnect()

        const order = new Order({
          email: session.metadata?.email || "unknown",
          discordId: session.metadata?.discordId || "unknown",
          items: lineItems.map((item: any) => ({
            productId: item.price?.product?.id,
            name: item.price?.product?.name || "Unknown Product",
            quantity: item.quantity,
            price: (item.price?.unit_amount || 0) / 100,
          })),
          total: (session.amount_total || 0) / 100,
          status: "paid",
          createdAt: new Date(),
          paymentMethod: session.payment_method_types?.[0] || "unknown",
        })

        await order.save()
        console.log("✅ Order saved in database!")
      } catch (error) {
        console.error("❌ Error processing order:", error)
        // Still return 200 to Stripe but log the error
        return NextResponse.json({ received: true })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("❌ Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

