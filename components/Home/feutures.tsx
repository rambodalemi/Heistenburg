import { Shield, Zap, Clock, Gift, Truck, Headphones } from "lucide-react"

const features = [
  {
    name: "Secure Transactions",
    description: "Every purchase is protected with SSL encryption",
    icon: Shield,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    name: "Fast Processing",
    description: "Quick order processing and dispatch",
    icon: Zap,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  {
    name: "24/7 Support",
    description: "Round the clock customer assistance",
    icon: Headphones,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    name: "Free Shipping",
    description: "No extra charges on eligible orders",
    icon: Truck,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  {
    name: "Quick Delivery",
    description: "Get your order in 2-3 business days",
    icon: Clock,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    name: "Special Rewards",
    description: "Earn points with every purchase",
    icon: Gift,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
]

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-24">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-amber-900/20" />
      </div>

      <div className="container relative z-10 mx-auto p-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Why Choose Us</h2>
          <p className="mt-4 text-lg text-gray-400">
            We provide the best shopping experience with premium features and benefits
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative overflow-hidden rounded-lg border border-green-900/30 bg-black/40 p-6 backdrop-blur-sm"
            >
              <div className={`inline-flex rounded-lg p-3 ${feature.bgColor}`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{feature.name}</h3>
              <p className="mt-2 text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

