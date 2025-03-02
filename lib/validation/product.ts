import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  details: z.string().min(20, "Details must be at least 20 characters"),
  price: z.number().positive("Price must be a positive number"),
  rating: z.number().min(0).max(5).optional().default(0),
  reviewCount: z.number().min(0).optional().default(0),
  image: z.string().url("Please provide a valid image URL"),
  features: z.array(z.string()).min(1, "Add at least one feature"),
  stock: z.number().int().positive("Stock must be a positive integer"),
  deliveryEstimate: z.string().min(3, "Please provide a delivery estimate"),
})

export type ProductFormValues = z.infer<typeof productSchema>

