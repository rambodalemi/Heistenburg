"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle } from 'lucide-react'

export default function CancelPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto py-20 px-4 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
          <CardDescription>
            Your payment was cancelled. No charges were made.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-zinc-600">
            If you encountered any issues during checkout, please try again or contact our support team.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button 
            onClick={() => router.push("/checkout")}
            variant="outline"
          >
            Try Again
          </Button>
          <Button 
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            Continue Shopping
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
