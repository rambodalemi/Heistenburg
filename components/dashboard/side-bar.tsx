"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { LayoutDashboard, LogOut, ShoppingBag, User } from 'lucide-react'
import { SignOutButton } from '@clerk/nextjs'


const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
    { name: "Profile", href: "/dashboard/profile", icon: User },
]

export default function SideBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    if (isMobileMenuOpen) { }
    const NavItems = () => (
        <nav className="grid gap-1">
            {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-colors hover:bg-green-500/10 hover:text-white ${isActive ? "bg-green-500/10 text-white" : ""
                            }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                    </Link>
                )
            })}
        </nav>
    )
    return (
        <aside className="fixed hidden h-screen w-72 border-r border-green-900/30 bg-black/80 backdrop-blur-sm lg:block">
            <div className="flex h-16 items-center gap-2 border-b border-green-900/30 px-6">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-amber-500" />
                <span className="text-xl font-bold text-white">Store Name</span>
            </div>

            <div className="flex flex-col h-[calc(100vh-4rem)]">
                <div className="flex-1 overflow-auto py-4 px-4">
                    <NavItems />
                </div>

                <div className="border-t border-green-900/30 p-4">
                    <SignOutButton>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-gray-300 hover:bg-red-500/10 hover:text-red-500"
                        >
                            <LogOut className="h-5 w-5" />
                            Logout
                        </Button>
                    </SignOutButton>
                </div>
            </div>
        </aside>
    )
}
