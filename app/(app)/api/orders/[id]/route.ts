import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from "@/lib/mongodb"
import Order from '@/models/Order'

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect()
        const { id } = await context.params

        const body = await request.json()
        const order = await Order.findByIdAndUpdate(id, body, { new: true })
        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 })
        }
        return NextResponse.json(order)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Error updating order' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect()
        const { id } = await context.params

        const order = await Order.findByIdAndDelete(id)
        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Order deleted successfully' })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Error deleting order' }, { status: 500 })
    }
}
