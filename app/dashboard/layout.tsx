import DashboardProvider from '@/components/dashboard/header'
import React from 'react'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (

        <DashboardProvider>
            {children}
        </DashboardProvider>
    )
}
