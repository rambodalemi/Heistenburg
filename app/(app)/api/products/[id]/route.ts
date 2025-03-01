import { NextResponse, type NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";
import { productSchema } from "@/lib/validation/product";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // Explicitly mark params as Promise
) {
  try {
    await dbConnect();
    const { id } = await context.params; // Await params to resolve

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await context.params;

    const body = await req.json();
    const validatedData = productSchema.parse(body);
    const product = await Product.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await context.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
}
