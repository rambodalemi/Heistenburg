import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import Category from "@/models/Category"
import { productSchema } from "@/lib/validation/product"

export async function GET() {
  try {
    await dbConnect()
    await Category.findOne() 
    const products = await Product.find({}).populate("category").lean()
    return NextResponse.json(products)
  } catch (error) {
    console.error("GET /api/products error:", error)
    return NextResponse.json(
      {
        error: "Error fetching products",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect()

    const body = await req.json()
    const validatedData = productSchema.parse(body)

    if (validatedData.category === "uncategorized" || validatedData.category === "") {
      validatedData.category = null
    }

    const product = await Product.create(validatedData)

    return NextResponse.json(product)
  } catch (error) {
    console.error("POST /api/products error:", error)
    return NextResponse.json(
      {
        error: "Error creating product",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

