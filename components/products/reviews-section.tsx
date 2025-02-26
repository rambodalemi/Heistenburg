import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    author: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-02-15",
    content: "This tool has revolutionized how I manage my Discord server. Highly recommended!",
  },
  {
    id: 2,
    author: "Sam Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2024-02-10",
    content: "Great features and easy to use. Could use some more customization options.",
  },
  // Add more reviews as needed
]

export function ReviewSection() {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-zinc-800 pb-6 last:border-b-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{review.author[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <p className="font-semibold">{review.author}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "fill-yellow-500 text-yellow-500" : "fill-zinc-700 text-zinc-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <span className="text-sm text-zinc-400">{new Date(review.date).toLocaleDateString()}</span>
          </div>
          <p className="mt-4 text-zinc-300">{review.content}</p>
        </div>
      ))}
    </div>
  )
}

