import api from './api'
import { ProductType } from '@/models/Product'

export async function getAllProducts() {
    const response = await api.get<ProductType[]>('/products')
    return response.data
}

export async function getProductById(id: string) {
    const response = await api.get<ProductType>(`/products/${id}`)
    return response.data
}

export async function createProduct(product: Omit<ProductType, '_id'>) {
    const response = await api.post<ProductType>('/products', product)
    return response.data
}

export async function updateProduct(id: string, product: Partial<ProductType>) {
    const response = await api.put<ProductType>(`/products/${id}`, product)
    return response.data
}

export async function deleteProduct(id: string) {
    const response = await api.delete(`/products/${id}`)
    return response.data
}
