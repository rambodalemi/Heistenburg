"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ReviewSection } from "@/components/products/reviews-section"
import { QuantityInput } from "@/components/products/quantity-input"
import { useBasket } from "@/components/shared/nav/basket-context"

// Mock product data
const product = {
  id: "discord-boost-tool-v3",
  name: "Discord Boost Tool V3",
  description:
    "Enhance your Discord server with our powerful Boost Tool V3. Increase engagement, automate tasks, and grow your community effortlessly.",
  price: 29.99,
  rating: 4.5,
  reviewCount: 128,
  image: "/placeholder.svg?height=600&width=600",
  features: [
    "Server boosting automation",
    "Custom role management",
    "Advanced analytics dashboard",
    "Integration with popular bots",
    "24/7 technical support",
  ],
  stock: 65,
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useBasket()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="inline-flex items-center text-sm text-zinc-400 hover:text-zinc-100 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border border-zinc-800">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-500 text-yellow-500" : "fill-zinc-700 text-zinc-700"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-zinc-400">({product.reviewCount} reviews)</span>
            </div>
          </div>
          <p className="text-lg text-zinc-300">{product.description}</p>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-green-500">${product.price.toFixed(2)}</span>
            <Badge variant="outline" className="text-yellow-500 border-yellow-500/50">
              {product.stock} in stock
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <QuantityInput value={quantity} onChange={setQuantity} min={1} max={product.stock} />
            <span className="text-sm text-zinc-400">Total: ${(product.price * quantity).toFixed(2)}</span>
          </div>
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>

      <Tabs defaultValue="features" className="mt-12">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="mt-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle>Product Features</CardTitle>
              <CardDescription>Key features of the {product.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-zinc-300">
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
              <CardDescription>What our customers are saying about {product.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <ReviewSection productId={params.id} />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Load More Reviews
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

