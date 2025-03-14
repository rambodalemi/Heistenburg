"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, ArrowLeft, Truck } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { ReviewSection } from "@/components/products/reviews-section"
import { QuantityInput } from "@/components/products/quantity-input"
import { useBasket } from "@/components/shared/nav/basket-context"
import type { ProductType } from "@/models/Product"



export default function ProductDetails({ image, price, name, _id, stock, rating, reviewCount, description, deliveryEstimate, features, details }: ProductType) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useBasket()

  const handleAddToCart = () => {
    addToCart({
      id: _id,
      name: name,
      price: price,
      quantity: quantity,
      image: image,
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
              src={image || "/placeholder.svg"}
              alt={name}
              width={600}
              height={600}
              className="w-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(rating) ? "fill-yellow-500 text-yellow-500" : "fill-zinc-700 text-zinc-700"
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm text-zinc-400">({reviewCount} reviews)</span>
            </div>
          </div>
          <p className="text-lg text-zinc-300">{description}</p>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-green-500">${price.toFixed(2)}</span>
            <Badge variant="outline" className="text-yellow-500 border-yellow-500/50">
              {stock} in stock
            </Badge>
          </div>
          <div className="flex items-center text-sm text-zinc-400">
            <Truck className="h-4 w-4 mr-2" />
            <span>Delivery: {deliveryEstimate}</span>
          </div>
          <div className="flex items-center gap-4">
            <QuantityInput value={quantity} onChange={setQuantity} min={1} max={stock} />
            <span className="text-sm text-zinc-400">Total: ${(price * quantity).toFixed(2)}</span>
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

      <Tabs defaultValue="details" className="mt-12">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Detailed information about {name}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-300">{details}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="features" className="mt-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle>Product Features</CardTitle>
              <CardDescription>Key features of the {name}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2">
                {features.map((feature, index) => (
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
              <CardDescription>What our customers are saying about {name}</CardDescription>
            </CardHeader>
            <CardContent>
              <ReviewSection productId={_id} />
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