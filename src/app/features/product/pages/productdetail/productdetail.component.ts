import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ItemModel } from '../../../../models/entity';
import { ItemServiceService } from '../../../../services/item-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../../../services/auth.service';
import { CartService } from '../../../../services/cart.service';
import { CartItemDto } from '../../../../models/cart.model';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.scss'
})
export class ProductdetailComponent implements OnInit {
  public tablistButton: HTMLElement | undefined;
  @Output() newItemEvent = new EventEmitter<ItemModel>();
  public product: ItemModel | undefined;

  constructor(private itemService: ItemServiceService,
    private route: ActivatedRoute, private sanitizer: DomSanitizer,
    private authService: AuthService, private router: Router,
    private cartService: CartService) { }


  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((obs) => {
      var productId = obs.get('id')
      this.getItemDetailById(productId);
    });
  }
  getItemDetailById(id: any) {
    this.itemService.getItembyId(id).subscribe((res: any) => {
      this.product = res?.data;
      console.log(this.product)
    });
  }
  incrementQuant() {
    var quantity = parseInt((<HTMLInputElement>document.getElementById("quantity")).value);
    if (quantity > 0) {
      quantity += 1;
      (<HTMLInputElement>document.getElementById("quantity")).value = quantity.toString();
    }
  }
  decrementQuant() {
    var quantity = parseInt((<HTMLInputElement>document.getElementById("quantity")).value);
    if (quantity > 1) {
      quantity -= 1;
      (<HTMLInputElement>document.getElementById("quantity")).value = quantity.toString();
    }
  }
  addToCart(id: string) {
    if (!this.authService.isLoggedIn()) {
      // Not logged in → redirect to login with returnUrl
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: this.router.url }
      });
      return;
    }

    if (!this.product) return;
    var quantity = parseInt((<HTMLInputElement>document.getElementById("quantity")).value);
    const cartItem: CartItemDto = {
      id: '', // empty, server will assign
      productId: this.product.id,
      productName: this.product.title,
      productSku: this.product.id, // assuming sku is same as id; replace if you have real sku
      unitPrice: this.product.price,
      quantity: quantity, // default quantity for "add to cart"
      productImageUrl: this.product.imageUrl ?? null,
      productAttributes: null // map attributes if you support them
    };

    this.cartService.add(cartItem);
  }

}
