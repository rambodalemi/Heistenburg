"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { QuantityInput } from "@/components/products/quantity-input"
import { ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useBasket } from "./basket-context"

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export function BasketSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { cart, removeFromCart, updateQuantity } = useBasket()

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  const handleCheckout = () => {
    router.push("/checkout")
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative" onClick={() => setIsOpen(true)}>
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-500 text-xs flex items-center justify-center text-white">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Your Basket</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
          {cart.length === 0 ? (
            <p className="text-center text-zinc-500 mt-4">Your basket is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex py-4 items-center">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-zinc-400">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <QuantityInput
                      value={item.quantity}
                      onChange={(value) => updateQuantity(item.id, value)}
                      min={1}
                      max={99}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2 text-red-500 hover:text-red-600"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="font-semibold ml-4">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))
          )}
        </ScrollArea>
        <div>
          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-semibold">${totalPrice.toFixed(2)}</span>
          </div>
          <Button
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

