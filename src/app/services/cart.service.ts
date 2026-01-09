import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, forkJoin, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap, map, catchError, debounceTime } from 'rxjs/operators';
import { CartItemDto } from '../models/cart.model';
import { AuthService } from './auth.service';

const CART_LS_KEY = 'app_cart_v1';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<CartItemDto[]>;
  private sync$ = new Subject<CartItemDto[]>();
  private baseUrl = 'https://localhost:63919/api/Carts';
  private currentCartId: string | null = null; // 👈 holds server-side cart GUID

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    const fromLs = this.readFromLocalStorage();
    this.cartSubject = new BehaviorSubject<CartItemDto[]>(fromLs);

    this.sync$
      .pipe(debounceTime(1000))
      .subscribe(items => this.syncQuantities(items));

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

  get cart$(): Observable<CartItemDto[]> {
    return this.cartSubject.asObservable();
  }

  getCartSnapshot(): CartItemDto[] {
    return this.cartSubject.getValue();
  }

  /** Load cart (fetches server cart + stores ID) */
  loadCart(): Observable<CartItemDto[]> {
    if (this.authService.isLoggedIn()) {
      const localCart = this.readFromLocalStorage();

      return this.http.get<any>(`${this.baseUrl}/me`).pipe( // 👈 expecting cart object
        switchMap(serverResponse => {
          // Extract cartId and items
          this.currentCartId = serverResponse.id;
          const serverCart = serverResponse.cartItems as CartItemDto[];
          console.log('Cart loaded:', serverResponse); // DEBUG

          if (localCart.length > 0) {
            const merged = this.mergeCarts(serverCart, localCart);
            const syncCalls = merged
              .filter(item => !serverCart.some(sc => sc.productId === item.productId))
              .map(item =>
                this.http.post(`${this.baseUrl}/${this.currentCartId}/items`, item)
              );

            if (syncCalls.length > 0) {
              return forkJoin(syncCalls).pipe(
                switchMap(() =>
                  this.http.get<CartItemDto[]>(`${this.baseUrl}/${this.currentCartId}/items`)
                )
              );
            }
          }
          return of(serverCart);
        }),
        tap(finalCart => {
          this.cartSubject.next(finalCart);
          localStorage.removeItem(CART_LS_KEY);
        }),
        catchError(err => {
          console.error('Error loading cart', err);
          return of([]);
        })
      );
    } else {
      const fromLs = this.readFromLocalStorage();
      this.cartSubject.next(fromLs);
      return of(fromLs);
    }
  }

  /** ✅ Fixed Add Method */
  add(item: CartItemDto) {
    if (!item) return;
    console.log(item)
    if (this.authService.isLoggedIn()) {
      if (!this.currentCartId) {
        // If cartId missing, load it first
        this.loadCart().subscribe(() => this.add(item));
        return;
      }

      this.http.put(`${this.baseUrl}/${this.currentCartId}/items`, item).pipe(
        switchMap(() => this.loadCart())
      ).subscribe();
    } else {
      const current = [...this.getCartSnapshot(), item];
      this.cartSubject.next(current);
    }
  }

  /** Remove item */
  removeById(id: string) {
    if (this.authService.isLoggedIn() && this.currentCartId) {
      this.http.delete(`${this.baseUrl}/items/${id}`).pipe(
        switchMap(() => this.loadCart())
      ).subscribe();
    } else {
      const current = this.getCartSnapshot().filter(i => i.productId !== id);
      this.cartSubject.next(current);
    }
  }

  updateQuantity(productId: string, delta: number): void {
    const current = this.cartSubject.value;

    const updated = current.map(item =>
      item.productId === productId
        ? {
          ...item,
          quantity: Math.max(1, (item.quantity ?? 1) + delta)
        }
        : item
    );

    this.cartSubject.next(updated);
    this.sync$.next(updated);
  }

  updateCartItemQuantity(
    cartId: string | null,
    productId: string,
    quantity: number
  ): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/${cartId}/items/${productId}`,
      { quantity }
    );
  }

  private syncQuantities(items: CartItemDto[]) {
    if (!this.currentCartId) return;

    items.forEach(item => {
      this.updateCartItemQuantity(
        this.currentCartId,
        item.productId,
        item.quantity!
      ).subscribe();
    });
  }

  /** Clear entire cart */
  clear() {
    if (this.authService.isLoggedIn() && this.currentCartId) {
      this.http.delete(`${this.baseUrl}/${this.currentCartId}/clear`).pipe(
        tap(() => this.cartSubject.next([]))
      ).subscribe();
    } else {
      this.cartSubject.next([]);
    }
  }

  /** Utility merge (no duplicates) */
  private mergeCarts(serverCart: CartItemDto[], localCart: CartItemDto[]): CartItemDto[] {
    const merged = [...serverCart];
    localCart.forEach(lItem => {
      const exists = merged.some(sItem => sItem.productId === lItem.productId);
      if (!exists) merged.push(lItem);
    });
    return merged;
  }

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
