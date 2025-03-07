"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { useCreateContact } from "@/services/contact-service"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutate: createContact } = useCreateContact()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    createContact(values, {
      onSuccess: () => {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you as soon as possible.",
        })
        form.reset()
        setIsSubmitting(false)
      },
      onError: (error) => {
        toast.error("Failed to send message", {
          description: error instanceof Error ? error.message : "Please try again later.",
        })
        setIsSubmitting(false)
      },
    })
  }

  return (
    <div className="rounded-lg border border-green-500/20 bg-black/60 p-6 backdrop-blur-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-gray-400 mt-1">Have a question? We`&apos;`d love to hear from you.</p>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-yellow-500 opacity-70"></div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    {...field}
                    className="bg-black/50 border-green-500/30 focus-visible:ring-green-500/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your.email@example.com"
                    type="email"
                    {...field}
                    className="bg-black/50 border-green-500/30 focus-visible:ring-green-500/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="What's this about?"
                    {...field}
                    className="bg-black/50 border-green-500/30 focus-visible:ring-green-500/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message..."
                    {...field}
                    className="min-h-[120px] bg-black/50 border-green-500/30 focus-visible:ring-green-500/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-black font-medium"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

