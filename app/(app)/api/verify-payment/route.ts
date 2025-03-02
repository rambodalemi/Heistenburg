import { type NextRequest, NextResponse } from "next/server"
import stripe from "@/lib/stripe"

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const sessionId = url.searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.json({ success: false, error: "Missing session_id parameter" }, { status: 400 })
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Check if the payment was successful
    const isPaymentSuccessful = session.payment_status === "paid"

    return NextResponse.json({
      success: isPaymentSuccessful,
      session: {
        id: session.id,
        payment_status: session.payment_status,
        customer_email: session.customer_details?.email,
      },
    })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ success: false, error: "Error verifying payment" }, { status: 500 })
  }
}