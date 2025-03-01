import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Shield } from "lucide-react"

export default function NewsletterSection() {
  return (
    <section className="relative overflow-hidden bg-black py-16">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-black to-amber-900/30" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-500/30 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/30 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container relative mx-auto p-4 z-10">
        <div className="mx-auto max-w-2xl rounded-2xl border border-green-900/30 bg-black/40 p-8 backdrop-blur-sm sm:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Stay Updated</h2>
            <p className="mt-4 text-lg text-gray-300">
              Subscribe to our newsletter for exclusive offers, latest trends, and special discounts.
            </p>
          </div>

          <form className="mt-8">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border-green-900/30 bg-black/30 pl-10 text-white placeholder:text-gray-400"
                />
              </div>
              <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white">
                Subscribe Now
              </Button>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <Shield className="h-4 w-4" />
            <span>Your data is secure and we won&apos;t spam you.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

