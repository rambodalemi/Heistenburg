"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ShoppingCart, Truck } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useBasket } from "@/components/shared/nav/basket-context"
import { CarouselItem } from "../ui/carousel"

type ProductCardProps = {
  _id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  reviewCount: number;
  details: string;
  deliveryEstimate: string;
}

export function ProductCard({ _id, name, price, rating, image, reviewCount, details, deliveryEstimate }: ProductCardProps) {
  const { addToCart } = useBasket()

  const handleAddToCart = () => {
    addToCart({
      id: _id.toString(),
      name,
      price,
      quantity: 1,
      image,
    })
  }

  return (

    <Card className="overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800">
      <CardHeader className="p-0">
        <Link href={`/products/${_id}`}>
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
        <Link href={`/products/${_id}`}>
          <CardTitle className="text-lg mb-2">{name}</CardTitle>
        </Link>
        <p className="text-sm text-zinc-400 mb-2">{details}</p>
        {/* <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-bold text-green-500">${price.toFixed(2)}</div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
            <span className="text-sm text-zinc-400">
              {rating.toFixed(1)} ({reviewCount})
            </span>
          </div>
        </div> */}
        <div className="flex items-center text-sm text-zinc-400">
          <Truck className="h-4 w-4 mr-1" />
          <span>Delivery: {deliveryEstimate}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>

  )
}