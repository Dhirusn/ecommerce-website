import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { CartItemDto } from '../models/cart.model';
import { AuthService } from './auth.service'; // assume you already have this

const CART_LS_KEY = 'app_cart_v1';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<CartItemDto[]>;

  private baseUrl = 'https://localhost:7260/cart';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    const fromLs = this.readFromLocalStorage();
    this.cartSubject = new BehaviorSubject<CartItemDto[]>(fromLs);

    // persist guest cart changes to localStorage
    this.cartSubject.subscribe(items => {
      if (!this.authService.isLoggedIn()) {
        try {
          localStorage.setItem(CART_LS_KEY, JSON.stringify(items));
        } catch (e) {
          console.warn('Could not write cart to localStorage', e);
        }
      }
    });
  }

  // observable to subscribe to
  get cart$(): Observable<CartItemDto[]> {
    return this.cartSubject.asObservable();
  }

  // snapshot
  getCartSnapshot(): CartItemDto[] {
    return this.cartSubject.getValue();
  }

  /** Load cart from backend if logged in, else from LS */
  loadCart() {
    if (this.authService.isLoggedIn()) {
      this.http.get<CartItemDto[]>(`${this.baseUrl}/me`).subscribe(items => {
        this.cartSubject.next(items);
      });
    } else {
      const fromLs = this.readFromLocalStorage();
      this.cartSubject.next(fromLs);
    }
  }

  /** Add item */
  add(item: CartItemDto) {
    if (!item) return;

    if (this.authService.isLoggedIn()) {
      // backend call
      this.http.post(`${this.baseUrl}/items`, item).pipe(
        tap(() => this.loadCart())
      ).subscribe();
    } else {
      // local cart
      const current = [...this.getCartSnapshot()];
      current.push(item);
      this.cartSubject.next(current);
    }
  }

  /** Remove by productId */
  removeById(id: string) {
    if (this.authService.isLoggedIn()) {
      this.http.delete(`${this.baseUrl}/items/${id}`).pipe(
        tap(() => this.loadCart())
      ).subscribe();
    } else {
      const current = this.getCartSnapshot().filter(i => i.productId !== id);
      this.cartSubject.next(current);
    }
  }

  /** Clear entire cart */
  clear() {
    if (this.authService.isLoggedIn()) {
      this.http.delete(`${this.baseUrl}/clear`).pipe(
        tap(() => this.cartSubject.next([]))
      ).subscribe();
    } else {
      this.cartSubject.next([]);
    }
  }

  /** LocalStorage utility */
  private readFromLocalStorage(): CartItemDto[] {
    try {
      const raw = localStorage.getItem(CART_LS_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as CartItemDto[] || [];
    } catch (e) {
      console.warn('Could not read cart from localStorage', e);
      return [];
    }
  }
}
