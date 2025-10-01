import { Component, Input, OnInit } from '@angular/core';
import { ItemModel } from '../../../../models/entity';
import { ItemServiceService } from '../../../../services/item-service.service';
import { HttpResponse } from '@angular/common/http';
import { CartService } from '../../../../services/cart.service';
import { Subscription } from 'rxjs';
import { CartItemDto } from '../../../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItemDto[] = [];
  private sub?: Subscription;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    // subscribe to shared cart (preferred for separate pages)
    this.sub = this.cartService.cart$.subscribe(items => {
      this.cartItems = items.map(i => ({
        ...i, // copy to avoid mutating source
        // ensure quantity exists for UI (not persisted unless you want)
        // @ts-ignore add a ui-only property if not present in model
        quantity: (i as any).quantity ?? 1
      }));
    });
  }
  get total(): number {
    return this.cartItems.reduce((sum, it) =>
      sum + ((it.unitPrice || 0) * ((it as any).quantity || 1)), 0);
  }
  // remove by index (used in template)
  deleteFromCart(index: number) {
    if (index < 0 || index >= this.cartItems.length) return;
    const id = this.cartItems[index].productId;
    // update shared cart
    this.cartService.removeById(id);
    // if you prefer remove by index:
    // this.cartService.removeByIndex(index);
  }

  // increment/decrement quantity only in UI (extend CartService if you want to persist qty)
  changeQty(index: number, delta: number) {
    const it = (this.cartItems[index] as any);
    if (!it) return;
    it.quantity = Math.max(1, (it.quantity || 1) + delta);
    // if you want to persist qty to CartService, implement a method there
  }

  // trackBy for performance
  trackByItem(_: number, item: CartItemDto) {
    return item.productId;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
