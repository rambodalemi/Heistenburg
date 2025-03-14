import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Category from "@/models/Category"
import { categorySchema } from "@/lib/validation/category"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()
    
    const { id } = await params
    const category = await Category.findById(id).populate("parent").lean()

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error(`GET /api/categories/${params} error:`, error)
    return NextResponse.json(
      {
        error: "Error fetching category",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()
    
    const { id } = await params
    const body = await req.json()
    const validatedData = categorySchema.parse(body)

    // Generate slug from name
    const slug = validatedData.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")

    const category = await Category.findByIdAndUpdate(
      id,
      {
        ...validatedData,
        slug,
      },
      { new: true },
    ).populate("parent")

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error(`PUT /api/categories/${params} error:`, error)
    return NextResponse.json(
      {
        error: "Error updating category",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()
    
    const { id } = await params
    // Check if category is used in any products
    const Product = (await import("@/models/Product")).default
    const productsWithCategory = await Product.countDocuments({
      category: id,
    })

    if (productsWithCategory > 0) {
      return NextResponse.json(
        {
          error: "Cannot delete category",
          details: `This category is used by ${productsWithCategory} products`,
        },
        { status: 400 },
      )
    }

    // Check if category has children
    const childrenCount = await Category.countDocuments({
      parent: id,
    })

    if (childrenCount > 0) {
      return NextResponse.json(
        {
          error: "Cannot delete category",
          details: `This category has ${childrenCount} subcategories`,
        },
        { status: 400 },
      )
    }

    const category = await Category.findByIdAndDelete(id)

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`DELETE /api/categories/${params} error:`, error)
    return NextResponse.json(
      {
        error: "Error deleting category",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

