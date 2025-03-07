import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import { ContactRepository, createContact, validateContact } from "@/models/Contact"

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await dbConnect()

    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate the contact data
    const validation = validateContact({ name, email, subject, message })
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.errors,
        },
        { status: 400 },
      )
    }

    // Create a new contact object
    const contactData = createContact({
      name,
      email,
      subject,
      message,
    })

    // Insert the contact into the database
    const contact = await ContactRepository.create(contactData)

    return NextResponse.json(
      {
        success: true,
        message: "Contact created successfully",
        contact: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
          createdAt: contact.createdAt,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating contact:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create contact",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// GET endpoint to retrieve contacts (for admin purposes)
export async function GET(request: Request) {
  try {
    // Connect to MongoDB
    await dbConnect()

    // Check for authentication here (this should be protected)
    // This is just a placeholder - you should implement proper authentication

    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const status = searchParams.get("status")
    const search = searchParams.get("search") || ""

    // Build filter
    const filter: any = {}
    if (status) {
      filter.status = status
    }

    // Add search functionality
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ]
    }

    // Get contacts with pagination
    const contacts = await ContactRepository.findAll(filter, {
      limit,
      skip: (page - 1) * limit,
      sort: { createdAt: -1 },
    })

    // Get total count for pagination
    const total = await ContactRepository.count(filter)

    return NextResponse.json({
      success: true,
      data: {
        contacts,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch contacts",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

