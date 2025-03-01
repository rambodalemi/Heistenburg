import api from './api'
import { OrderType } from '@/models/Order'

export async function getAllOrders() {
    const response = await api.get<OrderType[]>('/orders')
    return response.data
}

export async function getOrderById(id: string) {
    const response = await api.get<OrderType>(`/orders/${id}`)
    return response.data
}

export async function createOrder(order: Omit<OrderType, '_id'>) {
    const response = await api.post<OrderType>('/orders', order)
    return response.data
}

export async function updateOrder(id: string, order: Partial<OrderType>) {
    const response = await api.put<OrderType>(`/orders/${id}`, order)
    return response.data
}

export async function deleteOrder(id: string) {
    const response = await api.delete(`/orders/${id}`)
    return response.data
}