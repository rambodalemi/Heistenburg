import { TableCell, TableRow } from '@/components/ui/table'
import { OrderType } from '@/models/Order'
import Link from 'next/link'

export default function OrdersTable({ status, _id, email, discordId, paymentMethod, items, createdAt, total }: OrderType) {
    return (
        <TableRow key={_id} className="border-green-900/30 hover:bg-green-900/10">
            <TableCell className="text-white">{_id}</TableCell>
            <TableCell className="text-gray-300">{email}</TableCell>
            <TableCell className="text-gray-300">
                {items?.map((item, index) => (
                    <div key={index}>
                        <Link href={`/products/${item.productId}`}>{item.name} (x{item.quantity}) - ${item.price}</Link>
                    </div>
                ))}
            </TableCell>
            <TableCell className="text-gray-300">{new Date(createdAt).toLocaleDateString()}</TableCell>
            <TableCell className="text-right text-white">$#{total}</TableCell>
            <TableCell>
                <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${status === "Completed"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-amber-500/10 text-amber-500"
                        }`}
                >
                    {status}
                </span>
            </TableCell>
        </TableRow>
    )
}
