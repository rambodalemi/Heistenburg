"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { productSchema } from "@/lib/validation/product"
import { ImageUpload } from "./file-upload"
import type { ProductType } from "@/models/Product"

type ProductFormValues = Omit<ProductType, "_id">

export default function ProductForm() {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState<string>("")

  // Initialize form with React Hook Form and Zod validation
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      details: "",
      price: 0,
      rating: 0,
      reviewCount: 0,
      image: "",
      features: [],
      stock: 0,
      deliveryEstimate: "1-2 days",
    },
  })

  // Create product mutation with React Query
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ProductFormValues) => {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create product")
      }

      return response.json()
    },
    onSuccess: () => {
      toast.success("Product created successfully")
      router.push("/products")
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create product")
    },
  })

  // Form submission handler
  function onSubmit(data: ProductFormValues) {
    // Include the uploaded image URL
    mutate({
      ...data,
      image: imageUrl,
    })
  }

  // Handle feature input as comma-separated values
  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const featuresString = e.target.value
    form.setValue(
      "features",
      featuresString
        .split(",")
        .map((feature) => feature.trim())
        .filter(Boolean),
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Premium Headphones" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="99.99"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief description of the product" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>This will be displayed in product cards and search results.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Comprehensive product details and specifications"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deliveryEstimate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Estimate</FormLabel>
                <FormControl>
                  <Input placeholder="1-2 days" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormItem>
          <FormLabel>Features (comma-separated)</FormLabel>
          <FormControl>
            <Input placeholder="Noise cancellation, Bluetooth 5.0, 30-hour battery" onChange={handleFeaturesChange} />
          </FormControl>
          <FormDescription>Enter product features separated by commas</FormDescription>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={imageUrl}
                  onChange={(url) => {
                    setImageUrl(url)
                    field.onChange(url)
                  }}
                />
              </FormControl>
              <FormDescription>Upload a high-quality image of your product</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full md:w-auto">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Product
        </Button>
      </form>
    </Form>
  )
}

