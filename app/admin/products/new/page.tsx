
import { ProductForm } from "@/components/admin/ProductForm"

export default async function AdminProductsPage() {

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Admin: Product Creation</h1>
            <ProductForm />
        </div>
    )
}

