"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { updateCategory, getCategoryById, getAllCategories } from "@/services/categories-service"
import { categorySchema, type CategoryFormValues } from "@/lib/validation/category"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useEffect } from "react"

export default function CategoryEditForm({ id }: { id: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
  })

  const { data: categories = [] } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  })

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      parent: undefined,
    },
  })

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        description: category.description || "",
        parent: category.parent
          ? typeof category.parent === "string"
            ? category.parent
            : category.parent._id
          : undefined,
      })
    }
  }, [category, form])

  const updateMutation = useMutation({
    mutationFn: (data: CategoryFormValues) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCategories"] })
      queryClient.invalidateQueries({ queryKey: ["category", id] })
      toast.success("Category updated successfully")
      router.push("/admin/categories")
    },
    onError: (error: Error) => {
      toast.error(`Failed to update category: ${error.message}`)
    },
  })

  function onSubmit(data: CategoryFormValues) {
    updateMutation.mutate(data)
  }

  if (isLoadingCategory) return <div>Loading category...</div>

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief description of this category" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="parent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Category (optional)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a parent category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {categories
                    .filter((c) => c._id !== id) // Prevent selecting self as parent
                    .map((category) => (
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

        <Button type="submit" disabled={updateMutation.isPending}>
          {updateMutation.isPending ? "Updating..." : "Update Category"}
        </Button>
      </form>
    </Form>
  )
}

