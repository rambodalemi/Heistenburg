import CategoryForm from "@/components/admin/CategoryForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Category",
  description: "Add a new product category",
}

export default function CreateCategoryPage() {
  return (
    <div className="container">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Category</h1>
          <p className="text-muted-foreground">Add a new category to organize your products</p>
        </div>
        <CategoryForm />
      </div>
    </div>
  )
}

