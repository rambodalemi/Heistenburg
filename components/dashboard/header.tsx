"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingBag, User, Settings, LogOut, Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Profile", href: "/dashboard/user-profile", icon: User },
]

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const NavItems = () => (
    <nav className="grid gap-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-colors hover:bg-green-500/10 hover:text-white ${
              isActive ? "bg-green-500/10 text-white" : ""
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
    <div className="relative min-h-screen bg-black">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-amber-900/20" />
      </div>

      <div className="relative z-10 flex">
        {/* Desktop Sidebar */}
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
        <div className="flex-1 lg:pl-72">
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
                    <span className="text-xl font-bold text-white">Store Name</span>
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

            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
            <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-300" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-green-600">
                  3
                </Badge>
              </Button>
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

