import Hero from "@/components/Home/discord-ad"
import FAQPage from "@/components/Home/faq"
import Feutures from "@/components/Home/feutures"
import Landing from "@/components/Home/landing"
import NewsletterSection from "@/components/Home/news-letter"
import Reviews from "@/components/Home/reviews"
import Trust from "@/components/Home/trust"
import ProductLists from "./products/page"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Landing />
      <ProductLists />
      <Feutures />
      <FAQPage />
      <Reviews />
      <Hero />
      <Trust />
      <NewsletterSection />
    </div>
  )
}

