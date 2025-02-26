"use client"

import type * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface QuantityInputProps {
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
}

export function QuantityInput({ value, onChange, min = 1, max = 99 }: QuantityInputProps) {
    const handleIncrement = () => {
        if (value < max) {
            onChange(value + 1)
        }
    }

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number.parseInt(event.target.value, 10)
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            onChange(newValue)
        }
    }

    return (
        <div className="flex items-center">
            <Button
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={value <= min}
                className="h-9 w-9 rounded-r-none border-r-0"
            >
                <Minus className="h-4 w-4" />
            </Button>
            <Input
                type="number"
                value={value}
                onChange={handleChange}
                min={min}
                max={max}
                className="h-9 w-14 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <Button
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                disabled={value >= max}
                className="h-9 w-9 rounded-l-none border-l-0"
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    )
}

