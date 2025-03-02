"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface BasketItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface BasketContextType {
  cart: BasketItem[]
  addToCart: (item: BasketItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
}

const BasketContext = createContext<BasketContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
})

export const useBasket = () => useContext(BasketContext)

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<BasketItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load cart from localStorage when component mounts
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  const addToCart = (item: BasketItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id)

      if (existingItemIndex !== -1) {
        // If item exists, create a new array with updated quantity
        return prevCart.map((cartItem, index) =>
          index === existingItemIndex ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((item) => item.id !== itemId)
      }

      return prevCart.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const value: BasketContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
}