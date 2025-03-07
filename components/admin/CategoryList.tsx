"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllCategories, deleteCategory } from "@/services/categories-service"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit, Edit2, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

export default function CategoryList() {
  const queryClient = useQueryClient()
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCategories"] })
      toast.success("Category deleted successfully")
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete category: ${error.message}`)
    },
  })

  const handleDelete = () => {
    if (categoryToDelete) {
      deleteMutation.mutate(categoryToDelete)
      setCategoryToDelete(null)
    }
  }

  if (isLoading) return <div>Loading categories...</div>
  if (error) return <div>Error loading categories: {String(error)}</div>

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Parent Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No categories found. Create your first category.
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.description || "—"}</TableCell>
                <TableCell>
                  {category.parent
                    ? typeof category.parent === "string"
                      ? category.parent
                      : category.parent.name
                    : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => setCategoryToDelete(category._id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the category. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setCategoryToDelete(null)}>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Link href={`/admin/categories/${category._id}/edit/`}>
                      <Button variant="outline" size="icon" onClick={() => setCategoryToDelete(category._id)}>
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

