import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrderDto, OrderResponseDto, OrderSummaryDto } from '../models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private baseUrl = 'https://localhost:7191/api/Orders'; // Adjust port if needed

    constructor(private http: HttpClient) { }

    createOrder(order: CreateOrderDto): Observable<OrderResponseDto> {
        return this.http.post<OrderResponseDto>(this.baseUrl, order);
    }

    getOrderById(id: string): Observable<OrderResponseDto> {
        return this.http.get<OrderResponseDto>(`${this.baseUrl}/${id}`);
    }

    getUserOrders(page: number = 1, pageSize: number = 10): Observable<OrderSummaryDto[]> {
        return this.http.get<OrderSummaryDto[]>(this.baseUrl, {
            params: { page: page.toString(), pageSize: pageSize.toString() }
        });
    }
}
