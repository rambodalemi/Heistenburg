import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User"; 
import { CartItem } from "@/components/shared/nav/basket";

export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({})
      .populate({
        path: "user",
        select: "email",
      })
      .populate({
        path: "items.productId",
        select: "name",
      })
      .lean();

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { userId, cart, total }: { userId: string; cart: CartItem[]; total: number } = await req.json();

    if (!userId || !cart || !Array.isArray(cart) || cart.length === 0 || total <= 0) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    // Fetch user email from the database
    const user = await User.findOne({ userId }).select("email");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create the order
    const order = new Order({
      user: user._id, // Reference to the User model
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        name: item.name, // Ensure this is included in the frontend request
      })),
      total,
      status: "pending",
    });

    await order.save();

    return NextResponse.json({ success: true, orderId: order._id });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
