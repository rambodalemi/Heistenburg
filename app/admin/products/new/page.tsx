import ProductForm  from "@/components/admin/ProductForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Product",
  description: "Add a new product to your inventory",
}

export default function CreateProductPage() {
  return (
    <div className="container">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
          <p className="text-muted-foreground">
            Fill in the details below to add a new product to your inventory.
          </p>
        </div>
        <ProductForm />
      </div>
    </div>
  )
}
