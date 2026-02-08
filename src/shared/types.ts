import z from "zod";

// Shared Product Type (Frontend compatible)
export const ProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    image: z.string(),
    description: z.string(),
    category: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

// Shared Cart Item Type
export const CartItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    image: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    quantity: z.number().int().positive(),
});

export type CartItem = z.infer<typeof CartItemSchema>;

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
