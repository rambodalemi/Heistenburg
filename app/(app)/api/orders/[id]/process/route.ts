import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

// Define the params structure for dynamic routes correctly
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string}> }
) {
  try {
    await dbConnect();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Order ID is missing" }, { status: 400 });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status: "Processed" }, // Ensure "Processed" is in your schema
      { new: true, runValidators: true }
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
