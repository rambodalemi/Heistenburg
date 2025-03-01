"use client";

import { IsError } from "@/components/error/error";
import IsLoading from "@/components/loading/loading";
import { NotFound } from "@/components/notfound/not-found";
import { ProductCard } from "@/components/products/product-card";
import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getAllProducts } from "@/services/products-service";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";

const AllProductsData = () => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["AllProducts"],
        queryFn: () => getAllProducts(),
    });

    if (isLoading) {
        return <IsLoading />;
    }

    if (isError) {
        return <IsError />;
    }

    if (isSuccess) {
        if (!data || data.length === 0) {
            return <NotFound />;
        }

        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-3xl font-bold">Our Products</h1>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 2000,
                        }),
                    ]}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {data.map((p) => (
                            <CarouselItem key={p._id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <ProductCard
                                    _id={p._id}
                                    deliveryEstimate={p.deliveryEstimate}
                                    details={p.details}
                                    image={p.image}
                                    name={p.name}
                                    price={p.price}
                                    rating={p.rating}
                                    reviewCount={p.reviewCount}
                                    key={p._id}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden md:block">
                        <CarouselDots />
                        <CarouselPrevious className="bg-green-600 hover:bg-green-500 border-0" />
                        <CarouselNext className="bg-green-600 hover:bg-green-500 border-0" />
                    </div>
                </Carousel>
            </div>
        );
    }

    return null;
};

export default AllProductsData;
