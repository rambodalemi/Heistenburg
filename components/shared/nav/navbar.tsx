"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { Home, Bell, Box, User } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { BasketSidebar } from "./basket"
import { BasketProvider } from "./basket-context"
import UserDropDown from "./user-dropdown"

interface MenuItem {
    icon: React.ReactNode
    label: string
    href: string
    gradient: string
    iconColor: string
}

const commonMenuItems: MenuItem[] = [
    {
        icon: <Home className="h-5 w-5" />,
        label: "Home",
        href: "/",
        gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
        iconColor: "text-blue-500",
    },
    {
        icon: <Bell className="h-5 w-5" />,
        label: "About Us",
        href: "/about",
        gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
        iconColor: "text-orange-500",
    },
    {
        icon: <Box className="h-5 w-5" />,
        label: "Products",
        href: "/products",
        gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
        iconColor: "text-green-500",
    },
]

const itemVariants = {
    initial: { rotateX: 0, opacity: 1 },
    hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
    initial: { rotateX: 90, opacity: 0 },
    hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: {
        opacity: 1,
        scale: 2,
        transition: {
            opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
        },
    },
}

const navGlowVariants = {
    initial: { opacity: 0 },
    hover: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
        },
    },
}

const sharedTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    duration: 0.5,
}

export default function MenuBar({ children }: { children: React.ReactNode }) {
    return (
        <BasketProvider>
            <motion.nav
                className="sticky top-4 z-50 max-w-[90%] mx-auto border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-xl"
                initial="initial"
                whileHover="hover"
            >
                <motion.div
                    className={`absolute -inset-2 bg-gradient-radial from-transparent via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90% to-transparent rounded-3xl z-0 pointer-events-none`}
                    variants={navGlowVariants}
                />
                <ul className="flex justify-evenly items-center gap-2 relative z-10">
                    {commonMenuItems.map((item) => (
                        <motion.li key={item.label}>
                            <motion.div
                                className="block rounded-xl overflow-visible group"
                                style={{ perspective: "600px" }}
                                whileHover="hover"
                                initial="initial"
                            >
                                <motion.div
                                    className="absolute inset-0 z-0 pointer-events-none"
                                    variants={glowVariants}
                                    style={{
                                        background: item.gradient,
                                        opacity: 0,
                                        borderRadius: "16px",
                                    }}
                                />
                                {/* Front Side */}
                                <motion.a
                                    href={item.href}
                                    className="flex flex-col items-center gap-1 px-4 py-2 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl"
                                    variants={itemVariants}
                                    transition={sharedTransition}
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transformOrigin: "center bottom",
                                    }}
                                >
                                    <span className={`transition-colors duration-300 group-hover:${item.iconColor} text-foreground`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-xs">{item.label}</span>
                                </motion.a>
                                {/* Back Side */}
                                <motion.a
                                    href={item.href}
                                    className="flex flex-col items-center gap-1 px-4 py-2 absolute inset-0 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl"
                                    variants={backVariants}
                                    transition={sharedTransition}
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transformOrigin: "center top",
                                        rotateX: 90,
                                    }}
                                >
                                    <span className={`transition-colors duration-300 group-hover:${item.iconColor} text-foreground`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-xs">{item.label}</span>
                                </motion.a>
                            </motion.div>
                        </motion.li>
                    ))}
                    <UserDropDown />
                    <BasketSidebar />
                </ul>
            </motion.nav>
            {children}
        </BasketProvider>
    )
}
