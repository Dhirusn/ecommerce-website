export interface AddressDto {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string | null;
}

export interface CreateOrderItemDto {
  productId: string;
  productName: string;
  productSku: string;
  unitPrice: number;
  quantity: number;
  productImageUrl?: string | null;
  productAttributes?: string | null;
}

export interface CreateOrderDto {
  orderItems: CreateOrderItemDto[];
  shippingAddress: AddressDto;
  billingAddress: AddressDto;
  paymentMethod?: string;

  // Financials
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  currency: string;
  notes?: string | null;
}

export interface OrderResponseDto {
  id: string;
  userId: string;
  userEmail: string;
  status: string;
  totalAmount: number;
  subTotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  currency: string;
  notes?: string | null;
  createdAt: string;
  shippedAt?: string | null;
  deliveredAt?: string | null;
  trackingNumber?: string | null;
  shippingAddress: AddressDto;
  billingAddress: AddressDto;
  orderItems: OrderItemResponseDto[];
  statusHistory: OrderStatusHistoryDto[];
}

export interface OrderItemResponseDto {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  productImageUrl?: string | null;
  productAttributes?: string | null;
}

export interface OrderStatusHistoryDto {
  id: string;
  status: OrderStatus;
  changedAt: string;
  changedBy?: string | null;
  notes?: string | null;
}

export interface OrderSummaryDto {
  id: string;
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  createdAt: string;
  itemCount: number;
}

export enum OrderStatus {
  Created = 0,            // Order created, inventory not reserved
  AwaitingPayment = 1,    // Inventory reserved, waiting for payment
  Paid = 2,               // Payment confirmed
  Processing = 3,         // Warehouse preparing
  Shipped = 4,            // Handed to carrier
  Delivered = 5,          // Delivered to customer
  PaymentFailed = 6,      // Payment attempt failed
  Cancelled = 7,          // Cancelled by user/system
  Refunded = 8            // Money returned after payment
}