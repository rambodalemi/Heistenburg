import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const orderId = params.id
    
    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      )
    }
    
    await dbConnect()
    
    // Find and update the order status
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: "Processed" },
      { new: true }
    )
    
    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(order)
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json(
      {
        error: "An error occurred while updating the order",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
