"use client";

import { IsError } from "@/components/error/error";
import IsLoading from "@/components/loading/loading";
import { NotFound } from "@/components/notfound/not-found";
import { getAllOrders } from "@/services/orders-service";
import { useQuery } from "@tanstack/react-query";
import OrdersTable from "./all-orders-table";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AllOrdersData = () => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["AllOrders"],
        queryFn: () => getAllOrders(),
    });
    console.log(data)
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
                <h1 className="mb-8 text-3xl font-bold">All Orders</h1>
                <Table>
                    <TableHeader>
                        <TableRow className="border-green-900/30 hover:bg-green-900/10">
                            <TableHead className="text-gray-400 font-medium">Order ID</TableHead>
                            <TableHead className="text-gray-400 font-medium">Customer</TableHead>
                            <TableHead className="text-gray-400 font-medium">Product</TableHead>
                            <TableHead className="text-gray-400 font-medium">Date</TableHead>
                            <TableHead className="text-right text-gray-400 font-medium">Amount</TableHead>
                            <TableHead className="text-gray-400 font-medium">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((order) => (
                            <OrdersTable key={order._id} _id={order._id} user={order.user} items={order.items} total={order.total} status={order.status} createdAt={order.createdAt} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    return null;
};

export default AllOrdersData;
