"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut, Menu, Users, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
    {
        name: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        name: "Products",
        href: "/admin/products",
        icon: Package,
        children: [
            { name: "All Products", href: "/admin/products" },
            { name: "Add Product", href: "/admin/products/new" },
        ],
    },
    {
        name: "Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
        children: [
            { name: "All Orders", href: "/admin/orders" },
            { name: "Pending", href: "/admin/orders?status=pending" },
            { name: "Completed", href: "/admin/orders?status=completed" },
        ],
    },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: LineChart },
]

export default function AdminProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    const NavItems = () => (
        <nav className="space-y-1">
            {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                    <div key={item.name} className="space-y-1">
                        <Link
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-colors hover:bg-green-500/10 hover:text-white ${isActive ? "bg-green-500/10 text-white" : ""
                                }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                        {item.children && isActive && (
                            <div className="ml-6 space-y-1">
                                {item.children.map((child) => (
                                    <Link
                                        key={child.name}
                                        href={child.href}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-green-500/10 hover:text-white ${pathname === child.href ? "bg-green-500/10 text-white" : ""
                                            }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {child.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )
            })}
        </nav>
    )

    return (
        <div className="relative min-h-screen bg-black">
            {/* Background gradients */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-amber-900/20" />
            </div>

            <div className="relative z-10 flex">
                {/* Desktop Sidebar */}
                <aside className="fixed hidden h-screen w-64 border-r border-green-900/30 bg-black/80 backdrop-blur-sm lg:block">
                    <div className="flex h-16 items-center gap-2 border-b border-green-900/30 px-6">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-amber-500" />
                        <span className="text-xl font-bold text-white">Admin Panel</span>
                    </div>

                    <div className="flex flex-col h-[calc(100vh-4rem)]">
                        <div className="flex-1 overflow-auto py-4 px-4">
                            <NavItems />
                        </div>

                        <div className="border-t border-green-900/30 p-4">
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 text-gray-300 hover:bg-red-500/10 hover:text-red-500"
                            >
                                <LogOut className="h-5 w-5" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </aside>

                {/* Mobile Header & Content */}
                <div className="flex-1 lg:pl-64">
                    {/* Mobile Header */}
                    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-green-900/30 bg-black/50 px-4 backdrop-blur-sm lg:px-6">
                        {/* Mobile Menu Trigger */}
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="h-6 w-6 text-gray-300" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-72 border-r border-green-900/30 bg-black/80 p-0 backdrop-blur-sm">
                                <SheetHeader className="border-b border-green-900/30 px-6 py-4">
                                    <SheetTitle className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-amber-500" />
                                        <span className="text-xl font-bold text-white">Admin Panel</span>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col h-full">
                                    <div className="flex-1 overflow-auto py-4 px-4">
                                        <NavItems />
                                    </div>
                                    <div className="border-t border-green-900/30 p-4">
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start gap-2 text-gray-300 hover:bg-red-500/10 hover:text-red-500"
                                        >
                                            <LogOut className="h-5 w-5" />
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>

                        <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
                        <div className="ml-auto flex items-center gap-4">
                            <Button variant="ghost" size="icon">
                                <Settings className="h-5 w-5 text-gray-300" />
                            </Button>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="min-h-[calc(100vh-4rem)] p-4 lg:p-6">{children}</main>
                </div>
            </div>
        </div>
    )
}

