import { v4 as uuidv4 } from 'uuid';
import { Product, CartItem, ApiResponse } from '../../shared/types';

const API_BASE = '/api';

export const getSessionId = (): string => {
    let sessionId = localStorage.getItem('shophub_session_id');
    if (!sessionId) {
        sessionId = uuidv4();
        localStorage.setItem('shophub_session_id', sessionId);
    }
    return sessionId;
};

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const result: ApiResponse<T> = await response.json();

    if (!result.success) {
        throw new Error(result.error || 'API request failed');
    }

    return result.data as T;
}

export const api = {
    products: {
        list: (category?: string) =>
            fetchApi<Product[]>(`/products${category && category !== 'All' ? `?category=${category}` : ''}`),
        get: (id: string) => fetchApi<Product>(`/products/${id}`),
    },
    cart: {
        get: () => fetchApi<{ items: CartItem[] }>(`/cart/${getSessionId()}`),
        addItem: (item: CartItem) =>
            fetchApi<{ items: CartItem[] }>(`/cart/${getSessionId()}/items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            }),
        updateItem: (productId: string, quantity: number) =>
            fetchApi<{ items: CartItem[] }>(`/cart/${getSessionId()}/items/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity }),
            }),
        removeItem: (productId: string) =>
            fetchApi<{ items: CartItem[] }>(`/cart/${getSessionId()}/items/${productId}`, {
                method: 'DELETE',
            }),
    },
    orders: {
        create: () =>
            fetchApi<{ items: CartItem[], totalAmount: number }>(`/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId: getSessionId() }),
            }),
    }
};
