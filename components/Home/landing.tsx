"use client"

import { motion } from "framer-motion"
import localFont from "next/font/local";
import { cn } from "@/lib/utils"
import Image from "next/image";
import ShinyText from "../shiney-text";
import { Card } from "../ui/card";

const gta = localFont({
    src: "./Pricedown-Bl.otf",
    variable: "--font-gta",
    weight: "100 900",
});

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
}: {
    className?: string
    delay?: number
    width?: number
    height?: number
    rotate?: number
    gradient?: string
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <Image src="/Italo_GTO.png" width={1000} height={1000} alt="Example" />
                <Image src="/Example.png" width={1000} height={1000} alt="Example" />
                <Image src="/Deluxo.png" width={1000} height={1000} alt="Example" />
                <Image src="/Deluxo1.png" width={1000} height={1000} alt="Example" />
                <Image src="/Example2.png" width={1000} height={1000} alt="Example" />
            </motion.div>
        </motion.div>
    )
}

export default function HeroGeometric({
    title1 = "Welcome to",
    title2 = "Heistenburg",
}: {
    badge?: string
    title1?: string
    title2?: string
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden rounded-xl">
            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-indigo-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-rose-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-violet-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-amber-500/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-cyan-500/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <Card className="p-6 md:p-8 bg-[#030303/90] backdrop-blur-lg rounded-xl">
                        <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
                            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">{title1}</span>
                                <br />
                                <span
                                    className={cn(
                                        "bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-green-300 ",
                                        gta.className,
                                    )}
                                >
                                    {title2}
                                </span>
                            </h1>
                            <ShinyText text="Biggest GTA Online Modding Service" disabled={false} speed={3} className='custom-class' />
                        </motion.div>
                    </Card>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    )
}

