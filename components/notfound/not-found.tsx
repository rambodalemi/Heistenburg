import Link from "next/link"
import { PackageSearch, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductsNotFoundProps {
    title?: string
    description?: string
    showHomeButton?: boolean
    showRefreshButton?: boolean
    onRefresh?: () => void
}

export function NotFound({
    title = "No Products Found",
    description = "We couldn't find any products matching your criteria.",
    showHomeButton = true,
    showRefreshButton = true,
    onRefresh,
}: ProductsNotFoundProps) {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center p-8 space-y-8">
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/20 to-amber-500/20 blur-3xl opacity-20" />
                </div>
            </div>

            {/* Icon Container */}
            <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/20 to-amber-500/20 blur-xl" />
                <div className="relative h-24 w-24 rounded-full bg-black/40 border border-green-900/30 backdrop-blur-sm flex items-center justify-center">
                    <PackageSearch className="h-12 w-12 text-gray-400" />
                </div>
            </div>

            {/* Content */}
            <div className="relative space-y-4 max-w-md">
                <h3 className="text-2xl font-bold tracking-tight text-white">{title}</h3>
                <p className="text-gray-400">{description}</p>
            </div>

            {/* Actions */}
            <div className="relative flex flex-col sm:flex-row gap-4">
                {showHomeButton && (
                    <Button variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400/10" asChild>
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                )}
                {showRefreshButton && onRefresh && (
                    <Button className="bg-green-600 hover:bg-green-500" onClick={onRefresh}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh Results
                    </Button>
                )}
            </div>
        </div>
    )
}

