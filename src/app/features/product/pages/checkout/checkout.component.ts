import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartItemDto } from '../../../../models/cart.model';
import { CartService } from '../../../../services/cart.service';
import { OrderService } from '../../../../services/order.service';
import { AuthService } from '../../../../services/auth.service';
import { CreateOrderDto } from '../../../../models/order.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkoutForm: FormGroup;
  cartItems: CartItemDto[] = [];
  private sub?: Subscription;
  isProcessing = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: [''],
      phone: [''],
      notes: ['']
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      // Potentially pre-fill user data
    }

    this.cartService.loadCart().subscribe();
    this.sub = this.cartService.cart$.subscribe(items => {
      this.cartItems = items.map(i => ({
        ...i,
        quantity: (i as any).quantity ?? 1
      }));
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get subtotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.unitPrice * (item.quantity ?? 1),
      0
    );
  }

  get total(): number {
    return this.subtotal;
  }

  placeOrder() {
    this.errorMessage = null;

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    if (this.cartItems.length === 0) {
      this.errorMessage = "Your cart is empty.";
      return;
    }

    this.isProcessing = true;

    // Map cart items to order items
    const orderItems = this.cartItems.map(item => ({
      productId: item.productId,
      productName: item.productName,
      productSku: item.productSku ?? 'UNKNOWN-SKU',
      unitPrice: item.unitPrice,
      quantity: item.quantity ?? 1,
      productImageUrl: item.productImageUrl,
      productAttributes: item.productAttributes
    }));

    // Construct Address DTO
    const shippingAddress = {
      firstName: this.checkoutForm.value.firstName,
      lastName: this.checkoutForm.value.lastName,
      addressLine1: this.checkoutForm.value.address,
      addressLine2: '',
      city: this.checkoutForm.value.city,
      state: this.checkoutForm.value.state,
      postalCode: this.checkoutForm.value.postalCode || '00000',
      country: this.checkoutForm.value.country,
      phone: this.checkoutForm.value.phone || null
    };

    // For this demo, assuming Billing same as Shipping.
    const billingAddress = { ...shippingAddress };

    const createOrderDto: CreateOrderDto = {
      orderItems: orderItems,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      paymentMethod: 'COD',
      taxAmount: 0,
      shippingAmount: 0,
      discountAmount: 0,
      currency: 'USD',
      notes: this.checkoutForm.value.notes
    };

    console.log('Sending order:', createOrderDto);

    this.orderService.createOrder(createOrderDto).subscribe({
      next: (order) => {
        console.log('Order created:', order);
        // Verify response has ID to show confirmation
        const orderId = order.id;
        console.log('Redirecting to payment processing for Order ID:', orderId);
        this.cartService.clear();
        this.isProcessing = false;
        this.router.navigate(['/item/payment-processing', orderId]);  // Assuming 'item' is the parent path in app.routes
      },
      error: (err) => {
        console.error('Order creation failed', err);
        this.errorMessage = "Failed to place order. Please try again.";
        this.isProcessing = false;
      }
    });
  }
}
