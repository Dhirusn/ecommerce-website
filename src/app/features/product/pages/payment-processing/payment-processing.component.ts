import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../services/order.service';
import { Subscription, interval } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';

@Component({
    selector: 'app-payment-processing',
    templateUrl: './payment-processing.component.html',
    styleUrls: ['./payment-processing.component.scss']
})
export class PaymentProcessingComponent implements OnInit, OnDestroy {
    orderId: string | null = null;
    isProcessing = true;
    statusMessage = 'Initializing secure payment...';
    private pollSub?: Subscription;
    private attempts = 0;
    private readonly MAX_ATTEMPTS = 10; // 10 seconds approx

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private orderService: OrderService
    ) { }

    ngOnInit(): void {
        this.orderId = this.route.snapshot.paramMap.get('id');

        if (!this.orderId) {
            this.statusMessage = 'Invalid Order ID';
            this.isProcessing = false;
            return;
        }

        this.startPolling();
    }

    ngOnDestroy(): void {
        this.pollSub?.unsubscribe();
    }

    private startPolling() {
        this.pollSub = interval(2000) // Poll every 2 seconds
            .pipe(
                takeWhile(() => this.isProcessing && this.attempts < this.MAX_ATTEMPTS),
                switchMap(() => {
                    this.attempts++;
                    this.statusMessage = `Connecting to payment gateway... (Attempt ${this.attempts})`;
                    return this.orderService.getOrderById(this.orderId!);
                })
            )
            .subscribe({
                next: (order) => {
                    if ((order as any).paymentUrl) {
                        this.isProcessing = false;
                        this.statusMessage = 'Redirecting to Payment...';
                        window.location.href = (order as any).paymentUrl;
                    }
                },
                error: (err) => {
                    console.error('Error polling order:', err);
                },
                complete: () => {
                    if (this.isProcessing) {
                        this.isProcessing = false;
                        this.statusMessage = 'Payment initiation timed out. Please try paying from your Order History.';
                    }
                }
            });
    }
}
