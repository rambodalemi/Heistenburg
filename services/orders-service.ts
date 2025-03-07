import api from './api'
import { OrderDocument } from '@/models/Order'

export async function getAllOrders() {
    const response = await api.get<OrderDocument[]>('/orders')
    return response.data
}

export async function getOrderById(id: string) {
    const response = await api.get<OrderDocument>(`/orders/${id}`)
    return response.data
}

export async function createOrder(order: Omit<OrderDocument, '_id'>) {
    const response = await api.post<OrderDocument>('/orders', order)
    return response.data
}

export async function updateOrder(id: string, order: Partial<OrderDocument>) {
    const response = await api.put<OrderDocument>(`/orders/${id}`, order)
    return response.data
}

export async function deleteOrder(id: string) {
    const response = await api.delete(`/orders/${id}`)
    return response.data
}