import { type NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import stripe from "@/lib/stripe";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const headerPayload = await headers();
    const signature = headerPayload.get("stripe-signature") as string;

    if (!signature) {
      return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET as string);
    } catch (err: any) {
      console.error(`❌ Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      if (session.payment_status !== "paid") {
        console.log(`⚠️ Payment not completed for session ${session.id}`);
        return NextResponse.json({ received: true });
      }

      const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items", "line_items.data.price.product"],
      });

      const lineItems = expandedSession.line_items?.data || [];

      // Connect to MongoDB
      await dbConnect();

      // Create the order in MongoDB
      const order = new Order({
        email: session.metadata?.email || "unknown",
        discordId: session.metadata?.discordId || "unknown",
        items: lineItems.map((item: any) => ({
          productId: item.price.product.id,
          name: item.price.product.name || "Unknown Product",
          quantity: item.quantity,
          price: item.price.unit_amount / 100,
        })),
        total: session.amount_total / 100,
        status: "paid",
        createdAt: new Date(),
        paymentMethod: session.payment_method_types[0],
      });

      await order.save();
      console.log("✅ Order saved in database!");
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
