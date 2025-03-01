import { Loader2, Package } from "lucide-react"

interface ProductLoadingProps {
    title?: string
    details?: string
}

export default function IsLoading({ title = "Loading...", details }: ProductLoadingProps) {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center p-8">
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/20 to-amber-500/20 blur-3xl opacity-20 animate-pulse" />
                </div>
            </div>

            {/* Loading Icon Container */}
            <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/20 to-amber-500/20 blur-xl" />
                <div className="relative h-24 w-24 rounded-full bg-black/40 border border-green-900/30 backdrop-blur-sm flex items-center justify-center">
                    <Package className="h-12 w-12 text-gray-400" />
                    <div className="absolute inset-0 rounded-full border-4 border-green-500/30 border-t-green-500 animate-spin" />
                </div>
            </div>

            {/* Loading Text */}
            <div className="relative space-y-4 max-w-md">
                <div className="flex items-center justify-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin text-green-500" />
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                </div>
                <p className="text-gray-400">{details}</p>
            </div>

            {/* Animated Dots */}
            <div className="mt-6 flex gap-1">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="h-2 w-2 rounded-full bg-green-500"
                        style={{
                            animation: `bounce 1.4s infinite ${i * 0.2}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

