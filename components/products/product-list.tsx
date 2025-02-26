import { ProductCard } from "@/components/products/product-card"

const products = [
  {
    id: "1",
    name: "Heist Addiction",
    price: 29.99,
    rating: 4.5,
    image: "/heist_addiction.jpg",
  },
  {
    id: "2",
    name: "Greedy Graber",
    price: 29.99,
    rating: 4.5,
    image: "/greedy_graber.jpg",
  },
  {
    id: "3",
    name: "Maniac",
    price: 29.99,
    rating: 4.5,
    image: "/maniac.jpg",
  },
  {
    id: "4",
    name: "Heist Lunatic",
    price: 29.99,
    rating: 4.5,
    image: "/skibidi.jpg",
  },
  // Add more products...
]

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Our Products</h1>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

