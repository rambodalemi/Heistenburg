import { ShoppingCart, Star } from "lucide-react"

const features = [
    {
        title: "Instant Delivery",
        description: "Get your services delivered instantly after payment confirmation",
        icon: ShoppingCart,
    },
    {
        title: "24/7 Support",
        description: "Our support team is always available to help you",
        icon: Star,
    },
    {
        title: "Secure Payments",
        description: "Your payments are secure and your data is protected",
        icon: ShoppingCart,
    },
]


export default function Feutures() {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                    <div key={feature.title} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                        <feature.icon className="mb-4 h-12 w-12 text-green-500" />
                        <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                        <p className="text-zinc-400">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
