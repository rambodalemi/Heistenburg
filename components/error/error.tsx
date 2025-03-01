"use client"

import { AlertCircle, RefreshCcw, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface ProductErrorProps {
  title?: string
  message?: string
  error?: Error
  onRetry?: () => void
}

export function IsError({
  title = "Something went wrong",
  message = "We encountered an error while loading the products. Please try again.",
  error,
  onRetry,
}: ProductErrorProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center p-8">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/20 to-amber-500/20 blur-3xl opacity-20" />
        </div>
      </div>

      {/* Error Icon Container */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/20 to-amber-500/20 blur-xl" />
        <div className="relative h-24 w-24 rounded-full bg-black/40 border border-red-900/30 backdrop-blur-sm flex items-center justify-center group">
          <AlertCircle className="h-12 w-12 text-red-500 transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 rounded-full border border-red-500/50 animate-[pulse_2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Error Content */}
      <div className="relative space-y-4 max-w-md">
        <h3 className="text-2xl font-bold tracking-tight text-white">{title}</h3>
        <p className="text-gray-400">{message}</p>

        {/* Actions */}
        <div className="flex flex-col items-center gap-4 pt-4">
          {onRetry && (
            <Button
              onClick={onRetry}
              className="bg-green-600 hover:bg-green-500 transition-all duration-200 hover:scale-105"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}

          {/* Error Details Collapsible */}
          {error && (
            <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen} className="w-full space-y-2">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-amber-400 hover:text-amber-300 w-full justify-center"
                >
                  <span>Error Details</span>
                  {isDetailsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2">
                <div className="rounded-lg border border-red-900/30 bg-black/40 backdrop-blur-sm p-4">
                  <div className="text-left font-mono text-sm text-red-400 break-all">{error.message}</div>
                  {error.stack && (
                    <div className="mt-2 text-left font-mono text-xs text-gray-500 break-all">{error.stack}</div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div className="relative mt-8 max-w-md">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Try these steps:</h4>
        <ul className="text-sm text-gray-500 space-y-1">
          <li>• Check your internet connection</li>
          <li>• Refresh the page</li>
          <li>• Try again in a few minutes</li>
        </ul>
      </div>
    </div>
  )
}

