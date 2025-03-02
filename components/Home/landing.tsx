import Image from "next/image"
import { Shield, Zap, Lock, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import ShinyText from "../shiney-text";

const gta = localFont({
    src: "./Pricedown-Bl.otf",
    variable: "--font-gta",
    weight: "100 900",
});

export default function LandingSection() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-black">
            {/* Background gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-black to-amber-900/30" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,128,0,0.2)_0%,transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(218,165,32,0.2)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                                <span className="block">Welcome to</span>
                                <span className={cn("block mt-2 bg-gradient-to-r from-green-400 to-amber-400 bg-clip-text text-transparent", gta.className,)}>
                                    Heistenburg
                                </span>
                            </h1>
                            <ShinyText text="Biggest GTA Online Modding Service" disabled={false} speed={3} className='custom-class mt-6 max-w-xl text-lg' />

                        </div>

                        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white border-0"
                            >
                                Shop Now
                            </Button>
                            <Button size="lg" variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400/10">
                                Learn More
                            </Button>
                        </div>

                        {/* Trust indicators */}
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-black/40 border border-green-900/50">
                                <Shield className="h-6 w-6 text-green-400 mb-2" />
                                <span className="text-sm font-medium text-gray-200">Secure Payments</span>
                            </div>
                            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-black/40 border border-green-900/50">
                                <Zap className="h-6 w-6 text-amber-400 mb-2" />
                                <span className="text-sm font-medium text-gray-200">Fast Delivery</span>
                            </div>
                            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-black/40 border border-green-900/50">
                                <Headphones className="h-6 w-6 text-green-400 mb-2" />
                                <span className="text-sm font-medium text-gray-200">24h/7 Support</span>
                            </div>
                            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-black/40 border border-green-900/50">
                                <Lock className="h-6 w-6 text-amber-400 mb-2" />
                                <span className="text-sm font-medium text-gray-200">Safe Login</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative lg:ml-auto">
                        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-black/30 p-2 shadow-xl backdrop-blur-sm border border-green-900/30">
                            <Image
                                src="/heist_addiction.jpg"
                                priority
                                width={500}
                                height={600}
                                alt="Product showcase"
                                className="w-full rounded-xl object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-amber-400">Featured Product</p>
                                        <h3 className="text-xl font-bold text-white">Premium Collection</h3>
                                    </div>
                                    <div className="rounded-full bg-green-600 px-3 py-1 text-sm font-semibold text-white">-20% OFF</div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 blur-2xl opacity-30" />
                        <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 blur-3xl opacity-20" />
                    </div>
                </div>
            </div>

            {/* Security badge */}
            <div className="relative z-10 container mx-auto px-4 pb-8">
                <div className="mx-auto max-w-md rounded-xl bg-black/60 backdrop-blur-sm border border-green-900/30 p-4 flex items-center justify-center gap-3">
                    <Lock className="h-5 w-5 text-green-400" />
                    <p className="text-sm text-gray-300">
                        <span className="font-medium text-white">Stripe / Paypal</span> - Your credit is always protected
                    </p>
                </div>
            </div>
        </section>
    )
}

