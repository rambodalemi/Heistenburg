"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { CategoryType } from "@/models/Category"

interface ProductFiltersProps {
  categories: CategoryType[]
  onFilterChange: (filters: ProductFilters) => void
}

export interface ProductFilters {
  name: string
  minPrice: number
  maxPrice: number
  category: string
}

export function ProductFilters({ categories, onFilterChange }: ProductFiltersProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    name: "",
    minPrice: 0,
    maxPrice: 1000,
    category: "all",
  })

  const handleFilterChange = (key: keyof ProductFilters, value: string | number) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          placeholder="Search by name"
          value={filters.name}
          onChange={(e) => handleFilterChange("name", e.target.value)}
        />
      </div>
      <div>
        <Label>Price Range</Label>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            value={filters.minPrice.toString()}
            onChange={(e) => handleFilterChange("minPrice", Number(e.target.value) || 0)}
            className="w-20"
          />
          <span>to</span>
          <Input
            type="number"
            value={filters.maxPrice.toString()}
            onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value) || 0)}
            className="w-20"
          />
        </div>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={[filters.minPrice, filters.maxPrice]}
          onValueChange={(value) => {
            handleFilterChange("minPrice", value[0])
            handleFilterChange("maxPrice", value[1])
          }}
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={() =>
          onFilterChange({
            name: "",
            minPrice: 0,
            maxPrice: 1000,
            category: "all",
          })
        }
      >
        Reset Filters
      </Button>
    </div>
  )
}

