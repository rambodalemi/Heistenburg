"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Upload, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  // This is a mock upload function
  // In a real application, you would use a service like Cloudinary, AWS S3, etc.
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    // Check file type
    if (!file.type.includes("image")) {
      toast.error("Please upload an image file")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB")
      return
    }

    try {
      setIsUploading(true)

      // In a real app, you would upload to a cloud storage service
      // For this example, we'll create a mock URL using FileReader
      const reader = new FileReader()

      reader.onload = () => {
        // This is just for demonstration - in a real app you'd get a URL from your upload service
        const imageUrl = reader.result as string
        onChange(imageUrl)
        setIsUploading(false)
        toast.success("Image uploaded successfully")
      }

      reader.readAsDataURL(file)
    } catch (error) {
      setIsUploading(false)
      toast.error("Failed to upload image")
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {value ? (
        <div className="relative w-full h-64">
          <Image src={value || "/placeholder.svg"} alt="Product image" fill className="object-contain rounded-md" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => onChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-md border-muted-foreground/25">
          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 5MB)</p>
            </div>
            <input type="file" className="hidden" onChange={handleUpload} accept="image/*" disabled={isUploading} />
          </label>
        </div>
      )}
    </div>
  )
}

