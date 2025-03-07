import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Category from "@/models/Category"
import { categorySchema } from "@/lib/validation/category"

export async function GET() {
  try {
    await dbConnect()

    const categories = await Category.find({}).populate("parent").lean()

    return NextResponse.json(categories)
  } catch (error) {
    console.error("GET /api/categories error:", error)
    return NextResponse.json(
      {
        error: "Error fetching categories",
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
    const validatedData = categorySchema.parse(body)

    // Generate slug from name
    const slug = validatedData.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")

    // Create category with generated slug
    const category = await Category.create({
      ...validatedData,
      slug,
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error("POST /api/categories error:", error)
    return NextResponse.json(
      {
        error: "Error creating category",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

