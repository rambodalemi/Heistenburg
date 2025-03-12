import Hero from "@/components/Home/discord-ad"
import FAQPage from "@/components/Home/faq"
import Feutures from "@/components/Home/feutures"
import Landing from "@/components/Home/landing"
import NewsletterSection from "@/components/Home/news-letter"
import Reviews from "@/components/Home/reviews"
import Trust from "@/components/Home/trust"
import ProductsCarousel from "@/components/Home/products-carousel"
import ContactForm from "@/components/forms/contact/contact-form.tsx"
import TrackOrderPrompt from "@/components/track-order-prompt"


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <TrackOrderPrompt variant="compact" className="my-8 container mx-auto" />
      <Landing />
      <ProductsCarousel />
      <Feutures />
      <FAQPage />
      <Reviews />
      <Hero />
      <main className="min-h-screen bg-gradient-to-br from-black via-black to-black/90 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <ContactForm />
        </div>
      </main>
      <Trust />
      <NewsletterSection />
    </div>
  )
}

