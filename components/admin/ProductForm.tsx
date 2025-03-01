"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import { productSchema, ProductFormValues } from "@/lib/validation/product";
import { createProduct } from "@/services/products-service";
import { ProductType } from "@/models/Product";

export function ProductForm({ initialData }: { initialData?: ProductFormValues }) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      details: "",
      price: 0,
      image: "",
      features: [""],
      stock: 0,
      deliveryEstimate: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created successfully!");
      router.refresh();
      form.reset();
      setImagePreview(null);
    },
    onError: () => toast.error("Error creating product"),
  });

  async function onSubmit(data: ProductFormValues) {
    try {
      let imageUrl = data.image as string; // Default to existing image URL

      if (imageUrl as any) {
        const formData = new FormData();
        formData.append("file", data.image);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadResult = await uploadResponse.json();
        if (!uploadResponse.ok) throw new Error(uploadResult.error || "Image upload failed");

        imageUrl = uploadResult.url;
      }

      const productData: Omit<ProductType, "_id"> = {
        ...data,
        image: imageUrl,
        rating: 0,
        reviewCount: 0,
      };

      await mutation.mutateAsync(productData);
    } catch (error) {
      console.error("Error uploading image or creating product:", error);
      toast.error("Image upload failed or server error");
    }
  }

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details</FormLabel>
              <FormControl>
                <Textarea placeholder="Short product details" {...field} />
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
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Features</FormLabel>
              <FormControl>
                <Textarea placeholder="List product features, separated by commas" {...field} />
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
                <Input type="number" placeholder="Stock quantity" {...field} />
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
                <Input placeholder="e.g., 2-3 days" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImagePreview(URL.createObjectURL(file));
                      onChange(file);
                    }
                  }}
                />
              </FormControl>
              {imagePreview && (
                <Image
                  width={100}
                  height={100}
                  src={imagePreview}
                  alt="Product preview"
                  className="mt-2 h-20 w-20 object-cover"
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Create Product"}
        </Button>
      </form>
    </Form>
  );
}
