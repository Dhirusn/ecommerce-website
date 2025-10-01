// src/app/models/cart.model.ts

/**
 * Mirror of CreateCartDto (C#)
 */
export interface CreateCartDto {
  cartItems: CartItemDto[];
  userId: string;
  userEmail: string;
  notes?: string | null;
  couponCode?: string | null;
}

/**
 * Mirror of CartItemDto (C#)
 */
export interface CartItemDto {
  productId: string;           // Guid as string
  productName: string;
  productSku: string;
  unitPrice: number;           // decimal -> number
  quantity: number;
  productImageUrl?: string | null;
  productAttributes?: string | null;
}

/**
 * Mirror of CartResponseDto (C#)
 */
export interface CartResponseDto {
  id: string;                  // Guid as string
  userId: string;
  userEmail: string;
  status: CartStatus;
  totalAmount: number;
  totalItems: number;
  notes?: string | null;
  couponCode?: string | null;
  discountAmount: number;
  expiresAt?: string | null;   // ISO date string or null
  cartItems: CartItemResponseDto[];
}

/**
 * Mirror of CartItemResponseDto (C#)
 */
export interface CartItemResponseDto {
  id: string;                  // Guid as string (cart item id)
  productId: string;
  productName: string;
  productSku: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  productImageUrl?: string | null;
  productAttributes?: string | null;
  availableStock?: number | null;
  isAvailable: boolean;
}

/**
 * Mirror of UpdateCartItemDto (C#)
 */
export interface UpdateCartItemDto {
  cartItemId: string;          // Guid as string
  quantity: number;
}

/**
 * Mirror of CartSummaryDto (C#)
 */
export interface CartSummaryDto {
  id: string;                  // Guid as string
  totalAmount: number;
  totalItems: number;
  expiresAt?: string | null;
}

/**
 * Possible cart states — adjust to match your server enum exactly.
 * If your backend enum differs, replace or extend these values.
 */
export enum CartStatus {
  Pending = 'Pending',
  Active = 'Active',
  Completed = 'Completed',
  Abandoned = 'Abandoned',
  Expired = 'Expired'
}
