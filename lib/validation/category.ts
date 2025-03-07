import { z } from "zod"

export const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  description: z.string().optional(),
  parent: z.string().optional(),
})

export type CategoryFormValues = z.infer<typeof categorySchema>
