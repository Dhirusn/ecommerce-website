import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../services/order.service';
import { OrderResponseDto } from '../../../../models/order.model';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
    order: OrderResponseDto | null = null;
    isLoading = true;
    error: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadOrder(id);
        } else {
            this.error = "Invalid Order ID";
            this.isLoading = false;
        }
    }

    loadOrder(id: string) {
        this.isLoading = true;
        this.orderService.getOrderById(id).subscribe({
            next: (data) => {
                this.order = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Failed to load order detail', err);
                this.error = "Could not load order details.";
                this.isLoading = false;
            }
        });
    }
}
