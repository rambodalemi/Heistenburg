import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import type Stripe from "stripe"
import stripe from "@/lib/stripe"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"

// Make sure to disable the automatic body parsing
export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: NextRequest) {
  try {
    // Get the raw body as a Uint8Array
    const rawBody = await req.clone().arrayBuffer()
    // Convert to string
    const rawBodyString = Buffer.from(rawBody).toString("utf8")

    const headersList = await headers()
    const signature = headersList.get("stripe-signature")

    if (!signature) {
      console.error("Missing stripe-signature header")
      return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error("Missing STRIPE_WEBHOOK_SECRET")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    let event: Stripe.Event

    try {
      // Verify the webhook signature
      event = stripe.webhooks.constructEvent(rawBodyString, signature, webhookSecret)
      console.log("✅ Webhook signature verified")
    } catch (err: any) {
      console.error(`❌ Webhook signature verification failed:`, err)
      return NextResponse.json(
        {
          error: `Webhook Error: ${err.message}`,
          receivedSignature: signature,
          bodyLength: rawBodyString.length,
        },
        { status: 400 },
      )
    }

    // Handle the event
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

        // Connect to MongoDB
        await dbConnect()

        // Create the order in MongoDB
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
          stripeSessionId: session.id, // Add this to track the session
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

