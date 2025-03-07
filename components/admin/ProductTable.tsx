"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "@/services/products-service"
import type { ProductType } from "@/models/Product"
import type { CategoryType } from "@/models/Category"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getAllCategories } from "@/services/categories-service"

type SortableProductKeys = Extract<keyof ProductType, string>

export function ProductTable() {
  const [sortColumn, setSortColumn] = useState<SortableProductKeys>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const {
    data: products = [],
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  })

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  })

  if (isLoadingProducts || isLoadingCategories) return <div>Loading...</div>
  if (productsError || categoriesError) return <div>Error loading data</div>

  const sortedProducts = [...products].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (aValue === null || aValue === undefined) return sortDirection === "asc" ? -1 : 1
    if (bValue === null || bValue === undefined) return sortDirection === "asc" ? 1 : -1

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSort = (column: SortableProductKeys) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const getCategoryName = (category: string | CategoryType | null): string => {
    if (!category) return "No Category"
    if (typeof category === "string") {
      const foundCategory = categories.find((cat) => cat._id === category)
      return foundCategory ? foundCategory.name : "Unknown Category"
    }
    return category.name
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button asChild>
          <Link href="/admin/products/create">Add New Product</Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                Name {sortColumn === "name" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
                Price {sortColumn === "price" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("stock")}>
                Stock {sortColumn === "stock" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("rating")}>
                Rating {sortColumn === "rating" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.rating.toFixed(1)}</TableCell>
                <TableCell>{getCategoryName(product.category)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/products/${product._id}/edit`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/products/${product._id}`}>View</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

