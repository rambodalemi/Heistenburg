'use client'

import Image from "next/image"
import { Star } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Verified Buyer",
    image: "/placeholder.svg?height=100&width=100",
    content: "The quality of products and customer service exceeded my expectations. Will definitely shop here again!",
    rating: 5
  },
  {
    name: "Sarah Chen",
    role: "Premium Member",
    image: "/placeholder.svg?height=100&width=100",
    content: "Fast delivery and the products are exactly as described. The packaging was also very impressive.",
    rating: 5
  },
  {
    name: "Michael Roberts",
    role: "Verified Buyer",
    image: "/placeholder.svg?height=100&width=100",
    content: "Great experience from start to finish. The website is easy to navigate and the checkout process is smooth.",
    rating: 5
  },
  {
    name: "Emily Parker",
    role: "Fashion Enthusiast",
    image: "/placeholder.svg?height=100&width=100",
    content: "Love the unique selection of products. Everything I've ordered has been high quality and stylish.",
    rating: 5
  }
]

export default function Reviews() {
  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-24">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-amber-900/20" />
      </div>

      <div className="container relative z-10 mx-auto p-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Don&apos;t just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="mt-12">
          <Carousel

            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full rounded-2xl border border-green-900/30 bg-black/40 p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="mt-4 text-gray-300">{testimonial.content}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselDots />
              <CarouselPrevious className="bg-green-600 hover:bg-green-500 border-0" />
              <CarouselNext className="bg-green-600 hover:bg-green-500 border-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
