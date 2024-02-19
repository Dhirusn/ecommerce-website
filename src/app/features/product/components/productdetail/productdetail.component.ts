import { DOCUMENT } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.scss'
})
export class ProductdetailComponent implements OnInit {
  public tablistButton: HTMLElement | undefined;
  ngOnInit(): void {
  }
  incrementQuant() {
    var quantity = parseInt((<HTMLInputElement>document.getElementById("quantity")).value);
    if (quantity > 0) {
      quantity+=1;
      (<HTMLInputElement>document.getElementById("quantity")).value = quantity.toString();
    }
  }
  decrementQuant() {
    var quantity = parseInt((<HTMLInputElement>document.getElementById("quantity")).value);
    if (quantity > 1) {
      quantity-=1;
      (<HTMLInputElement>document.getElementById("quantity")).value = quantity.toString();
    }
  }
  addToCart(){
    var quantity = parseInt((<HTMLInputElement>document.getElementById("quantity")).value);
    if(quantity<1){
      return;
    }

  }
}
