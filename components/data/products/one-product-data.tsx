"use client";

import { getProductById } from "@/services/products-service";
import { useQuery } from "@tanstack/react-query";
import ProductDetails from "@/components/products/product-details";
import IsLoading from "@/components/loading/loading";
import { IsError } from "@/components/error/error";
import { NotFound } from "@/components/notfound/not-found";

type OneProductDataProps = {
    id: string;
};

const OneProductData: React.FC<OneProductDataProps> = ({ id }) => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["oneProduct", id],
        queryFn: () => getProductById(id),
    });

    if (isLoading) {
        return <IsLoading title="Loading Product..." details="Please wait while we fetch the latest products for you." />;
    }

    if (isError) {
        return <IsError />;
    }


    if (isSuccess) {
        if (!data) {
            return <NotFound />
        }
        const p = data;
        return (
            <ProductDetails
                category={p.category}
                _id={p._id}
                price={p.price}
                rating={p.rating}
                features={p.features}
                details={p.details}
                description={p.description}
                stock={p.stock} name={p.name}
                reviewCount={p.reviewCount}
                deliveryEstimate={p.deliveryEstimate}
                image={p.image}
            />
        );
    }
};

export default OneProductData;
