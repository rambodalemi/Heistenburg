import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ShinyText from "../shiney-text";
import Link from "next/link";

interface Hero47Props {
    heading?: string;
    subheading?: string;
    description?: string;
    image?: {
        src: string;
        alt: string;
    };
    buttons?: {
        primary?: {
            text: string;
            url: string;
        };
        secondary?: {
            text: string;
            url: string;
        };
    };
}

const Hero = ({
    heading = "Join our ",
    subheading = "Discord Community Right Now",
    description = "Become an affiliate so for every client you bring to us that buys something you get a free heist",
    buttons = {
        primary: {
            text: "Join Now",
            url: "/discord",
        },
        secondary: {
            text: "About Us",
            url: "/about",
        },
    },
    image = {
        src: "/Screenshot.png",
        alt: "Placeholder",
    },
}: Hero47Props) => {
    return (
        <section className="bg-background py-20 lg:py-32 items-center justify-center flex text-center p-4">
            <div className="container flex flex-col items-center gap-10 lg:flex-row">
                <div className="flex flex-col gap-7 lg:w-2/3">
                    <h2 className="text-4xl font-semibold text-foreground md:text-5xl lg:text-7xl">
                        <span>{heading}</span>
                        <span className="text-muted-foreground">{subheading}</span>
                    </h2>
                    <div className="text-base md:text-lg lg:text-xl">
                        <ShinyText text={description} disabled={false} speed={3} className='custom-class' />
                    </div>

                    <div className="flex flex-wrap items-start gap-5 lg:gap-7 justify-center">
                        <Button effect="shine" asChild>
                            <Link href={buttons.primary?.url || '/'}>
                                <div className="flex items-center gap-2">
                                    <ArrowUpRight className="size-4" />
                                </div>
                                <span className="whitespace-nowrap pl-4 pr-6 text-sm lg:pl-6 lg:pr-8 lg:text-base">
                                    {buttons.primary?.text}
                                </span>
                            </Link>
                        </Button>
                        <Button asChild variant="link" className="underline">
                            <Link href={buttons.secondary?.url || "/"}>{buttons.secondary?.text}</Link>
                        </Button>
                    </div>
                </div>
                <div className="relative z-10">
                    <div className="absolute !left-1/2 top-2.5 !h-[92%] !w-[69%] -translate-x-[52%] overflow-hidden rounded-[35px]">
                        <Image
                            width={450}
                            height={889}
                            src={image.src}
                            alt={image.alt}
                            className="size-full object-cover bject-[50%_0%]"
                        />
                    </div>
                    <Image
                        className="relative z-10"
                        src="https://shadcnblocks.com/images/block/mockups/phone-2.png"
                        width={450}
                        height={889}
                        alt="iphone"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
