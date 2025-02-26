import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    author: "Alex",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-02-20",
    content: "Amazing service! Fast delivery and excellent support.",
    product: "Discord Boost Tool V3",
  },
  // Add more reviews...
]

export default function Reviews() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">Customer Reviews</h1>
        <div className="mx-auto mb-6 flex max-w-sm items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-500">4.8</div>
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <div className="mt-1 text-sm text-zinc-400">Based on 128 reviews</div>
          </div>
          <div className="flex-1">
            <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              Write a Review
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <Card key={review.id} className="border-zinc-800 bg-zinc-900/50">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <Avatar>
                <AvatarImage src={review.avatar} alt={review.author} />
                <AvatarFallback>{review.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-base">{review.author}</CardTitle>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "fill-yellow-500 text-yellow-500" : "fill-zinc-700 text-zinc-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-sm text-zinc-400">{new Date(review.date).toLocaleDateString()}</div>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-zinc-400">{review.product}</p>
              <p className="text-sm">{review.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

