"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { getProductById, updateProduct } from "@/services/products-service"
import { getAllCategories } from "@/services/categories-service"
import { productSchema, type ProductFormValues } from "@/lib/validation/product"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import type { ProductType } from "@/models/Product"
import type { CategoryType } from "@/models/Category"

export function ProductEditForm({ productId }: { productId: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [features, setFeatures] = useState<string[]>([""])

  const { data: product, isLoading: isLoadingProduct } = useQuery<ProductType>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
  })

  const { data: categories = [] } = useQuery<CategoryType[]>({
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
      category: null,
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: ProductFormValues) => updateProduct(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] })
      queryClient.invalidateQueries({ queryKey: ["allProducts"] })
      toast.success("Product updated successfully")
      router.push("/admin/products")
    },
    onError: (error: Error) => {
      toast.error(`Failed to update product: ${error.message}`)
    },
  })

  // Set form values when product data is loaded
  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        details: product.details,
        price: product.price,
        image: product.image,
        features: product.features,
        stock: product.stock,
        deliveryEstimate: product.deliveryEstimate,
        category: typeof product.category === "object" ? product.category?._id : product.category,
      })
      setFeatures(product.features)
    }
  }, [product, form])

  function onSubmit(data: ProductFormValues) {
    data.features = features.filter((feature) => feature.trim() !== "")
    updateMutation.mutate(data)
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

  if (isLoadingProduct) return <div>Loading...</div>

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
                  <Input {...field} />
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
                  <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseFloat(e.target.value))} />
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
                  <Textarea {...field} />
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
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
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
                  <Input {...field} />
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
                <Select onValueChange={field.onChange} value={field.value || undefined}>
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
        <div>
          <FormLabel>Features</FormLabel>
          <FormDescription>Add key features of your product</FormDescription>
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <Input
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
              />
              <Button type="button" variant="outline" onClick={() => removeFeature(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addFeature} className="mt-2">
            Add Feature
          </Button>
        </div>
        <Button type="submit" disabled={updateMutation.isPending} className="w-full">
          {updateMutation.isPending ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </Form>
  )
}

