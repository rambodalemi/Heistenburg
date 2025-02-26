import Hero from "@/components/Home/discord-ad"
import FAQPage from "@/components/Home/faq"
import Feutures from "@/components/Home/feutures"
import Landing from "@/components/Home/landing"
import Reviews from "@/components/Home/reviews"
import Trust from "@/components/Home/trust"
import Products from "@/components/products/product-list"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Landing />
      <Products />
      <Feutures />
      <Reviews />
      <FAQPage />
      <Hero />
      <Trust />
    </div>
  )
}

