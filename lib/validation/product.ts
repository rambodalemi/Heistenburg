import * as z from "zod"

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  details: z.string().min(1, "Short details are required"),
  price: z.coerce.number().min(0, "Price must be non-negative"),
  image: z.string(),
  features: z.string().min(1, "At least one feature is required").transform((val) => val.split(",").map((f) => f.trim())), 
  stock: z.coerce.number().int().min(0, "Stock must be non-negative"),
  deliveryEstimate: z.string().min(1, "Delivery estimate is required"),
})

export type ProductFormValues = z.infer<typeof productSchema>