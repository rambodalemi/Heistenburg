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
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer_details"],
    })

    // Check if the payment was successful
    const isPaymentSuccessful = session.payment_status === "paid"

    if (!isPaymentSuccessful) {
      return NextResponse.json(
        {
          success: false,
          error: `Payment not successful. Status: ${session.payment_status}`,
        },
        { status: 400 },
      )
    }

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        payment_status: session.payment_status,
        customer_email: session.customer_details?.email,
        metadata: session.metadata,
        line_items: session.line_items?.data,
        customer_details: session.customer_details,
      },
    })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error verifying payment",
      },
      { status: 500 },
    )
  }
}

