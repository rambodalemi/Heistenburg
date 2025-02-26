"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useBasket } from "@/components/shared/nav/basket-context"

interface ProductCardProps {
  id: string
  name: string
  price: number
  rating: number
  image: string
}

export function ProductCard({ id, name, price, rating, image }: ProductCardProps) {
  const { addToCart } = useBasket()

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      quantity: 1,
      image,
    })
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Link href={`/products/${id}`}>
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={300}
            height={200}
            className="w-full object-cover"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <Link href={`/products/${id}`}>
          <CardTitle className="text-lg mb-2">{name}</CardTitle>
        </Link>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(rating) ? "fill-yellow-500 text-yellow-500" : "fill-zinc-700 text-zinc-700"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-zinc-400">{rating.toFixed(1)}</span>
        </div>
        <div className="text-lg font-bold text-green-500">${price.toFixed(2)}</div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

