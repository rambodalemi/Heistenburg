"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { createProduct } from "@/services/products-service"
import { getAllCategories } from "@/services/categories-service"
import { productSchema, type ProductFormValues } from "@/lib/validation/product"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useState } from "react"
import { ImageUpload } from "./file-upload" // Adjust the import path as needed

export default function ProductForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [features, setFeatures] = useState<string[]>([""])

  const { data: categories = [] } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  })

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      details: "",
      price: 0,
      image: "",
      features: [""],
      stock: 1,
      deliveryEstimate: "1-2 days",
      category: "none",
    },
  })

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allProducts"] })
      toast.success("Product created successfully")
      router.push("/admin/products")
    },
    onError: (error: Error) => {
      toast.error(`Failed to create product: ${error.message}`)
    },
  })

  function onSubmit(data: ProductFormValues) {
    // Filter out empty features
    data.features = features.filter((feature) => feature.trim() !== "")
    // Convert empty string category to null
    if (data.category === "none") {
      data.category = null
    }
    createMutation.mutate(data)
  }

  const addFeature = () => {
    setFeatures([...features, ""])
  }

  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...features]
    updatedFeatures[index] = value
    setFeatures(updatedFeatures)
    form.setValue("features", updatedFeatures)
  }

  const removeFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index)
    setFeatures(updatedFeatures)
    form.setValue("features", updatedFeatures)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
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
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Brief description of the product" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Textarea placeholder="Detailed information about the product" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <ImageUpload value={field.value} onChange={field.onChange} onRemove={() => field.onChange("")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-full">
            <FormLabel>Features</FormLabel>
            <FormDescription>Add key features of your product</FormDescription>
            <div className="space-y-2 mt-2">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeFeature(index)}
                    disabled={features.length <= 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" onClick={addFeature} className="mt-2">
              Add Feature
            </Button>
          </div>

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
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

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || "none"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">Uncategorized</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={createMutation.isPending} className="w-full">
          {createMutation.isPending ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </Form>
  )
}

