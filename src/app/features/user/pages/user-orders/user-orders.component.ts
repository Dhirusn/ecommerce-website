import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { OrderStatus, OrderSummaryDto } from '../../../../models/order.model';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  orders: OrderSummaryDto[] = [];
  isLoading = true;
  orderStatus = OrderStatus;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading = true;
    this.orderService.getUserOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
        this.isLoading = false;
      }
    });
  }

  orderStatusClass: Record<OrderStatus, string> = {
    [OrderStatus.Created]: 'bg-secondary',
    [OrderStatus.AwaitingPayment]: 'bg-warning text-dark',
    [OrderStatus.Paid]: 'bg-success',
    [OrderStatus.Processing]: 'bg-info text-dark',
    [OrderStatus.Shipped]: 'bg-primary',
    [OrderStatus.Delivered]: 'bg-success',
    [OrderStatus.PaymentFailed]: 'bg-danger',
    [OrderStatus.Cancelled]: 'bg-dark',
    [OrderStatus.Refunded]: 'bg-secondary'
  };
}
