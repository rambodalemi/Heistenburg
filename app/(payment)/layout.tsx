import { BasketProvider } from '@/components/shared/nav/basket-context'
import React from 'react'

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
    return (

        <BasketProvider>{children}</BasketProvider>

    )
}
