import mongoose, { Schema } from "mongoose";
import dbConnect from "@/lib/mongodb";

// Define the Contact interface
export interface IContact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  status: "new" | "read" | "replied" | "archived";
  tags?: string[];
}

// Create the Contact schema
const ContactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
    trim: true,
    minlength: [5, "Subject must be at least 5 characters"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
    minlength: [10, "Message must be at least 10 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["new", "read", "replied", "archived"],
    default: "new",
  },
  tags: {
    type: [String],
    default: [],
  },
});

// Create and export the Contact model
// We need to check if the model already exists to prevent the "Cannot overwrite model once compiled" error
export const Contact =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

// Contact validation function
export function validateContact(contact: Partial<IContact>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!contact.name || contact.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!contact.email || !/^\S+@\S+\.\S+$/.test(contact.email)) {
    errors.email = "Valid email is required";
  }

  if (!contact.subject || contact.subject.trim().length < 5) {
    errors.subject = "Subject must be at least 5 characters";
  }

  if (!contact.message || contact.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Create a new contact object
export function createContact(
  contactData: Pick<IContact, "name" | "email" | "subject" | "message">
): Omit<IContact, "_id" | "id"> {
  return {
    ...contactData,
    createdAt: new Date(),
    status: "new",
    tags: [],
  } as Omit<IContact, "_id" | "id">;
}

// Contact repository functions
export const ContactRepository = {
  // Find contact by ID
  async findById(id: string) {
    await dbConnect();
    return await Contact.findById(id);
  },

  // Find all contacts with optional filtering
  async findAll(
    filter = {},
    options = { limit: 100, skip: 0, sort: { createdAt: -1 } }
  ) {
    await dbConnect();
    return await Contact.find(filter)
      .skip(options.skip)
      .limit(options.limit)
      .lean();
  },

  // Create a new contact
  async create(contactData: Omit<IContact, "_id" | "id">) {
    await dbConnect();
    const contact = new Contact(contactData);
    await contact.save();
    return contact;
  },

  // Update a contact
  async update(id: string, updateData: Partial<IContact>) {
    await dbConnect();
    const result = await Contact.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return result;
  },

  // Delete a contact
  async delete(id: string) {
    await dbConnect();
    const result = await Contact.findByIdAndDelete(id);
    return result !== null;
  },

  // Count contacts
  async count(filter = {}) {
    await dbConnect();
    return await Contact.countDocuments(filter);
  },
};
